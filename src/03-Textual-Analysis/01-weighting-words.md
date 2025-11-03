# Weighting Words with TF-IDF

```js
import * as tfidf from "tiny-tfidf";
```

<p class="cite_small">
  Some content below is reused and modified from data professional Kerry Rodden's <a href="https://observablehq.com/@kerryrodden/introduction-to-text-analysis-with-tf-idf" target="_blank" rel="noopenner noreferrer">Observable Notebook companion</a> for their tiny-tfidf code library.
</p>

<!-- Utilities -->
```js
const letterPrettyDateFormatter = d3.utcFormat("%A, %b %e, %Y")
// formatter for letter URL: october-25-2025
const urlDateFormatter = d3.utcFormat("%B-%-d-%Y")
```

Term Frequency-Inverse Document Frequency (TF-IDF) is a method for term weighting, where each of the documents in a collection is characterized using weights assigned to the words (or terms) present in it. This makes it possible to rank the documents according to their estimated relevance to a search query. These concepts are still relevant to modern search engines and other kinds of text analysis.

## Suggested Readings

1. Kerry Rodden's [README](https://github.com/kerryrodden/tiny-tfidf?tab=readme-ov-file#corpus-class) for the `tiny-tfidf` code library. ***Bookmarks this one!***
2. The original TF-IDF report by Karen Spärck-Jones & Steven Robertson (1994): "<a href="./../assets/readings/03-textual-analysis/Spärck_Jones-and-Robertson-1994-TF_IDF.pdf" target="_blank" rel="noopenner noreferrer">Simple, proven approaches to text retrieval</a>."

## Learning Objectives

Define and implement the following 3 textual analysis measurements in JavaScript:

- Term Frequency
- Collection Frequency, i.e., Inverse Document Frequency
- Document Length
- How to start applying the above 3 measurements together

## 0. About the Data

Before we begin, let's make sure we have some baseline context for our textual data.

We will use a collection of web-scraped Substack posts by historian Heather Cox Richardson, Ph.D., from her series titled, "Letters from an American."

- Scraped on 9/26/2025 & 9/27/2025.
- Exported as JSON file, wherein each row/object is a "letter" written and published by Richardson on Substack.com.

See the README in the data folder for more information.

