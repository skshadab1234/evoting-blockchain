import React from 'react'
import Homepage from "./Homepage"
import Header from './components/Header/Header'
import Head from 'next/head'
const index = ({ token }) => {
  return (
    <div className='md:container md:mx-auto h-screen' >
      <Head>
        <title>Right to vote</title>
        <link rel="icon" type="image/x-icon" href='Logo-icon.png' />
        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.5.4/dist/flowbite.min.css" />
        <script src="https://unpkg.com/flowbite@1.5.4/dist/flowbite.js"></script>
      </Head>
      <div className='hidden md:block'>
        <div className="ellipse-1"></div>
        <div className="ellipse-2 animate-pulse"></div>
        <div className="ellipse-3 animate-pulse"></div>
        <div className="ellipse-4"></div>
      </div>
      <Header token={token} />
      <Homepage />
     
    </div>
  )
}

export default index

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.jwtoken || '' } }
}