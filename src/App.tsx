import { useState } from "react";
import "./App.css";
import { ligandConcForOccupancy } from "./utils/getLigandConcentration";
import PipettingVolumes from "./components/PipetingVolumes";

function App() {
  const [proteinConcentration, setProteinConcentration] = useState(120);
  const [Kd, setKd] = useState(200);
  const [ocupancy, setOcupancy] = useState(0.2);

  return (
    <>
      <h1>Get concentration of ligant</h1>
      <div>
        Concentration
        <input
          type="number"
          value={proteinConcentration}
          onChange={(e) => setProteinConcentration(Number(e.target.value))}
        />
      </div>
      <div>
        Kd
        <input
          type="number"
          value={Kd}
          onChange={(e) => setKd(Number(e.target.value))}
        />
      </div>
      <div>
        Ocupancy
        <input
          type="number"
          value={ocupancy}
          onChange={(e) => setOcupancy(Number(e.target.value))}
        />
      </div>
      <div>
        {"Target concentration "}
        {Math.round(
          ligandConcForOccupancy(ocupancy, Kd, proteinConcentration) * 100
        ) / 100}
      </div>
      <PipettingVolumes />
    </>
  );
}

export default App;
