import { useGroupClaimStatus } from "./hooks/useGroupClaimStatus";
import { Proposal } from "./hooks/useGroupedProposals";
import { getEpochName } from "./utils/getEpochName";
import { Accordion } from "../common/Accordion";
import { twJoin } from "tailwind-merge";
import { CheckMark } from "../common/icons/CheckMark";
import { MdClose, MdOpenInNew } from "react-icons/md";
import { format } from "@greypixel_/nicenumbers";
import { Checkbox } from "../common/Checkbox";

export const PastEpochCard = ({
  proposalGroup,
  proposalGroupState,
}: {
  proposalGroup: Proposal[];
  proposalGroupState: ReturnType<typeof useGroupClaimStatus>;
}) => {
  const proposalGroupTitle = getEpochName(proposalGroup[0]) + " Epoch";
  const itemId = getEpochName(proposalGroup[0]).replace(" ", "-").toLowerCase();

  const SNAPSHOT_WEB = import.meta.env.VITE_SNAPSHOT_WEB;
  const SNAPSHOT_SPACE = import.meta.env.VITE_SNAPSHOT_SPACE;

  const pointsPill = (
    <div
      className={twJoin([
        "rounded-full px-4 py-1 text-xs font-bold uppercase leading-6",
        "flex flex-row items-center gap-2 ring-1 ring-border-dark",
        proposalGroupState.hasUserClaimed && "text-font-secondary",
      ])}
    >
      {format(proposalGroupState.pointsEarned, {
        tokenDecimals: 0,
        significantFigures: 3,
        minDecimalPlaces: 0,
      })}
      &nbsp; Points
    </div>
  );

  const trigger = (
    <div className="flex w-full items-center justify-between pr-4 font-semibold">
      <div className="flex items-center">
        <div className="align-center -mt-1 ml-0.5 mr-4 items-center ">
          <Checkbox />
        </div>
        {proposalGroupTitle}
      </div>
      {pointsPill}
    </div>
  );

  const content = proposalGroup.map((proposal, i) => (
    <div
      className={twJoin([
        "grid grid-cols-[auto,1fr,auto,auto]",
        "items-center border border-border-dark",
      ])}
      key={proposal.id}
    >
      <div className="justify-self-center p-4">
        {proposalGroupState.votedForProposal[i] ? (
          <span className="text-accent-lightgreen">
            <CheckMark size={20} />
          </span>
        ) : (
          <span className="text-accent-lightred">
            <MdClose size={20} />
          </span>
        )}
      </div>
      <div className="text-font-secondary text-sm font-medium">
        {proposal.title}
      </div>
      <div></div>
      <div className="self-end justify-self-center p-5">
        <a
          href={`${SNAPSHOT_WEB}#/${SNAPSHOT_SPACE}/proposal/${proposal.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <MdOpenInNew size={16} />
        </a>
      </div>
    </div>
  ));

  return (
    <Accordion
      rootStyles="w-full items-center border border-border-dark rounded"
      trigger={trigger}
      itemId={itemId}
      content={content}
    />
  );
};
