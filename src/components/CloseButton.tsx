import { AdjustmentContext } from "src";

const CloseButton = () => {
  const adjustActorRef = AdjustmentContext.useActorRef();
  const { send } = adjustActorRef;

  return (
    <button
      onClick={() => {
        send({ type: "CLOSE" });
      }}
      className="rounded-full border py-2 px-5 w-fit"
    >
      Close
    </button>
  );
};

export default CloseButton;
