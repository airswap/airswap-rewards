import { Dispatch, FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { twJoin } from "tailwind-merge";
import AirSwapLogo from "../../../assets/airswap-logo.svg";
import { useTokenBalances } from "../../../hooks/useTokenBalances";
import { Button } from "../../common/Button";
import LineBreak from "../../common/LineBreak";
import { StakeOrUnstake } from "../types/StakingTypes";
import { StakableBar } from "./StakableBar";

interface ManageStakeProps {
  register: UseFormRegister<{ stakingAmount: number }>;
  setValue: UseFormSetValue<{ stakingAmount: number }>;
  stakeOrUnstake: StakeOrUnstake;
  setStakeOrUnstake: Dispatch<StakeOrUnstake>;
}

const ManageStake: FC<ManageStakeProps> = ({
  register,
  setValue,
  stakeOrUnstake,
  setStakeOrUnstake,
}) => {
  const { astBalanceFormatted: astBalance } = useTokenBalances();

  return (
    <>
      <LineBreak />
      <StakableBar />
      <LineBreak />
      <div className="font-lg pointer-cursor mt-6 rounded-md font-semibold">
        <Button
          className={twJoin(
            "rounded-none rounded-l-md",
            "w-1/2 text-sm uppercase",
            `${stakeOrUnstake === "stake" && "bg-bg-darkShaded"}`,
          )}
          onClick={() => setStakeOrUnstake(StakeOrUnstake.STAKE)}
        >
          Stake
        </Button>
        <Button
          className={twJoin(
            "rounded-none rounded-r-md",
            "w-1/2 text-sm uppercase",
            `${stakeOrUnstake === "unstake" && "bg-bg-darkShaded"}`,
          )}
          onClick={() => setStakeOrUnstake(StakeOrUnstake.UNSTAKE)}
        >
          Unstake
        </Button>
      </div>
      <div
        className={twJoin(
          "my-3 rounded px-4 py-3 text-sm",
          "dark:bg-bg-darkShaded",
        )}
      >
        Stake AST prior to voting on proposals. The amount of tokens you stake
        determines the weight of your vote. Tokens unlock linearly over 20
        weeks.
      </div>
      <div className="flex items-center justify-between rounded border border-border-darkShaded bg-black px-4 py-2">
        <img src={AirSwapLogo} alt="AirSwap Logo" className="h-8 w-8 " />
        <div className="flex flex-col text-right  uppercase">
          <div>
            <input
              placeholder="0"
              {...register("stakingAmount", {
                required: true,
                min: 0,
                max: astBalance,
                validate: (val: number) => val > 0,
                onChange: (e) => setValue("stakingAmount", e.target.value),
              })}
              className={twJoin(
                "items-right w-1/5 bg-black text-right text-white",
              )}
            />
          </div>
          <span className="text-xs">{astBalance} stakable</span>
        </div>
      </div>
    </>
  );
};

export default ManageStake;
