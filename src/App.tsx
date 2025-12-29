import "./App.css";
import PipettingVolumes from "./components/PipetingVolumes";
import LigandConcentrationCalculator from "./components/LigandConcentration";
import CreatedBy from "./components/CreatedBy";

function App() {
  return (
    <div className="appContainer">
      <CreatedBy />
      <LigandConcentrationCalculator />
      <hr style={{ margin: "3rem 0 0 0" }} />
      <PipettingVolumes />
    </div>
  );
}

export default App;
