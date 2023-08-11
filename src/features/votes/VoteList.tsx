import { Modal } from "../common/Modal";
import { ClaimFloat } from "./ClaimFloat";
import { ClaimForm } from "./ClaimForm";
import { VoteListItem } from "./VoteListItem";
import { useGroupedProposals } from "./hooks/useGroupedProposals";
import { useEpochSelectionStore } from "./store/useEpochSelectionStore";

export const VoteList = ({}: {}) => {
  const { data: proposalGroups } = useGroupedProposals();
  const [showClaimModal, setShowClaimModal] = useEpochSelectionStore(
    (state) => [state.showClaimModal, state.setShowClaimModal],
  );

  // Note that all proposals have the same start and end, so if the first one
  // in the group is live, they all are.
  const liveProposalGroups = proposalGroups?.filter(
    (proposals) => proposals[0].end * 1000 > Date.now(),
  );

  const pastProposalGroups = proposalGroups?.filter(
    (proposals) => proposals[0].end * 1000 < Date.now(),
  );

  return (
    <div className="flex flex-col gap-4 relative flex-1 overflow-hidden">
      {/* Active Votes */}
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-xs font-bold uppercase">Live votes</h3>
        <div className="h-px flex-1 bg-border-dark"></div>
      </div>
      {liveProposalGroups?.map((group) => (
        <VoteListItem proposalGroup={group} key={group[0].id} />
      ))}

      {/* Inactive Votes */}
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-xs font-bold uppercase">Past Epochs</h3>
        <div className="h-px flex-1 bg-border-dark"></div>
      </div>
      <div className="flex flex-col gap-9">
        {pastProposalGroups?.map((group) => (
          <VoteListItem proposalGroup={group} key={group[0].id} />
        ))}
      </div>

      {/* Claim Float */}
      <ClaimFloat onClaimClicked={() => setShowClaimModal(true)} />

      {/* Claim modal. */}
      {showClaimModal && (
        <Modal onCloseRequest={() => setShowClaimModal(false)}>
          <ClaimForm />
        </Modal>
      )}
    </div>
  );
};
