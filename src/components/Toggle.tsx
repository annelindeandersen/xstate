import classNames from "classnames";
import { AdjustmentContext } from "src";
import { NavItem } from "./NavigationButton";
import { useEffect } from "react";
import { updateDeselectItems } from "./../hooks/updateDeselectItems";

const Toggle = ({ item }: { item: NavItem }) => {
  const adjustActorRef = AdjustmentContext.useActorRef();
  const { send } = adjustActorRef;

  const state = AdjustmentContext.useSelector((s) => s.context);

  useEffect(() => {
    // console.log(state.deselectedIds);
  }, [state.deselectedIds]);

  const handleToggle = (id: string) => {
    // send({ type: "TOGGLE", value: id });

    if (state.deselectedIds.has(id)) {
    }

    const IDs = updateDeselectItems(id, state);
    if (IDs.length === 0) {
      return;
    }

    send({
      type: "TOGGLE",
      value: IDs.join(","),
    });
  };

  return (
    <button
      onClick={() => handleToggle(item.id)}
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
