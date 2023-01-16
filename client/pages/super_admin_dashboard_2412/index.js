import React, { useState, useEffect } from 'react'
import AdminHeader from './Header/AdminHeader'
import {
  ComposedChart,
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  {
    name: "Page A",
    uv: 4000,

  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  }
];


const index = () => {
  const [election_manager_data, setelection_manager_data] = useState([])
  const [lastToken, setlastToken] = useState([])
  const [stats, setstats] = useState([
    { id: 1, stat_name: 'No. of Positions', href: "", stats_value: 200, haveChart: false },
    { id: 2, stat_name: 'No. of Candidates', href: "", stats_value: "100K", haveChart: true },
    { id: 3, stat_name: 'Total Voters', href: "", stats_value: "500k", haveChart: true },
    { id: 4, stat_name: 'Voters Voted', href: "", stats_value: "215k", haveChart: true },

  ])
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    callData()
  }, [])


  return (
    <>
      <AdminHeader />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <h1 className='text-4xl text-gray-300 font-bold mb-5 ml-2'>Dashboard</h1>
          <div className="grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-4 p-2">
            {
              stats.map((item) => {
                return <>
                  <div key={item.id} className='dark_mode_secondary shadow text-center text-white rounded p-5'>
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
              <div class="p-3 dark_mode_secondary shadow rounded-lg">
                <h3 class="text-3xl border-b border-gray-500 text-gray-500 font-medium p-3 mb-4">Technical Head </h3>



              </div>
            </div>

          </div>

          {/* Recently Joined User/Candidate  */}
          <div className='mt-4'>
            <h1 className='text-2xl text-gray-200 font-medium mb-5 ml-2'>Recently Joined</h1>

            <div className="grid grid-rows-2 md:grid-rows-1 grid-flow-col gap-4 p-2">
              <div>
                <figure class="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800">
                  <img class="w-24 h-10 md:w-26 md:h-auto md:rounded-none rounded-full mx-auto" src="https://tailwindcss.com/_next/static/media/sarah-dayan.a620c98f.jpg" alt="" width="100" height="200" />
                  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <figcaption class="font-medium">
                      <div class="text-sky-500 dark:text-sky-400">
                        Sarah Dayan
                      </div>
                      <div class="text-slate-700 dark:text-slate-500">
                        Staff Engineer, Algolia
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
              <div>
                <figure class="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800">
                  <img class="w-24 h-10 md:w-26 md:h-auto md:rounded-none rounded-full mx-auto" src="https://tailwindcss.com/_next/static/media/sarah-dayan.a620c98f.jpg" alt="" width="100" height="200" />
                  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <figcaption class="font-medium">
                      <div class="text-sky-500 dark:text-sky-400">
                        Sarah Dayan
                      </div>
                      <div class="text-slate-700 dark:text-slate-500">
                        Staff Engineer, Algolia
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
              <div>
                <figure class="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800">
                  <img class="w-24 h-10 md:w-26 md:h-auto md:rounded-none rounded-full mx-auto" src="https://tailwindcss.com/_next/static/media/sarah-dayan.a620c98f.jpg" alt="" width="100" height="200" />
                  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <figcaption class="font-medium">
                      <div class="text-sky-500 dark:text-sky-400">
                        Sarah Dayan
                      </div>
                      <div class="text-slate-700 dark:text-slate-500">
                        Staff Engineer, Algolia
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
              <div>
                <figure class="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800">
                  <img class="w-24 h-10 md:w-26 md:h-auto md:rounded-none rounded-full mx-auto" src="https://tailwindcss.com/_next/static/media/sarah-dayan.a620c98f.jpg" alt="" width="100" height="200" />
                  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <figcaption class="font-medium">
                      <div class="text-sky-500 dark:text-sky-400">
                        Sarah Dayan
                      </div>
                      <div class="text-slate-700 dark:text-slate-500">
                        Staff Engineer, Algolia
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
              <div>
                <figure class="md:flex rounded-xl p-8 md:p-0 dark:bg-slate-800">
                  <img class="w-24 h-10 md:w-26 md:h-auto md:rounded-none rounded-full mx-auto" src="https://tailwindcss.com/_next/static/media/sarah-dayan.a620c98f.jpg" alt="" width="100" height="200" />
                  <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                    <figcaption class="font-medium">
                      <div class="text-sky-500 dark:text-sky-400">
                        Sarah Dayan
                      </div>
                      <div class="text-slate-700 dark:text-slate-500">
                        Staff Engineer, Algolia
                      </div>
                    </figcaption>
                  </div>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>

  )
}

export default index

