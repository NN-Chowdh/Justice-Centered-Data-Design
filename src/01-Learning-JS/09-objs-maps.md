# 1.9 Objects & Maps

## Start Your GH Workflow

Remember, before you start anything else, always follow this GH methodological workflow:

1. Create meaningful **branch** that uses the agreed upon naming scheme: `CHP/X.x--lastname`.
2. Practice the iterative process to **commit** and **push** regularly with meaningful **commit messages**.

## Overview

In the previous lessons, we used individual variables to represent some of the demographic information about the 19th century Irish immigrants featured in the [Bellevue Almshouse data](https://gih-nyc.org/almshouse/the-almshouse-records/), such as names.

```javascript
let person1Name = 'Marry Gallagher'
let person2Name = 'John Sanin'
```

We learned that Array lists help us create a *collection* of values rather than individual variables.

```javascript
let names = ['Mary Gallagher', 'John Sanin', 'Anthony Clark', 'Margaret Farrell']
```

Yet, if all of this data are meaningful together, we should use data types that helps us self-document our data. By self-document, I mean that the each ***value*** in the data should be labeled as a means for readers to understand what the values mean.

Indeed, we also learned how CSV and JSON data-interchange formats self-document the values in data: CSV files with column names as the first row, and JSON files with key/value pairs.

Since we will want to learn how to design more robust data relationships and values, let's take some time to learn a few common JS data structures, functions, and methods that help us work with datasets.

## 1.9.1 The Ubiquitous Data Problem: Processing It

At this point in the chapter, you might be asking yourself, "Why do I need to learn more JS data structures?"

The answer? It's because datasets are complex and often designed with situated goals in mind of their creators. Due to this goal-orientedness of data, and how data now travels across contexts much more than it ever has in our networked globe, datasets rarely come in the exact structure that we may need for our goals and needs.

Indeed, according to a survey of over 16,000 data-science practitioners ([Kaggle, 2017](https://web.archive.org/web/20181130112939/https://www.kaggle.com/surveys/2017)), data processing is the most common barrier that they face at work before their desired analysis. Due to this unavoidable situation, data work often requires processing work. In fact, it's normally the most time-consuming part of any data-driven project.

Processing is a catch-all term that typically refers to any actions that take data in its original provenance and dis-aggregated form and change any structure and/or values, as desired, by the new persons in new contexts and situations.

So, we need to learn about few more data structures called ***Maps***, so we can complete our goals for the data with confidence.

<div class="note--suggested-reading">
  <p>
    Read the below articles to learn more about how much interpretation and deliberation work goes into data processing work.
  </p>
  <ul>
    <li>Lindgren, Chris. (2024). A stasis network methodology to reckon with the rhetorical process of data: How a data team qualified meaning and practices. <cite>Technical Communication Quarterly</cite>, 33(4), 475-500. doi: <a href="https://doi.org/10.1080/10572252.2024.2306259">10.1080/10572252.2024.2306259</a>
    <li>Lindgren, Chris. (2021). Writing with data: A study of coding on a data-journalism team. <cite>Written Communication</cite>, 38(1), 114-162. doi: <a href="https://doi.org/10.1177/0741088320968061">10.1177/0741088320968061</a>.
  </ul>
</div>

## 1.9.2 JS Object Literals & Array of Objects

Ok, so we learned a little about the CSV and JSON data-interchange formats—formats that people can use across nation-states and expect them to work well.

Now, let's learn about some JS-specific data types that you will use frequently. Similar to JSON, the JS language uses ***Object Literals*** to create a collection of multiple types of name/value pairs. Object literals are scoped with opening and closing curly braces, `{ }`, where in-between them we add our key/value pairs, each of which we demarcate with a comma: `{ key: value, key: value, key: value, }`.

<p class="note">
  Unlike JSON, JS object literal keys need not be wrapped in double-quotes.
  <br>
  <br>
  Additionally, JS also has another type of Object different from Object literals. We only need to focus on object literals for this course.
  <br>
  <br>
  If I refer to a JS Object in this textbook, it will refer to object literals, unless otherwise specified.
</p>

A common structure used to create a collection of objects is to push them into an Array `[]`. Indeed, recall how when you load data with Observable Framework's `FileAttachment` function, it will automatically convert it into an Array of Objects:

```javascript
[
  {uniqKey: value, ...},
  {uniqKey: value, ...},
  {uniqKey: value, ...},
  ...
]
```

Creating an Array of objects is very helpful with more complex data, because of the self-documenting aspects of key/value pairs and their capacity to create more meaningful relationships between parts of the data via nested hierarchies. Arrays of objects offer us lots of flexibility and creativity when structuring our data. For example, the below example comes from a sample of NC 2024 voter data. Each object represents 1 voter

<!-- Declare nc2024SampleVoters -->
```js
// Sample of 4 randomly selected abridged entries from NC November 2024 absentee voter data
let nc2024SampleVoters = [
  {
    id_num: 452004,
    county_desc: "WAKE",
    race: "WHITE",
    ethnicity: "NOT HISPANIC or NOT LATINO",
    gender: "F",
    age: 65,
    voter_city: "RALEIGH",
    voter_state: "NC",
    voter_zip: 27614,
    voter_party_code: "DEM",
    precinct_desc: "PRECINCT 02-02",
    ballot_req_dt: "1/10/24",
    ballot_req_type: "MAIL",
    ballot_request_party: "DEM",
    ballot_rtn_dt: null,
    ballot_rtn_status: "SPOILED-EV",
    ballot_send_dt: "9/24/24",
  },
  {
    id_num: 462107,
    county_desc: "WAYNE",
    race: "BLACK or AFRICAN AMERICAN",
    ethnicity: "UNDESIGNATED",
    gender: "F",
    age: 53,
    voter_city: "GOLDSBORO",
    voter_state: "NC",
    voter_zip: 27530,
    voter_party_code: "DEM",
    precinct_desc: 29,
    ballot_req_type: "MAIL",
    ballot_request_party: "DEM",
    ballot_req_dt: "9/21/24",
    ballot_send_dt: "9/24/24",
    ballot_rtn_dt: null,
    ballot_rtn_status: "SPOILED-EV"
  },
  {
    id_num: 436436,
    county_desc: "WAKE",
    race: "ASIAN",
    ethnicity: "UNDESIGNATED",
    gender: "M",
    age: 60,
    voter_city: "CARY",
    voter_state: "NC",
    voter_zip: 27519,
    voter_party_code: "UNA",
    precinct_desc: "PRECINCT 20-15",
    ballot_req_type: "MAIL",
    ballot_request_party: "UNA",
    ballot_req_dt: "8/7/24",
    ballot_send_dt: "9/24/24",
    ballot_rtn_dt: null,
    ballot_rtn_status: null
  },
  {
    id_num: 367818,
    county_desc: "SURRY",
    race: "WHITE",
    ethnicity: "NOT HISPANIC or NOT LATINO",
    gender: "F",
    age: 81,
    voter_city: "MOUNT AIRY",
    voter_state: "NC",
    voter_zip: 27030,
    voter_party_code: "REP",
    precinct_desc: "MT AIRY #9",
    ballot_req_type: "MAIL",
    ballot_request_party: "REP",
    ballot_req_dt: "9/25/24",
    ballot_send_dt: "9/26/24",
    ballot_rtn_dt: null,
    ballot_rtn_status: null
  },
]
```

<p class="codeblock-caption">
  Interactive output of <code>nc2024SampleVoters</code>:
</p>

```js
nc2024SampleVoters
```

Note how each voter object includes three main types of information: **demographics**, ***location***, and **ballot information**. So, another approach to the structure could group the each voter object into those three categories in a nested hierarchy: `{ demographics: {...}, location: {...}, ballot_info: {...} }`.

<!-- Assign nc2024GroupedVoterInfo -->
```js
// Variation on structure per voter
let nc2024GroupedVoterInfo = [
  {
    demographics: {
      id_num: 436436,
      race: "ASIAN",
      ethnicity: "UNDESIGNATED",
      gender: "M",
      age: 60,
      voter_party_code: "UNA",
    },
    location: {
      county_desc: "WAKE",
      voter_city: "CARY",
      voter_state: "NC",
      voter_zip: 27519,
    },
    ballot_info: {
      ballot_req_type: "MAIL",
      ballot_request_party: "UNA",
      ballot_req_dt: "8/7/24",
      ballot_send_dt: "9/24/24",
      ballot_rtn_dt: null,
      ballot_rtn_status: null
    }
  },
]
```

<p class="codeblock-caption">
  Interactive output of <code>nc2024GroupedVoterInfo</code>
</p>

```js
nc2024GroupedVoterInfo[0]
```

### Accessing, setting, and updating object properties

Here's how to access properties of an object. To practice, I created a new executable `js` codeblock below and declared and assigned the above array of object literals: `nc2024VoterInfo`.

<!-- Declare nc2024VoterInfo -->
```js
let nc2024VoterInfo = [
  {
    demographics: {
      id_num: 436436,
      race: "ASIAN",
      ethnicity: "UNDESIGNATED",
      gender: "M",
      age: 60,
      voter_party_code: "UNA",
    },
    location: {
      county_desc: "WAKE",
      voter_city: "CARY",
      voter_state: "NC",
      voter_zip: 27519,
    },
    ballot_info: {
      ballot_req_type: "MAIL",
      ballot_request_party: "UNA",
      ballot_req_dt: "8/7/24",
      ballot_send_dt: "9/24/24",
      ballot_rtn_dt: null,
      ballot_rtn_status: null
    }
  },
]
```

Recall that this outermost structure is an Array `[]`, so we can use each item's index position to access each object.

#### Access first object in Array

Easy review here. Use the index position to access each object literal in the Array.

**The output:**

```js
nc2024VoterInfo[0]
```

#### Access object properties with dot notation

Use dot notation to access values of object properties: `nc2024VoterInfo[0].demographics`. It can be understood as follows:

1. `[0]` -- Access first object in Array
2. `.demographics` -- Access demographics object

**The output:**

```js
nc2024VoterInfo[0].demographics
```

#### Access nested object properties with chained dot notation

You can chain dot notation properties, which represent the hierarchy in the object literal. It's simple. If we tack on `.race` after `.demographics`, we can access the race object value nested within the demographics object: `nc2024VoterInfo[0].demographics.race`.

**The output:**

```js
nc2024VoterInfo[0].demographics.race
```

#### Loop objects with `for...of` loop

Let's use the `nc2024SampleVoters` Array of objects to learn about looping through all of the objects.

In JS, one of the current best practices is to use the `for...of` loop. This looping method helps you define a meaningful variable to use within the scope of the loop. In this case, each object in the array represents one voter, so it makes sense to name the variable as such.

<!-- for...of example -->
```javascript
for (const voter of nc2024SampleVoters) {
  console.log(
    "Voter number",
    voter.id_num,
    "requested their ballot on",
    voter.ballot_req_dt
  )
  // Logs
  // Voter number 452004 requested their ballot on 1/10/24
  // Voter number 462107 requested their ballot on 9/21/24
  // ...
}
```

#### Set/update new values for properties

Now that we know how to loop through an Array of objects, let's learn how to loop through an array of objects with `for...of`, so we can **add new properties and values**, as well as **update values on existing properties**.

```js
import {utcParse,utcFormat} from "d3-time-format";

// D3 Date Parser
const parseDateSlash = utcParse("%d/%m/%y")
// D3 Date Formatters
const formatExistingDate = utcFormat("%d/%m/%Y")
const formatMonthName = utcFormat("%B")
const formatPrettyDate = utcFormat("%a, %b %d, %Y")
```

<!-- Assign nc2024SampleVotersUpdate -->
```js
let nc2024SampleVotersUpdate = [
  {
    id_num: 452004,
    county_desc: "WAKE",
    race: "WHITE",
    ethnicity: "NOT HISPANIC or NOT LATINO",
    gender: "F",
    age: 65,
    voter_city: "RALEIGH",
    voter_state: "NC",
    voter_zip: 27614,
    voter_party_code: "DEM",
    precinct_desc: "PRECINCT 02-02",
    ballot_req_dt: "1/10/24",
    ballot_req_type: "MAIL",
    ballot_request_party: "DEM",
    ballot_rtn_dt: null,
    ballot_rtn_status: "SPOILED-EV",
    ballot_send_dt: "9/24/24",
  },
  {
    id_num: 462107,
    county_desc: "WAYNE",
    race: "BLACK or AFRICAN AMERICAN",
    ethnicity: "UNDESIGNATED",
    gender: "F",
    age: 53,
    voter_city: "GOLDSBORO",
    voter_state: "NC",
    voter_zip: 27530,
    voter_party_code: "DEM",
    precinct_desc: 29,
    ballot_req_type: "MAIL",
    ballot_request_party: "DEM",
    ballot_req_dt: "9/21/24",
    ballot_send_dt: "9/24/24",
    ballot_rtn_dt: null,
    ballot_rtn_status: "SPOILED-EV"
  },
  {
    id_num: 436436,
    county_desc: "WAKE",
    race: "ASIAN",
    ethnicity: "UNDESIGNATED",
    gender: "M",
    age: 60,
    voter_city: "CARY",
    voter_state: "NC",
    voter_zip: 27519,
    voter_party_code: "UNA",
    precinct_desc: "PRECINCT 20-15",
    ballot_req_type: "MAIL",
    ballot_request_party: "UNA",
    ballot_req_dt: "8/7/24",
    ballot_send_dt: "9/24/24",
    ballot_rtn_dt: null,
    ballot_rtn_status: null
  },
  {
    id_num: 367818,
    county_desc: "SURRY",
    race: "WHITE",
    ethnicity: "NOT HISPANIC or NOT LATINO",
    gender: "F",
    age: 81,
    voter_city: "MOUNT AIRY",
    voter_state: "NC",
    voter_zip: 27030,
    voter_party_code: "REP",
    precinct_desc: "MT AIRY #9",
    ballot_req_type: "MAIL",
    ballot_request_party: "REP",
    ballot_req_dt: "9/25/24",
    ballot_send_dt: "9/26/24",
    ballot_rtn_dt: null,
    ballot_rtn_status: null
  },
]
```

This voter data has lots of dates, which we learned how to process and change with parsers and formatters from D3.js/Observable. Let's In the codeblock below with a new version of the data assigned to the variable `nc2024SampleVotersUpdate`.

<!-- Rendered for...of nc2024SampleVotersUpdate -->
```javascript
for (const voter of nc2024SampleVotersUpdate) {
  // Create a Date object from the String value
  let voterReqDate = parseDateSlash(voter.ballot_req_dt)

  // Update existing date with more standard String
  // 1/1/24 ==> 01/01/2024
  voter.ballot_req_dt = formatExistingDate(voterReqDate)

  // Set new properties to the voter object
  voter.ballot_req_dt_obj = voterReqDate
  voter.ballot_req_month = formatMonthName(voterReqDate)
  voter.ballot_req_pretty_date = formatPrettyDate(voterReqDate)

  // Log to console for review
  console.log(
    "Voter Num:",voter.id_num,
    "--",
    voter
  )
}
```

<!-- Executed for...of nc2024SampleVotersUpdate -->
```js
for (const voter of nc2024SampleVotersUpdate) {
  // Create a Date object from the String value
  let voterReqDate = parseDateSlash(voter.ballot_req_dt)

  // Update existing date with more standard String
  // 1/1/24 ==> 01/01/2024
  voter.ballot_req_dt = formatExistingDate(voterReqDate)

  // Set new properties to the voter object
  voter.ballot_req_dt_obj = voterReqDate
  voter.ballot_req_month = formatMonthName(voterReqDate)
  voter.ballot_req_pretty_date = formatPrettyDate(voterReqDate)

  // Log to console for review
  console.log(
    "Voter Num:",voter.id_num,
    "--",
    voter
  )
}
```

Convert the above codeblock to be executable, so you can see how three new properties have been set to each voter object in the array:

1. `ballot_req_dt_obj`
2. `ballot_req_month`
3. `ballot_req_pretty_date`

Additionally, we reformatted the original String date to include leading zeroes for the month and date, as well as provide the full four-digit year. Below is what the console will log for the first object in the array.

<p class="codeblock-caption">
  Interactive output of <code>nc2024SampleVotersUpdate</code>
</p>

```js
nc2024SampleVotersUpdate
```

#### Iterate iterables with `.map()`

The built-in `.map()` method is one more method to iterate an iterable like an array of objects. We use .map() when we want to create a brand new iterable, rather than update an existing one like above.

Let's say we had questions about what months people requested dates per county. So, now we need to make a new array that is solely about the ballot request months in each county in the data. To do so, we want to create an array where each item has two properties: `county` and `reqMonth`. We can use `map()` to iterate each object within the array of `nc2024SampleVotersUpdate` and isolate our targeted properties to then output a reduced version of the original data.

First, here's how `.map()` works. Think of `.map()` as a new expression that consolidates the for loop statement. Instead of writing

> `for (const item of Iterable) { do something with item in here ... }`

`.map()` simply let's you pass the item into a function expression:

> `(item) => { do something with item in here ... }`

```javascript
// .map() expects a Function as a parameter
iterableData.map(
  (itemAsParam) => {
    // do something with item in here ...
    return // whatever new value
  }
)
```

Here's how it looks for our example of isolating requested ballot months for each voter's county.

<!-- Rendered map() of ballotRequestMonthsPerCounty -->
```javascript
let ballotRequestMonthsPerCounty = nc2024SampleVotersUpdate.map(
  (voter) => {
    // Create a Date object from the String value
    const voterReqDate = parseDateSlash(voter.ballot_req_dt)
    const reqMonth = formatMonthName(voterReqDate)
    const county = voter.county_desc

    /**
     * Returns object with Self-assigned properties
     * The keys beome county & reqMonth
     * while also assigning values to those
     * properties from those same-named variables
    **/
    return {county, reqMonth}
  }
)
```

<!-- Executed map() ballotRequestMonthsPerCounty -->
```js
let ballotRequestMonthsPerCounty = nc2024SampleVotersUpdate.map(
  (voter) => {
    // Create a Date object from the String value
    const voterReqDate = parseDateSlash(voter.ballot_req_dt)
    const reqMonth = formatMonthName(voterReqDate)
    const county = voter.county_desc

    /**
     * Returns object with Self-assigned properties
     * The keys beome county & reqMonth
     * while also assigning values to those
     * properties from those same-named variables
    **/
    return {county, reqMonth}
  }
)
```

<p class="codeblock-caption">
  Interactive output of <code>ballotRequestMonthsPerCounty</code>:
</p>

```js
ballotRequestMonthsPerCounty
```

## 1.9.3 Why Create Maps & Groups?

In JS, an Array of Objects is great structures for meaningfully storing, structuring, and transforming datasets in JS. But, throughout the remainder of the chapter, we are going to learn JS and D3.js/Observable data types called ***maps***.

Maps will help us more easily process the data into a structure that will help us ask new questions of the it, because they include built-in methods to help us aggregate the data into new groups and subgroups.

## 1.9.4 JS Map() - Grouping Data by Fields

JS has a built-in global data type that resembles the Array of Objects called `Map()` (see [MDN page](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)).

The global JS Map object holds key-value pairs like basic Arrays of Objects. Yet, a Map() and Array of Objects have two notable differences:

- **Key Types**: A Map() "remembers" the original insertion order of the keys—a simple Array of objects does not.
- **Key Order**: The keys of a Map() can be any value, including more complex things like functions, objects, or any primitive. But, those use cases may not crop up in this course. `:-)`
- **Built-In Methods**: A Map() also includes a useful collection of ***built-in methods*** to use and transform the data—a simple Array of objects does not.

Let's take some time to learn about these features of a Map() with some commonly used methods.

### Typical uses of Map() methods

#### .get() & .set() methods

You can easily get, i.e., retrieve, a value in a Map() via its `.get()` method.

All values will be keyed uniquely, so it takes a key as a parameter to return the keyed value.

##### Example `.get()` method

```javascript
const myMap = new Map()
myMap.set("key", "value")

console.log(myMap.get("key")) // Returns "value"
console.log(myMap.get("keyNotInMap")) // Returns undefined
```

Sometimes you need to add new keyed values or update an existing keyed value in a dataset. Use `.set()` to add or update a Map().

##### Example `.set()` method

```javascript
const myMap = new Map()

// Add new elements to the map
myMap.set("key", "value")
// myMap.get("key") ==> "value"

// Update an element in the map
myMap.set("key", "updatedValue")
// myMap.get("key") ==> "updatedValue"
```

#### .has() - Check if key exists

Sometimes you need to check if a key exists. Do so with .has().

```javascript
const myMap = new Map()
myMap.set("key", "value")

console.log(myMap.has("key")) // Returns Boolean of true
console.log(myMap.has("keyNotInMap")) // Returns Boolean of false
```

#### Iterate a Map() with for...of loop

You will definitely need to iterate through maps for multiple reasons. Use the `for...of` looping method to do so.

```javascript
const myMap = new Map()
myMap.set(0, "zero")
myMap.set(1, "one")

// "Spread" assign the values in an array
for (const [key, value] of myMap) {
  console.log(`${key} = ${value}`)
}
// 0 = zero
// 1 = one

for (const key of myMap.keys()) {
  console.log(key)
}
// 0
// 1

for (const value of myMap.values()) {
  console.log(value)
}
// zero
// one

for (const [key, value] of myMap.entries()) {
  console.log(`${key} = ${value}`)
}
// 0 = zero
// 1 = one
```

#### Convert and aggregate an object array as a Map() grouped the data by a chosen data field

Ok. Here's a great case for using Map!

Sometimes you need to group an array of objects by a specific field in your data.

For example, if your data set is at the individual voter level, like `nc2024SampleVotersUpdate`, but you need the data organized by voters' ***requested ballot party affiliation***, you can group the per Voter level by the available `ballot_request_party` field. The final returned Map uses the unique values from `.groupBy()` as keys, which can be used to get the array of elements in each group.

Before we move forward with this example, let's break that structure down in a simplified fashion. Here's the basic structure and pieces:

<!-- EXAMPLE .groupBy() structure -->
```javascript
Map.groupBy(arrayOfObjectsHere,
  ({parameterHere, anotherParamAsNeeded}) => {
    // Function will go through each object/'row' in the data,
    // so code in this body will evaluate on per object basis
  }
)
```

Still tricky to understand. No problem. Let's review how that looks like in practice with our running `nc2024SampleVotersUpdate` array of objects:

<!-- EXAMPLE .groupBy() in practice -->
```javascript
// Create and assign the groupBy result to a new variable
let ncVotersGroupedByParty = Map.groupBy(nc2024SampleVotersUpdate,
  ({ballot_request_party}) => {
    /**
      * Enter desired evaluative expression(s)
      * Let's use simple conditionals to tell JS how to
      * explicitly group the data by the available
      * ballot_request_party values
    **/
    if (ballot_request_party == "REP") { return "REP" }
    else if (ballot_request_party == "DEM") { return "DEM" }
    else if (ballot_request_party == "UNA") { return "UNA" }
  }
)
```

<!-- Assign ncVotersGroupedByParty with .groupBy() -->
```js
let ncVotersGroupedByParty = Map.groupBy(nc2024SampleVotersUpdate,
  ({ballot_request_party}) => {
    if (ballot_request_party == "REP") { return "REP" }
    else if (ballot_request_party == "DEM") { return "DEM" }
    else if (ballot_request_party == "UNA") { return "UNA" }
  }
)
```

<p class="codeblock-caption">
  Interactive JS Map() object output of <code>ncVotersGroupedByParty</code>
</p>

```js
ncVotersGroupedByParty
```

The built-in JS Map is great, but there are some reasons that we should learn D3's version of the Map object called an InternMap. Thankfully, they're really close to the same thing with some upgraded features. Plus, we will be using InterMaps quite a bit, so let's take make sure we learn how to use them.

## 1.9.5 D3.js InternMap() Easily Group Data

<!-- Import the InternMap for use from D3's array lib/module -->
```js
import {InternMap} from "d3-array";
```

In addition to JS's built-in data structures, like Arrays, Object Arrays, and Map(), we should also learn some of D3.js' data structures, since we are already importing and using it. Why? Because sometimes JS doesn't do what you think it will, and other development communities, like D3 and Observable, have been doing great data work with JS, so they have created some robust functions and methods to use.

The main reason why we should learn how to use D3's InternMaps over the regular JS Map has to do with using the Date object as keys to group our data. For example, if you use dates as keys in a JavaScript Map, you may be surprised that it won’t work as you expect. Indeed, if you use `Date()` objects as keys in a `Map()`, JS will not always respect the one unique key per collection rule. Let's see what happens in the example below:

```javascript
// Example JS Map() with Date() objects as keys
let vanillaJsDateMap = new Map([
  [new Date(Date.UTC(2001, 0, 1)), "red"],
  [new Date(Date.UTC(2001, 0, 1)), "green"] // distinct key!
])

// Try to .get() the desired entry at that date
vanillaJsDateMap.get(new Date(Date.UTC(2001, 0, 1))) // --> undefined!
```

Why does this happen in JS? In this case of Map(), **those Date() objects as keys are not being evaluated as the same moment in time**.

Instead, `Map()` uses the [SameValueZero algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) to determine ***key equality***. By key equality, I mean that JS evaluates the uniqueness of keys by checking if the keys are the same ***instantiated instance of the Date() object***. In other words, two **dates** are only considered the same, i.e., unique keys in a collection, if those Date objects are the same object being stored in the computer's memory.

***Woof!***

To avoid this issue, enter D3.js' `InternMap()`.

Akin to Object Arrays, D3.js has the InternMap. ***Interning*** is specific method for using keys that help us group the data more meaningfully for analysis and visualization later. Specifically, interning as a main feature of grouping data helps us consistently store only one copy of each distinct key, i.e., group. Based on this assumption of the InternMap(), you should know how JS/D3.js stores the data, so you don't accidentally overwrite/erase your data, when grouping it via an InternMap.

For example, the below InternMap considers two Date instances representing the same moment to be equal, so the environment will only store the first instance, i.e., replace the `"red"` entry with subsequent `"green"` entry. Print that out to the console and see for yourself.

```javascript
const exampleInternMap = new InternMap([
  [new Date(Date.UTC(2001, 0, 1)), "red"],
  [new Date(Date.UTC(2001, 0, 1)), "green"] // replaces previous entry
])

// Get value at specific indexed Date() object key
exampleInternMap.get(new Date(Date.UTC(2001, 0, 1))) // "green"
```

### D3's InternMap() is an upgraded version of JS Map()

Ok, Date() object behavior is one big reason to use InternMaps. Additionally, InternMap() has essentially just revised and upgraded JS's global Map(), so it uses many of the same built-in methods like the following:

- `.set()`
- `.get()`
- `.has()`
- `.delete()`
- `.keys()`
- `.entries()`
- `.size()`
- ...

For more proof, check out both of their respective `prototype` functions in the web console. Convert this `javascript` codeblock to an executable `js` codeblock and see for yourself:

```javascript
let ogJsMap = new Map()
let d3InternMap = new InternMap()
console.log(
  "ogJsMap\n", ogJsMap
  "\nd3InternMap\n", d3InternMap
)
```

Notice how InternMap() echoes JS's Map(), so if you learn one type of map, you will intuitively understand how to work with the others. (Thank you, designers and developers!)

![](./../assets/images/1-js/js-compare-map-internmap.png)

## 1.9.6 Converting an Array of Objects to D3 InternMaps

We can easily create InternMap objects with the following three D3.js methods in the [d3-array](https://d3js.org/d3-array/group) code library: `d3.group` and `d3.rollup`.

<p class="note--data">
  For our examples in the remainder of this chapter, we are going to use a randomly generated sample of 20,000 <strong>absentee</strong> NC voter data from the 2024 election cycle. The original set has over 468000 rows, so I reduced it to a smaller number to balance computational performance without forsaking much of the distribution of the full dataset. The data has been anonymized.
</p>

<!-- Attach sampled NC voter data -->
```js
const nc2024SampledVoters = FileAttachment("./../data/nc-voters/nc_absentee_mail_2024_n20000.csv").csv({typed: true})
```

<p class="codeblock-caption">
  Interactive output of attached sampled 2024 NC Voter dataset.
</p>

```js
nc2024SampledVoters
```

### `d3.group()` - Convert Array of objects to InternMap()

As its name suggests, [d3.group](https://d3js.org/d3-array/group) groups the iterable Array of Object values into an InternMap() organized by that newly and uniquely keyed value. Grouping data with d3.group() helps us when we need to narrow the focus of our exploration and questions of the data.

Let's review an applied example.

A typical situation that arises when working with a dataset includes the following: After some initial data cleaning, the need arises to **explore the dataset by a specific field, so we can view new angles of the data and ask new questions about it**.

Perhaps we have initial questions that we want to ask and explore about political affilliation in the dataset. We can use the field, `ballot_request_party`, to group the data with the `d3.group()` method.

D3's `group()` accepts mainly two parameters:

1. the input data, and
2. a function specifying which field(s) to group the data by.

Here's the expression:

```javascript
// Basic structure of expression
const outputInternMap = d3.group(
  // First param == array of objects
  arrayOfObjects,
  /**
   * Second param is an "arrow function" in JS
   * (d): the list of parameters, where 'd' is the data
   * d.desired_property: the key that you wish to group by
  **/
  (d) => d.desired_property
)

// Applied example with our nc2024SampleVotersUpdate array of objects
const nc2024ByPartyInternMap = d3.group(
  nc2024SampledVoters,
  (d) => d.ballot_request_party
)
```

```js
const nc2024ByPartyInternMap = d3.group(nc2024SampledVoters, (d) => d.ballot_request_party)
```

<p class="codeblock-caption">
  Interactive output of absentee data grouped by <code>ballot_request_party</code>
</pß>

```js
nc2024ByPartyInternMap
```

As you look through the interactive InternMap above, consider what `.group()` did to the array of objects. Essentially, it has been programmed to create a new set of keys based on the available and unique set of values for that field. In our case above, it was `ballot_request_party`. Then, it will get all of the values that share that unique key and place them in that new group. So, essentially, `.group()` creates new unique buckets in which to place associated items within that bucket.

Instead of political party affiliation, let's group it by race to peruse new angles. Look through the interactive output and notice how you can even start noticing some potentially interesting angles and questions to ask just by grouping the data.

```js
let nc24VotersByRace = d3.group(
  nc2024SampledVoters,
  (d) => d.race
)
```

<p class="codeblock-caption">
  Interactive output of absentee data grouped by race
</p>

```js
nc24VotersByRace
```

#### Create nested groups with multiple keys

As you can see from the party grouping, the dataset is still difficult to parse. You can see Array lengths per party, which might yield some questions about distribution. (We'll learn about distribution later!) To take another step into potential angles to consider, we can drill down deeper and group the dataset by more than one field.

Indeed, you can create nested groups. So, let's take a look at the dataset grouped first by political party, then by race -- `ballot_request_party` > `race`:

```js
let nc24VotersByPartyAndRace = d3.group(
  nc2024SampledVoters,
  (d) => d.ballot_request_party,
    (d) => d.race
)
```

<p class="codeblock-caption">
  Interactive output of absentee data grouped by <code>ballot_request_party</code> > <code>race</code>:
</p>

```js
nc24VotersByPartyAndRace
```

Check out the output above, and note how you might consider asking some more specific questions just be reviewing the data outputs in this format.

<p class="note">
  Don't worry! We'll learn better ways to explore the data later with tables and visuals.
</p>

### `d3.rollup()` - Group & Reduce the Data

Ok! Let's learn a variation on `d3.group()`, which is `d3.rollup()`.

Sometimes you just need to compute some values about your data, rather than preseve all of the information. Enter `d3.rollup()`!

`d3.rollup` first groups the data—just like `.group()`. Yet, `rollup` then **reduces** the specified iterable of values into an InternMap from the provided key to reduced value. For example, let's say we just want to count the number of voters in a particular group? Rollup to the rescue!

<!-- Render party>gender rollup -->
```javascript
let nc24VotersRollUpPartyAndRace = d3.rollup(
  // Input array of objects
  nc2024SampledVoters,
  // Reduce by counting how many per field
  (D) => D.length,
  // Like, d3.group(), use comma-sep arrow functions
  (d) => d.ballot_request_party,
    (d) => d.gender
)
```

<!-- Assign party>gender rollup -->
```js
let nc24VotersRollUpPartyAndRace = d3.rollup(
  nc2024SampledVoters,
  (D) => D.length,
  (d) => d.ballot_request_party,
    (d) => d.gender
)
```

<p class="codeblock-caption">
  Interactive output of <code>nc24VotersRollUpPartyAndRace</code>
</p>

<!-- Interactive output -->
```js
nc24VotersRollUpPartyAndRace
```

#### .get() rolled up InternMap data

Here's how to get the count of absentee voters whose party is `"DEM"` and whose gender is `"F"`:

```javascript
nc24VotersRollUpPartyAndRace.get("DEM").get("F") // Yields 4149
```

```js
nc24VotersRollUpPartyAndRace.get("DEM").get("F") // Yields 4149
```

## Exercises

### E1. `.map()` NC Voters' ballot return status as a new array of objects

**Goal**: Take the `nc2024SampleVoters` data and do the following:

1. Convert the `javascript` codeblocks to `js` codeblocks.
2. Use the `.map()` method to iterate through the array of objects and create a new variable about the `ballot_rtn_status` and `race`.
3. Inside of `.map()`, use an if condition to only return an object with noted two properties, **if the value of `ballot_rtn_status` does not equal `null`**.
4. Add your new array of objects to the second `js` codeblock to render an interactive output.

<p class="tip">
  Be sure to write your code in a manner aligned with how I break down the process above.
</p>

```javascript
// Your code goes here
```

```javascript
// Your new variable here
```

### E2. Group NC Voters By the Ballot Sent Date as an InternMap()

**Goal**: Take the `nc2024SampleVoters` data and do the following:

1. Convert the `javascript` codeblocks to `js` codeblocks.
2. Create a new field for each entry at the voter level called `ballot_send_dt_obj` and set the value to this field by converting the string value of dates ballots were sent to voters -- `ballot_send_dt` -- into a Date() object.
3. Aggregate the updated `nc2024SampleVoters` by grouping the data by `ballot_send_dt_obj` as a new `InternMap()`.
4. Add your new InternMap to the second `js` codeblock to render an interactive output.

<p class="tip">
  Be sure to write your code in a manner aligned with how I break down the process above.
</p>

```javascript
// Your code goes here
```

```javascript
// Your grouped variable here
```

### E3. Group NC Voters By Age Range as an InternMap()

**Goal**: Take the `nc2024SampleVoters` data and group it by a set of age ranges of your own choosing using `InternMap()`.

<!-- Tip for E3 -->
<div class="tip">
  <p>
    I'll guide you through this first one. Again, it helps to listify the process required, so you can then think about what JS you've learned so far to help you implmement those steps.
  </p>
  <ol>
    <li>If we want to group the data by a range of age groups, then we need a list of those age groups to use in our code. So, we must <em>manually create an Array list of age limits as Number values</em>. For example, the age limits could be, but don't need to be, based on decades like <code>[30, 40, 50, 60, 70, 80, 90, 100]</code>.
    <li>Now, we can use that <strong><code>Array</code> of age limits by decade</strong> to check <strong><code>if</code> each <code>voter's age</code> fits within a particular decade</strong>.
    <li><code>if</code>then you can check if a voter is less than 30 years old, then less than 40 AND greater than or equal to 30, ... and so on.
  </ol>
</div>

```javascript
// Your code goes here
```

```javascript
// Your grouped variable here
```

### E4. Group NC Voters by Your Desired set of 2-3 Fields as an InternMap()

**Goal**: Take the `nc2024SampleVoters` data and group it by your own desired set of 2-3 fields.

First outline your procedure with steps below. Then, use the JS codeblock to perform your grouping as a D3.js `InternMap()`.

1. Enter step 1
2. Enter step 2
3. ...

```javascript
// Your code goes here
```

```javascript
// Your grouped variable here
```

### E5. Rollup NC Voters by Total Ballot Sent Date as an InternMap()

**Goal**: Take the `nc2024SampleVoters` data, add a Date() field for the ballot request date field, then roll it up by your new field to get the total count per ballot request date.

First outline your procedure with steps below. Then, use the JS codeblock to perform your rollup as a D3.js `InternMap()`.

1. Enter step 1
2. Enter step 2
3. ...

```javascript
// Your code goes here
```

```javascript
// Your grouped variable here
```

## Submission

1. Create a **PR** (**pull request**) and use the provided content in the template to start it.
2. Respond to your peers and comment on their work on at least one chapter..
3. Submit the PR link in Moodle, when you're ready.
