import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatAddress } from '../../utils'
import { useStateContext } from '../../context'
export default function Header({ token }) {
  const [userdata, setuserdata] = useState([])
  const [profileLoading, setProfileLoading] = useState(true)
  const [logged, setlogged] = useState('')
  const {address,connect} = useStateContext()
  const callData = async () => {
    try {
      const response = await fetch("/voter_profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
      )
      const data = await response.json();
      if (data.status != 200) {
        setlogged('err_logged')
        throw new Error(data.error);
      } else {
        setuserdata(data.data);
        setProfileLoading(false)
        setlogged('logged')
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callData()
  }, [])

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
      <header>
        <nav class="px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link href="/">
              <a class="flex items-center">
                <img src="../Logo.png" class="mr-3 h-[60px] sm:h-[60px]" alt="Candidate Recognization" />
              </a>
            </Link>
            <div class="flex items-center lg:order-2">
              {
                logged == 'logged' ? 
                                        address ? 
                                        <Link href={'/Profile'}>
                                          <button type='button' class="flex items-center mt-2 space-x-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600">
                                            <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
                                                <path d="M12 2a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm4 13h-8v-1h8zm3-4H9V9h10z"/>
                                            </svg>
                                            <div>
                                                <div class="font-bold md:text-md text-sm">Connected</div>
                                                <div class="md:text-sm text-xs">{formatAddress(address)}</div>
                                            </div>
                                        </button>
                                        </Link> 
                                        :     
                                        <button
                                            type='button'
                                            className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-slate-700/50 mt-2 text-center`}
                                            onClick={() => connect()}
                                        >
                                            Connect Wallet
                                        </button>
         
               : logged == 'err_logged' ? 'Something Wrong' : <Link href={"/Login"}>
                  <a class="glassmorphism text-white dark:text-white  font-medium rounded-lg text-sm px-4 
                        lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
                </Link>
              }
              <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul class="flex flex-col mt-4 text-white lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 font-bold text-[#fff] rounded bg-primary-700 lg:bg-transparent lg:text-[#7278B6] lg:p-0 dark:text-[#7278B6]" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 lg:hover:text-[#7278B6] lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">About us</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 lg:hover:text-[#7278B6] lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 lg:hover:text-[#7278B6] lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
                {
                  logged == 'logged' ? <li>
                    <a href="/Logout" class="block py-2 pr-4 pl-3 lg:hover:text-[#7278B6] lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Logout</a>
                  </li>
                    : ''
                }
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

