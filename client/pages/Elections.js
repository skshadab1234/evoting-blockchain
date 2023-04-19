import Link from 'next/link';
import React, { useState, useEffect } from 'react'

const Elections = () => {
    const [data, setData] = useState();
    const [Loading, setLoading] = useState(true);

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

        callElection();
    }, [])

    return (
        <div className='container mx-auto p-5'>
            <h1 className='mt-4 text-2xl sm:text-3xl text-gray-300 font-extrabold tracking-tight dark:text-gray-600 '>Upcoming Elections</h1>
            <p className='mt-2 text-sm text-gray-400 dark:text-gray-600'> list of all the upcoming elections that the user is eligible to vote in, along with the date and time. This can help users stay informed about when and where they need to vote.</p>

            <div className='flex md:gap-10 md:flex-row flex-col '>
            {
                Loading ? "Loading" : <>
                    {
                        data.map((election, index) => {
                            return <>
                                <Link href={`/ElectionDetails?id=${election._id}`}>
                                    <div className="sm:w-[288px] w-full rounded-[15px] bg-slate-800/80 mt-10 mb-5 cursor-pointer" onClick={"handleClick"} title={election.electionName}>
                                        <img src={election.electionImage} alt="electionImage" className="w-full h-[158px] object-cover rounded-[15px]" />

                                        <div className="flex flex-col p-4 ">

                                            <div className="block">
                                                <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{election.electionName}</h3>
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
                                        </div>
                                    </div>
                                </Link>
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