import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Head from 'next/head'
import { useStateContext } from './context'
import { formatAddress } from './utils'

const Login = ({ token }) => {
    const router = useRouter();
    const [loggingLoad, setloggingLoad] = useState(false)
    const [inputsvalues, setinputsvalues] = useState({
        voterId: "",
        password: "",
    })
    const { address, connect } = useStateContext();
    const [userdata, setuserdata] = useState({})
    
    const [Prevent, setPrevent] = useState(false)

    const styles =
    {
        heading: "font-bold md:text-[64px] md:leading-[70px] text-[34px] leading-[46px] tracking-[-0.5%] text-center mt-3",
        label: "block text-gray-700 text-sm font-bold mb-2",
        input: "w-full shadow h-12  appearance-none rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline dark_bg  border-2 border-[#b673f8]"
    }

    const LoginInput = [
        // { id: "year_sem", label: "Sem/Year", name: "year_sem", type: "text" },
        { id: "voterId", label: "Voter Id", name: "voterId", type: "text", class: "bg-[#0F172A] w-80 mt-2 rounded-br-2xl rounded-tl-2xl appearance-none  relative block  px-3 py-2 border  placeholder-white text-white rounded-t-md mb-2  border-[#16F6E9] " },
        { id: "password", label: "Password", name: "password", type: "password", class: "bg-[#0F172A] w-80 mt-2 rounded-br-2xl rounded-tl-2xl appearance-none  relative block  px-3 py-2 border  placeholder-white text-white rounded-t-md mb-2  border-[#16F6E9] " },
    ]

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setinputsvalues({ ...inputsvalues, [name]: value })
    }

    const LoginUser = async (e) => {
        e.preventDefault()
        const { voterId, password } = inputsvalues
        if (inputsvalues.voterId == "" || inputsvalues.password == "") {
            Swal.fire(
                {
                    title: "<div className='text-red-500 text-xl md:text-2xl'>All Fields are required</div>",
                    icon: "error"
                }
            )
        } 
        else if(address == undefined) {
            Swal.fire(
                {
                    title: "<div className='text-red-500 text-xl md:text-2xl'>Connect your Metamask Wallet</div>",
                    icon: "error"
                }
            )
        }
        else {
            setloggingLoad(true)
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    voterId, password
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
                            router.push("/")
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
            const response = await fetch("/voter_profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            }
            )

            const data = await response.json();
            setuserdata(data);
            setPrevent(true)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        CallUserData()
    }, [])

    if (Prevent) {
        router.push("/")
    }

    return (
        <div className='md:container md:mx-auto'>
            <Head>
                <title>Login - CESA -CSMIT</title>
                <link rel="icon" type="image/x-icon" href='logo-sm.jpg' />
            </Head>
            <div className='w-full mx-auto h-screen flex justify-center items-center'>
                <div className='w-[400px] bg-[#1E293B] h-[500px] border-2 border-[#16F6E9] rounded-br-3xl rounded-tl-3xl  '>
                    <div className='flex justify-center h-14 p5-'>
                        <div className='h-24 w-24 text-center  flex justify-center items-center rounded-full relative bottom-10 bg-slate-800  border border-[#16F6E9] '>
                            <img src="Logo.png" alt="" className='w-20  relative bottom-15' />
                        </div>
                    </div>
                    <h2 className='mt-4 text-center text-3xl font-medium text-gray-980  text-gray-200 underline-offset-4 afterLine relative' >Voter Login</h2>

                    <form method='post' onSubmit={LoginUser} className=''>
                        <div className='flex justify-center mt-10 '>
                            <div>
                                {
                                    LoginInput.map((input, i) => {
                                        return <>
                                            <div className="mb-4">
                                                <label className={"text-[#16F6C9] text-sm"} htmlFor={input.id}>
                                                    {input.label}
                                                </label>
                                                <input
                                                    value={inputsvalues.name}
                                                    onChange={handleChange}
                                                    className={input.class} id={input.id} name={input.name} type={input.type} />
                                            </div>
                                        </>
                                    })
                                }

                                <div className='flex justify-center'>
                                    {
                                        address ? 
                                        <>
                                          <button type='button' className="flex items-center mt-2 space-x-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm4 13h-8v-1h8zm3-4H9V9h10z"/>
                                            </svg>
                                            <div>
                                                <div className="font-bold">Connected</div>
                                                <div className="text-sm">{formatAddress(address)}</div>
                                            </div>
                                        </button>

                                        </>
                                        :     
                                        <button
                                            type='button'
                                            className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-slate-700/50 mt-2 text-center`}
                                            onClick={() => connect()}
                                        >
                                            Connect Wallet
                                        </button>
         
                                    }
                                </div>                                
                            </div>

                        </div>

                           {
                            loggingLoad ? '' :  <button type='submit' className='w-full'>
                            <div className='flex justify-center bg-[#16F6C9] mt-10 rounded-md p-2 ml-5 mr-5'>
                                    Login
                            </div>
                        </button>

                           }
                    </form>

                </div>

            </div>
        </div>
    )
}

export default Login



export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.jwtoken || '' } }
}