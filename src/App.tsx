import "./App.css";
import AdjustButton from "./components/AdjustButton";
import NavigationButton from "./components/NavigationButton";
import CloseButton from "./components/CloseButton";
import { AdjustmentContext } from "src";

function App() {
  const type = AdjustmentContext.useSelector((s) => s.value);

  return (
    <div className="p-10 flex flex-col gap-2">
      {type === "adjust" && <CloseButton />}
      {type === "close" && <AdjustButton />}
      <NavigationButton />
    </div>
  );
}

export default App;
