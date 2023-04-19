import React from 'react'
import Link from 'next/link'
import Elections from './Elections'
const Homepage = () => {
  return (
    <>
    <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6 z-[99]">
        <div className="mt-4 md:mt-0">
            <p className='py-3 text-[#ddd]'>Right-to-vote ✅</p>
            <h2 className="mb-4 text-6xl tracking-tight font-medium text-white dark:text-white">Empower Your <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#93A9F5] to-[#7278B6]'> Voice. </span> Cast Your Vote.
            </h2>
            <p className="mb-6 font-light text-[#ddd] md:text-sm dark:text-[#ddd]">
              Join the movement of student-led change. Exercise your right to vote in the upcoming College Politics Election. Make your voice heard and help shape the future of your campus community. Cast your vote now and be a part of the change you wish to see.
            </p>
           
        </div>
        <img className="w-full dark:hidden" src="../undraw_voting_nvu7.png" alt="herosection image" />
        <img className="w-full hidden dark:block" src="../undraw_voting_nvu7.png" alt="herosection image" />
      </div>

      <div className='mb-10'>
        <Elections />
      </div>
    </>
  )
}

export default Homepage 