import "./App.css";
import AdjustButton from "./components/AdjustButton";
import NavigationButton from "./components/NavigationButton";
import CloseButton from "./components/CloseButton";
import { AdjustmentContext } from "src";
import SaveButton from "./components/SaveButton";
import { navigationData } from "./flatData";
import { useEffect } from "react";

function App() {
  const navigationActorRef = AdjustmentContext.useActorRef();
  const { send } = navigationActorRef;

  const type = AdjustmentContext.useSelector((s) => s.value);
  const navigationContext = AdjustmentContext.useSelector(
    (s) => s.context.navigationMenu
  );

  useEffect(() => {
    if (JSON.stringify(navigationContext) === "{}") {
      send({ type: "SET_MENU", value: navigationData });
    }
  }, []);

  return (
    <div className="py-10 px-32 flex flex-col gap-5">
      <select className="p-2">
        <option>Saved lists</option>
      </select>
      <hr />
      <div className="flex justify-between">
        {type === "close" && <AdjustButton />}
        {type !== "close" && <SaveButton />}
        {type === "adjust" && <CloseButton />}
      </div>
      <ul className="flex flex-col gap-2">
        {Object.keys(navigationData).map((item) => (
          <li key={navigationData[item].id}>
            <NavigationButton item={navigationData[item]} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
