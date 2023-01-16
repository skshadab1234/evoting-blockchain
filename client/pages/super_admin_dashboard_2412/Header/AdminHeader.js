import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AdminHeader = () => {
  const [Title, setTitle] = useState('Wait a moment')
  const [AdminData, setAdminData] = useState([])
  const [loggedStatus, setloggedStatus] = useState("")
  const router = useRouter();
  const { pathname } = router;

  // Fetching AdminData 

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }
  const FetchAdmin = async () => {
    try {
      const response = await fetch("/admin_getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
      )

      if (response.status === 200) {
        // Successful response
        const data = await response.json();
        // Do something with the data
        setAdminData(data);
        setloggedStatus("Logged")
      } else {
        // Error occurred
        console.error('Error:', response.status);
        setloggedStatus("error_Logged")
        // router.push(AdminUrl + "/Login")
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchAdmin()
  }, [AdminData, loggedStatus])

  const AdminUrl = "/super_admin_dashboard_2412"

  const [navigation, setnavigation] = useState([
    { id: 1, name: 'Dashboard', href: `${AdminUrl}`, current: false },
    { id: 2, name: 'Manage', href: '#', current: false },
    { id: 3, name: 'Clubs and Organizations', href: `${AdminUrl}/clubs`, current: false },
    { id: 4, name: 'Calendar', href: '#', current: false },
    { id: 5, name: 'News Feed', href: '#', current: false },
    { id: 6, name: 'Feedback', href: '#', current: false },
  ])

  const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: `${AdminUrl}/Logout` },
  ]

  // Change current active navigation 
  function handleChange(id, newValue) {
    const newItems = navigation.map(item => {
      if (item.id === id) {
        return { ...item, current: newValue };
      }
      return item;
    });

    setnavigation(newItems);
  }

  // Title changing logic 
  useEffect(() => {
    if (`${AdminUrl}` == pathname) {
      setTitle("Dashboard")
      handleChange(1, true)
    } else if (`${AdminUrl}/clubs` == pathname) {
      setTitle("Clubs and Organizations")
      handleChange(3, true)
    }
  }, [Title])

  
  return (

    <div className="min-h-full border-b border-slate-800">
      <Head>
        <title>{Title}</title>
      </Head>
      <Disclosure as="nav" className="dark_mode">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <div className="flex h-20 items-center justify-between ">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-16 w-16"
                      src="../Admin-Logo.png"
                      alt="CR Admin Logo"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link href={(loggedStatus == 'error_Logged' ? `${AdminUrl}/Login` : item.href)}>
                          <a
                            key={item.name}
                            className={classNames(
                              item.current
                                ? 'dark_mode_secondary text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                                >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {/* Profile dropdown */}
                {(loggedStatus == 'error_Logged') ? <Link href={`${AdminUrl}/Login`}><a>Login</a></Link> : <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={`../assets/admin/profile${AdminData.profile}`} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <><div className="flex items-center p-3">
                            <div className="flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={`../assets/admin/profile${AdminData.profile}`} alt="" />
                            </div>
                            <div className="ml-3 w-4/6 ">
                              <div className="text-ellipsis overflow-hidden text-base font-medium leading-none text-gray-600">{AdminData.firstname + " " + AdminData.lastname}</div>
                              <div className="text-ellipsis overflow-hidden text-sm font-medium leading-none text-gray-400">{AdminData.email}</div>
                            </div>
                          </div>
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link href={item.href}>
                                  <a
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                </Link>
                              )}
                            </Menu.Item>
                          
                          ))}
                          </>
                        </Menu.Items>
                      </Transition>
                    </Menu> }
                    
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-items-end  p-2">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      // <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      <img src="https://img.icons8.com/pastel-glyph/512/null/cancel--v1.png" className="w-8 invert" />
                    ) : (
                      // <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      <img src="https://img.icons8.com/ios/100/null/menu-rounded.png" className="w-8 invert" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">

                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">

                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src={`../assets/admin/profile${AdminData.profile}`} alt="" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">{AdminData.firstname+" "+AdminData.lastname}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{AdminData.email}</div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>


    </div>
  )
}

export default AdminHeader