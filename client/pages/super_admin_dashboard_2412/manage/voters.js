import React, { useState, useEffect } from 'react'
import AdminHeader from '../Header/AdminHeader'
import Link from 'next/link';
import { Table, Button, Modal, Form, Input, message, Pagination } from 'antd';


const candidates = () => {
  const AdminUrl = "/super_admin_dashboard_2412"

  const columns = [
    {
      title: 'VoterId',
      dataIndex: 'voterId',
      key: 'voterId',
      sorter: (a, b) => a.voterId.localeCompare(b.voterId),
      width: 100
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      width: 100
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      width: 150
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: 150
    },
    {
      title: 'votingRights',
      dataIndex: 'votingRights',
      key: 'votingRights',
      sorter: (a, b) => a.votingRights.localeCompare(b.votingRights),
    },
    {
      title: 'votesCast',
      dataIndex: 'votesCast',
      key: 'votesCast',
      sorter: (a, b) => a.votesCast.localeCompare(b.votesCast),
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
    const callVoter = async () => {
      try {
          const req = await fetch('/getAllVoter' , {
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
    const DeleteCandidate = async () => {
      try {
        const res = await fetch("/delete_candidate", {
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
        message.success("Candidate Deleted Successfully")
      }else{
        message.error("Something Went Wrong")
      }

      } catch (error) {
        console.log(error)
      }
    }

    // Caling Add Candidate Function
    DeleteCandidate();
    
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
        
        if (selectedKey === null) {
          setData([
            ...data,
            {
              _id: data.length + 1,
              ...values,
            },
          ]);

          const AddVoter = async () => {
            try {
              const res = await fetch("/add_voter", {
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
              message.success("Voter Added Successfully")
            }else{
              message.error("Something Went Wrong")
            }

            } catch (error) {
              console.log(error)
            }
          }

          // Caling Add Candidate Function
          AddVoter();

        } else {
          console.log('update');
          setData(
            data.map(item =>
              item._id === selectedKey ? { ...item, ...values } : item
              )
              );
            }

            // console.log({selectedKey, values})
            // Update Candidate Request 
            const updateVoter = async () => {
              try {
                const res = await fetch("/update_voter", {
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
                message.success("Voter Updated Successfully")
              }else{
                message.error("Something Went Wrong")
              }
  
              } catch (error) {
                console.log(error)
              }
            }
  
            // Caling Add Candidate Function
            updateVoter();

          })
         
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

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
          <Button onClick={handleCreate} className="text-gray-300">Add New Voter</Button>
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
          title={selectedKey === null ? 'Create Candidate' : 'Update Candidate'}
          visible={modalVisible}
          onOk={handleSave}
          onCancel={() => setModalVisible(false)}
          okButtonProps={{ disabled: false }}

        >
          <Form form={form} className="mt-2">
            <Form.Item name="firstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="lastName">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="email">
              <Input />
            </Form.Item>
            <Form.Item name="votingRights" label="votingRights">
              <Input />
            </Form.Item>
            <Form.Item name="dateOfBirth" label="dateOfBirth">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="address">
              <Input />
            </Form.Item>
            <Form.Item name="city" label="city">
              <Input />
            </Form.Item>
            <Form.Item name="state" label="state">
              <Input />
            </Form.Item>
            <Form.Item name="zipCode" label="zipCode">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="phoneNumber">
              <Input />
            </Form.Item>
            <Form.Item name="isVerified" label="isVerified">
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

export default candidates