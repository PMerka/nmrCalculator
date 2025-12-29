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
        <InputSection
          labelText="Final volume"
          value={params.V_final}
          unit="µL"
          onChange={(value) => handleChange("V_final", value)}
        />
      </fieldset>

      <fieldset>
        <legend>Ligand</legend>

        <InputSection
          labelText="Ligand stock concentration"
          value={params.C_ligand_stock}
          unit="µM"
          onChange={(value) => handleChange("C_ligand_stock", value)}
        />

        <InputSection
          labelText="Ligand target concentration"
          value={params.C_ligand_target}
          unit="µM"
          onChange={(value) => handleChange("C_ligand_target", value)}
        />

        <InputSection
          labelText="DMSO in ligand stock (fraction)"
          value={params.DMSO_stock_pct}
          onChange={(value) => handleChange("DMSO_stock_pct", value)}
          inputProps={{
            max: 1,
            min: 0,
            step: 0.01,
          }}
        />

        <InputSection
          labelText="Target DMSO volume fraction"
          value={params.DMSO_target_pct}
          onChange={(value) => handleChange("DMSO_target_pct", value)}
          inputProps={{
            max: 1,
            min: 0,
            step: 0.01,
          }}
        />
      </fieldset>

      <fieldset>
        <legend>Protein stock solution</legend>

        <InputSection
          labelText="Protein stock concentration "
          value={params.C_protein_stock}
          unit="µM"
          onChange={(value) => handleChange("C_protein_stock", value)}
        />

        <InputSection
          labelText="Protein target concentration"
          value={params.C_protein_target}
          unit="µM"
          onChange={(value) => handleChange("C_protein_target", value)}
        />
      </fieldset>

      <fieldset>
        <legend>Result</legend>

        {pipettingVolumesData?.errors?.length ? (
          pipettingVolumesData.errors.map((err, i) => (
            <div key={i} style={{ color: "crimson" }}>
              {err}
            </div>
          ))
        ) : (
          <div>
            <div>
              Ligand stock volume:{" "}
              <strong>
                {pipettingVolumesData.value.V_ligand_stock.toFixed(2)} µL
              </strong>
            </div>

            <div>
              Protein stock volume:{" "}
              <strong>
                {pipettingVolumesData.value.V_protein_stock.toFixed(2)} µL
              </strong>
            </div>

            <div>
              Neat DMSO volume:{" "}
              <strong>
                {pipettingVolumesData.value.V_neat_DMSO.toFixed(2)} µL
              </strong>
            </div>

            <div>
              Buffer volume:{" "}
              <strong>
                {pipettingVolumesData.value.V_buffer.toFixed(2)} µL
              </strong>
            </div>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default PipettingVolumes;
