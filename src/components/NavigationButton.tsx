import classNames from "classnames";
import Toggle from "./Toggle";
import { AdjustmentContext } from "src";

export interface NavItem {
  id: string;
  parentId?: string;
  childrenIds: string[];
  type: string;
}

const NavigationButton = ({ item }: { item: any }) => {
  const type = AdjustmentContext.useSelector((s) => s.value);

  // console.log(item);

  const navItem = {
    id: item.id,
    parentId: item.parentId,
    childrenIds: item.childrenIds,
    type: item.type,
  };

  return (
    <div
      className={classNames(
        { "bg-blue-500": item.type === "course" },
        { "bg-blue-300": item.type === "chapter" },
        {
          "bg-blue-100":
            item.type === "section-group" || item.type === "question-group",
        },
        "flex border p-3 gap-2"
      )}
    >
      {type === "adjust" && <Toggle item={navItem} />}
      <button className="flex justify-between w-full">
        <span>{item.heading}</span>
        <b>{item.type}</b>
      </button>
    </div>
  );
};

export default NavigationButton;
