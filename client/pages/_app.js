import '../styles/globals.css'
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { StateContextProvider } from './context';

function MyApp({ Component, pageProps }) {
  return (
  <ThirdwebProvider activeChain={'binance-testnet'}>
    <StateContextProvider>
     <Component {...pageProps} />
    </StateContextProvider>
  </ThirdwebProvider> 

  )
}

export default MyApp

