import React, { useState, useEffect } from 'react'
import AdminHeader from '../Header/AdminHeader'
import Link from 'next/link';
import { Table, Button, Modal, Form, Input, message, Pagination, Radio } from 'antd';
import moment from 'moment'

const candidates = () => {
  const AdminUrl = "/super_admin_dashboard_2412"

  const columns = [
    {
      title: 'Position Image',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} style={{ width: 50, height: 50, borderRadius: 50 }} />,
      width: 100
    },
    {
      title: 'Positon Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 150
    },
    {
      title: 'Positon Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      title: 'Positon Id',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
      width: 150
    },
    {
      title: 'Candidates',
      key: 'candidate',
      render: (text, record) => (
        <>
          <Button onClick={() => handleCandidateCRUD(record._id, record.name)} className="text-white bg-green-500 border-none m-2 hover:bg-green-600 hover:text-white ">Add</Button>
          <Button onClick={() => handleViewCandidate(record._id, record.candidates)} className="text-white bg-primary-500 border-none m-2 hover:bg-green-600 hover:text-white ">View ({record.candidates?.length})</Button>
        </>
      ),
      width: 150
    },
    {
      title: 'Voters',
      key: 'voter',
      render: (text, record) => (
        <>
          <Button onClick={() => handleVoterCRUD(record._id, record.name)} className="text-white bg-green-500 border-none m-2 hover:bg-green-600 hover:text-white ">Add</Button>
          <Button onClick={() => handleViewVoter(record._id, record.Voters)} className="text-white bg-primary-500 border-none m-2 hover:bg-green-600 hover:text-white ">View ({record.Voters?.length})</Button>
        </>
      ),
      width: 150
    },


    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => handleUpdate(record._id)} className="text-white bg-green-500 border-none hover:bg-green-600 hover:text-white ">Edit</Button>
          <Button onClick={() => handleDelete(record._id)} className="text-white bg-red-500 border-none hover:bg-red-500 hover:text-white ml-2">Delete</Button>
        </>
      ),
      width: 200
    },
  ];


  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [data, setData] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [CandidateModal, setCandidateModal] = useState(false);
  const [VoterModal, setVoterModal] = useState(false);
  const [handleName, sethandleName] = useState('');
  const [Loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusVal, setstatusVal]= useState('')
  const pageSize = 5;

  useEffect(() => {
    const callPosition = async () => {
      try {
        const req = await fetch('/getAllPositions', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then(response => response.json())
          .then(jsonData => { setData(jsonData); setLoading(false) })
          .catch(error => console.error(error))

      } catch (error) {
        console.log(error);
      }
    }

    callPosition();

  }, [])


  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  function handleCreate() {
    form.resetFields();
    setModalVisible(true);
    setSelectedKey(null);
  }

  function handleUpdate(key) {
    const selectedRow = data.find(item => item._id === key);
    form.setFieldsValue({name:selectedRow.name, date:selectedRow.date != undefined ? moment(selectedRow.date).format('YYYY-MM-DD') : '',time:selectedRow.time != undefined ? moment(selectedRow.date+" "+selectedRow.time).format('hh:mm') : ''});
    setstatusVal(selectedRow.status)
    setModalVisible(true);
    setSelectedKey(key);
  }

  function handleDelete(key) {
    setSelectedKey(key);
    setDeleteModalVisible(true);
    // setData(data.filter(item => item.key !== key));
  }

  const handleDeleteModalOk = () => {
    setData(data.filter((item) => item._id !== selectedKey));
    setDeleteModalVisible(false);
    const deletePosition = async () => {
      try {
        const res = await fetch("/delete_position", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            selectedKey
          })
        })

        const data = await res.json();
        // console.log(data)
        if (data.status == 200) {
          message.success("Position's Deleted Successfully")
        } else {
          message.error("Something Went Wrong")
        }

      } catch (error) {
        console.log(error)
      }
    }

    // Caling Add Candidate Function
    deletePosition();

  };

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false);
  };


  function handleSave() {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        setModalVisible(false);
        console.log(selectedKey);
        if (selectedKey === null) {
          setData([
            ...data,
            {
              _id: data.length + 1,
              ...values,
            },
          ]);

          const addPositions = async () => {
            try {
              const res = await fetch("/add_position", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  values
                })
              })

              const data = await res.json();
              // console.log(data)
              if (data.status == 200) {
                message.success("Position's Added Successfully")
                console.log(data);
              } else if (data.status == 400) {
                message.error("Positions's Already Exists")
              } else {
                message.error("Something Went Wrong")
              }

            } catch (error) {
              console.log(error)
            }
          }

          // Caling Add Candidate Function
          addPositions();

        } else {
          setData(
            data.map(item =>
              item._id === selectedKey ? { ...item, ...values } : item
            )
          );

          // console.log({selectedKey, values})
          // Update Candidate Request 
          const updatePosition = async () => {
            try {
              const res = await fetch("/update_position", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  selectedKey, values
                })
              })

              const data = await res.json();
              // console.log(data)
              if (data.status == 200) {
                message.success("Position's Updated Successfully")
              } else {
                message.error("Something Went Wrong")
              }

            } catch (error) {
              console.log(error)
            }
          }

          // Caling Add Candidate Function
          updatePosition();
        }



      })

      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  const candidateColumn = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} style={{ width: 50, height: 50, borderRadius: 50 }} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Party',
      dataIndex: 'party',
      key: 'party'
    },
  ];

  const voterColumn = [
    {
      title: 'Voter Id',
      dataIndex: 'voterId',
      key: 'voterId'
    },
    {
      title: 'first Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'city',
      dataIndex: 'city',
      key: 'city'
    },
    
    {
      title: 'isVerified',
      dataIndex: 'isVerified',
      key: 'isVerified'
    },

  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [candidateData, setcandidateData] = useState([])
  const [VoterData, setVoterData] = useState([])
  const [filteredCandidate, setfilteredCandidate] = useState([])
  const [filterVoter, setfilterVoter] = useState([])
  const [viewCandidateModal,setViewCandidateModal] = useState(false)
  const [viewVoterModal,setviewVoterModal] = useState(false)

  useEffect(() => {
    const callCandidate = async () => {
      try {
        const req = await fetch('/getAllCandidate', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then(response => response.json())
          .then(jsoncandidateData => {
            const newcandidateData = jsoncandidateData.map((item, index) => ({ ...item, key: item._id }));
            setcandidateData(newcandidateData);
            setLoading(false);
          })
          .catch(error => console.error(error))

      } catch (error) {
        console.log(error);
      }
    }
    
    const callVoters = async () => {
      try {
        const req = await fetch('/getAllVoter', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then(response => response.json())
          .then(jsonVoterData => {
            const newVoterData = jsonVoterData.map((item, index) => ({ ...item, key: item._id }));
            setVoterData(newVoterData);
            setLoading(false);
          })
          .catch(error => console.error(error))

      } catch (error) {
        console.log(error);
      }
    }

    callCandidate();
    callVoters();
  }, [])

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const handleCandidateCRUD = (key, name) => {
    setCandidateModal(true)
    sethandleName(name)
    setSelectedKey(key)    
  }

  const handleCandidateOk = () => {
    setCandidateModal(false)
    if (selectedRowKeys.length > 0) {
      let addCandidatetoPosition = async () => {
        try {
          const res = await fetch("/updatePositioCandidatesList", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              selectedRowKeys, selectedKey
            })
          })

          const data = await res.json();
          // console.log(data)
          if (data.status == 200) {
            message.success(data.message)
          } else if (data.status == 500) {
            message.success(data.message)
          } else if (data.status == 404) {
            message.success(data.message)
          }else {
            message.error("Something Went Wrong")
          }

        } catch (error) {
          console.log(error)
        }
      }

      // Caling Add Candidate Function
      addCandidatetoPosition()
    }else{
      message.error("No Candidate Selected")
    }

  }
  const handleCandidateCancel = () => {
    setCandidateModal(false)
    setViewCandidateModal(false)
  }

  const handleViewCandidate = (key,candidates) => {
    setfilteredCandidate(candidateData.filter(candidate => candidates?.includes(candidate._id)));
    setViewCandidateModal(true)
  }
  
  const handleViewVoter = (key,voter) => {
      setfilterVoter(VoterData.filter(voters => voter?.includes(voters._id)));
    setviewVoterModal(true)
  }
  
  const handleVoterOk = () => {
    setVoterModal(false)
    if (selectedRowKeys.length > 0) {
      let addCandidatetoPosition = async () => {
        try {
          const res = await fetch("/updateVoterList", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              selectedRowKeys, selectedKey
            })
          })

          const data = await res.json();
          // console.log(data)
          if (data.status == 200) {
            message.success(data.message)
          } else if (data.status == 500) {
            message.success(data.message)
          } else if (data.status == 404) {
            message.success(data.message)
          }else {
            message.error("Something Went Wrong")
          }

        } catch (error) {
          console.log(error)
        }
      }

      // Caling Add Candidate Function
      addCandidatetoPosition()
    }else{
      message.error("No Candidate Selected")
    }

  }
  const handleVoterCancel = () => {
    setVoterModal(false)
    setviewVoterModal(false)
  }

  const handleVoterCRUD = (key, name) => {
    setVoterModal(true)
    sethandleName(name)
    setSelectedKey(key)    
  }

  return (
    <main>
      <AdminHeader />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 p-5">
        <h1 className='text-4xl text-gray-300 font-bold mb-2'>Position's</h1>
        <nav aria-label="Breadcrumbs" className="order-first flex text-sm font-semibold sm:space-x-2">
          <Link href={`${AdminUrl}`}>
            <a className="hove:text-slate-600r hidden text-slate-500 sm:block" >Home</a>
          </Link>
          <div aria-hidden="true" className="hidden select-none text-slate-400 sm:block">/</div>
          <Link href={`${AdminUrl}/manage`}>
            <a className="hidden text-slate-500 hover:text-slate-600 sm:block" >Manage</a>
          </Link>
          <div aria-hidden="true" className="hidden select-none text-slate-400 sm:block">/</div>
          <p className="text-slate-500 hover:text-slate-600">Manage Position's</p>
        </nav>

        {
          Loading ? "Table Loading" :
            <>
              <div className='flex justify-center'>
                <Button onClick={handleCreate} className="text-gray-300">Add New Positions</Button>
              </div>
              <div className=''>
                <Table columns={columns}
                  dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                  pagination={false}
                  className=" mt-10"
                  rowClassName="bg-slate-800 no-hover text-gray-200 hover:text-slate-400 rounded-none border-b-2 border-zinc-300" />

                <div className="mt-4">
                  <Pagination
                    current={currentPage}
                    onChange={handlePageChange}
                    pageSize={pageSize}
                    total={data.length}
                  />
                </div>
              </div>
              <Modal
                title={selectedKey === null ? 'Create Positions' : 'Update Positions'}
                visible={modalVisible}
                onOk={handleSave}
                onCancel={() => setModalVisible(false)}
                okButtonProps={{ disabled: false }}

              >
                <Form form={form} className="mt-2" initialValues={{ status: statusVal.toString() }}>
                  <Form.Item name="name" label="Position Name">
                    <Input />
                  </Form.Item>
                  <Form.Item name="description" label="Position Description">
                    <Input />
                  </Form.Item>
                  <Form.Item name="image" label="Position Image">
                    <Input />
                  </Form.Item>
                  <Form.Item name="date" label="date">
                    <Input type='date' />
                  </Form.Item>
                  <Form.Item name="time" label="time">
                    <Input type='time' />
                  </Form.Item>
                  <Form.Item name="status" label="Status">
                  <Radio.Group>
                    <Radio.Button value="1">Active</Radio.Button>
                    <Radio.Button value="0">Blocked</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                </Form>
              </Modal>

              <Modal
                title="Confirm Delete"
                visible={deleteModalVisible}
                onOk={handleDeleteModalOk}
                onCancel={handleDeleteModalCancel}
              >
                <p>Are you sure you want to delete this row?</p>
              </Modal>

              <Modal
                title={`Add/Remove Candidates for ${handleName}`}
                visible={CandidateModal}
                onOk={handleCandidateOk}
                onCancel={handleCandidateCancel}
              >
                <Table rowSelection={rowSelection} columns={candidateColumn} dataSource={candidateData} />
              </Modal>
              
              <Modal
                title={`List of Selected Candidate's for ${handleName}`}
                visible={viewCandidateModal}
                footer={null}
                onCancel={handleCandidateCancel}
              >``
                <Table rowSelection={rowSelection} columns={candidateColumn} dataSource={filteredCandidate} />
              </Modal>

              <Modal
                title={`Add/Remove Voter for ${handleName}`}
                visible={VoterModal}
                onOk={handleVoterOk}
                onCancel={handleVoterCancel}
              >
                <Table rowSelection={rowSelection} columns={voterColumn} dataSource={VoterData} />
              </Modal>

              <Modal
                title={`List of Selected Voter's for ${handleName} to Vote`}
                visible={viewVoterModal}
                footer={null}
                onCancel={handleVoterCancel}
              >
                <Table rowSelection={rowSelection} columns={voterColumn} dataSource={filterVoter} />
              </Modal>
            </>
        }

      </div>
    </main>
  )
}

export default candidates