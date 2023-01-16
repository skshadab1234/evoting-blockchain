import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Head from 'next/head'
import Link from 'next/link'

const Login = ({ token }) => {
    const router = useRouter();
    const [loggingLoad, setloggingLoad] = useState(false)
    const [inputsvalues, setinputsvalues] = useState({
        email: "",
        password: "",
    })

    const [userdata, setuserdata] = useState({})

    const styles =
    {
        heading: "font-bold md:text-[64px] md:leading-[70px] text-[34px] leading-[46px] tracking-[-0.5%] text-center mt-3",
        label: "block text-white-700 text-sm font-bold mb-2",
        input: "w-full shadow h-12  appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline dark_bg  border-2 border-[#b673f8]"
    }

    const LoginInput = [
        // { id: "year_sem", label: "Sem/Year", name: "year_sem", type: "text" },
        { id: "email", label: "Email", name: "email", type: "email" },
        { id: "password", label: "Password", name: "password", type: "password" },
    ]

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setinputsvalues({ ...inputsvalues, [name]: value })
    }

    const LoginUser = async (e) => {
        e.preventDefault()
        const { email, password } = inputsvalues
        if (inputsvalues.email == "" || inputsvalues.password == "") {
            Swal.fire(
                {
                    title: "<div className='text-red-500 text-xl md:text-2xl'>All Fields are required</div>",
                    icon: "error"
                }
            )
        } else {
            setloggingLoad(true)
            const res = await fetch("/admin_login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            })

            const data = await res.json();
            setloggingLoad(false)
            if (data.message == "Logged Successfully") {
                let timerInterval
                Swal.fire({
                    title: '<p className="text-green-500">Logged Successfully</p>',
                    icon: 'success',
                    timer: 3000,
                    timerProgressBar: true,
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            router.push("./")
                        }, 2500)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                })

            } else {
                Swal.fire(
                    {
                        title: "<div className='text-red-500 text-xl md:text-2xl'>Invalid Credentials</div>",
                        icon: "error"
                    }
                )
            }
        }
    }

    // Checking user login or not 

    const CallUserData = async () => {
        try {
            const response = await fetch("/admin_getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
            )
            const data = await response.json();
            setuserdata(data);
        } catch (error) {
            console.log(error);
        }
    }

    
    useEffect(() => {
        CallUserData();
    }, [])

    

    return (
        
        <div className='md:container md:mx-auto relative top-[120px]'>
            <Head>
                <title>Login </title>
                <link rel="icon" type="image/x-icon" href='../Logo-icon.png' />
            </Head>
            {token != '' ? 
                <><h5 className='text-gray-500'>Logged in as {userdata?.firstname+" "+userdata?.middlename+" "+userdata?.lastname}</h5>
                <Link href="./">  
                    <a className='text-blue-500 text-sm'> &#8592;Back to Dashboard</a>
                </Link></>
            : 
            
            <div className='m-auto w-4/5 md:w-2/6   rounded-lg text-white '>
                <div className='flex justify-center'>
                    <img src='../Logo.png' width="150px" className="logoImage"/>
                </div>
                {/* <h1 className={styles.heading + " bg-clip-text text-transparent bg-gradient-to-r from-[#4ca5ff] to-[#b673f8]"}>LOGIN</h1> */}
                {/* Login Input Fields */}
                <form method='post' onSubmit={LoginUser} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {
                        LoginInput.map((input, i) => {
                            var disabled = ''
                            if (input.id == "year_sem") var disabled = 'disabled';

                            return <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={input.id}>
                                        {input.label}
                                    </label>
                                    <input 
                                        disabled={disabled}
                                        value={inputsvalues.name}
                                        onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id={input.id} name={input.name} type={input.type}
                                    placeholder={input.label}
                                    />
                                </div>
                                    {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                            </>
                        })
                    }
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {
                                    loggingLoad ? <>
                                        <div role="status">
                                            <svg className="inline mr-2 w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </> : "Login"
                                }

                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            </div>
}
        </div>
    )
}

export default Login



export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.evotingLoginToken || '' } }
}