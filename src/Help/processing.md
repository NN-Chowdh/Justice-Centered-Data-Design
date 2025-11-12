# Data Processing Basics

Let's learn how to group our data as a Map object with either `d3.group()` or `d3.rollup()`, but then convert it back to a flat Array of Objects.

Let's doso via a running case using `d3.group()`, but you could easily swap this out with any variation of `d3.rollup()`.

Let's say you have a table of womens clothing e-commerce reviews:

```js
const reviewsData = FileAttachment("./../data/womens-e-commerce-reviews/Womens-Clothing-E-Commerce-Reviews.csv").csv({typed:true})
```

```js
reviewsData
```

That's a lot of data to review, so let's group the data by the `"Class Name"`, which is simply broader categories of types of clothing.

```javascript
const byClassName = d3.group(
  reviewsData,
  d => d["Class Name"]
)
```

```js
const byClassName = d3.group(
  reviewsData,
  d => d["Class Name"]
)
```

Here's the output InternMap:

```js
byClassName
```

## Query the data by a key with .get()

Now we can query the InternMap() for a particular group with the `.get()` method, such as `"Jackets"`, and retrieve a list of objects:

```javascript
byClassName.get("Jackets")
```

Feel free to change the value in the code to render difference groups. Note how this one-level group means that the value returned is an Array of objects. That insight can help us think about how to create a nice flat Array of objects to use.

```js
byClassName.get("Jackets")
```

## Convert Maps Back to Array of Objects

Let's use [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) to create an Array from another data type like a Map/InternMap.

```javascript
/**
 * Array.from():
 * Create an Array from another data type like a Map/InternMap
 * Takes 2 params:
 *    1. another list-like object, such as a Map
 *    2. Accessor function to do something to that Map object,
 *       i.e., it functions like a built-in .map() function to
 *       iterate over all rows.
**/
Array.from(
  // 1. Let's reduce the data by a specific key in this example
  byClassName.get(className),
  // 2. Reducer function to do something with the data, as desired
  (values) => {
    // Let's just return the entire object that represents a row with props
    // But, you could do lots more, such as only return values of interest,
    // or do something with those values to make new columns, etc.
    return values
  }
)
```

Let's see the available keys to use to reduce the data, based on our rollup grouping above.

<!-- Get available keys, based on our rollup grouping -->
```js
Array.from(
  byClassName,
  ([key, values]) => key
)
```

Let's use the `Class Name` as a key to .get() that data group, but then transform it back the returned values for that key as an Array of Objects.

Check out the notebook's code to update the `Class Name` of interest.

```js
// Change this value to any available "Class Name" key
const className = "Shorts"
const reducedClassName = Array.from(
  byClassName.get(className),
  (values) => {
    return values
  }
)
```

Here's the reduced data, based on the desired `Class Name` value.

```js
reducedClassName
```

## Multiple Nested Groups

How do you work with more than 1 level?

Let's group the data by `Class Name` and `Rating`.

```javascript
const byClassAndRating = d3.group(
  reviewsData,
  d => d["Class Name"],
    d => d["Rating"],
)
```

```js
const byClassAndRating = d3.group(
  reviewsData,
  d => d["Class Name"],
    d => d["Rating"],
)
```

Here's the output. Note the two levels of keys before arriving at the grouped Array of objects for that grouping.

```js
byClassAndRating
```

## Get Multiple Levels by chaining .get()

We can retrieve nested groups with chained uses of .get().

The below example will retrieve all data with the `Class Name` of `"Sweaters"` and a rating of `1`.

```javascript
byClassAndRating.get("Sweaters").get(1)
```

Feel free to change the values to see the results.

```js
byClassAndRating.get("Sweaters").get(1)
```

## Convert Map into Array of Objects

Now, we can get creative with our processing by remembering how to use the chained .get() method on our Map.

```javascript
// Change this value to any available "Class Name" key
const className2 = "Jeans"
// Change between 1 and 5 Number value
const rating = 4

// Create an array of objects based on my above keyed options
const reducedClassAndRating = Array.from(
  // Get the reduced data group
  byClassAndRating.get(className2).get(rating),
  // Do something to the data (or not) and return it
  (values) => {
    return values
  }
)
```

```js
// Change this value to any available "Class Name" key
const className2 = "Jeans"
// Change between 1 and 5 Number value
const rating = 4
const reducedClassAndRating = Array.from(
  byClassAndRating.get(className2).get(rating),
  (values) => {
    return values
  }
)
```

```js
reducedClassAndRating
```

This is just the basics. If you wanted to create a function that work with a range of Class Name and Rating values, then simply create those lists of desired values, then loop the above pattern through a for loop. You'll need to add some more variable assignments, but this should get you going!