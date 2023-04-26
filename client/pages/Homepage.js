import React from 'react'
import Elections from './Elections'
const Homepage = () => {

  const features = [
    {
      "icon": "fas fa-lock",
      "title": "Secure Voting",
      "description": "Our i-voting system uses blockchain technology to ensure secure and tamper-proof voting."
    },
    {
      "icon": "fas fa-globe",
      "title": "Global Access",
      "description": "Our system allows voters from anywhere in the world to participate in the voting process."
    },
    {
      "icon": "fas fa-check",
      "title": "Easy Verification",
      "description": "With our system, you can easily verify the authenticity of your vote and ensure that it has been counted."
    },
    {
      "icon": "fas fa-thumbs-up",
      "title": "User-Friendly",
      "description": "Our i-voting platform is designed to be user-friendly and easy to use, even for first-time voters."
    },
    {
      "icon": "fas fa-users",
      "title": "Transparent Results",
      "description": "Our system ensures that voting results are transparent and publicly visible, ensuring a fair and honest election."
    },
    {
      "icon": "fas fa-clock",
      "title": "Real-time Results",
      "description": "Our system provides real-time results so that voters can track the progress of the election and get instant updates on the outcome."
    },
    {
      "icon": "fas fa-shield-alt",
      "title": "Advanced Security",
      "description": "Our i-voting system employs advanced security measures such as two-factor authentication and encryption to ensure the integrity of the voting process."
    },
    {
      "icon": "fas fa-mobile-alt",
      "title": "Mobile Access",
      "description": "Our i-voting platform is mobile-friendly, allowing voters to participate in the election from anywhere, at any time, using their mobile devices."
    }
  ]


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
        <section class="py-16">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center">
              <h2 class="text-3xl font-bold text-gray-200">Key Features</h2>
            </div>
            <div class="mt-10">
              <div className='flex flex-wrap flex-row gap-5 md:gap-16 justify-center'>
                {
                  features.map((item, i) => {
                    return <>
                      <div className='w-full md:w-3/12 bg-slate-800/30 p-5 rounded'>
                        <div class="flex items-center justify-center mb-4 md:mb-0 md:mr-4">
                          <i class={`${item.icon} text-green-300 text-3xl mr-4`}></i>
                          <h3 class="text-xl font-bold text-gray-400">{item.title}</h3>
                        </div>
                        <p className='text-center mt-2 text-gray-500'>
                          {item.description}
                        </p>
                      </div>
                    </>
                  })
                }
              </div>
            </div>
          </div>
        </section>



        <Elections />
      </div >
    </>
  )
}

export default Homepage 