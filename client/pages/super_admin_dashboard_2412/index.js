import React, { useState, useEffect } from 'react'
import AdminHeader from './Header/AdminHeader'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter();
  const [election_manager_data, setelection_manager_data] = useState([])
  const [lastToken, setlastToken] = useState([])
  const [fetchGraph, setfetchGraph] = useState(false)
  const [votedData, setvotedData] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const [stats, setstats] = useState([
    { id: 1, stat_name: 'No. of Positions', href: "", stats_value: 200, haveChart: false },
    { id: 2, stat_name: 'No. of Candidates', href: "", stats_value: "100K", haveChart: true },
    { id: 3, stat_name: 'Total Voters', href: "", stats_value: "500k", haveChart: true },
    { id: 4, stat_name: 'Voters Voted', href: "", stats_value: "215k", haveChart: true },

  ])

  useEffect(() => {
    setvotedData([
      {name: "Shadab",votes: 321},
      {name: "Iqra",votes: 33},
      {name: "Rahul",votes: 44},
      {name: "Sakshi",votes: 1},
      {name: "Harshita",votes: 3},
    ])
  }, [])
  
  const callData = async () => {
    try {
      const response = await fetch("/admin_profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
      )
      const data = await response.json();
      if (!data.status === 200) {
        throw new Error(data.error);
      } else {
        setelection_manager_data(data);
        let last = data.tokens[data.tokens.length - 1];
        setlastToken(last)
        setfetchGraph(true)
        setisLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callData()
  }, [])

  if (typeof window !== 'undefined' && election_manager_data.length == 0) {
    router.push('./super_admin_dashboard_2412/Login')
    }

  return (
    <>
      <AdminHeader />
      {
        isLoading ? '' : <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className='text-4xl text-gray-300 font-bold mb-5 ml-2'>Dashboard</h1>
          <div className="grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-4 p-2">
            {
              stats.map((item, index) => {
                return <>
                  <div key={index} className='dark_mode_secondary shadow text-center text-white rounded p-5'>
                    <h1 className='md:text-5xl text-2xl text-gray-500 font-bold'>
                      {item.stats_value}
                    </h1>
                    <p className='text-sm mt-3 text-gray-200'>
                      {item.stat_name}
                    </p>
                  </div></>
              })
            }
          </div>

          <div className='mt-4'>
            <h1 className='text-2xl text-gray-200 font-medium mb-5 ml-2'>Voters Tally</h1>
            <div class="space-y-5">
              <div className="p-3 dark_mode_secondary shadow rounded-lg">
                <h3 className="text-3xl border-b border-gray-500 text-gray-500 font-medium p-3 mb-4">Technical Head </h3>
              {
                fetchGraph ?  <BarChart
                width={1200}
                height={400}
                data={votedData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="31 3" horizontal={true} vertical={true}  />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="votes" fill="#82ca9d" />
              </BarChart> : "Loading"
              }
                
              
              </div>
            </div>

          </div>

          
        </div>
      </main>
      }
    </>

  )
}

export default index

