import '../styles/globals.css'
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './context';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
  <ThirdwebProvider activeChain={'binance-testnet'}>
    <StateContextProvider>
      <Head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
     <Component {...pageProps} />
    </StateContextProvider>
  </ThirdwebProvider> 

  )
}

export default MyApp