<!-- Attach the data -->
```js
const letters = FileAttachment("./../data/hcr-letters/hcr-letters-substack-no-links.csv").csv({typed:true})
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

<!-- EXAMPLE GROUPING TO USE -->
<!-- GROUP BY YEAR -->
<!-- ```js
let mappedByYear = d3.group(
  filteredPerLetter,
  d => d.year
)
``` -->

<!-- FLATTEN BY YEAR -->
<!-- ```js
let lettersByYear = Array.from(
  mappedByYear,
  ([year, data]) => {
    // Join letters for each year
    let letters = ""
    for (let d of data) {
      letters = letters + " " + d.letter
    }
    return {year, letters}
  }
)
``` -->


## 1. Term Frequency

The term frequency is the simple sum total number of times a given `t` term appears in `d` document.

> The term frequency for term ${tex`t(i)`} in document ${tex`d(j)`} is:
>
> ${tex`TF(i,j) = \text{the number of occurrences of term}\ t(i) \text{in document}\ d(j)`}

To calculate the term frequencies (and more!), I have already imported the `tiny-tfidf` and its `Corpus` class `constructor`. `tiny-tfidf`'s `Corpus` has the built in methods to create and recall all of the calculations. In general, `Corpus` refers to the research term about a collection of documents

<div class="note--definition">
  <ul>
    <li><code>Class</code>: A <em>Class</em> is a special type of function that produces a custom template for creating objects.
    <li><code>constructor</code>: A Class' <em>constructor</em> creates and initializes an object instance of that class.
  </ul>
</div>

```javascript
// See this import statement at the top of this file.
import * as tfidf from "tiny-tfidf";
```

### 1.1 How to use the Corpus class constructor

When you use `Corpus`, it has been designed to expect the following parameters:

1. **Array of identifiers (IDs) for the documents**. Should be unique values (Any data type) per row and be in parallel order as the next parameter for the documents.
2. **Array of Strings of the documents themselves, i.e., the data**. Should be in parallel sequence with the prior parameter of document IDs. In this case, each item in the Array is String data of letters written by the historian, Dr. Heather Cox Richardson.
3. **Use default stopwords?**: Boolean. (Optional.) Defaults to `true`.
4. **Custom stopwords** (Optional): Add an Array of Strings.
5. **K1**: (Optional). Tuning parameter. Default = `2.0`.
    - `K1` modifies term frequency (higher values increase their influence)
6. **b**: (Optional). Tuning parameter. Default = `0.75`.
    - `b` modifies document length (between 0 and 1).
      - 1 means that long documents are repetitive
      - 0 means they are multitopic

```js
// TF tuner
const k1 = 2.0
// Document length tuner
const b = 0.75
```

<!-- Render example use of Corpus class constructor to page -->
```javascript
let corpus = new tfidf.Corpus(
  // Array of document names
  letterTitles,
  // Array of documents
  letterDocs,
  // Boolean to use stop words or not
  true,
  // Additional custom stop as an Array of Strings
  customStopwords,
  // TF tuning constant
  k1,
  // Doc tuning constant
  b,
)
```

<!-- Create document title array & document array for Corpus constructor -->
```js
let customStopwords = [
  "ar", "are", "aren", "arent", "aren't", "as", "at", "also",
  "the", "to",
  "https", "www", "com", "html", "gov", "org", "share",
]
let letterTitles = filteredPerLetter.map((l) => {return l.dateObject})
let letterDocs = filteredPerLetter.map((l) => {return l.letter.toLowerCase()})
```

<!-- Create corpus class object -->
```js
let corpus = new tfidf.Corpus(
  // 1. Array of document names
  letterTitles,
  // 2. Array of documents
  letterDocs,
  // 3. Boolean to use stop words or not
  true,
  // 3. Additional custom stop as an Array of Strings
  customStopwords,
  // 4. TF tuning constant
  k1,
  // 5. Doc tuning constant
  b,
)
```

### 1.2 How to return TFs per document (letter)

Take a look inside the code of this notebook's file, so you can see how we achieve the following capacity to select and render the top 15 TF results per letter.

<!-- Inputs.select() to choose which letter to tabulate -->
```js
let selectedLetter = view(
  Inputs.select(
    letterTitles,
    {
      multiple: false,
      label: "Choose a letter to plot",
    }
  )
)
```

<!-- Get top 15 terms from selected letter -->
```js
/**
 * getDocument(identifier)
 * returns the Document object for the given identifier
**/
let sLetter = corpus.getDocument(selectedLetter)

/**
 * @getUniqueTerms()
 * returns an array of the unique terms that appear in the document (including stopwords).
**/
let topTermsFreq = sLetter.getUniqueTerms()
  // Filter out stopwords
  .filter(d => !corpus.getStopwords().includes(d))
  // Map each term with basic info per object
  .map(
    (t) => ({
      Term: t,
      Frequency: sLetter.getTermFrequency(t),
      Date: selectedLetter,
    })
  )
  // Sort array of objects in descending order
  .sort((a, b) => d3.descending(a.Frequency, b.Frequency))
  // Return only the top n sample
  .slice(0, 15)
