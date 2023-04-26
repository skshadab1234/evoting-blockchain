import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { useStateContext } from './context';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
const Elections = () => {
    const [data, setData] = useState();
    const [Loading, setLoading] = useState(true);
    const [Modal, setModal] = useState(false);
    const [ResultModal, setResultModal] = useState(false);
    const [selectedElection, setselectedElection] = useState([]);
    const [PositionData, setPositionData] = useState([]);
    const [getAllCandidate, setgetAllCandidate] = useState([]);
    const [FilteredPosition, setFilteredPosition] = useState([]);
    const [PositionId, setPositionId] = useState('');
    const { searchByPosition } = useStateContext()
    const [loaderCount, setLoaderCount] = useState(0)
    const [flag, setflag] = useState(0)
    const [votedData, setvotedData] = useState([])
    useEffect(() => {
        const callElection = async () => {
            try {
                const req = await fetch('/getAllElections', {
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

        callPosition();
        callElection();
        callCandidate()
    }, [])


    const handleElection = (ele) => {
        setModal(true);
        setselectedElection(ele)
        setFilteredPosition(PositionData.filter((item) => (ele.Positions[0]?.includes(item._id))));
    }


    const searc = searchByPosition(PositionId._id)
    const handlePosition = (pos, i) => {
        setLoaderCount(loaderCount + 1)
        setPositionId(pos)
        setflag(i)
        
        if (loaderCount > 1) {
            setLoaderCount(0)
            setResultModal(true)
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
                        votes: candId[0] == candidate && pos._id == position._id && candId[0] != undefined && v_Counts != undefined
                            ? v_Counts[candId[0]] : 0

                    }
                });
            }));
        }


    }

    
    return (
        <div className='container mx-auto p-5'>
            <h1 className='mt-4 text-2xl sm:text-3xl text-gray-300 font-extrabold tracking-tight dark:text-gray-600 '>Upcoming Elections</h1>
            <p className='mt-2 text-sm text-gray-400 dark:text-gray-600'> list of all the upcoming elections that the user is eligible to vote in, along with the date and time. This can help users stay informed about when and where they need to vote.</p>

            <div className='flex gap-5 sm:gap-10 sm:flex-row flex-col flex-wrap '>
                {
                    Loading ? "Loading" : <>
                        {
                            data.map((election, index) => {
                                let targetDate = new Date(election.date);
                                let today = new Date();
                                let status = false
                                today.getDate() === targetDate.getDate() && today.getMonth() === targetDate.getMonth() && today.getFullYear() === targetDate.getFullYear()
                                    ? status = true
                                    : ''
                                return <>

                                    <div className={`sm:w-[288px] w-full rounded-[15px] bg-slate-800/80 mt-10 mb-5  ${!status ? 'opacity-25 cursor-not-allowed important' : 'cursor-pointer'}`} title={election.electionName}>
                                        <img src={election.electionImage} alt="electionImage" className="w-full h-[200px] max-h-[512px] md:object-cover  rounded-[15px] " />

                                        <div className="flex flex-col p-4 ">

                                            <div className="block">
                                                {
                                                    status ?
                                                        <Link href={`/ElectionDetails?id=${election._id}`}>
                                                            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{election.electionName}</h3>
                                                        </Link>
                                                        :
                                                        <>
                                                            <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{election.electionName}</h3>
                                                        </>
                                                }
                                            </div>

                                            <div className="flex items-center gap-[12px] mt-2">
                                                <div className="w-2/6 items-center gap-[12px]">
                                                    <p className="font-epilogue font-normal text-[12px] text-[#808191] truncate">Start:</p>
                                                    <p className="font-epilogue font-normal text-[12px] text-white">{election.date}</p>
                                                </div>
                                                <div className="w-4/6 items-center gap-[12px]">
                                                    <p className="font-epilogue font-normal text-[12px] text-[#808191] truncate">Registration Deadline:</p>
                                                    <p className="font-epilogue font-normal text-[12px] text-white">{election.registrationDeadline}</p>
                                                </div>

                                            </div>

                                            <div className='relative'>
                                                {
                                                    status &&
                                                    <button onClick={() => {handleElection(election)}} class="animate-pulse w-full bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4">
                                                        <i class="fas fa-circle-notch fa-spin mr-2"></i>
                                                        View Live Results
                                                    </button>
                                                }
                                            </div>

                                            {
                                                Modal ? <div
                                                    className={`${Modal ? '' : 'hidden'
                                                        } fixed z-10 inset-0 overflow-y-auto`}
                                                >
                                                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                        <div
                                                            className="fixed inset-0 transition-opacity"
                                                            aria-hidden="true"
                                                        >
                                                            <div className="absolute inset-0 bg-black opacity-25"></div>
                                                        </div>

                                                        <span
                                                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                                            aria-hidden="true"
                                                        >
                                                            &#8203;
                                                        </span>

                                                        <div
                                                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                                            role="dialog"
                                                            aria-modal="true"
                                                            aria-labelledby="modal-headline"
                                                        >
                                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                                <div className="sm:flex sm:items-start">
                                                                    <div
                                                                        onClick={() => setModal(false)}
                                                                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                                                                    >
                                                                        <svg
                                                                            className="h-6 w-6 text-blue-600"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M15 19l-7-7 7-7"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                                        <h3
                                                                            className="text-lg leading-6 font-medium text-gray-900"
                                                                            id="modal-headline"
                                                                        >
                                                                            {selectedElection.electionName} - {selectedElection._id}
                                                                        </h3>
                                                                        <div className="mt-5">
                                                                            <h2 className='font-bold'>Positions</h2>
                                                                            <div className='flex flex-wrap flex-row gap-5'>
                                                                                {
                                                                                    FilteredPosition.length > 0 ?
                                                                                        FilteredPosition.map((item, i) => {
                                                                                            return <>
                                                                                                <div onClick={() => handlePosition(item, i)} className='border p-5 bg-gray-200 hover:bg-primary-400 mt-2'>
                                                                                                    {item.name}
                                                                                                </div>
                                                                                            </>
                                                                                        })
                                                                                        :
                                                                                        "No Records Found!..."
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    : ''
                                            }

                                            {/* Graph Data Display  */}
                                            {
                                                ResultModal ? <div
                                                    className={`${ResultModal ? '' : 'hidden'
                                                        } fixed z-10 inset-0 overflow-y-auto`}
                                                >
                                                    <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                                        <div
                                                            className="fixed inset-0 transition-opacity"
                                                            aria-hidden="true"
                                                        >
                                                            <div className="absolute inset-0 bg-black opacity-25"></div>
                                                        </div>

                                                        <span
                                                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                                            aria-hidden="true"
                                                        >
                                                            &#8203;
                                                        </span>

                                                        <div
                                                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
                                                            role="dialog"
                                                            aria-modal="true"
                                                            aria-labelledby="modal-headline"
                                                        >
                                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                                <div className="sm:flex sm:items-start w-full">
                                                                    <div
                                                                        onClick={() => { setResultModal(false); }}
                                                                        className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10"
                                                                    >
                                                                        <svg
                                                                            className="h-6 w-6 text-blue-600"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                            aria-hidden="true"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M15 19l-7-7 7-7"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                                                       <div className='flex justify-between'>
                                                                       <h3
                                                                            className="text-lg leading-6 font-medium text-gray-900 mt-2"
                                                                            id="modal-headline"
                                                                        >
                                                                            {PositionId.name}
                                                                        </h3>
                                                                        <button onClick={() => handlePosition(PositionId, flag)}>Refresh</button>
                                                                       </div>
                                                                        <div className="mt-10">
                                                                            <>
                                                                                <BarChart
                                                                                    width={1200}
                                                                                    height={400}
                                                                                    data={votedData[flag]}
                                                                                    layout="vertical"
                                                                                >
                                                                                    <CartesianGrid strokeDasharray="131 3" horizontal={false} vertical={true} />
                                                                                    <XAxis type="number" />
                                                                                    <YAxis dataKey="name" type="category" />
                                                                                    <Tooltip />
                                                                                    <Legend />
                                                                                    <Bar dataKey="votes" fill="#82ca9d" />
                                                                                </BarChart>

                                                                            </>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                    : ''
                                            }
                                        </div>
                                    </div>



                                </>
                            })
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Elections