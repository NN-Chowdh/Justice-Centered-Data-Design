# Textual Data Processing with compromise.js

<!-- IMPORTS -->
```js
import nlp from "compromise"
import nlpStats from 'compromise-stats'
nlp.extend(nlpStats)
// Local imports
import {getUniquePropListBy, downloadAsCSV} from "./utils/utils.js"
```

<!-- Formatters -->
```js
const numberNoCommasFormatter = d3.format("")
```

## Introduction

First thing's first: *Textual data is very hard to work with!*

Consider some aspects of written language that may cause extra labor to change, i.e., parse and process, depending on your analysis goals:

- **Tense**: `"run"`, `"runs"`, `"running"`, `"ran"`, ...
- **Plural**: `"fly"` vs. `"flies"`
- **Adverbs**: `"swimming"` vs. `"swimmingly"`
- **Contractions**: `"were not"` vs. `"weren't"`
- **Possessives**: `"Chris' favorite game"` or `"Tiffany's tiny horse"`
- **Punctuation**: `"What a totally amazing, excellent discovery - (not!)"`
- **Punctuation & Other Characters**:
  - *Quotes*: `'I do all my laundry now. I\'m what you call "sans parents".'`
  - *Parantheses*: `"What a totally amazing, excellent discovery - (not!)"`
  - *URLs*: `"http://compromise.cool"`
- **Acronyms**: `'it is a UNESCO world heritage site'` vs. `'it is a U.N.E.S.C.O. world heritage site'`

If we want to conduct keyword analysis, such as TF-IDF, it helps to normalize the text across the corpus, so your analysis accounts for the factors above. For example, if you wanted to obtain the results about the term, `vaccine`, from our last chapter, we need to realize that this term is potentially used in the corpus with other variations, such as: `vaccines`, `vaccinate`, `vaccinated`, `vaccination` or `vaccinations`.

## Suggested Readings

1. Spencer Kelly's [README](https://github.com/spencermountain/compromise/blob/master/README.md) for the `compromise` code library -- a "modest Natural Language Processing library". ***Bookmarks this one!***
2. Kelly's [public notebooks](https://observablehq.com/@spencermountain/nlp-compromise?collection=@spencermountain/nlp-compromise) on Observable.

## Learning Objectives

Define and implement the following 3 textual analysis measurements in JavaScript:

- Use `compromise`'s `.normalize({})` function to perform a bulk of the textual processing labor.
- Note additional EDA techniques to find other aspects of the data in need of additional textual processing

## 0. Attach & Learn About the Data

Before we begin, let's make sure we have some baseline context for our textual data.

