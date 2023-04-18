export const formatAddress = (address) => {
    const formattedAddress = `${address?.substring(0, 5)}......${address?.substring(address?.length-2)}`;
    return formattedAddress;

  }

export const contractAddress = () =>  {
  return '0xc11EecD4e39375e1477388A17Feac0822a012e86'
}