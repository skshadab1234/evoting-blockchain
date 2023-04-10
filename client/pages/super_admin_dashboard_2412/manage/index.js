import Link from 'next/link'
import React, { useState} from 'react'
import AdminHeader from '../Header/AdminHeader'

const index = () => {
    const [stats, setstats] = useState([
        { id: 3, stat_name: 'Voters', href: "", visit: "voters", haveChart: true },
        { id: 2, stat_name: 'Elections', href: "", visit: "Elections", haveChart: true },
        { id: 2, stat_name: 'Positions', href: "", visit: "positions", haveChart: true },
        { id: 1, stat_name: 'Candidates', href: "", visit: 'candidates', haveChart: false },
        { id: 4, stat_name: 'Votes', href: "", visit: "", haveChart: true },
    
      ])
    
    const AdminUrl = "/super_admin_dashboard_2412"
  return (
      <main>
        <AdminHeader />
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className='text-4xl text-gray-300 font-bold mb-5 ml-2'>Manage</h1>
          <div className="grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-4 p-2">
            {
              stats.map((item, index) => {
                return <>
                  <div key={index} className='dark_mode_secondary shadow text-center text-white rounded p-5'>
                      <Link href={`${AdminUrl}/manage/${item.visit}`}>
                        <h1 className='md:text-3xl text-2xl text-gray-500 font-bold cursor-pointer'>{item.stat_name}</h1>
                      </Link>
                  </div></>
              })
            }
          </div>

        </div>
      </main>
  )
}

export default index