```

<!-- Plot top n TFs per selected letter -->
```js
Plot.plot({
  title: `Richardson's Top ${topTermsFreq.length} Terms on ${letterPrettyDateFormatter(selectedLetter)}`,
  marginLeft: 100,
  grid: true,
  marks: [
    Plot.barX(
      topTermsFreq,
      {
        x: "Frequency",
        y: "Term",
        sort: {y: "-x"},
      }
    )
  ]
})
```

Term frequencies per document is helpful to a degree. With such a large corpus, you can imagine how difficult it would be to ascertain how important a term may be across the entire corpus, i.e., collection.

For example, Richardson's letter written on `12-15-2020` includes top terms such as *trump*, *vaccine*, and *security*. Yet, we might ask: *How descriptive are those terms beyond this 1 letter among the ${letterTitles.length-1} other letters?* To answer this question, we can contextualize a term across the collection with a method called ***Inverse Document Frequency (IDF)***, i.e., ***Collection Frequency (CF)***.

<p class="note">
  For your reference, there is some sample JS code commented out below this paragraph as a model about how to use and process TFs from the <code>corpus</code> class object.
</p>

<!-- ```js
let termFreqAll = corpus.getDocumentIdentifiers().map(
  (d) => {
    let topTermObjects = corpus
      .getDocument(d)
      .getUniqueTerms()
      .filter(t => !corpus.getStopwords().includes(t))
      .map(t => ({
        Doc: d,
        Term: t,
        Frequency: corpus.getDocument(d).getTermFrequency(t)
      }))
    return topTermObjects
  }
)
```

```js
let flatTerms = termFreqAll.flatMap(
  (a) => (a)
)
```

```js
let mappedTFs = d3.rollup(
  flatTerms,
  V => {
    return d3.sum(V, V => V.Frequency)
  },
  d => d.Term,
)
```

```js
mappedTFs.get("trump")
``` -->

## 2. Inverse Document Frequency (i.e., Collect Frequency)

Below shows us how to calculate the IDF, i.e., CF. Put simply, the IDF/CF is equal to the `log()` of `N`, the *total number of documents*, minus the `log()` of `n`, the *total number of documents with `t(i)` term in the collection*.

> ${tex`
> \text{Given:}\\
> \\[2ex]
> n = \text{the number of documents term t(i) occurs in}\\
> N = \text{the number of documents in the collection}\\
> \\[2ex]
> \text{the IDF Weight (CF) for a term is then\\}\\
> \\[2ex]
> IDF(i) or CF(i) = \log(N) - \log(n)`}

### 2.1 Why take the inverse of the document frequencies?

We take the *inverse*, or flipped fraction, of the document frequencies, because we want to boost the signal of rarer words that occur in relatively fewer documents. This calculation helps us raise potentially more interesting and descriptive words to the surface.

Take the illustrative dot chart of our corpus below. The IDF weight is higher when the word appears less across the entire collection, i.e., the word is more rare. We can use this number as a means to:

- **pro**mote words that may be distributed across the entire collection **infrequently**, and
- **de**mote words that may be distributed across the entire collection **frequently**.

Here's how we can illustrate this with **CF thresholds**. See the notebook and change the `maxCF` and `nTerms` constant variables.

```js
const maxCF = 1
const nTerms = 1000
let idfResults = corpus.getTerms()
  .map(term => ({
    Term: term,
    CF: corpus.getCollectionFrequency(term),
    CFW: corpus.getCollectionFrequencyWeight(term)
  }))
  .filter(d => (d.CF >= maxCF))
  .sort((a, b) => d3.descending(b.CFW - a.CFW))
  // Top `n` terms
  .slice(0, nTerms)
```

<!-- Dot chart of idfResults -->
```js
Plot.plot({
  x: {label: "CFW / IDF weight"},
  y: {label: "CF"},
  marginBottom: 50,
  marks: [
    Plot.dot(
      idfResults,
      {
        x: "CFW",
        y: "CF",
        fill: "Term",
        tip: true,
        // sort: {y: "x"},
      }
    )
  ]
})
```

<!-- Simple table of idfResults -->
```js
Inputs.table(
  idfResults
)
```

The creator of tiny-tfidf, Kerry Rodden, notes how a major implication of the original IDF weighted formula is rendered in the chart above:

  > ... a term that appears in every document will have a collection frequency weight of 0. Because the ${tex`CFW`} is used as a multiplier in the final term weight, this means that these very common terms effectively disappear, in the same way that stopwords do, and therefore will produce no results for a query. I think this is counterintuitive, so in the \`tiny-tfidf\` implementation, which is meant for educational purposes, I chose to use a collection frequency weight of ${tex`\ log(N+1) - log(n)`}, so that a term appearing in every document gets a very low weight, not zero.

Let's consider this consequence of IDF weights with an example.

<div class="example">
  <p>
    Think about the document frequency for the word <strong>said</strong> versus the word <strong>vaccine</strong>. In Richardson's corpus of letters:
  </p>
  <ul>
    <li><strong>said</strong> occurs in 1641 documents,
    <li><strong>vaccine</strong> occurs only in 480 documents, and
    <li><strong>trump</strong> occurs in 1580 documents.
  </ul>
  <p>
    <strong>Takeaway</strong>: The TF value alone will not always help us describe notable terms of interest.
  </p>
</div>

## 3. Adjusting Weights Based on Document length

Before we consider one way to start using TF-IDF analysis, we should be aware that the output model from the Corpus class constructor normalizes the results, based on the document lengths.

According to Rodden, we should also adjust the weights based on the length of the document. If we do not adjust our weights, based on the length of documents, then longer documents would all be weighted higher than short documents, simply because they have more occurrences of each term.

Here's the formula:

> ${tex`
> DL(j) = \text{the total of term occurrences in document}\ d(j)
> \\[2ex]
> \text{Normalize the measure by the length of an average document:}
> \\[2ex]
> NDL(j) = {\dfrac{DL(j)}{(\text{Average DL for all documents})}}
> `}

<!-- Retrieve the document lengths per letter: docLengths -->
```js
const docLengths = corpus
  .getDocumentIdentifiers()
  .map(d => {
    return {
      letterKey: d,
      docLength: corpus.getDocument(d).getLength()
    }
  })
  .sort((a, b) => {
    return (b.docLength - a.docLength)
  })
