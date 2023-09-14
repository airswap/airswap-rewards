import { Dispatch } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { twJoin } from "tailwind-merge";
import AirSwapLogo from "../../assets/airswap-logo.svg";
import { useTokenBalances } from "../../hooks/useTokenBalances";
import { Button } from "../common/Button";
import { LineBreak } from "../common/LineBreak";
import { NumberInput } from "./NumberInput";
import { StakableBar } from "./StakableBar";
import { StakeOrUnstake, Status } from "./types/StakingTypes";

export const ManageStake = ({
  displayManageStake = true,
  formReturn,
  stakeOrUnstake,
  setStakeOrUnstake,
  statusApprove,
  statusStake,
  statusUnstake,
}: {
  displayManageStake: boolean;
  formReturn: UseFormReturn<FieldValues>;
  stakeOrUnstake: StakeOrUnstake;
  setStakeOrUnstake: Dispatch<StakeOrUnstake>;
  statusApprove: Status;
  statusStake: Status;
  statusUnstake: Status;
}) => {
  const {
    astBalanceFormatted: astBalance,
    ustakableSAstBalanceFormatted: unstakableSAstBalance,
  } = useTokenBalances();

  const isTransactionLoading =
    statusApprove === "loading" ||
    statusStake === "loading" ||
    statusUnstake === "loading";

  return (
    <div className={`${!displayManageStake && "hidden"}`}>
      <LineBreak className="relative -mx-6" />
      <StakableBar className="my-6" />
      <LineBreak className="relative mb-4 -mx-6" />
      <div className="font-lg pointer-cursor rounded-md font-semibold">
        <Button
          className={twJoin([
            "w-1/2 p-2",
            `${stakeOrUnstake === "stake" ? "bg-gray-800" : "text-gray-500"}`,
          ])}
          rounded="leftFalse"
          size="small"
          onClick={() => setStakeOrUnstake(StakeOrUnstake.STAKE)}
          disabled={isTransactionLoading}
        >
          Stake
        </Button>
        <Button
          className={twJoin(
            "w-1/2 p-2",
            `${stakeOrUnstake === "unstake" ? "bg-gray-800" : "text-gray-500"}`,
          )}
          rounded="rightFalse"
          size="small"
          color="transparent"
          onClick={() => setStakeOrUnstake(StakeOrUnstake.UNSTAKE)}
          disabled={isTransactionLoading}
        >
          Unstake
        </Button>
      </div>
      <div
        className={twJoin(
          "my-3 rounded px-4 py-3 text-xs leading-[18px]",
          "bg-gray-800 text-gray-400",
        )}
      >
        Stake AST prior to voting on proposals. The amount of tokens you stake
        determines the weight of your vote. Tokens unlock linearly over 20
        weeks.
      </div>
      <div className="flex items-center justify-between rounded border border-gray-800 bg-gray-950 px-5 py-3">
        <img src={AirSwapLogo} alt="AirSwap Logo" className="h-8 w-8" />
        <div className="flex flex-col items-end uppercase w-full overflow-hidden">
          <div>
            <NumberInput
              stakeOrUnstake={stakeOrUnstake}
              astBalance={+astBalance}
              unstakableSAstBalance={+unstakableSAstBalance}
              formReturn={formReturn}
              name="stakingAmount"
              isDisabled={!!isTransactionLoading}
            />
          </div>
          <span className="text-xs font-medium leading-4 text-gray-500">
            {stakeOrUnstake === StakeOrUnstake.STAKE
              ? astBalance
              : unstakableSAstBalance}{" "}
            {stakeOrUnstake === StakeOrUnstake.STAKE
              ? "stakable"
              : "unstakable"}
          </span>
        </div>
      </div>
    </div>
  );
};
