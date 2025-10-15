# 2.5-Tending to The Mean, or Not?

```js
import {getUniqueDataBy, getUniquePropListBy, mapDateObject, oneLevelRollUpFlatMap, twoLevelRollUpFlatMap, threeLevelRollUpFlatMap, sumUpWithReducerTests, downloadAsCSV} from "./utils/utils.js"
```

## Start Your GH Workflow

Remember, before you start anything else, always follow this GH methodological workflow:

1. Create meaningful **branch** that uses the agreed upon naming scheme: `CHP/X.x--lastname`.
2. Practice the iterative process to **commit** and **push** regularly with meaningful **commit messages**.

## Overview

How do we know if a value is typical or atypical? How do you "read" large datasets?

In this chapter, we are going to practice "reading" datasets by calculating *estimates of location* and *estimates of variability*, so we can begin to better understand any new dataset.

## Readings

1. *Statistics for Social Justice*. Chapter 4 - "Central Tendency and Variability." pp. 45-57.

## Estimates of Location

One of the first steps with the dataset involves understanding the ***central tendency***: *What constitutes a "typical value" for each feature (variable) in the dataset*.

### Key terms

- **Mean**: The sum of all values divided by the number of values.
  - *Synonyms*: average, arithmetic mean
  - *Data Types*: All types.
  - *Caveats*: Sensitive to outliers, which could either be errors or important values to note and understand.
- **Weighted mean**: The sum of all values times a weight divided by the sum of the weights. The weighted value is one you define based on the relative importance or frequency of each data point in a dataset.
  - *Synonyms*: weighted average
  - *Data Types*: All types.
- **Trimmed mean**: The average of all values after dropping a fixed number of *extreme* values, as a method to calculate an average not skewed by outliers.
  - *Synonyms*: truncated mean
  - *Data Types*: All types.
  - *Caveats*: Be sure that you understand the context of those outlier values, so you do not exclude important context.
- **Median**: The value such that one-half of the data lies above and below. Unlike, the *mean*, the *median* is not influenced by outliers.
  - *Synonyms*: 50th percentile
  - *Data Types*: Ordinal, Interval, or Ratio levels. Not nominal, because it assumes the sequence of values matters.
- **Weighted median**: The value such that one-half of the sum of the weights lies above and below the sorted data.
  - *Data Types*: Ordinal, Interval, or Ratio levels. Not nominal, because it assumes the sequence of values matters.
- **Mode**: The mode is the value that occurs most frequently.
    - **Data Types**: All types.
- **Outliers**: While not necessarily a calculation, outliers are the potential result of the central tendencies in a dataset. Once you establish what is deemed *typical* in teh dataset, you may then also be able to identify outliers that will be dubbed *atypical* in relationship to the other data.
- **Precentiles**: A measure that isolates the value below which a given percentage of observations in a group falls. Percentiles divide the data into 100 equal parts, allowing us to see where a particular data point lies on this scale.

We can use D3's provided methods to calculate such measures quickly. In addition to the above initial 3 calculations, here are some other important methods that we will learn and use:

<!-- Sample uses of min, max, range -->
```javascript
// Simple dataset
let simpleRange = [-1.3, 0, 0.2, 0.2, 0.2, 0.5, 0.6, 0.7, 0.8, 2.2, 15.4]

// Median
d3.median(simpleRange) // 0.5

// Mode
d3.mode(simpleRange) // 0.2

// Mean
d3.mean(simpleRange) // 1.7727272727272727

/** Min & Max Values + Range
 * We can find the minimum & maximum
 * values in a set, then use those
 * values to create a range.
**/

// minVal == -1.3
const minVal = d3.min(simpleRange)
// maxVal == 15.4
const maxVal = d3.max(simpleRange)

/** .range() accepts a third optional parameter
 * to specify the interval.
 * We typically use range() when we are
 * plotting our data to create custom
 * axes.
**/
d3.range(minVal, maxVal, 0.1)
```

<!-- Executable min, max, range -->
```js
// Simple dataset
let simpleRange = [-1.3, 0, 0.2, 0.2, 0.2, 0.5, 0.6, 0.7, 0.8, 2.2, 15.4]

// Median
d3.median(simpleRange) // 0.5

// Mode
d3.mode(simpleRange) // 0.2

// Mean
d3.mean(simpleRange) // 1.7727272727272727

/** Min & Max Values + Range
 * We can find the minimum & maximum
 * values in a set, then use those
 * values to create a range.
**/

// minVal == -1.3
const minVal = d3.min(simpleRange)
// maxVal == 15.4
const maxVal = d3.max(simpleRange)

/** .range() accepts a third optional parameter
 * to specify the interval.
 * We typically use range() when we are
 * plotting our data to create custom
 * axes.
**/
d3.range(minVal, maxVal, 0.1)

```

