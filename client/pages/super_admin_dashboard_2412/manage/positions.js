import React, { useState, useEffect } from 'react'
import AdminHeader from '../Header/AdminHeader'
import Link from 'next/link';
import { Table, Button, Modal, Form, Input, message, Pagination, Radio } from 'antd';
import moment from 'moment'

const candidates = () => {
  const AdminUrl = "/super_admin_dashboard_2412"

  const columns = [
    {
      title: 'Positon Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
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
  const [handleName, sethandleName] = useState('');
  const [Loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusVal, setstatusVal]= useState('')
  const pageSize = 5;

  useEffect(() => {
    const callVoter = async () => {
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

    callVoter();

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
    const deleteVoter = async () => {
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
    deleteVoter();

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
          const updateVoter = async () => {
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
          updateVoter();
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [candidateData, setcandidateData] = useState([])
  const [filteredCandidate, setfilteredCandidate] = useState([])
  const [viewCandidateModal,setViewCandidateModal] = useState(false)

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

    callCandidate();
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
  
  console.log(statusVal);
  return (
    <main>
      <AdminHeader />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 p-5">
        <h1 className='text-4xl text-gray-300 font-bold mb-2'>Voter's</h1>
        <nav aria-label="Breadcrumbs" className="order-first flex text-sm font-semibold sm:space-x-2">
          <Link href={`${AdminUrl}`}>
            <a className="hove:text-slate-600r hidden text-slate-500 sm:block" >Home</a>
          </Link>
          <div aria-hidden="true" class="hidden select-none text-slate-400 sm:block">/</div>
          <Link href={`${AdminUrl}/manage`}>
            <a class="hidden text-slate-500 hover:text-slate-600 sm:block" >Manage</a>
          </Link>
          <div aria-hidden="true" class="hidden select-none text-slate-400 sm:block">/</div>
          <p class="text-slate-500 hover:text-slate-600">Manage voter's</p>
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
            </>
        }

      </div>
    </main>
  )
}

export default candidates