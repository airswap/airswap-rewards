import { useRef } from "react";
import { twJoin } from "tailwind-merge";
import { useAccount, useBalance, useNetwork } from "wagmi";
import { ContractTypes } from "../../config/ContractAddresses";
import { useContractAddresses } from "../../config/hooks/useContractAddress";
import { Button } from "../common/Button";
import StakingModal from "./StakingModal";
import { zeroAddress } from "viem";

export const StakeButton = ({}: {}) => {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const stakingModalRef = useRef<HTMLDialogElement | null>(null);

  const [stakedAst] = useContractAddresses([ContractTypes.AirSwapStaking], {
    defaultChainId: 1,
    useDefaultAsFallback: true,
  });

  const { data: sAstBalance } = useBalance({
    address: stakedAst.address,
  });

  const handleOpenStakingModal = () => {
    if (isConnected) {
      stakingModalRef.current && stakingModalRef.current.showModal();
    }
  };

  return (
    <>
      {isConnected ? (
        <>
          <div
            className={twJoin([
              "flex flex-row items-center gap-4 py-[0.7rem] pl-4",
              "rounded-full border border-border-dark ",
            ])}
          >
            <span className="hidden font-medium xs:flex">
              {`${sAstBalance?.formatted} sAST`}
            </span>
            <Button
              className="-my-3 -mr-5 bg-accent-blue font-bold uppercase"
              onClick={handleOpenStakingModal}
            >
              Stake
            </Button>
          </div>
          <StakingModal
            stakingModalRef={stakingModalRef}
            address={address || zeroAddress}
            chainId={chain?.id || 1}
            sAstBalance={sAstBalance?.formatted || "0"}
          />
        </>
      ) : null}
    </>
  );
};
