import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ContractTypes } from "../../../config/ContractAddresses";
import { useContractAddresses } from "../../../config/hooks/useContractAddress";
import { stakingAbi } from "../../../contracts/stakingAbi";

export const useStakeAst = ({
  stakingAmount,
  needsApproval,
}: {
  stakingAmount: number;
  needsApproval: boolean;
}) => {
  const [AirSwapStaking] = useContractAddresses(
    [ContractTypes.AirSwapStaking],
    {
      defaultChainId: 1,
      useDefaultAsFallback: true,
    },
  );

  const { config: configStake } = usePrepareContractWrite({
    address: AirSwapStaking.address,
    abi: stakingAbi,
    functionName: "stake",
    args: [BigInt(+stakingAmount * Math.pow(10, 4))],
    staleTime: 300_000, // 5 minutes,
    cacheTime: Infinity,
    enabled: !needsApproval && stakingAmount > 0,
  });

  const {
    write: stake,
    data,
    reset: resetStake,
  } = useContractWrite(configStake);

  const { data: transactionReceiptStake, status: statusStake } =
    useWaitForTransaction({
      hash: data?.hash,
      staleTime: 300_000, // 5 minutes
    });

  return { stake, resetStake, transactionReceiptStake, statusStake };
};
