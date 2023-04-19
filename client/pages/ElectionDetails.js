import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Header from './components/Header/Header'
import { useRouter } from 'next/router'

const ElectionDetails = ({ token }) => {
    const router = useRouter()
    const { id } = router.query;
    const [data, setData] = useState([]);
    const [Positions, setPositions] = useState([]);
    const [filteredPositions, setfilteredPositions] = useState([]);
    const [Loading, setLoading] = useState(true);

    const callElection = async () => {
        try {
            const req = await fetch('/getAllElections', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
                .then(response => response.json())
                .then(jsonData => { 
                    setData(jsonData.filter((item) => item._id == id));
                        getPositions()
                })
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
        if(Positions.length == 0) {
            callElection();
            setfilteredPositions(Positions.filter((item,i) => (item._id == data[0].Positions[0][i].trim())));
        }
    }, [Positions])
        
        
    return (
        <>
            <Head>
                <title>Election Details Page</title>
                <link rel="icon" type="image/x-icon" href='logo-sm.jpg' />
            </Head>
            <Header token={token} />
            {
                Loading && Positions.length == 0 ? 'Loading' :
                <div className='md:container md:mx-auto p-5'>

                    <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
                        <div className="flex-1 flex-col">
                            <img src={data[0].electionImage} alt="campaign" className="w-full h-[450px] object-cover rounded-xl" />
                            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
                                <div className="absolute h-full bg-[#4acd8d]" style={{ width: "", maxWidth: '100%' }}>
                                </div>
                            </div>
                        </div>

                        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
                            <div className="flex flex-col items-center w-[150px]">
                                <h4 className="font-epilogue font-bold text-[18px] text-white p-3 bg-slate-800 rounded-t-[10px] w-full text-center truncate">{data[0].registrationDeadline}</h4>
                                <p className="font-epilogue font-normal text-[12px] text-[#808191] bg-slate-800/40 px-3 py-2 w-full rouned-b-[10px] text-center">{'Registration open till'}</p>
                            </div>

                            <div className="flex flex-col items-center w-[150px]">
                                <h4 className="font-epilogue font-bold text-[18px] text-white p-3 bg-slate-800 rounded-t-[10px] w-full text-center truncate">{data[0].date}</h4>
                                <p className="font-epilogue font-normal text-[12px] text-[#808191] bg-slate-800/40 px-3 py-2 w-full rouned-b-[10px] text-center">{'Election Date'}</p>
                            </div>
                            <div className="flex flex-col items-center w-[150px]">
                                
                            </div>

                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col gap-[30px]'>
                        <div className="mt-[60px] flex lg:flex-row flex-col gap-5 md:w-[50%] w-full">
                            <div className="flex-[2] flex flex-col gap-[40px]">
                                <div>
                                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

                                    <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                                        <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                                            <img src={'https://warehouse-camo.ingress.cmh1.psfhosted.org/316d9ff39a9be77349e505ec59ddf65818a720db/68747470733a2f2f6769746875622e636f6d2f74686972647765622d6465762f747970657363726970742d73646b2f626c6f622f6d61696e2f6c6f676f2e7376673f7261773d74727565'} alt="user" className="w-[60%] h-[60%] object-contain" />
                                        </div>
                                        <div>
                                            <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">{data[0].electionName}</h4>
                                            <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">Election Id <b>{data[0]._id}</b></p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Location</h4>
                                    <div className="mt-[20px]">
                                        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{data[0].pollingLocations}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Voter ID Requirements</h4>
                                    <div className="mt-[20px]">
                                        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{data[0].voterIDRequirements}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Early Voting Information</h4>
                                    <div className="mt-[20px]">
                                        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{data[0].earlyVotingInformation}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">absentee Voting Information</h4>
                                    <div className="mt-[20px]">
                                        <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{data[0].absenteeVotingInformation}</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className='md:mt-[60px]'>
                            <h1 className="font-epilogue font-semibold text-[18px] text-white uppercase">Available Positions</h1>
                            <div className='flex flex-col md:flex-row gap-1 md:gap-5 flex-wrap'>
                                {
                                    filteredPositions.map((pos,index) => {
                                        return <>      
                                                
                                                   <a  href={`/Vote?id=${pos._id}`}>
                                                    <div className="sm:w-[288px] mt-6 w-full rounded-[15px] bg-slate-700/30 cursor-pointer" title={pos?.name}>
                                                        <img src={pos?.image} alt="electionImage" className="w-full h-[158px] object-cover rounded-[15px]" />

                                                        <div className="flex flex-col p-4">

                                                            <div className="block">
                                                                <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{pos?.name}</h3>
                                                                <h3 className="font-epilogue text-[14px] text-gray-400 text-left leading-[26px] truncate">{pos?.description}</h3>
                                                            </div>

                                                            <div className="flex items-center gap-[12px] mt-2">


                                                            </div>
                                                        </div>
                                                    </div>
                                                   </a>
                                        </>
                                    })
                                    
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ElectionDetails

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.voter_evotingLoginToken || '' } }
}