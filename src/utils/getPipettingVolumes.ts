/**
 * Compute pipetting volumes that simultaneously satisfy:
 *
 *  • target ligand concentration AND target DMSO percentage
 *  • target protein concentration
 *
 * Assumptions:
 *  • Ligand stock is the only DMSO-containing solution
 *  • Protein stock contains no DMSO (buffer only)
 *  • Neat DMSO may be added if ligand stock alone does not reach target %
 *  • Remaining volume is filled with buffer
 *
 * All volumes are returned in the same units as V_final.
 */
export function getPipettingVolumes({
  V_final,
  C_ligand_stock,
  DMSO_stock_pct,
  C_ligand_target,
  DMSO_target_pct,
  C_protein_stock,
  C_protein_target,
  eps = 1e-9,
}: {
  V_final: number;
  C_ligand_stock: number;
  DMSO_stock_pct: number;
  C_ligand_target: number;
  DMSO_target_pct: number;
  C_protein_stock: number;
  C_protein_target: number;
  eps: number;
}) {
  const errors = [];

  if (
    DMSO_stock_pct < 0 ||
    DMSO_stock_pct > 1 ||
    DMSO_target_pct < 0 ||
    DMSO_target_pct > 1
  ) {
    errors.push("DMSO fractions must be in the interval [0, 1].");
  }

  const positiveParams: Record<string, number> = {
    V_final,
    C_ligand_stock,
    C_protein_stock,
  };

  for (const [name, value] of Object.entries(positiveParams)) {
    if (value <= 0) {
      errors.push(`${name} must be positive.`);
    }
  }

  if (C_ligand_target < 0 || C_protein_target < 0) {
    errors.push("Target concentrations must be non-negative.");
  }

  // ---------------------------------------------------- ligand
  const V_ligand_stock = (C_ligand_target / C_ligand_stock) * V_final;

  if (V_ligand_stock > V_final + eps) {
    errors.push(
      `Ligand stock volume ${V_ligand_stock} exceeds total volume ${V_final} µL.`
    );
  }

  const V_DMSO_target = DMSO_target_pct * V_final;
  const V_DMSO_from_lig = V_ligand_stock * DMSO_stock_pct;

  if (V_DMSO_from_lig > V_DMSO_target + eps) {
    errors.push(
      `Ligand stock already supplies ${V_DMSO_from_lig} µL of DMSO, ` +
        `which exceeds the target ${V_DMSO_target} µL.`
    );
  }

  const V_neat_DMSO = Math.max(0, V_DMSO_target - V_DMSO_from_lig);

  // ---------------------------------------------------- protein
  const V_protein_stock = (C_protein_target / C_protein_stock) * V_final;

  if (V_protein_stock > V_final + eps) {
    errors.push(
      `Protein stock volume ${V_protein_stock} µL exceeds total volume ${V_final} µL`
    );
  }

  // ---------------------------------------------------- buffer
  let V_buffer = V_final - (V_ligand_stock + V_protein_stock + V_neat_DMSO);

  if (V_buffer < -eps) {
    errors.push(
      "Combined volumes of ligand stock, protein stock and neat DMSO " +
        "exceed total target volume."
    );
  }

  V_buffer = Math.max(0, V_buffer);

  return {
    value: {
      V_ligand_stock,
      V_protein_stock,
      V_neat_DMSO,
      V_buffer,
    },
    errors: errors.length > 0 ? errors : null,
  };
}
