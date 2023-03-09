import React from 'react'
import Link from 'next/link'

const Homepage = () => {
  return (
    <>
    <div class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6 z-[99]">
        <div class="mt-4 md:mt-0">
            <p className='py-3 text-[#ddd]'>Right-to-vote ✅</p>
            <h2 class="mb-4 text-6xl tracking-tight font-medium text-white dark:text-white">Empower Your <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#93A9F5] to-[#7278B6]'> Voice. </span> Cast Your Vote.
            </h2>
            <p class="mb-6 font-light text-[#ddd] md:text-sm dark:text-[#ddd]">
              Join the movement of student-led change. Exercise your right to vote in the upcoming College Politics Election. Make your voice heard and help shape the future of your campus community. Cast your vote now and be a part of the change you wish to see.
            </p>
            <Link href="/positions">
              <a  class="glassmorphism inline-flex items-center text-white hover:bg-[#7858A6]-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900">
                  Choose your Ballot
                  <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
            </Link>
            <a href="#" class="inline-flex items-center text-white  font-medium text-sm px-5 py-2.5 text-center mx-5">
                How it Works?
            </a>
        </div>
        <img class="w-full dark:hidden" src="../undraw_voting_nvu7.png" alt="herosection image" />
        <img class="w-full hidden dark:block" src="../undraw_voting_nvu7.png" alt="herosection image" />
      </div>
    </>
  )
}

export default Homepage 