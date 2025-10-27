import nlp from "compromise"
import {utcParse,utcFormat} from "d3-time-format"

const hcrDateParser = utcParse("%B-%d-%Y")
const hcrMonthNumberFormat = utcFormat("%m")
const hcrYearNumberFormat = utcFormat("%Y")
const hcrDayOfYearNumberFormat = utcFormat("%j")

export const printList = (doc) => {
  return JSON.stringify(doc.out('array'), null, 2)
}

export const objectifyList = (doc, factor) => {
  const entityList = doc.out('array')
  const mappedEntity = []
  entityList.forEach(
    (e) => {
      mappedEntity.push({ entity: e, factor: factor })
    }
  )
  return mappedEntity
}

export const combineLettersPerStance = (data) => {

  let newList = []
  let proString = ""
  let antiString = ""

  for (const row of data) {
    // if "Pro" stance
    if (row.stance !== null && row.stance.startsWith("Pro") == true) {
      proString = proString+" "+row.transcript
    }
    // If anti stance
    else if (row.stance !== null && row.stance.startsWith("Anti") == true) {
      antiString = antiString+" "+row.transcript
    }
  }

  newList.push(
    {
      stance: "Pro",
      transcript: proString,
      transcriptLength: proString.length,
      nlp: nlp(proString)
    }
  )
  newList.push(
    {
      stance: "Anti",
      transcript: antiString,
      transcriptLength: antiString.length,
      nlp: nlp(antiString)
    }
  )

  // Combine stance strings
  return newList
}

export const addDateFields = (data) => {
  const updatedData = data.map(
    (letter) => {
      letter.dateObject = hcrDateParser(letter.date)
      letter.month = hcrMonthNumberFormat(letter.dateObject)
      letter.year = hcrYearNumberFormat(letter.dateObject)
      letter.dayOfYear = hcrDayOfYearNumberFormat(letter.dateObject)
      return letter
    }
  )
  return updatedData
}

/** downloadAsCSV()
 * Goal "Save" the Array of Objects as a new dataset to your local computer.
 *  - Saves as a .csv file
 *
 * @params
 * 1. value: Array of Objects.
 * 2. name: String. Name of file to save it as. "data" as default.
 * 3. Label for the button.
 *
 * To use in a notebook, add the following js codeblock:
 *
 *
   ```js
    view(downloadAsCSV(async () => {
      const csvFullString = d3.csvFormat(ENTER_ARR_OF_OBJS_HERE);
      return new Blob([csvFullString], { type: "text/csv" });
    }, allFileTableName, "Save Full Data Set As CSV"));
    ```
 *
**/
export const downloadAsCSV = (value, name = "untitled", label = "Save") => {
  const a = document.createElement("a")
  const b = a.appendChild(document.createElement("button"))
  b.textContent = label
  a.download = name

  async function reset() {
    await new Promise(requestAnimationFrame);
    URL.revokeObjectURL(a.href)
    a.removeAttribute("href")
    b.textContent = label
    b.disabled = false
  }

  a.onclick = async (event) => {
    b.disabled = true
    if (a.href) return reset() // Already saved.
    b.textContent = "Saving…"
    try {
      const object = await (typeof value === "function" ? value() : value)
      const blob = new Blob([object], { type: "application/octet-stream" })
      b.textContent = "Download"
      a.href = URL.createObjectURL(blob) // eslint-disable-line require-atomic-updates
      if (event.eventPhase) return reset() // Already downloaded.
      a.click() // Trigger the download
    } catch (error) {
      console.error("Download error:", error)
      b.textContent = label
    }
    b.disabled = false
  }

  return a
}