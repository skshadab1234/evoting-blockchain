import React, { useContext, createContext, useEffect, useState } from 'react';
import { useAddress, useContract, useContractRead ,  useMetamask } from '@thirdweb-dev/react';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    
    const address = useAddress();
    const connect = useMetamask();  
  
    return (
        <StateContext.Provider
            value={{
                address,
                connect
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);