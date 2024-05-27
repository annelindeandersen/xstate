import { AdjustmentContext } from "src";

const SaveButton = () => {
  const adjustActorRef = AdjustmentContext.useActorRef();
  const { send } = adjustActorRef;

  return (
    <button
      onClick={() => {
        send({ type: "SAVE" });
      }}
      className="rounded-full border py-2 px-5 w-fit"
    >
      Save
    </button>
  );
};

export default SaveButton;
