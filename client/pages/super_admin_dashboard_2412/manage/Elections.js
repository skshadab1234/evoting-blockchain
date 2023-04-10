import React, { useState, useEffect } from 'react'
import AdminHeader from '../Header/AdminHeader'
import Link from 'next/link';
import { Table, Button, Modal, Form, Input, message, Pagination } from 'antd';


const Elections = () => {
  const AdminUrl = "/super_admin_dashboard_2412"

  const columns = [
    {
      title: 'Election Image',
      dataIndex: 'electionImage',
      key: 'electionImage',
      render: electionImage => <img src={electionImage} style={{ width: 50, height: 50, borderRadius: 50 }} />,
      width: 100
    },
    {
      title: 'Election ID',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
      width: 50
    },
    {
      title: 'Election Name',
      dataIndex: 'electionName',
      key: 'electionName',
      sorter: (a, b) => a.electionName.localeCompare(b.electionName),
      width: 100
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
      width: 150
    },
    {
      title: 'Registration Deadline',
      dataIndex: 'registrationDeadline',
      key: 'registrationDeadline',
      sorter: (a, b) => a.registrationDeadline.localeCompare(b.registrationDeadline),
      width: 100

    },
    {
      title: 'Early Voting Information',
      dataIndex: 'earlyVotingInformation',
      key: 'earlyVotingInformation',
      sorter: (a, b) => a.earlyVotingInformation.localeCompare(b.earlyVotingInformation),
    },
    {
      title: 'Positions',
      dataIndex: 'Positions',
      key: 'Positions',
      sorter: (a, b) => a.Positions.localeCompare(b.Positions),
      render: (text, record) => (
        <>
          <p>{record.Positions}</p>
        </>
      ),
      width: 200
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
    },
  ];

  
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [data, setData] = useState();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  
  useEffect(() => {
    const callElection = async () => {
      try {
          const req = await fetch('/getAllElections' , {
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

  callElection();
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
    const selectedRow = data.find(item => item._id   === key);
    form.setFieldsValue(selectedRow);
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
    const DeleteElection = async () => {
      try {
        const res = await fetch("/delete_election", {
          method: "POST",
          headers: {
              "Content-Type" : "application/json"
          },
          body: JSON.stringify({
              selectedKey
          })
      })

      const data = await res.json();
      // console.log(data)
      if(data.status == 200) {
        message.success("Election Deleted Successfully")
      }else{
        message.error("Something Went Wrong")
      }

      } catch (error) {
        console.log(error)
      }
    }

    DeleteElection();
    
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
        console.log(values);
        if (selectedKey === null) {
          setData([
            ...data,
            {
              _id: data.length + 1,
              ...values,
            },
          ]);

          const addElection = async () => {
            try {
              const res = await fetch("/add_election", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    values
                })
            })

            const data = await res.json();
            // console.log(data)
            if(data.status == 200) {
              message.success("Election Added Successfully")
            }else{
              message.error("Something Went Wrong")
            }

            } catch (error) {
              console.log(error)
            }
          }

          // Caling Add Candidate Function
          addElection();

        } else {
          setData(
            data.map(item =>
              item._id === selectedKey ? { ...item, ...values } : item
              )
              );
              const updateElection = async () => {
                try {
                  const res = await fetch("/update_election", {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({
                        selectedKey, values
                    })
                })
    
                const data = await res.json();
                // console.log(data)
                if(data.status == 200) {
                  message.success("Election Updated Successfully")
                }else{
                  message.error("Something Went Wrong")
                }
    
                } catch (error) {
                  console.log(error)
                }
              }
    
              updateElection();
            }


          })
         
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  return (
    <main>
      <AdminHeader />
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 p-5">
        <h1 className='text-4xl text-gray-300 font-bold mb-2'>Elections</h1>
        <nav aria-label="Breadcrumbs" className="order-first flex text-sm font-semibold sm:space-x-2">
          <Link href={`${AdminUrl}`}>
            <a className="hove:text-slate-600r hidden text-slate-500 sm:block" >Home</a>
          </Link>
          <div aria-hidden="true" class="hidden select-none text-slate-400 sm:block">/</div>
          <Link href={`${AdminUrl}/manage`}>
            <a class="hidden text-slate-500 hover:text-slate-600 sm:block" >Manage</a>
          </Link>
          <div aria-hidden="true" class="hidden select-none text-slate-400 sm:block">/</div>
          <p class="text-slate-500 hover:text-slate-600">Manage Elections</p>
        </nav>

       {
        Loading ? "Table Loading" :
        <>
           <div className='flex justify-center'>        
          <Button onClick={handleCreate} className="text-gray-300">Add New Elections</Button>
        </div>
       <div className='table-responsive'>
        <Table columns={columns}
            dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            pagination={false}
            className="table-responsive w-full mt-10"
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
          title={selectedKey === null ? 'Create Election' : 'Update Election'}
          visible={modalVisible}
          onOk={handleSave}
          onCancel={() => setModalVisible(false)}
          okButtonProps={{ disabled: false }}

        >
          <Form form={form} className="mt-2">
            <Form.Item name="electionName" label="electionName">
              <Input />
            </Form.Item>
            <Form.Item name="date" label="date">
              <Input />
            </Form.Item>
            <Form.Item name="votingEligibility" label="votingEligibility">
              <Input />
            </Form.Item>
            <Form.Item name="pollingLocations" label="pollingLocations">
              <Input />
            </Form.Item>
            <Form.Item name="registrationDeadline" label="registrationDeadline">
              <Input />
            </Form.Item>
            <Form.Item name="earlyVotingInformation" label="earlyVotingInformation">
              <Input />
            </Form.Item>
            <Form.Item name="absenteeVotingInformation" label="absenteeVotingInformation">
              <Input />
            </Form.Item>
            <Form.Item name="voterIDRequirements" label="voterIDRequirements">
              <Input />
            </Form.Item>
            <Form.Item name="electionImage" label="electionImage">
              <Input />
            </Form.Item>
            <Form.Item name="positions" label="Positions">
              <Input />
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
        </>
       }

      </div>
    </main>
  )
}

export default Elections