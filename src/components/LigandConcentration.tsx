import { useState } from "react";
import InputSection from "./InputSection";
import { ligandConcForOccupancy } from "../utils/getLigandConcentration";

const LigandConcentrationCalculator = () => {
  const [params, setParams] = useState({
    proteinConcentration: 120, // µM
    Kd: 200, // µM
    occupancy: 0.2, // fraction (0–1)
  });

  const handleChange = (key: keyof typeof params, value: number) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const result = ligandConcForOccupancy(
    params.occupancy,
    params.Kd,
    params.proteinConcentration
  );

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Ligand concentration for target occupancy</h2>
      <p>
        Calculate the ligand concentration required to achieve a desired
        fractional occupancy of a protein–ligand binding equilibrium.
      </p>
      <fieldset>
        <legend>Binding model</legend>

        <div>P + L ⇌ PL</div>

        <div>
          <strong>Kd</strong> = [P][L] / [PL]
        </div>

        <div>
          <strong>Occupancy</strong> q = [PL] / c<sub>p</sub>
        </div>

        <div style={{ fontSize: "0.8em", color: "#555" }}>
          Calculator assumes a 1:1 binding equilibrium and finite ligand
          concentration.
        </div>
      </fieldset>
      <fieldset>
        <legend>Binding parameters</legend>

        <InputSection
          labelText={
            <span>
              Protein concentration (c<sub>p</sub>)
            </span>
          }
          value={params.proteinConcentration}
          unit="µM"
          onChange={(v) => handleChange("proteinConcentration", v)}
        />

        <InputSection
          labelText={
            <span>
              Dissociation constant (K<sub>d</sub>)
            </span>
          }
          value={params.Kd}
          unit="µM"
          onChange={(v) => handleChange("Kd", v)}
        />

        <InputSection
          labelText={<span>Target occupancy (q)</span>}
          value={params.occupancy}
          onChange={(v) => handleChange("occupancy", v)}
          inputProps={{
            min: 0,
            max: 1,
            step: 0.01,
          }}
        />
      </fieldset>
      <fieldset>
        <legend>Result</legend>

        {result?.errors?.length ? (
          result.errors.map((err, i) => (
            <div key={i} style={{ color: "crimson" }}>
              {err}
            </div>
          ))
        ) : (
          <div>
            Required ligand concentration (c<sub>L</sub>):{" "}
            <strong>{result?.value?.toFixed(2)} µM</strong>
          </div>
        )}
      </fieldset>
    </div>
  );
};

export default LigandConcentrationCalculator;