## Example: Website Page Performance - First Contentful Paint (FCP)

Let's use these central tendency methods with a grounded example. I attached a dataset (`digArchivePageTests`) about a webpage test that measures the loading performance of digital archive webpages. Specifically, digital archives related to Native Alaskan content.

### About the archive site data

- *90 digital archive websites*, which tested anywhere between *2-5 pages per site* to produce *399 pages total*
- Test simulated a 3G mobile wireless connection with a moderately good bandwidth.
- Test was conducted to understand the current landscape of digital archive web performance that assumed a demographic who predominantly only had access to the internet via their mobile phone with 3G speed.

<!-- 1. Attach the data -->
```js
const digArchivePageTests = FileAttachment("./../data/archive-audit/archive-web-performance.csv").csv({typed: true})
```

```js
digArchivePageTests
```

Let's look more closely at a prominent measurement called **First Contentful Paint (FCP)**. FCP measures the first point in the page load timeline in milliseconds, where the browser can start rendering content to the user's screen.

The content that gets painted first could be anything ranging from:

- A block of text within a `<p>` or `<div>` element
- A graphic drawn in an SVG or `<canvas>` element
- An `<img>` element
- A background image set via CSS

### FCP threshold criteria

The standard thresholds to help contextualize the numbers are seen below. These thresholds serve as guidelines for developers to understand where their site stands in terms of user-perceived load speed.

- **Good**: Less than 1.8 second (1800 ms)
- **Needs improvement**: Between 1.8 seconds (1800 ms) and 3 seconds (3000 ms)
- **Poor**: Higher than 3 seconds (3000 ms)

In the attached dataset, `digArchivePageTests`, the FCP value in milliseconds uses the column name of `"first-contentful-paint-numericValue"`. Let's complete the following Rollup -> Flatten method:

1. Use `.rollup()` to create the set of central tendency measures as an object to return based on the grouped leaf node: `.hostname`, i.e., group the dataset by each webpage.
    1. Within `.rollup()`, create object of central tendency measurements on the leaf node by using D3's methods: `d3.mean`, `d3.median`, `d3.mode`, `d3.min`, `d3.max`, and the JS `.length` method.
    2. Rollup at per website level with `.hostname`.

<!-- Exectuable FCP rollup -->
```javascript
// FCP measured in milliseconds
const colOfInterest = "first-contentful-paint-numericValue"

// 1. Use `.rollup()`
const digArchiveRolledUp = d3.rollup(
  digArchivePageTests,
  // Based on the leaf node, create object of CT info
  leaf => {
    return {
      mean: d3.mean(leaf, l => l[colOfInterest]),
      median: d3.median(leaf, l => l[colOfInterest]),
      mode: d3.mode(leaf, l => l[colOfInterest]),
      min: d3.min(leaf, l => l[colOfInterest]),
      max: d3.max(leaf, l => l[colOfInterest]),
      length: leaf.length,
    }
  },
  // Will group at per website level
  d => d.hostname,
)
```

<!-- Exectuable FCP rollup -->
```js
const colOfInterest = "first-contentful-paint-numericValue"
const digArchiveRolledUp = d3.rollup(
  digArchivePageTests,
  // Based on the leaf node, create object of CT info
  leaf => {
    return {
      mean: d3.mean(leaf, l => l[colOfInterest]),
      median: d3.median(leaf, l => l[colOfInterest]),
      mode: d3.mode(leaf, l => l[colOfInterest]),
      min: d3.min(leaf, l => l[colOfInterest]),
      max: d3.max(leaf, l => l[colOfInterest]),
      length: leaf.length,
    }
  },
  d => d.hostname,
)
```

<p class="codeblock-caption">
  Output of the rolled up archival data at per website level with CT scores as an object.
</p>

```js
digArchiveRolledUp
```

```js
// Convert results back to a flat array of objects
let digArchiveCentralTendencies = Array.from(
  digArchiveRolledUp,
  ([domain, ctResults]) => {
    return {
      hostname: domain,
      mean: ctResults.mean,
      median: ctResults.median,
      mode: ctResults.mode,
      min: ctResults.min,
      max: ctResults.max,
      length: ctResults.length,
    }
  }
)
```

