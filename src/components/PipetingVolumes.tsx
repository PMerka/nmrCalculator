import { useState } from "react";
import { getPipettingVolumes } from "../utils/getPipettingVolumes";
import InputSection from "./InputSection";

const PipettingVolumes = () => {
  const [params, setParams] = useState({
    V_final: 300,
    C_ligand_stock: 100000,
    DMSO_stock_pct: 1.0,
    C_ligand_target: 10,
    DMSO_target_pct: 0.02,
    C_protein_stock: 150,
    C_protein_target: 145,
    eps: 1e-9,
  });

  const handleChange = (key: string, value: number) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const pipettingVolumesData = getPipettingVolumes(params);

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Pipetting Volumes</h2>

      <fieldset>
        <legend>General</legend>
        <label>
          Final volume (µL)
          <input
            type="number"
            value={params.V_final}
            onChange={(e) => handleChange("V_final", +e.target.value)}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Ligand</legend>
        <div>
          <label>
            Ligand stock concentration (µM)
            <input
              type="number"
              value={params.C_ligand_stock}
              onChange={(e) => handleChange("C_ligand_stock", +e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Ligand target concentration (µM)
            <input
              type="number"
              value={params.C_ligand_target}
              onChange={(e) => handleChange("C_ligand_target", +e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            DMSO in ligand stock (fraction)
            <input
              type="number"
              step="0.01"
              value={params.DMSO_stock_pct}
              onChange={(e) => handleChange("DMSO_stock_pct", +e.target.value)}
            />
          </label>
        </div>

        <label>
          Target DMSO fraction
          <input
            type="number"
            step="0.01"
            value={params.DMSO_target_pct}
            onChange={(e) => handleChange("DMSO_target_pct", +e.target.value)}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Protein stock solution</legend>

        <InputSection
          labelText="Protein stock concentration (µM)"
          value={params.C_protein_stock}
          unit="µM"
          onChange={(value) => handleChange("C_protein_stock", value)}
        />

        <InputSection
          labelText="Protein target concentration (µM)"
          value={params.C_protein_target}
          unit="µM"
          onChange={(value) => handleChange("C_protein_target", value)}
        />
      </fieldset>
      <div>{JSON.stringify(pipettingVolumesData)}</div>
    </div>
  );
};

export default PipettingVolumes;
