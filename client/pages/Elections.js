import React from 'react'

const Elections = () => {
    return (
        <div className='container mx-auto'>
            <h1 className='mt-4 text-2xl sm:text-3xl text-gray-300 font-extrabold tracking-tight dark:text-gray-600 '>Upcoming Elections</h1>
            <p className='mt-2 text-sm text-gray-400 dark:text-gray-600'> list of all the upcoming elections that the user is eligible to vote in, along with the date and time. This can help users stay informed about when and where they need to vote.</p>

            <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] mt-10 mb-5 cursor-pointer" onClick={"handleClick"} title={"electionName"}>
                <img src={"https://www.shutterstock.com/image-photo/voting-box-election-image-260nw-764908306.jpg"} alt="electionImage" className="w-full h-[158px] object-cover rounded-[15px]" />

                <div className="flex flex-col p-4 ">

                    <div className="block">
                        <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{"electionName"}</h3>
                    </div>

                    <div className="flex items-center gap-[12px] mt-2">
                        <div className="w-3/6 items-center gap-[12px]">
                            <p className="font-epilogue font-normal text-[12px] text-[#808191] truncate">Start:</p>
                            <p className="font-epilogue font-normal text-[12px] text-white">{''}</p>
                        </div>
                        <div className="w-3/6 items-center gap-[12px]">
                            <p className="font-epilogue font-normal text-[12px] text-[#808191] truncate">Deadline:</p>
                            <p className="font-epilogue font-normal text-[12px] text-white">{''}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Elections