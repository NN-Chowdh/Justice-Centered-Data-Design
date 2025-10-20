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


export const threeLevelRollUpFlatMap = (data, level1Key, level2Key, level3Key, countKey) => {

  // 1. Rollups on 2 nested levels
  const colTotals = rollups(
    data,
    (v) => v.length, //Count length of leaf node
    (d) => d[level1Key], //Accessor at 1st level
      (d) => d[level2Key], //Accessor at 2nd level
        (d) => d[level3Key], //Accessor at 3rd level
  )

  // 2. Flatten 1st grouped level back to array of objects
  const flatTotals = colTotals.flatMap((l1Elem) => {

    // 2.1 Assign level 1 key
    let l1KeyValue = l1Elem[0]

    // 2.2 Flatten 2nd grouped level
    const flatLevels = l1Elem[1].flatMap((l2Elem) => {

      // 2.2.1 Assign level 2 key
      let l2KeyValue = l2Elem[0]

      // 2.3.1 Flatten third level
      const flat3Levels = l2Elem[1].flatMap((l3Elem) => {

        // 2.2.1 Assign level 2 key
        let l3KeyValue = l3Elem[0]

        // 2.2.2 Return fully populated object
        return {
          [level1Key]: l1KeyValue,
          [level2Key]: l2KeyValue,
          [level3Key]: l3KeyValue,
          [countKey]: l3Elem[1]
        }

      })

      return flat3Levels
    })

    // 3. Return flattened array of objects
    return flatLevels
  })

  // 3. Return the sorted totals
  return flatTotals
}

/** sumUpWithReducerTests()
 * Goal: Use D3's .sum() to tally the frequency of the data
 *       by first passing the data through a series of testor functions
 *       and then interested variables.
 * @params
 *  1. reducerFunctions: Array of Objects. Pass any number of functions to filter your data
 *    - type: String. Name of the filtered result
 *    - func: Function. Function that filters the data
 *  2. reducerProperties: Array of Strings. Each String is the desired property values that you are testing in the data
 *  3. data: Two-Level .rollups() output--an Array of nested arrays.
 *  4. level1Key: String. The key for the 1st-level grouping of the data.
 *  5. level2Key: String. The key for the 2nd-level grouping of the data.
 *  6. countKey: String. Desired new key for the new rolled up Number value.
 *
 * @return
 *  1. Array of Objects. Each object represents the reduced and summed up data.
 */
export const sumUpWithReducerTests = (reducerFunctions, reducerProperties, data, level1Key, level2Key, countKey) => {

  // 1. Create array for tallied frequency results
  const freqResults = []

  // 2. Loop through testor functions with conditions
  //    - Use `for...in` so we can loop as many tests as provided
  for (const testorObj in reducerFunctions) {

    // 3. Loop through interested properties
    //    - Use `for...in` so we can loop as many tests as provided
    for (const rProperty in reducerProperties) {

      // 4. Tally frequency based on condition in functions
      const summedUpLevel = sum(
        // The `data` to loop through
        data,
        // Accessors like this are just fancy `for` loops like .map()
        (d) => {
          // If this object's property matches our desired rProperty property
          if (d[level1Key] == reducerProperties[rProperty]) {
            // Test this object against our testor function
            const xTotalToSum = reducerFunctions[testorObj]["func"](d)
            // Whatever Number value is returned, add it to the running tally
            return xTotalToSum
          }
        }
      )

      // 5. Push result to array of results
      freqResults.push({
        // KEY->VALUE pairs with newly summed up absolute frequency
        [level1Key]: reducerProperties[rProperty],
        [level2Key]: reducerFunctions[testorObj]["type"],
        [countKey]: summedUpLevel
      })

    }

  }

  // 6. Return array of freq objects
  return freqResults
}