We will use a randomly sampled (*n*=100) collection of web-scraped Substack posts by historian Heather Cox Richardson, Ph.D., from her series titled, "Letters from an American."

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
).sort(
  (a, b) => d3.ascending(a.dateObject, b.dateObject)
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

## 1. Use compromise's .normalize() function to process the text data

To eliminate these permutations of terms, we can use `compromise`'s `.normalize()` function to pre-process the textual data. Refer to the [method.js file](https://github.com/spencermountain/compromise/blob/master/src/3-three/normalize/methods.js) in compromise's repo to see how they implement a variety of text processing methods.

The function accepts a couple variations of how to input the noramlization parameters.

### 1.1 Normalize presets: light, medium, or heavy

If you refer to the [.normalize() API code file](https://github.com/spencermountain/compromise/blob/master/src/3-three/normalize/api.js#L11), you will find a set of potential shortcut presets that you can pass as String values: `light`, `medium`, and `heavy`.

```javascript
// Excerpt from .normalize() API code file
const light = 'unicode|punctuation|whitespace|acronyms'
const medium = '|case|contractions|parentheses|quotations|emoji|honorifics|debullet'
const heavy = '|possessives|adverbs|nouns|verbs'
const presets = {
  light: split(light),
  medium: split(light + medium),
  heavy: split(light + medium + heavy)
}
```

### 1.2 Customize normalize as a single object

You can also customize your norming work by passing an object with the following key-value pairs:

- key: name of the normalizing option, e.g., `case` or `acronyms`
- value: `true`

<p class="note">
  If you add a key with the value of <code>false</code>, <code>normalize()</code> oddly isn't programmed to ignore the parameter. Instead, whatever parameters you add with the value of <code>true</code>, the <code>normalize()</code> function acts upon. Consequently, if you do NOT wish to clean by a certain option, simply do NOT include it.
</p>

<!-- Render customNorms codeblock to the page -->
```javascript
const customNorms = {

  /**
   *
   * NOTE! If you pass an object, only params
   *       defined in the object will be applied
   *       to your normalize function.
   *
  **/

  // remove hyphens, newlines, and force one space between words
  whitespace: true,
  // keep only first-word, and 'entity' titlecasing
  case: true,
  // remove commas, semicolons - but keep sentence-ending punctuation
  punctuation: true,
  // visually romanize/anglicize 'Björk' into 'Bjork'.
  unicode: true,
  // turn "isn't" to "is not"
  contractions: true,
  //remove periods from acronyms, like 'F.B.I.'
  acronyms: true,
  //remove words inside brackets (like these)
  parentheses: true,
  // turn "Google's tax return" to "Google tax return"
  possessives: true,
  // turn "batmobiles" into "batmobile"
  plurals: true,
  // turn all verbs into Infinitive form - "I walked" → "I walk"
  verbs: true,
  //turn 'Vice Admiral John Smith' to 'John Smith'
  honorifics: true,

}
```

<!-- Declare/instantiate customNorms codeblock to the page -->
```js
// Keep casing, emojis, honorifics,
const customNorms = {
  whitespace: true,
  punctuation: true,
  unicode: true,
  contractions: true,
  acronyms: true,
  debullet: true,
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

<div class="warning">
  <p>
    Refresh your web browser's cache, after you make a change to your settings, since Observable agressively caches variables/data.
  </p>
  <p>
    Shortcut key combinations to reset the cache on refresh:
  </p>
  <ul>
    <li>Mac: <strong>cmd</strong>+<strong>shift</strong>+<strong>r</strong>
    <li>Windows: <strong>ctrl</strong>+<strong>shift</strong>+<strong>r</strong>
  </ul>
</div>

<!-- Inputs.select() to choose which letter to tabulate -->
```js
const selectedLetter = view(
  Inputs.select(
    letterIDs,
    {
      multiple: false,
      label: html`<em>Choose a letter to normalize</em>`,
    }
  )
)
const presetSelection = view(
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

```js
const originalExcerpt = mappedLetters.get(selectedLetter).slice(0, letterExcerptLength)
const nlpExcerpt = nlp(originalExcerpt)
const normedExcerpt = nlpExcerpt.normalize(presetSelection)
const normedText = normedExcerpt.out('text')
```

<!--
  Sampling normalized texts: OG vs Processed
    - Uses Observable's templated CSS classes
-->
<div class="grid grid-cols-2">
  <div class="card">
    <h2>Original</h2>
    <span class="medium">${originalExcerpt}</span>
  </div>
  <div class="card">
    <h2>Processed</span></h2>
    <span class="medium">${normedText}</span>
  </div>
</div>

## 2. Additional Cleaning Suggestions

Thanks to compromise's .normalize() function, we can make some common finely tuned adjustments to our initial pass at the unstructured textual data. However, `compromise`'s NLP (Natural Language Processing) model may have yielded some additional processing needs to catch.

### A note on accuracy

We'll talk more about compromise's NLP model in the next chapter. However, Kelly offers a [notebook that summarizes its accuracy performance, when compared to larger models](https://observablehq.com/@spencermountain/compromise-accuracy?collection=@spencermountain/nlp-compromise).

Kelly notes how he tested the accuracy of `compromise` with a widely-accepted [Penn Treebank Subset Test](https://catalog.ldc.upenn.edu/LDC99T42). He ran a tagging comparison on ~2,500 sentences of the Penn Treebank, `compromise` was 87.8% alignment with Penn: 42,999 matched tags on 48,950 words across 2,535 test sentences.

### Suggested next steps

To spot any additional patterns, some additional helpful steps to process textual data include:

1. Join all the letters into one singular String.
2. Based on your analysis goals, modify a custom normalize() approach.
3. Tabulate frequency results to spot issues at top of head and bottom of the tail.
    <p class="tip">You could use the tiny-tfidf library to facilitate this frequency distribution work.</p>
4. Depending upon your analysis goals, you may use stop words to filter out unwanted words/strings.
    - Example: In HCR's letters, there is a `Share` button link, as well as URL parts, such as `https`, `www`, or `com` and `edu`.
5. Use additional compromise methods on the returned nlp() object:
    - `.toNumber()`: `compromise` can find, interpret, and transform numbers written in plain text, such as `'two hundred'` or `'9 million'`
      ```javascript
      let doc = nlp('she is two hundred years old')
      doc.numbers().toNumber()
      doc.text() // 'she is 200 years old'
      ```
    - Consider [compromise's .split() method](https://observablehq.com/@spencermountain/compromise-split), which enables you to create custom ways to dive the data up, based on your needs during processing and analysis tasks:
