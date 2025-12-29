/**
 * Returns the ligand concentration [L] required to achieve a desired
 * fractional protein occupancy for a 1:1 protein–ligand binding equilibrium.
 *
 * q = [PL] / cp
 *
 * @param occupancy  Target fractional occupancy (0 < q ≤ 1)
 * @param Kd         Dissociation constant (same concentration units as cp)
 * @param cp         Total protein concentration (> 0)
 * @returns          Ligand concentration [L] (same units as Kd and cp)
 */
export function ligandConcForOccupancy(
  occupancy: number,
  Kd: number,
  cp: number
) {
  const errors = [];

  if (cp <= 0) {
    errors.push(
      `Total protein concentration cp must be bigger than 0 (got cp=${cp})`
    );
  }

  if (occupancy < 0 || occupancy > 1) {
    errors.push(`Occupancy must be in (0, 1], got occupancy=${occupancy}`);
  }

  // 100% occupancy asymptotically requires infinite ligand concentration
  if (Math.abs(occupancy - 1.0) < 1e-12) {
    return { value: Infinity, errors: null };
  }

  if (errors.length > 0) {
    return { value: null, errors };
  }

  // Convenience variable: (Kd / cp) + 1
  const beta = Kd / cp + 1.0;

  // Dimensionless ligand concentration: x = [L] / cp
  const x = (occupancy * (occupancy - beta)) / (occupancy - 1.0);

  // Convert back to absolute ligand concentration
  return { value: x * cp, errors: null };
}
