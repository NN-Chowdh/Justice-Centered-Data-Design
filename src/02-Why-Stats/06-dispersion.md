# Variability

```js
import {utcParse,utcFormat} from "d3-time-format";
import {standardDeviation, sampleSkewness, sampleKurtosis, ckmeans, variance} from 'npm:simple-statistics';
import {getUniquePropListBy,oneLevelRollUpFlatMap,twoLevelRollUpFlatMap,threeLevelRollUpFlatMap,mapDateObject,sumUpWithReducerTests, reduceRejectedBallots} from "./utils/utils.js"
```

How can we use our knowledge of central tendency, i.e., estimates of location, to ask questions about the data? In other words, how can we begin to define "normal" patterns across interested features, such as ballot requests status and race over time, so we can also judge what values of those features are not normal? And, is the central tendency of the data acceptable for the phenomena in question: mail-in ballot voting in North Carolina?

In this notebook, we will learn how to "read" and explore any new dataset by comparing and contrasting the central tendencies with its dispersion, i.e., variability.

## Learning Objectives

We will learn how to implement the following in JavaScript.

- Build on estimates of location (mean, median, mode)
- Understand how to describe the spread of data: range and standard deviation.
- Understand how to describe the shape of data: skewness and kurtosis.

## Normal Distribution & Standard Deviation

This number provides us a region within which we expect a certain percentage of our overall data. The figure below visualizes the ideal normal distribution.

<p class="figure-caption">By Ainali - Own work, CC BY-SA 3.0, (<a href="https://commons.wikimedia.org/w/index.php?curid=3141713" target="_blank" rel="noreferrer noopenner">Wikimedia</a>)</p>

![](./../assets/images/2-why-stats/06-Standard_deviation_diagram_micro.svg)

<!-- Attach the data -->
```js
const ncBallotRequests = FileAttachment("./../data/nc-voters/nc_absentee_mail_2024_updated_dates.csv").csv({typed: true})
```

<!-- Group & count `ballot_req_dt_week` > `race` > `ballot_rtn_status` -->
```js
const ballotsPerWeek = threeLevelRollUpFlatMap(
  ncBallotRequests,
  "ballot_req_dt_week",
  "race",
  "ballot_rtn_status",
  "af",
)
```

<!-- Reduce data -->
```js
const uniqueListOfWeekNumbers = getUniquePropListBy(ballotsPerWeek, "ballot_req_dt_week")
const reducerProps = getUniquePropListBy(ballotsPerWeek, "race")
let reducedBallotStatusData = reduceRejectedBallots(ballotsPerWeek, uniqueListOfWeekNumbers, reducerProps)
```

```js
let rejectedOnly = reducedBallotStatusData.filter(d => d.ballot_rtn_status == "REJECTED")
```

### Rejected ballots per week and race stats (%, percentage)

<!-- Create array of all percentages -->
```js
let rejPercentages = rejectedOnly.map(
  (d) => {
    if (isNaN(d.percentage) === false) {
      return d.percentage
    }
    else {
      return 0
    }
  }
)
```

#### Location

- **Average mean**: ${(d3.mean(rejectedOnly, d => d.percentage) * 100).toFixed(2)}%
- **Median**: ${(d3.median(rejectedOnly, d => d.percentage) * 100).toFixed(2)}%
- **Mode**: ${(d3.mode(rejectedOnly, d => d.percentage) * 100).toFixed(2)}%

#### Spread

The following concepts help us describe the spread of the datapoints in the dataset.

**Range**: ${d3.min(rejectedOnly, d => d.percentage)} - ${d3.max(rejectedOnly, d => d.percentage)}, (or ${d3.min(rejectedOnly, d => d.percentage)*100}% - ${d3.max(rejectedOnly, d => d.percentage)*100}%).
- What's the minumum and maximum values in the dataset?
- Sensitive to outliers and only accounts for two values of the entire dataset.

**Standard deviation of rejected ballots**: On average, all ballot rejections per week deviate from the mean by <strong>${(100 * standardDeviation(rejPercentages)).toFixed(2)}%</strong>.
  - Describes how much the data scatters, or is dispersed, around the mean.
  - In question format: How different are the rejected ballot percentages across each race?
  - Indicates whether the data points are in close proximity to the mean or whether they are spread out. In a normal distribution, standard deviation tells you how far values are from the mean.
    - *High standard deviation*: Large spread in the observed data around the mean for the data as a group.
    - *Low standard deviation*: Much of the data observed is clustered tightly around the mean.

<!-- Plot standard deviation and linear regression -->
```js
Plot.plot({
  color: {
    legend: true,
  },
  marks: [
    Plot.linearRegressionY(
      rejectedOnly,
      {
        x: "ballot_req_dt_week",
        y: "percentage",
      }
    ),
    Plot.dot(
      rejectedOnly,
      {
        x: "ballot_req_dt_week",
        y: "percentage",
        // r: "af",
        fill: "race",
        tip: true,
      }
    ),
    Plot.ruleY([d3.min(rejectedOnly, d => d.percentage)]),
  ]
})
```

