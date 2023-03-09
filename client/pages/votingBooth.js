import React, { useEffect, useState } from 'react'
import Header from './components/Header/Header'

const votingBooth = ({ token }) => {
    const [candidateData, setcandidateData] = useState([])
    const [Loading, setLoading] = useState(true)
    const candidateFunction = async () => {
        try {
            const req = await fetch('/getAllCandidate', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(reqData => reqData.json())
                .then(jsonData => { setcandidateData(jsonData); setLoading(false) })
                .catch(error => console.error(error))

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (candidateData.length == 0) candidateFunction();
    }, [])

    console.log(candidateData);
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
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                        {
                            candidateData.map((item,index) => {
                                return <>        
                                    <figure class="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
                                        <img class="w-48 h-40 object-contain  md:rounded-none rounded-full" src={item.image} alt="" />
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

export default votingBooth


export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.voter_evotingLoginToken || '' } }
}