import Toggle from "./Toggle";
import { AdjustmentContext } from "src";

const NavigationButton = () => {
  const type = AdjustmentContext.useSelector((s) => s.value);

  return (
    <div className="flex border p-3 gap-2">
      {type === "adjust" && <Toggle />}
      <button className="">I'm a navigation link button</button>
    </div>
  );
};

export default NavigationButton;
