import React, { useContext, createContext, useEffect, useState } from 'react';
import { useAddress, useContract, useContractRead, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { contractAddress } from '../utils';
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(contractAddress());
  const { mutateAsync: vote } = useContractWrite(contract, 'vote');

  const address = useAddress();
  const connect = useMetamask();

  const searchByPosition = (pid) => {
    const { data } = useContractRead(contract, 'searchByPosition', [pid]);
    return data;
  }

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        searchByPosition,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);