```

From the output `docLengths` Array of objects, we can retrieve the following results:

- **Average letter length**: ${d3.mean(docLengths, d => d.docLength).toFixed(2)} words.
- **Longest letter**: ${letterPrettyDateFormatter(docLengths[0].letterKey)}, with ${docLengths[0].docLength} words.
- **Shortest letter**: ${letterPrettyDateFormatter(docLengths[(docLengths.length-1)].letterKey)}, with ${docLengths[(docLengths.length-1)].docLength} words.
- **Number of letters below 100 words**: ${docLengths.filter(d => d.docLength < 100).length} letters.

<!-- Plot of docLengths -->
```js
Plot.plot({
  title: `Document length of each letter`,
  marks: [
    Plot.dot(
      docLengths,
      {
        x: "letterKey",
        y: "docLength",
        fill: "currentColor",
        fillOpacity: 0.35,
        tip: true,
      }
    ),
    Plot.linearRegressionY(
      docLengths,
      {
        x: "letterKey",
        y: "docLength",
        fillOpacity: 0.5,
      }
    )
  ]
})
```

<!-- Histogram plot of doc lengths -->
```js
Plot.plot({
  title: `Frequency distribution of document lengths (interval=100)`,
  y: {grid: true},
  color: {
    legend: true,
    scheme: "Tableau10",
  },
  marks: [
    Plot.ruleY([0]),
    Plot.rectY(
      docLengths,
      Plot.binX(
        {y: "count"},
        {x: "docLength", interval: 100,}
      )
    ),
    // Avg mean length
    Plot.ruleX(
      [d3.mean(docLengths, d => d.docLength)],
      {
        strokeWidth: 3,
        stroke: "black",
      }
    ),
  ]
})
```

<p class="question">
  What questions could you consider about the dataset and what to do to the data just by reviewing the document lengths?
</p>

## 4. How to Use TF-IDF Weighted Terms

Now, let's see how we might begin to use *IDF/CF* to our advantage with the `tiny-tfidf` `corpus`. Here are two possible approaches to start isolating patterns of interest.

### 4.1 How do non-weighted terms perform against weighted terms?

In the table below, we can compare, for every letter date, the most frequent term (that isn't a stopword) with the top TF-IDF weighted term. In some cases, the results are the same. Yet, in other cases, the most frequent term does not have the highest TF-IDF weight, depending on how often that term appears in other letters.

Recall how the term, ***trump***, occurs in 1580 letters of the total 2074 in the corpus. Consequently, the TF-IDF weighting demotes ***trump*** from being the top term for many letters. The same is true of other top frequency words, such as ***president*** or ***biden*** or ***republican***, etc.

<p class="question">
  Take a moment and search some terms. What do you notice about the results, when you compare the top TF term with the top TIFIDF weighted term?
</p>

<!-- Get top terms from each document in corpus -->
```js
const topTerms = corpus.getDocumentIdentifiers().map(
  (d) => {
    let topT = corpus
      .getDocument(d)
      .getUniqueTerms()
      .filter(t => !corpus.getStopwords().includes(t))
      .map(t => ({
        Term: t,
        Frequency: corpus.getDocument(d).getTermFrequency(t)
      }))
      .sort((a, b) => d3.descending(a.Frequency, b.Frequency))[0]

    let topTDoc = corpus.getTopTermsForDocument(d)[0]

    return {
      letterDate: d,
      "Most frequent (non-stopword) term": topT.Term,
      TF: topT.Frequency,
      "Top weighted term via TF-IDF": topTDoc[0],
      TFIDFW: topTDoc[1],
    }
  }
)
```

<!-- Text input for table -->
```js
const queryTopTerm = view(
  Inputs.text({
    label: html`<strong>Search "Most frequent ..." column</strong>`,
    placeholder: "Enter term to isolate"
  })
)
```

<!-- Filter topTerms with search query value -->
```js
const topTermsFiltered = topTerms.filter(t => (t["Most frequent (non-stopword) term"].includes(queryTopTerm)))
```

<!-- Apply search function to filtered data -->
```js
const searchtopTermsFiltered = Inputs.search(
  topTermsFiltered,
  {
    placeholder: "Search \"Most frequent (non-stopword) term\"",
    columns: ["letterDate", "Most frequent (non-stopword) term", "TF", "Top weighted term via TF-IDF", "TFIDFW"],
  }
)
const searchtopTermsFilteredResults = Generators.input(searchtopTermsFiltered)
```

<!-- Tabulate search results for top terms -->
```js
Inputs.table(
  searchtopTermsFilteredResults,
  {
    width: {
      letterDate: 30,
      "Most frequent (non-stopword) term": 50,
      TF: 20,
      "Top weighted term via TF-IDF": 50,
      TFIDFW: 20,
    },
    align: {
      letterDate: "center",
      "Most frequent (non-stopword) term": "left",
      TF: "center",
      "Top weighted term via TF-IDF": "left",
      TFIDFW: "center",
    },
  }
)
```

### 4.2 How do weighted terms perform across all documents in the corpus?

We can create a ***document rank score*** too! Rodden created `getResultsForQuery(query)`, which calculates a document rank score: ***the total combined IDF weight of each queried term that appears in the document***.

Below I provide a means of comparing two terms across the corpus, based on their document rank scores to spot any potential patterns. To process the `corpus` data, I used `getResultsForQuery()` from `tiny-tfidf`, which returns an array representing the highest scoring documents for the given term query.

 - each array entry is a pair of a document identifier and a score,
 - the array is sorted in descending order by the score.
 - The score for a document is the total combined weight of each query term that appears in the document.

To test out the helpfulness of document rank, consider the following specifying question:

> Does HCR discuss vaccines in relationship to U.S. CDC officials?

One way to see how these term perform together would be to enter the following 2 queries to compute the document ranks for each query:

1. **Vaccine Terms**: vaccine vaccines vaccinate vaccinated vaccination vaccinations
2. **U.S. Gov Terms**: cdc hargan azar cochran becerra rfk fink

Based on what you see, what preliminary conclusions could you draw from the visuals, and what new questions surface for you?

- Enter question/insight
- Enter question/insight
- Enter question/insight

<!-- Input texts for searchQuery1 & searchQuery2 -->
```js
const searchQuery1 = view(
  Inputs.text({
    label: html`<b>Term 1</b>`,
    placeholder: "Enter term 1 to query docs"
  })
)

