import classNames from "classnames";
import { AdjustmentContext } from "src";
import { NavItem } from "./NavigationButton";

const Toggle = ({ item }: { item: NavItem }) => {
  const adjustActorRef = AdjustmentContext.useActorRef();
  const { send } = adjustActorRef;

  const state = AdjustmentContext.useSelector((s) => s.context);

  return (
    <button
      onClick={() => send({ type: "TOGGLE", value: item.id })}
      className={classNames(
        "w-12 h-6 relative rounded-full transition-all duration-300",
        state.deselectedIds.has(item.id) ? "bg-gray-200" : "bg-green-400"
      )}
    >
      <span
        className={classNames(
          state.deselectedIds.has(item.id)
            ? "-translate-x-full"
            : "translate-x-[10%]",
          "h-full w-6 bg-gray-500 absolute top-0 transition-all rounded-full duration-300"
        )}
      />
    </button>
  );
};

export default Toggle;
