import { AdjustmentContext } from "src";

const Toggle = () => {
  const adjustActorRef = AdjustmentContext.useActorRef();
  const { send } = adjustActorRef;

  const state = AdjustmentContext.useSelector((s) => s.context);

  return (
    <button
      onClick={() => send({ type: "TOGGLE", value: "2" })}
      className={state.toggledIDs.size > 0 ? "bg-green-400" : "bg-gray-200"}
    >
      Toggle
    </button>
  );
};

export default Toggle;