const searchQuery2 = view(
  Inputs.text({
    label: html`<b>Term 2</b>`,
    placeholder: "Enter term 2 to query docs"
  })
)
```

<!-- Declare and instantiate queryResults() function -->
```js
/**
 * queryResults() uses tiny-tfidf's `getResultsForQuery(query)`.
 *
 * - returns an array representing the highest scoring documents for the given term query;
 * - each array entry is a pair of a document identifier and a score,
 * - the array is sorted in descending order by the score.
 * - The score for a document is the total combined weight of each query term that appears in the document.
**/

const queryResults = (query) => {
  if (query == "") {
    return [{
      Document: "No result",
      Score: "No result",
      Term: "No result",
    }]
  }
  else {
    const results = corpus
      .getResultsForQuery(query).map(
        (d) => ({
          Document: d[0],
          Score: d[1],
          Term: query,
        })
      )
    return results
  }
}
```

<!-- Call queryResults() -->
```js
let queryResults1 = queryResults(searchQuery1)
let queryResults2 = queryResults(searchQuery2)
```

<!-- Get max document rank score for the yAxis -->
```js
// 1. Use d3.max to get max values from eash result
const yMaxQuery1 = d3.max(queryResults1, d => d.Score)
const yMaxQuery2 = d3.max(queryResults2, d => d.Score)

