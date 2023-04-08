export const formatAddress = (address) => {
    const formattedAddress = `${address.substring(0, 5)}......${address.substring(address.length-2)}`;
    return formattedAddress;
  }