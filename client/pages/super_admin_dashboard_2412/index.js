import React, { useState, useEffect, useCallback } from 'react'
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
import { useStateContext } from '../context';
import Select from "react-select";

const index = () => {
  const router = useRouter();
  const [election_manager_data, setelection_manager_data] = useState([])
  const [PositionData, setPositionData] = useState([])
  const [FilteredPosition, setFilteredPosition] = useState([])
  const [ElectionData, setElectionData] = useState([])
  const [getAllCandidate, setgetAllCandidate] = useState([])
  const [lastToken, setlastToken] = useState([])
  const [DashboardData, setDashboardData] = useState([])
  const [CandidateCount, setCandidateCount] = useState(0)
  const [VoterCount, setVoterCount] = useState(0)
  const [fetchGraph, setfetchGraph] = useState(false)
  const [votedData, setvotedData] = useState([])
  const [isLoading, setisLoading] = useState(true)
  const { searchByPosition } = useStateContext()
  const [stats, setstats] = useState([])
  const [selectedOption, setSelectedOption] = useState(null);
  const [Pid, setPid] = useState(''); // define a state variable
  const [graphLoader, setGraphLaoder] = useState(false)
  const [loaderCount, setLoaderCount] = useState(0)
  const [graphButtonStatus, setGraphButtonStatus] = useState('Fetching Graph');
  const [buttonStatus, setbuttonStatus] = useState({});
  const { posId } = router.query;

  const callPosition = async () => {
    try {
      const req = await fetch('/getAllPositions', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(jsonData => { setPositionData(jsonData) })
        .catch(error => { console.log(error); })

    } catch (error) {
      console.log(error);
    }
  }

  const callElections = async () => {
    try {
      const req = await fetch('/getAllElections', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(jsonData => {
          setElectionData(jsonData)
        })
        .catch(error => { console.log(error); })

    } catch (error) {
      console.log(error);
    }
  }

  const callCandidate = async () => {
    try {
      const req = await fetch('/getAllCandidate', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then(response => response.json())
        .then(jsonData => { setgetAllCandidate(jsonData); })
        .catch(error => console.error(error))

    } catch (error) {
      console.log(error);
    }
  }

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
        if (typeof window !== 'undefined' && data.length == 0) {
          router.push('./super_admin_dashboard_2412/Login')
        }
        let last = data.tokens[data.tokens.length - 1];
        setlastToken(last)
        setfetchGraph(true)
        setisLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const options = ElectionData.map((election) => ({
    label: `${election.electionName} - ${election.date}`,
    value: election._id
  }))

  const handleChange = (selectedOption) => {
    setvotedData([])
    if (selectedOption !== null && selectedOption !== undefined) {
      setSelectedOption(selectedOption)
      router.push(`super_admin_dashboard_2412?posId=${selectedOption.value}`)
    }
  };

  useEffect(() => {
    callPosition()
    callElections()
    callData()
    callCandidate()
  }, [DashboardData, FilteredPosition, selectedOption])


  useEffect(() => {
    setDashboardData(ElectionData.filter((el) => el._id == posId));
    setCandidateCount(PositionData.map(item => item.candidates.length).reduce((acc, val) => acc + val, 0))
    setVoterCount(PositionData.map(item => item.Voters.length).reduce((acc, val) => acc + val, 0))
  }, [posId])

  useEffect(() => {
    if (DashboardData.length > 0) {
      setFilteredPosition(PositionData.filter((item) => (DashboardData[0].Positions[0]?.includes(item._id))));
      setstats([
        { id: 1, stat_name: 'No. of Positions', href: "", stats_value: DashboardData.length > 0 ? DashboardData[0].Positions[0]?.length : 0, haveChart: false },
        { id: 2, stat_name: 'No. of Candidates', href: "", stats_value: CandidateCount, haveChart: true },
        { id: 3, stat_name: 'Total Voters', href: "", stats_value: VoterCount, haveChart: true },
      ])
    }
  }, [DashboardData])

  const searc = searchByPosition(Pid)
  const populateGraphData = (posData) => {
    setLoaderCount(loaderCount + 1)
    console.log(loaderCount);
    setPid(posData._id)
    setvotedData(FilteredPosition.map(position => {
      return position.candidates.map(candidate => {
        const matchingCandidates = getAllCandidate.filter(item => item._id == candidate);
        const names = matchingCandidates.map(matchingCandidate => matchingCandidate.name);
        const partyName = matchingCandidates.map(matchingCandidate => matchingCandidate.party);
        const candId = matchingCandidates.map(matchingCandidate => matchingCandidate._id);
        const votesCount = searc?.filter(item => (item.votedFor == candidate))
        const v_Counts = votesCount?.reduce((acc, item) => {
          const votedFor = item.votedFor;
          acc[votedFor] = (acc[votedFor] || 0) + 1;
          return acc;
        }, {});
        return {
          name: names[0] + " - " + partyName[0],
          votes: loaderCount > 0 ? candId[0] == candidate && posData._id == position._id && candId[0] != undefined && v_Counts != undefined 
                 ? v_Counts[candId[0]] : 0 
                 : 0
        }
      });
    }))

    setGraphLaoder(true)

    if (loaderCount == 1) {
      document.getElementById(`graph${posData._id}`).classList.remove('hidden')
      setbuttonStatus(prevState => {
        return {
          ...prevState,
          [posData._id]: 'View Graph'
        };
      });
      setLoaderCount(0)
    }else{
      setbuttonStatus(prevState => {
        return {
          ...prevState,
          [posData._id]: 'Fetch Graph'
        };
      });
      
    }

  }
  return (
    <>
      <AdminHeader />
      {
        isLoading ? '' : <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className='flex justify-between'>
              <h1 className='text-4xl text-gray-300 font-bold mb-5 ml-2'>Dashboard</h1>
              <div className="w-64">
                <Select
                  value={selectedOption}
                  onChange={handleChange}
                  options={options}
                  placeholder="Select an option"
                  isSearchable={true}
                />
              </div>
            </div>
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
              {
                fetchGraph ?
                  FilteredPosition.length > 0 ?
                    FilteredPosition.map((pos, i) => {
                      return <>
                        {
                          votedData == undefined ?
                            'Loading....' :
                            <div className="space-y-5 mt-2">
                              <div className="p-3 dark_mode_secondary shadow rounded-lg">
                                <div className='flex flex-wrap w-100 justify-between mb-10'>
                                  <h3 className="text-3xl text-gray-500 font-medium p-3 mb-4">{pos.name} - {pos._id}</h3>
                                  <button
                                    onClick={() => populateGraphData(pos)}
                                    id={`pos${pos._id}`}
                                    className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white m-2 px-4 rounded-[10px] text-center ${buttonStatus[pos._id] == 'View Graph' ? 'bg-green-500' : 'bg-primary-700/50'} `}>
                                      {buttonStatus[pos._id] || 'Fetch'}  
                                    </button>

                                </div>
                                <div className='hidden BarGraph' id={`graph${pos._id}`}>
                                  {
                                    <>
                                      <BarChart
                                        width={1200}
                                        height={400}
                                        data={votedData[i]}
                                        margin={{
                                          top: 5,
                                          right: 30,
                                          left: 20,
                                          bottom: 5,
                                        }}
                                      >
                                        <CartesianGrid strokeDasharray="31 3" horizontal={true} vertical={true} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="votes" fill="#82ca9d" />
                                      </BarChart>
                                    </>
                                  }
                                </div>

                                {/* <button id={pos._id} onClick={() => handlePid(pos._id)}>Search with PID 2</button> */}
                              </div>
                            </div>
                        }
                      </>
                    })
                    : "Loading" : ''
              }


            </div>


          </div>
        </main >
      }
    </>

  )
}

export default index

