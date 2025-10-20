/** downloadAsCSV()
 * Goal "Save" the Array of Objects as a new dataset to your local computer.
 *  - Saves as a .csv file
 *
 * @params
 * 1. value: Array of Objects.
 * 2. name: String. Name of file to save it as. "data" as default.
 * 3. Label for the button.
 *
 * HOW TO USE IN NOTEBOOKS
 *
```js
view(
  downloadAsCSV(
    // Fancy method to convert array of objects to CSV string
    async () => {
      const csvFullString = d3.csvFormat(afGroupedPercResults);
      return new Blob([csvFullString], { type: "text/csv" });
    },
    // Filename
    "nc-absentee-ballot-requests-by-week-race-status.csv",
    // Button Label
    "Save Dataset As CSV"
  )
);
```
 *
**/
export const downloadAsCSV = (value, name = "data", label = "Save") => {
  // 1. Create the download button
  const a = document.createElement("a")
  const b = a.appendChild(document.createElement("button"))
  b.textContent = label
  a.download = name

  // 3. Reset the button, after each use.
  async function reset() {
    await new Promise(requestAnimationFrame);
    URL.revokeObjectURL(a.href)
    a.removeAttribute("href")
    b.textContent = label
    b.disabled = false
  }

  // 2. Click event trigger on button to save the input dataset (array of objects)
  a.onclick = async (event) => {
    b.disabled = true
    if (a.href) return reset() // Already saved.
    b.textContent = "Saving…"
    // Try to save the data as a .csv
    try {
      const object = await (typeof value === "function" ? value() : value)
      const blob = new Blob([object], { type: "application/octet-stream" })
      b.textContent = "Download"
      a.href = URL.createObjectURL(blob) // eslint-disable-line require-atomic-updates
      if (event.eventPhase) return reset() // Already downloaded.
      a.click() // Trigger the download
    }
    // If error, throw the following and log error type
    catch (error) {
      console.error("Download error:", error)
      b.textContent = label
    }
    b.disabled = false
  }

  return a
}

const getAcceptedBallots = (d) => {
  if (d.ballot_rtn_status != null && d.ballot_rtn_status.startsWith("ACCEPTED") == true) {
    return d.af
  }
  else {
    return 0
  }
}
const getRejectedBallots = (d) => {
  if (d.ballot_rtn_status != null && d.ballot_rtn_status.startsWith("ACCEPTED") == false) {
    return d.af
  }
  else {
    return 0
  }
}

const reducerFuncs = [
  { type: "ACCEPTED", func:  getAcceptedBallots },
  { type: "REJECTED", func:  getRejectedBallots },
]

export const reduceRejectedBallots = (data, uniqueListOfWeekNumbers, reducerProps) => {
  // 1. Create array for tallied frequency results
  const updatedNABallots = []

  // 2. Loop through week numbers
  for (const weekNumber of uniqueListOfWeekNumbers) {

    // 3. Loop through testor functions with conditions
    //    - Use `for...in` so we can loop as many tests as provided
    for (const testorObj in reducerFuncs) {

      // 4. Loop through interested properties
      //    - Use `for...in` so we can loop as many tests as provided
      for (const rProperty in reducerProps) {

        // 5. Sum total for week for all races and statuses
        const weekRaceAF = sum(
          data,
          (d) => {
            // If this object's property matches our desired rProperty property
            if (d.ballot_rtn_status != null && d.ballot_req_dt_week == weekNumber && d.race == reducerProps[rProperty]) {
              // Return all numbers for current week
              return d.af
            }
          }
        )

        // 6. Tally frequency based on condition in functions
        const summedUpLevel = sum(
          data,
          (d) => {
            // If this object's property matches our desired rProperty property
            if (d.ballot_req_dt_week == weekNumber && d.race == reducerProps[rProperty]) {
              // Test this object against our testor function
              const xTotalToSum = reducerFuncs[testorObj]["func"](d)
              // Whatever Number value is returned, add it to the running tally
              return xTotalToSum
            }
          }
        )

        // 7. Push result to array of results
        updatedNABallots.push({
          ballot_req_dt_week: weekNumber,
          race: reducerProps[rProperty],
          ballot_rtn_status: reducerFuncs[testorObj]["type"],
          af: summedUpLevel,
          percentage: summedUpLevel / weekRaceAF,
        })
      }
    }
  }

  return updatedNABallots
}