# Named Entity Recognition with compromise.js

<!-- IMPORTS -->
```js
import nlp from "compromise"
import nlpStats from 'compromise-stats'
nlp.extend(nlpStats)
import {html} from "htl"
// Local imports
import {getUniquePropListBy, sparkbar, objectifyList, downloadAsCSV} from "./utils/utils.js"
```

<!-- Formatters -->
```js
const numberNoCommasFormatter = d3.format("")
```

## What is Named Entity Recognition (NER)

***Named Entity Recognition*** (NER) can help us computationally extract important information from a large corpus of texts. For example, NER helps you extract some of the following *entities* across a corpus:

- people
- locations
- nouns
- adverbs
- possessives
- acronyms
- etc.

By extracting such *entities* from "unstructured data" like texts, you could thereby begin to conduct analyses about such entities:

- **EDA**: frequency distributions, central tendencies, dispersion
- **Network**: While we will not be able to cover network analysis, NER facilitates this work to group the data and thereby calculate network analysis measures to NER across the corpus.
- **Mapping**: By extracting named locations across a corpus, you can then begin the process to create a geotagged dataset.

### NER comes from NLP (Natural Language Processing)

We are all users of NER and broader methods of computational methods from the interdisciplinary field of ***Natural Language Processing*** (NLP). For instance, text eidtors that include technological features such as spell-check, autocompletion, or translation to name a few are the result of NLP.

NLP is interdisciplinary and focuses on programmatically understanding the natural features of language. NLP includes researchers from linguistics, statistics, computer science, and more. More recent advances with NLP are the result of more widely available texts available on the web, which have, in turn, spurred a wider availability of open-source NLP tools for folks like us to creatively apply in our projects.

### How will we apply NER?

