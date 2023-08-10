import { useRef } from "react";
import { useAccount, useNetwork } from "wagmi";
import { twJoin } from "tailwind-merge";
import { ContractTypes } from "../../config/ContractAddresses";
import { useContractAddresses } from "../../config/hooks/useContractAddress";
import { Button } from "../common/Button";
import StakingModal from "./StakingModal";

export const StakeButton = ({}: {}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [stakedAst] = useContractAddresses([ContractTypes.AirSwapStaking], {
    defaultChainId: 1,
    useDefaultAsFallback: true,
  });

  const stakingModalRef = useRef<HTMLDialogElement | null>(null);

  const handleOpenStakingModal = () => {
    if (isConnected) {
      stakingModalRef.current && stakingModalRef.current.showModal();
    }
  };

  return (
    <>
      <div className={twJoin("flex flex-row items-center gap-4 py-3")}>
        <Button
          className="-my-3 -mr-5 bg-accent-blue font-bold uppercase"
          onClick={handleOpenStakingModal}
        >
          Stake
        </Button>
      </div>

      {isConnected && address && (
        <StakingModal
          stakingModalRef={stakingModalRef}
          address={address}
          chainId={chain?.id || 1}
        />
      )}
    </>
  );
};
