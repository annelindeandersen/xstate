import { AdjustmentContext } from "src";

const AdjustButton = () => {
  const adjustActorRef = AdjustmentContext.useActorRef();
  const { send } = adjustActorRef;

  return (
    <button
      onClick={() => {
        send({ type: "ADJUST" });
      }}
      className="rounded-full border py-2 px-5 w-fit"
    >
      Adjust
    </button>
  );
};

export default AdjustButton;
