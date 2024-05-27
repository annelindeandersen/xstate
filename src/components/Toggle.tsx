import classNames from "classnames";
import { AdjustmentContext } from "src";

const Toggle = ({ id }: { id: string }) => {
  const adjustActorRef = AdjustmentContext.useActorRef();
  const { send } = adjustActorRef;

  const state = AdjustmentContext.useSelector((s) => s.context);

  return (
    <button
      onClick={() => send({ type: "TOGGLE", value: id })}
      className={classNames(
        "w-12 h-6 relative rounded-full transition-all duration-300",
        state.selectedIds.has(id) ? "bg-gray-200" : "bg-green-400"
      )}
    >
      <span
        className={classNames(
          state.selectedIds.has(id) ? "-translate-x-full" : "translate-x-[10%]",
          "h-full w-6 bg-gray-500 absolute top-0 transition-all rounded-full duration-300"
        )}
      />
    </button>
  );
};

export default Toggle;