In this notebook, we will use [compromise.js](https://github.com/spencermountain/compromise/blob/master/README.md) to learn about and apply NER, which its creator, Spencer Kelly, refers to as a "modest Natural Language Processing library."

## Suggested Readings

1. Spencer Kelly's [README](https://github.com/spencermountain/compromise/blob/master/README.md) for the `compromise` code library -- a "modest Natural Language Processing library". ***Bookmarks this one!***
2. Observable Documentation:
  1. Framework Theme's [Grid Layout Parent Containers](https://observablehq.com/framework/markdown#grids) & [Card children blocks](https://observablehq.com/framework/markdown#cards)

## Learning Objectives

Define and implement the following 3 textual analysis measurements in JavaScript:

- Named Entity Recognition (NER)
- Conduct NER with `compromise.js`

## 0. Attach & Learn About the Data

Before we begin, let's make sure we have some baseline context for our textual data.

As a means to ensure the notebook reloads quickly for educational purposes, we will use a small randomly sampled collection of web-scraped Substack posts by historian Heather Cox Richardson, Ph.D., from her series titled, "Letters from an American."

- **Sample**: *n* = 100 letters (Substack post) across all years
- **Years**: 2019 - 2025
- Scraped on 9/26/2025 & 9/27/2025.
- Exported as JSON file, wherein each row/object is a "letter" written and published by Richardson on Substack.com.

See the README in the data folder for more information.

<!-- Attach the data -->
```js
const letters = FileAttachment("./../data/hcr-letters/hcr-letters-substack-n100.csv").csv({typed:true})
```

<!-- filter out empty rows -->
```js
let filteredPerLetter = letters.filter(
  (l) => {
    if (l.letter !== false) {return l}
  }
)
```

Example row from the corpus of Richardson's letters:

```js
filteredPerLetter[0]
```

<!-- Create keyed JS Map -->
```js
const letterIDs = filteredPerLetter.map((l) => {return l.dateObject})

const mappedLetters = new Map(filteredPerLetter.map(
  (l) => [l.dateObject, l.letter]
))
```

## 1. Group the Data by Year

<div class="warning">
  <p>
    Since Observable agressively caches variables/data, as you make changes to your notebook, you should conduct a hard-refresh of your web browser's cache.
  </p>
  <p>
    Shortcut key combinations to reset the cache on refresh:
  </p>
  <ul>
    <li>Mac: <strong>cmd</strong>+<strong>shift</strong>+<strong>r</strong>
    <li>Windows: <strong>ctrl</strong>+<strong>shift</strong>+<strong>r</strong>
  </ul>
</div>



<!-- Declare/instantiate customNorms codeblock to the page -->
```js
// Keep emojis & honorifics, so don't include
const customNorms = {
  unicode:true,
  punctuation:true,
  whitespace:true,
  acronyms:true,
  case:true,
  contractions:true,
  plurals:true,
  parentheses:true,
  possessives:true,
}

const allNormOptions = [
  {option: "light"},
  {option: "medium"},
  {option: "heavy"},
  {option: customNorms}
]
```

<!-- Group by year: lettersPerYear -->
```js
const lettersPerYear = d3.group(
  letters,
  d => d.year,
)
```

<p class="note">
  With the <code>Custom</code> option, I am choosing to keep emojis & honorifics, so I do NOT include them in my <code>customNorms</code> options.
</p>

<!-- Inputs.select -- perYearPresetSelection -->
```js
let yearSelectionNER = view(
  Inputs.select(
    // Get unique list of years as Integer/Number
    getUniquePropListBy(filteredPerLetter, "year")
      .sort( (a, b) =>  d3.ascending(numberNoCommasFormatter(a), numberNoCommasFormatter(b)) ),
    {
      label: html`<em>Select which year</em>`,
      value: numberNoCommasFormatter(2025),
    }
  )
)

const perYearPresetSelection = view(
  Inputs.select(
    new Map([
      ["Light (unicode|punctuation|whitespace|acronyms)", "light"],
      ["Medium (light + case|contractions|parentheses|quotations|emoji|honorifics|debullet)", "medium"],
      ["Heavy (light + medium + possessives|adverbs|nouns|verbs)", "heavy"],
      ["Custom", customNorms]
    ]),
    {
      value: "light",
      label: html`<em>Choose a normalize preset</em>`,
      format: ([label, optionValue]) => `${label}`,
    }
  )
)
const letterExcerptLength = view(
  Inputs.range(
    [50, 750],
    {
      label: html`<em>Excerpt length</em>`,
      step: 1,
      placeholder: "50-750",
      value: 500,
    },
  )
)
```

<!-- Map perYearJoinedLettersMap -->
```js
let perYearJoinedLettersMap = new Map(
  Array.from(
    lettersPerYear,
    ([year, letters]) => {
      let combinedLetter = ""
      for (let l of letters) {
        combinedLetter = combinedLetter + " " + l.letter
      }
      let lettersLength = combinedLetter.length
      // Add function to process text, if needed, before nlp()
      let nlpLetters = nlp(combinedLetter)
      return [
        year,
        {
          combinedLetter: combinedLetter,
          lettersLength: lettersLength,
          nlpLetters: nlpLetters,
          normalized: nlpLetters.normalize(perYearPresetSelection).out('text'),
          nouns: nlpLetters.nouns(),
          people: nlpLetters.people(),
          places: nlpLetters.places(),
          adverbs: nlpLetters.adverbs(),
          possessives: nlpLetters.possessives(),
          hyphenated: nlpLetters.hyphenated(),
          acronyms: nlpLetters.acronyms(),
        }
      ]
    }
  )
)
```

<!-- Get letter, slice it, call nlp() function -->
```js
const originalExcerpt = perYearJoinedLettersMap.get(yearSelectionNER).combinedLetter.slice(0, letterExcerptLength)
const normedExcerpt = perYearJoinedLettersMap.get(yearSelectionNER).normalized.slice(0, letterExcerptLength)
```

<!--
  Sampling normalized texts: OG vs Processed
    - Uses Observable's templated CSS classes
-->
<div class="grid grid-cols-2">
  <div class="card">
    <h2>Original ${yearSelectionNER} Combined Letters</h2>
    <span class="medium">${originalExcerpt}</span>
  </div>
  <div class="card">
    <h2>Processed ${yearSelectionNER} Combined Letters</span></h2>
    <span class="medium">${normedExcerpt}</span>
  </div>
</div>

### Notes about impact of normalize() parameters

- Retaining original verb tense vs. Not retaining it


## Named Entity Recognition

The `compromise` library can perform with a type of language modeling called ***named entity recognition***.

In this running case, let's check how it performs with our combined string data.

### Ask "What [insert POS] was mentioned?" with [enter NER]?

If we want to create a quick list of potential names mentioned in the corpus, we can call `.people()`.

```javascript
const people = nlpObjectHere.people()
```

<!-- Get unique list of years -->
```js
const uniqYearsList = getUniquePropListBy(filteredPerLetter, "year")
  .sort( (a, b) =>  d3.ascending(numberNoCommasFormatter(a), numberNoCommasFormatter(b)) )
```

<!-- Inputs.select for years and NER type -->
```js
let nerSelection = view(
  Inputs.select(
    // List of attributes/keys
    [
      "nouns",
      "people",
      "places",
      "adverbs",
      "possessives",
      "hyphenated",
      "acronyms",
      // "penPOS",
    ],
    {
      label: html`<em>Select which NER</em>`,
      value: "people",
    }
  )
)

let year1Selection = view(
  Inputs.select(
    uniqYearsList,
    {
      label: html`<em>Select year to compare</em>`,
      value: numberNoCommasFormatter(2019),
    }
  )
)
let year2Selection = view(
  Inputs.select(
    uniqYearsList,
    {
      label: html`<em>Select year to compare</em>`,
      value: numberNoCommasFormatter(2020),
    }
  )
)
```

<!-- Declare and instantiate: year1NERData & year2NERData  -->
```js
let year1NERData = Array.from(
    d3.rollup(
    objectifyList(perYearJoinedLettersMap.get(year1Selection)[nerSelection]),
    v => v.length,
    d => d.entity,
  ),
  ([entity, count]) => {
    return { entity, count }
  }
).sort(
  (a,b) => d3.descending(a.count, b.count)
)

let year2NERData = Array.from(
    d3.rollup(
    objectifyList(perYearJoinedLettersMap.get(year2Selection)[nerSelection]),
    v => v.length,
    d => d.entity,
  ),
  ([entity, count]) => {
    return { entity, count }
  }
).sort(
  (a,b) => d3.descending(a.count, b.count)
)
```

<!-- Render NER year comparison tables -->
<div class="grid grid-cols-2">
  <div class="card">
    <h2>${year1Selection} NER: ${nerSelection}</h2>
    <div>
      ${Inputs.table(
        year1NERData,
        {
          format: {
            count: sparkbar(d3.max(year1NERData, d => d.count))
          },
        }
      )}
    </div>
  </div>

  <div class="card">
    <h2>${year2Selection} NER: ${nerSelection}</h2>
    <div>
      ${Inputs.table(
        year2NERData,
        {
          format: {
            count: sparkbar(d3.max(year2NERData, d => d.count))
          },
        }
      )}
    </div>
  </div>

</div>

<!-- Declare and instantiate: year1NERData & year2NERData  -->
```js
let year1BiGrams = perYearJoinedLettersMap.get(year1Selection).nlpLetters.bigrams()
let year2BiGrams = perYearJoinedLettersMap.get(year2Selection).nlpLetters.bigrams()

let year1TriGrams = perYearJoinedLettersMap.get(year1Selection).nlpLetters.trigrams()
let year2TriGrams = perYearJoinedLettersMap.get(year2Selection).nlpLetters.trigrams()

const nGramCols = [
  "normal",
  "count",
]
```

<!-- Render NER year comparison tables -->
<div class="grid grid-cols-4">

  <!-- YEAR 1 TRIGRAMS -->
  <div class="card">
    <h2>${year1Selection} TriGrams</h2>
    <div>
      ${Inputs.table(
        year1TriGrams,
        {
          columns: nGramCols,
          format: {
            count: sparkbar(d3.max(year1TriGrams, d => d.count))
          },
        }
      )}
    </div>
  </div>

  <!-- YEAR 2 TRIGRAMS -->
  <div class="card">
    <h2>${year2Selection} TriGrams</h2>
    <div>
      ${Inputs.table(
        year2TriGrams,
        {
          columns: nGramCols,
          format: {
            count: sparkbar(d3.max(year2TriGrams, d => d.count))
          },
        }
      )}
    </div>
  </div>

  <!-- YEAR 1 BIGRAMS -->
  <div class="card">
    <h2>${year1Selection} BiGrams</h2>
    <div>
      ${Inputs.table(
        year1BiGrams,
        {
          columns: nGramCols,
          format: {
            count: sparkbar(d3.max(year1BiGrams, d => d.count))
          },
        }
      )}
    </div>
  </div>

  <!-- YEAR 2 BIGRAMS -->
  <div class="card">
    <h2>${year2Selection} BiGrams</h2>
    <div>
      ${Inputs.table(
        year2BiGrams,
        {
          columns: nGramCols,
          format: {
            count: sparkbar(d3.max(year2BiGrams, d => d.count))
          },
        }
      )}
    </div>
  </div>

</div>

<!-- ## HTML Tagged Visualization Outputs

```js
let testString = perYearJoinedLettersMap.get(year2Selection).nlpLetters.html({
    '.red': 'Trump #Noun', // class name
    '.blue': '#Place', // class name
  })
testString = html`<div>${str}</div>`
```

<div class="grid grid-cols-2">
  <div class="card">
    ${testString}
  </div>
</div> -->


## How can I download outputs? Enter downloadAsCSV()!

In your processing notebooks, once you arrive at a structure of an Array of Objects that you want to use for further EDA work, visualization, or even a reporting page in a new notebook, you can use my provided `downloadAsCSV()` utility function to create a download button in the notebook.

### How downloadAsCSV() works

1. Go to the utils.js file, and inside the funciton's comment, you will find a codeblock to insert in your new notebook.
2. Select the codeblock and copy it:
    ```javascript
    view(downloadAsCSV(async () => {
      const csvFullString = d3.csvFormat(ENTER_ARR_OF_OBJS_HERE);
      return new Blob([csvFullString], { type: "text/csv" });
    }, allFileTableName, "Save Full Data Set As CSV"));
    ```
3. Paste the codeblock after your desired Array of objects has been defined.
4. Replace `ENTER_ARR_OF_OBJS_HERE` with the variable name of the desired Array of Objects.
5. Replace `allFileTableName` with a String for the output filename.
    - *Example*: `"hcr-YYYY-trigrams.csv"`
5. Save your notebook file and navigate to its location. You should see

### Example output with `year1TriGrams`

Here's the basic run down of what we send to `downloadAsCSV()`.

The first parameter is the most tricky to break down. It's essentially an aynchronous function that will ensure that you send a properly CSV-structured JS `Blob` object to the downloading code that runs inside of the function.

Let's look at what the first parameter does with a sliced version of `year1TriGrams`:

1. Sliced version of the initial 10 objects in `year1TriGrams`:
    <!-- Sliced output of year1TriGrams -->
    ```js
    year1TriGrams.slice(0,10)
    ```
2. Sliced `year1TriGrams` as CSV formatted String after processed with `d3.csvFormat()`:
    ```js
    d3.csvFormat(year1TriGrams.slice(0,10))
    ```
3. Finally, the asynchronous function returns a new `Blob` object encoded as a CSV file:
    - **NOTE**: The [JS Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) is most useful in situations like these, where a CSV structure is a file format, rather than a JS structure. The Blob includes file-streaming functions to help us more easily perform such functions like downloading a file, such as the key moment in the downloadAsCSV() function: `URL.createObjectURL(blob)`, which creates a downloadable object for us, once we click on the appended `<a>` button on the page.
    ```js
    new Blob([d3.csvFormat(year1TriGrams.slice(0,10))], { type: "text/csv" })
    ```

Finally, all put together, the codeblock will render a button to the page with the text, `"Save Full Data Set As CSV"`:

```js
view(
  downloadAsCSV(
    async () => {
      const csvFullString = d3.csvFormat(year1TriGrams);
      return new Blob([csvFullString], { type: "text/csv" });
    },
    'test.csv',
    "Save Full Data Set As CSV"
  )
);
```
