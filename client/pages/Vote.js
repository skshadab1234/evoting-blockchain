import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import { useRouter } from 'next/router'
const Vote = ({ token }) => {
    const [candidateData, setcandidateData] = useState([])
    const [Positions, setPositions] = useState([])
    const [filteredPositions, setfilteredPositions] = useState([])
    const [Loading, setLoading] = useState(true)
    const router = useRouter()
    const {id} = router.query;
    const candidateFunction = async () => {
        try {
            const req = await fetch('/getAllCandidate', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(reqData => reqData.json())
                .then(jsonData => { setcandidateData(jsonData);  })
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
                   setPositions(jsonData);
                   setLoading(false);
                })
                .catch(error => console.error(error))
                
            } catch (error) {
                console.log(error);
            }
        }
        useEffect(() => {
            if(candidateData.length == 0) {
                candidateFunction();
                getPositions()
            }else{
                setfilteredPositions((Positions.filter((item,i) => (item._id == id))));
            }
        }, [Positions])

        const candidates = filteredPositions.map(item => item.candidates);
        candidateData.filter((item, index) => console.log(item._id , candidates[0][index]))
    
    return (
        <div className='container mx-auto'>
            <Header token={token} />
            {
                Loading ? <p className='text-gray-200'> Loading <span className='animate-bounce'> ....</span></p> :
                    <>
                    <div class="relative max-w-5xl mx-auto mt-10 mb-20">
                        <h1 class="text-slate-100 font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
                            Cast Your Vote for the Next President
                        </h1>
                        <p className='text-xl text-gray-200 text-center mt-4 tracking-[2px] uppercase' >
                            Make Your Voice Heard in the Upcoming Election
                        </p>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-1 gap-4 '>
                        {
                            filteredPositions.map((item,index) => {
                                return <>        
                                    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                                        <img class="w-48 h-48 object-cover  md:rounded-none rounded-full" src={item.image} alt="" />
                                        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                                            <blockquote>
                                                <p class="text-lg font-medium">
                                                    {item.platform}
                                                </p>
                                            </blockquote>
                                            <figcaption class="font-medium">
                                                <div class="text-sky-500 dark:text-sky-400">
                                                    {item.name}
                                                </div>
                                                <div class="text-slate-700 dark:text-slate-500">
                                                    {item.slogan}
                                                </div>
                                            </figcaption>
                                            <div className='md:flex justify-between'>
                                                <div>
                                                    <Link href="">
                                                        <a className='text-sm text-gray-400 hover:text-gray-800 p-2'>Meet the Candidate</a>
                                                    </Link>
                                                    <Link href="">
                                                        <a className='text-sm text-gray-400 hover:text-gray-800 p-2'>Watch Video</a>
                                                    </Link>
                                                </div>

                                                {/* Vote Button  */}
                                                <div>
                                                    <button className='px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm'>Vote</button>
                                                </div>
                                            </div>
                                        </div>
                                    </figure>
                                </>
                            })
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