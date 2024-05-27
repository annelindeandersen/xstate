import Toggle from "./Toggle";
import { AdjustmentContext } from "src";

const NavigationButton = ({ item }: { item: any }) => {
  const type = AdjustmentContext.useSelector((s) => s.value);

  return (
    <div className="flex border p-3 gap-2">
      {type === "adjust" && <Toggle id={item.id} />}
      <button>{item.title}</button>
    </div>
  );
};

export default NavigationButton;
