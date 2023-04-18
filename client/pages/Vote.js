import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import { useRouter } from 'next/router'
import { useStateContext } from './context'
import { useContractWrite, useContract, Web3Button } from "@thirdweb-dev/react";
import { contractAddress } from './utils'

const Vote = ({ token }) => {
    const [candidateData, setcandidateData] = useState([])
    const [filterCandidates, setfilterCandidates] = useState([])
    const [Positions, setPositions] = useState([])
    const [filteredPositions, setfilteredPositions] = useState([])
    const [Loading, setLoading] = useState(true)
    const { vote } = useStateContext();
    const [form, setForm] = useState({
        candidateId: '',
        positionId: '',
    });
    const router = useRouter()
    const { id } = router.query;
    const candidateFunction = async () => {
        try {
            const req = await fetch('/getAllCandidate', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(reqData => reqData.json())
                .then(jsonData => { setcandidateData(jsonData); })
                .catch(error => console.error(error))

        } catch (error) {
            console.log(error);
        }
    }

    const getPositions = async () => {
        try {
            const req = await fetch('/getAllPositions', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(response => response.json())
                .then(jsonData => {
                    setPositions(jsonData.filter((item, i) => (item._id == id)));
                    setLoading(false);
                })
                .catch(error => console.error(error))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (candidateData.length == 0) {
            candidateFunction();
            getPositions()
        }

        if (Positions.length == 0 || filterCandidates.length == 0) {
            const candidates = Positions.map(item => item.candidates);
            candidates.length > 0 ?
                setfilterCandidates(candidateData.filter((item) => candidates[0].includes(item._id))) : ''
        }
        // console.log(Positions, candidateData);
    }, [Positions, filterCandidates])

    console.log(filterCandidates);
    const { contract } = useContract(contractAddress());
    const { mutateAsync, isLoading, error } = useContractWrite(
        contract,
        "vote",
    );
    return (
        <div className='container mx-auto'>
            <Header token={token} />
            {
                Loading ? <p className='text-gray-200'> Loading <span className='animate-bounce'> .... </span></p> :
                    <>
                        <div className="relative max-w-5xl mx-auto mt-10 mb-20">
                            <h1 className="text-slate-100 font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
                                Cast Your Vote for the Next Generation
                            </h1>
                            <p className='text-xl text-gray-200 text-center mt-4 tracking-[2px] uppercase' >
                                Make Your Voice Heard in the Upcoming Election
                            </p>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 '>
                            
                            {
                                filterCandidates.length > 0 || filterCandidates != undefined ?
                                    filterCandidates.map((item, index) => {
                                        return <>
                                            <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                                                <div className='flex justify-center p-2'>
                                                    <img className="w-48 h-48 object-cover  rounded-full" src={item.image} alt="" />
                                                </div>
                                                <div className="w-full pt-6 md:p-8 text-center md:text-left space-y-4">
                                                    <figcaption className="font-medium">
                                                        <div className="text-sky-500 dark:text-sky-400">
                                                            {item.name}
                                                        </div>
                                                        <div className="text-slate-700 dark:text-slate-500">
                                                            {item.slogan}
                                                        </div>
                                                    </figcaption>
                                                    <div className='md:flex justify-between flex-wrap'>
                                                        <div className='flex-1'>
                                                            <Link href="">
                                                                <a className='text-sm text-gray-400 hover:text-gray-800 p-2'>Meet the Candidate</a>
                                                            </Link>
                                                            <Link href="">
                                                                <a className='text-sm text-gray-400 hover:text-gray-800 p-2'>Watch Video</a>
                                                            </Link>
                                                        </div>

                                                        {/* Vote Button  */}
                                                        <div className=''>
                                                            {
                                                                error ? "Already Voted" :
                                                                    <Web3Button
                                                                        className='bg-slate-700 text-white important'
                                                                        contractAddress={contractAddress()}
                                                                        // Calls the "setName" function on your smart contract with "My Name" as the first argument
                                                                        action={() => mutateAsync({ args: [item._id, id] })}
                                                                    >
                                                                        Vote
                                                                    </Web3Button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </figure>
                                        </>
                                    }) : 'Loading....'
                            }
                        </div>
                    </>
            }
        </div>
    )
}

export default Vote


export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.voter_evotingLoginToken || '' } }
}