// 2. Evaluate which value is higher
let yMax = 0
if (yMaxQuery1 > yMaxQuery2) {
  yMax = yMaxQuery1
}
else if (yMaxQuery1 < yMaxQuery2) {
  yMax = yMaxQuery2
}
```

<!-- Dot chart with linear regression line -->
```js
Plot.plot({
  title: `Document Rank Results for "${searchQuery1}" & "${searchQuery2}"`,
  subtitle: `Document rank = total combined TF-IDF weight of each queried term that appears in the document`,
  color: {
    legend: true,
    scheme: "Tableau10",
  },
  y: {domain: [0, yMax]},
  grid: true,
  marks: [

    // queryResults1
    Plot.dot(
      queryResults1,
      {
        x: "Document",
        y: "Score",
        sort: "Document",
        fill: "Term",
        fillOpacity: 0.5,
        tip: true,
      }
    ),
    Plot.linearRegressionY(
      queryResults1,
      {
        x: "Document",
        y: "Score",
        fill: "Term",
        fillOpacity: 0.5,
        stroke: "Term",
      }
    ),

    // queryResults2
    Plot.dot(
      queryResults2,
      {
        x: "Document",
        y: "Score",
        sort: "Document",
        fill: "Term",
        fillOpacity: 0.5,
        tip: true,
      }
    ),
    Plot.linearRegressionY(
      queryResults2,
      {
        x: "Document",
        y: "Score",
        fill: "Term",
        fillOpacity: 0.5,
        stroke: "Term",
        strokeDasharray: "4",
      }
    ),
  ]
})
```

<!-- Histogram plot of weighted search queried terms -->
```js
Plot.plot({
  title: `Frequency distribution of weighted scores for "${searchQuery1}" & "${searchQuery2}"`,
  y: {grid: true},
  color: {
    legend: true,
    scheme: "Tableau10",
  },
  marks: [
    Plot.ruleY([0]),

    // searchQuery1
    Plot.rectY(
      queryResults(searchQuery1),
      Plot.binX(
        {y: "count"},
        {x: "Score", interval: 0.2, fill: "Term", tip: true,}
      )
    ),

    // searchQuery2
    Plot.rectY(
      queryResults(searchQuery2),
      Plot.binX(
        {y: "count"},
        {x: "Score", interval: 0.2, fill: "Term", tip: true,},
      )
    ),

  ]
})
```

### Letter Lookup Tool

<!-- Inputs.select() to choose which letter to tabulate -->
```js
let selectedQueryLetter = view(
  Inputs.select(
    letterTitles,
    {
      multiple: false,
      label: "Choose a letter to view",
    }
  )
)
```

```js
let queriedLetter = corpus.getDocument(selectedQueryLetter)._text
```

```js
view(
  Inputs.textarea({
    label: `Selected letter from ${urlDateFormatter(selectedQueryLetter)}`,
    value: queriedLetter,
    disabled: true,
    readonly: true,
    rows: 50,
    width: 500,
    resize: true,
  })
)
```

## Conclusion

Overall, TF-IDF analysis can help us more easily recognize potential patterns of key terms across a large corpus of documents.

### Consider Some Next Steps

- **Data processing**:
  - Trim the data, based on lengths of documents, if it makes sense to do so.
  - Process the letters before we use the Corpus constructor, if we want to combine plural and singular versions of certain words.
  - Modify stop words, based on further analysis.
- **Analysis**:
  - `tiny-tfidf` can also perform a *cosine similarity* calculation, so you can test if certain letters share similar keywords. This would be a more interesting way to then group the data, based on those scores.

## About the Next Chapter

In the next chapter, we will learn how to incorporate another set of textual analysis tools:

1. **nGrams**: Instead of just 1 term at a time, we can group terms together, based on their collocation size.
2. **Name-Entity Recognition**: We can isolate parts of speech, such as by nouns, verbs, people, location, etc.

<!-- ## Test Cosine Similarity

Calculate similarity

```js
const similarity = new tfidf.Similarity(corpus)
```

Get the matrix

```js
const matrix = similarity.getDistanceMatrix()
```

Create UMAP layout:

```js
const umapLayout = new UMAP({
  metric: "precomputed",
  nComponents: 2,
  minDist: 0.2,
  nNeighbors: 7
}).fit(matrix.matrix)
```

```js
umapLayout
``` -->

<!-- ```js
Plot.plot({
  marks: [
    Plot.dot(
      umapLayout,
      {
        x: d => (d[0]),
        y: d => (d[1]),
      }
    )
  ]
}) -->