**Variance of rejected ballots**: <strong>${(variance(rejPercentages))}</strong>
- ***Variance*** helps determine the data's spread size when compared to the ***mean*** value.
  - *High variance*: As the variance gets bigger, more variation in data values occurs, and there may be a larger gap between one data value and another.
  - *Low variance*: Consequently, if the data values are all close together, the variance will be smaller. If the data values are more spread apart from each other, the variance will be larger.
- Hard to interpret, because it is the standard deviation squared, so the unit is often different from the original.

#### Shape

We can also understand the dataset better by its different shapes. Based on the theory of normal distribution, we can then consider how the distribution of values may skew in certain directions right or left and/or up and down.

**Sample skewness**: ${sampleSkewness(rejPercentages)}
- Skewness measures the bias in a set of numbers. A right skew means that the average is above, or to the right, of most of the data points. A left skew means that the average is below, or to the left, of most of the data. A strong skew could mean a few extreme values that pull the average higher or lower. If there is no skew, the distribution of the numbers is the same on both sides of the average.
  - *`+` skewness*: Skewed to the right, so the average is above, or to the right, of most of the data.
  - *`-` skewness*: Skewed to the left, so the average is below, or to the left, of most of the data.
- Skewness could be "normal", depending on the context of the dataset.

**Sample kurtosis**: ${sampleKurtosis(rejPercentages)}
- Similar to skewness, except **kurtosis** measures the shape of the ***tails***, not ***peaks***.
- A kurtosis higher than normal means that the tails exceed the tails of a normal distribution.

Based on these numbers, and under the assumption that these numbers follow a *normal distribution*, we can say that the distribution is centered on the average of ${(d3.mean(rejectedOnly, d => d.percentage) * 100).toFixed(2)}, with a standard deviation ${tex`\sigma`} = ${(100 * d3.deviation(rejectedOnly, d => d.percentage)).toFixed(2)}%. (We can verify that this is a reasonable assumption using a [histogram](/@d3/histogram).)

<!-- Histogram of ALL rejected ballots -->
```js
Plot.plot({
  width,
  height: 320,
  marks: [
    Plot.rectY(
      rejectedOnly,
      Plot.binX(
        {y: "count"},
        {
          x: "percentage",
          // fill: "race",
          tip: true,
        },
      )
    ),
    Plot.ruleY([0]),
    Plot.ruleX(
      [d3.mean(rejectedOnly, d => d.percentage)],
      {
        stroke: "black",
        strokeWidth: 2,
      }
    ),
  ]
})
```

## Detecting outliers with the horizon chart

A horizon chart displays data over a continuous interval, such as a timeframe like weeks or any date value. The horizon chart helps us identify trends and extreme values within large datasets, rather than precisely pinpointing specific values. Indeed, this chart gives presence to overviews that highlight patterns and outliers in the data.

### Q: Which race demographic experienced the highest percentage of rejections, and during which week in the cycle?

```js
const percBands = view(
  Inputs.range([2, 8], {step: 1, label: "# of Bands for Horizon Chart"})
)
```

```js
const step = d3.max(rejectedOnly, (d) => d.percentage) / percBands;
```

```js
Plot.plot({
  height: 720,
  x: {axis: "top"},
  y: {domain: [0, step], axis: null},
  fy: {axis: null, domain: rejectedOnly.map((d) => d.race), padding: 0.05},
  color: {
    type: "ordinal",
    scheme: "Greens",
    label: "Ballots rejected per week",
    tickFormat: (i) => ((i + 1) * step).toLocaleString("en"),
    legend: true
  },
  marks: [
    d3.range(percBands).map((band) => Plot.areaY(rejectedOnly, {x: "ballot_req_dt_week", y: (d) => (d.percentage - band * step), fy: "race", fill: band, sort: "ballot_req_dt_week", clip: true})),
    Plot.axisFy({frameAnchor: "left", dx: -28, fill: "currentColor", textStroke: "white", label: null})
  ]
})
```

```js
const raceRejectedXY = Plot.normalizeX("sum", {z: "race", x: "af", y: "race"})
```

```js
Plot.plot({
  height: 660,
  marginLeft: 250,
  axis: null,
  grid: true,
  x: {
    axis: "top",
    label: "Rejected ballots (%)",
    percent: true
  },
  color: {
    scheme: "spectral",
    domain: rejectedOnly.af, // in order
    legend: true
  },
  marks: [
    Plot.ruleX([0]),
    Plot.ruleY(
      rejectedOnly,
      Plot.groupY({x1: "min", x2: "max"}, {...raceRejectedXY, sort: {y: "x1"}})
    ),
    Plot.dot(
      rejectedOnly,
      {...raceRejectedXY, fill: "race", title: "race",}
    ),
    Plot.text(
      rejectedOnly,
      Plot.selectMinX({...raceRejectedXY, textAnchor: "end", dx: -6, text: "race"})
    )
  ]
})
```
