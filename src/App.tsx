import "./App.css";
import AdjustButton from "./components/AdjustButton";
import NavigationButton from "./components/NavigationButton";
import CloseButton from "./components/CloseButton";
import { AdjustmentContext } from "src";
import SaveButton from "./components/SaveButton";
import data from "./data.json";

// const data = [
//   { id: 1, title: "I'm a navigation link" },
//   { id: 2, title: "I'm a navigation link as well" },
// ];

function App() {
  const type = AdjustmentContext.useSelector((s) => s.value);
  const IDs = AdjustmentContext.useSelector((s) => s.context.selectedIds);

  const dataList = data.data;

  console.log(IDs);

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
        {dataList.list_1.map((item) => (
          <li key={item.id}>
            <NavigationButton item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
