import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:@d3";

/**
 * EXPORTED FUNCTIONS
 */

export const rollupByRaceAndStatus = (data) => {
  const dataWithOther = data.map(d => ({ ...d, status: statusSubset.includes(d.ballot_rtn_status) ? d.ballot_rtn_status : "OTHER"}))

  return d3.rollups(dataWithOther, v => d3.sum(v, d => d.count), d => d.race, d => d.status)
  .flatMap(([race, entries]) => {
    const total = d3.sum(entries, d => d[1]);
    return entries.map(([status, sum]) => ({race, status, sum, percentage: total ? sum / total : 0}))
  })
}

