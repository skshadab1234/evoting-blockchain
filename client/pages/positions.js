import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from './components/Header/Header'
import { useRouter } from 'next/router'
import moment from 'moment';
import Link from 'next/link';

const positions = ({ token }) => {
  const [userdata, setuserdata] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [logged, setlogged] = useState('')
  const [positionData, setpositionData] = useState([])
  const router = useRouter();

  // Checking user login or not 

  const CallUserData = async () => {
    try {
      const response = await fetch("/voter_profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
      )

      const data = await response.json();
      if (data.status != 200) {
        setlogged('err_logged')
        throw new Error(data.error);
      } else {
        setuserdata(data.data);
        setlogged('logged');

        try {
          const req = await fetch('/getAllPositions', {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            },
          })
            .then(reqData => reqData.json())
            .then(jsonData => { setpositionData(jsonData); setLoading(false) })
            .catch(error => console.error(error))

        } catch (error) {
          console.log(error);
        }
      }

    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    CallUserData()
  }, [])

  if (logged == '') {
    // router.push("/")
  }
  return (
    <div className='md:container md:mx-auto'>
      <Head>
        <title>Positions</title>
        <link rel="icon" type="image/x-icon" href='logo-sm.jpg' />
      </Head>
      <Header token={token} />
      <h2 class="mt-8 font-semibold text-sky-500">Positions List</h2>
      <p class="mt-4 text-3xl sm:text-4xl text-slate-200 font-extrabold tracking-tight dark:text-slate-50 ">Check out the Latest Positions List for the Upcoming Election!</p>
      <div class="not-prose my-12 grid grid-cols-1 gap-4 sm:grid-cols-4">
        {
          isLoading ? "Loading" :
            positionData.map((position, i) => {
              return <>
                <div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
                  <div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"></div>
                  <div class="relative overflow-hidden rounded-xl p-6">
                    <h2 class="mt-4 font-display text-base text-sky-500 text-2xl text-uppercase font-bold">
                      <Link href={'/votingBooth'}>
                        <a><span class="absolute -inset-px rounded-xl"></span>{position.name}</a>
                      </Link>
                    </h2>
                    <p class="mt-1 text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400">{position.candidates.length > 0 ? `A massive pool of ${position.candidates.length} faculty members are competing for the post.` : `${position.candidates.length} Candidate's for this position`}</p>
                    <hr className='border-slate-700 mt-4' />
                    <h3 className='mt-4 text-slate-400'>{moment(position.date+" "+position.time).format('LLL')}</h3>
                    <h3>{position.status == 1 ? <p className='text-green-400 font-medium mt-2'>Active</p> : <p className='text-rose-500 font-medium mt-2'>Blocked</p>}</h3>
                  </div>
                </div>
              </>
            })
        }
      </div>
    </div>
  )
}

export default positions


export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.voter_evotingLoginToken || '' } }
}