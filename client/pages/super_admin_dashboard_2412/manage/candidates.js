import React, { useState, useEffect } from 'react'
import AdminHeader from '../Header/AdminHeader'
import Link from 'next/link';
import { Table, Button, Modal, Form, Input, message, Pagination } from 'antd';


const candidates = () => {
  const AdminUrl = "/super_admin_dashboard_2412"

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} style={{ width: 50, height: 50, borderRadius: 50 }} />,
      width: 100
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      width: 100
    },
    {
      title: 'Party',
      dataIndex: 'party',
      key: 'party',
      sorter: (a, b) => a.party.localeCompare(b.party),
      width: 150
    },
    {
      title: 'Platofrm',
      dataIndex: 'platform',
      key: 'platform',
      sorter: (a, b) => a.platform.localeCompare(b.platform),
      width: 400

    },
    {
      title: 'Slogan',
      dataIndex: 'slogan',
      key: 'slogan',
      sorter: (a, b) => a.slogan.localeCompare(b.slogan),
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
    const callCandidate = async () => {
      try {
          const req = await fetch('/getAllCandidate' , {
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

  callCandidate();
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

          const addVoter = async () => {
            try {
              const res = await fetch("/add_candidate", {
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
              message.success("Candidate Added Successfully")
            }else{
              message.error("Something Went Wrong")
            }

            } catch (error) {
              console.log(error)
            }
          }

          // Caling Add Candidate Function
          addVoter();

        } else {
          console.log('update');
          setData(
            data.map(item =>
              item._id === selectedKey ? { ...item, ...values } : item
              )
              );
              // console.log({selectedKey, values})
              // Update Candidate Request 
              const updateCandidate = async () => {
                try {
                  const res = await fetch("/update_candidate", {
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
                  message.success("Candidate Updated Successfully")
                }else{
                  message.error("Something Went Wrong")
                }
    
                } catch (error) {
                  console.log(error)
                }
              }
    
              // Caling Add Candidate Function
              updateCandidate();
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
        <h1 className='text-4xl text-gray-300 font-bold mb-2'>Candidates</h1>
        <nav aria-label="Breadcrumbs" className="order-first flex text-sm font-semibold sm:space-x-2">
          <Link href={`${AdminUrl}`}>
            <a className="hove:text-slate-600r hidden text-slate-500 sm:block" >Home</a>
          </Link>
          <div aria-hidden="true" class="hidden select-none text-slate-400 sm:block">/</div>
          <Link href={`${AdminUrl}/manage`}>
            <a class="hidden text-slate-500 hover:text-slate-600 sm:block" >Manage</a>
          </Link>
          <div aria-hidden="true" class="hidden select-none text-slate-400 sm:block">/</div>
          <p class="text-slate-500 hover:text-slate-600">Manage candidates</p>
        </nav>

       {
        Loading ? "Table Loading" :
        <>
           <div className='flex justify-center'>        
          <Button onClick={handleCreate} className="text-gray-300">Add New Candidate</Button>
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
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="party" label="Party">
              <Input />
            </Form.Item>
            <Form.Item name="platform" label="Platform">
              <Input />
            </Form.Item>
            <Form.Item name="slogan" label="Slogan">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="image">
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