## Exploratory Data Analysis of Central Tendency Measures

Let's exlore the milliseconds results of the FCP per digital archive.

```js
// Options to change in the plot
const ctMeasure = "mean"
const auditMetric = `First Contentful Paint (milliseconds)`
const fcpGoodThreshold = 3000
const sumBad = d3.sum(digArchiveCentralTendencies, d => {
  // BAD
  if (d.mean > 3000) { return 1 }
})
```

### What's the overall frequency distribution of mean FCP scores?

Remember that histograms help us see the distribution along set intervals. In this case the metric of FCP has a 3000ms threshold, where scores below 3000 are considered Good & Ok, while Bad scores include everything above 3000ms.

<!--HISTOGRAM of `digArchiveCentralTendencies` MEAN SCORE FREQ DISTRIBUTION -->
```js
Plot.plot({
  title: `Overall Frequency Distribution of Average Mean FCP (ms) Per Page`,
  grid: true,
  marks: [
    Plot.rectY(
      digArchiveCentralTendencies,
      Plot.binX(
        {y: "count"},
        {
          x: "mean",
          r: 4,
          tip: true,
          // Set interval based on metric
          interval: 3000,
        },
      ),
    ),
    Plot.ruleY([0]),
  ]
})
```

### What are the CT FCP results per hostname/website?

Let's look at the results, as grouped by the `hostname`, i.e., the website.

In the bar chart below, each bar represents a website. Then, the plot means to answer the question: ***What is the mean per hostname, and how many hostnames are witin each FCP threshold?***

<!-- Executable Plot.plot() of the `digArchiveCentralTendencies` -->
```js
Plot.plot({
  title: `Average ${ctMeasure} ${auditMetric}, where ${sumBad} archives scored poorly. (Dots mark the median value.)`,
  marginLeft: 200,
  grid: true,
  marks: [
    //
    Plot.barX(
      digArchiveCentralTendencies,
      {
        y: "hostname",
        x: ctMeasure,
        sort: {y: "-x"},
        tip: true,
        // Use threshold milliseconds metric for fill color
        fill: (d) => {
          // BAD
          if (d.mean > 3000) { return "red" }
          // OK
          else if (d.mean > 1800 && d.mean <= 3000) { return "orange" }
          // GOOD
          else if (d.mean <= 1800) { return "currentColor"}
        },
      }
    ),

    // Plot median values
    Plot.dot(
      digArchivePageTests,
      {
        y: "hostname",
        x: colOfInterest,
        sort: {y: "-x"},
        stroke: "black",
      }
    ),

    // Threshold value for "OK" == 3000ms
    Plot.ruleX(
      [fcpGoodThreshold],
      {
        stroke: "black",
        strokeWidth: 2,
      }
    ),
  ]
})
```

## How can we emphasize the distribution of those FCP scores?

You may have noticed how there are some websites in the dataset with some atypical values. While the bar-dot chart gave us the opportunity to see some possible atypical values, we can alternatively use Observable's faceting plots to help us see the distribution in a different way.

```js
Plot.plot({
  color: {legend: true, scheme: "YlGnBu", label: "Frequency Ratio (0-1)"},
  marginLeft: 200,
  padding: 0,
  x: {grid: true},
  // `fy` is the "force-directed" y-axis value, which groups the y axis per hostname in this case
  fy: {
    domain: d3.groupSort(
      digArchivePageTests.filter(
        (d) => d[colOfInterest]),
        (Group) => {
          // What's Group? Log it and find out.
          // console.log("hostname MEAN:", d3.mean(Group, (g) => g[colOfInterest]))
          return d3.mean(Group, (g) => g[colOfInterest])
        },
      (d) => d.hostname,
    )
  },
  marks: [
    Plot.rect(
      digArchivePageTests,
      Plot.binX(
        {
          fill: "proportion-facet",
        },
        {
          x: colOfInterest,
          fy: "hostname",
        }
      ),
    ),

    // Threshold value for "OK" == 3000ms
    Plot.ruleX(
      [fcpGoodThreshold],
      {
        stroke: "red",
        strokeWidth: 2,
      }
    ),
  ]
})
```

## Submission

1. Create a **PR** (**pull request**) and use the provided content in the template to start it.
2. Respond to your peers and comment on their work on at least one chapter..
3. Submit the PR link in Moodle, when you're ready.
