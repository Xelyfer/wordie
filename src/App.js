import "./App.css";
import Keyboard from "./component/Keyboard/Keyboard";
import Main_Tiles from "./component/Main_Tiles/Main_Tiles";

function App() {
  return (
    <div className="App">
      <Main_Tiles />
      <Keyboard />
    </div>
  );
}

export default App;
