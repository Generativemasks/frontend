import { useContractCall } from "@usedapp/core";

// @ts-ignore
import { abis } from "@project/contracts";
import { BigNumber, ethers } from "ethers";

const useGetPrice = (): BigNumber | undefined => {
  const [price] = useContractCall({
    abi: new ethers.utils.Interface(abis.nft),
    address: process.env.REACT_APP_NFT_ADDRESS ?? "",
    method: "price",
    args: [],
  }) ?? [undefined];

  return price;
};

export default useGetPrice;
