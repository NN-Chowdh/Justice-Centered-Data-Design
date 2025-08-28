# 1.2 Data Types

<p class="cite_small">
  Some content below is reused and modified from MDN Web Docs' <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/" target="_blank" rel="noopenner noreferrer">JavaScript Guide</a>.
</p>

## Start Your GH Workflow

Remember, before you start anything else, always follow this GH methodological workflow:

1. Create meaningful **branch** that uses the agreed upon naming scheme: `CHP/X.x--lastname`.
2. Practice the iterative process to **commit** and **push** regularly with meaningful **commit messages**.

## Overview

The latest JS standard defines eight data types that are called **primitives**, i.e., the most basic units of data in the JS language:

1. [**String**](https://developer.mozilla.org/en-US/docs/Glossary/String). A sequence of characters that represent a text value scoped by double quotes `""`. For example:
    ```javascript
    let hello = "Howdy!"
    ```
2. [**Number**](https://developer.mozilla.org/en-US/docs/Glossary/Number). An integer or floating point number. For example:
    ```javascript
    let life = 42
    const pi = 3.14159
    ```
3. [**Boolean**](https://developer.mozilla.org/en-US/docs/Glossary/Boolean): `true` and `false`.
    ```javascript
    let booleanTrue = true
    let booleanFalse = false
    ```
4. [**null**](https://developer.mozilla.org/en-US/docs/Glossary/Null). A special keyword denoting a null value. (Because JavaScript is case-sensitive, `null` is not the same as `Null`, `NULL`, or any other variant.)
5. [**undefined**](https://developer.mozilla.org/en-US/docs/Glossary/Undefined). Assigned automatically to variables that have just been declared: `undefined`.
    ```javascript
    let x
    console.log(x) //Output: undefined
    ```
6. [**Object**](https://developer.mozilla.org/en-US/docs/Glossary/Object). Objects are a collection of properties, which are structured and identified using key-value pairs. They can be parsed/looped-thru, retrieved, and accessed with two main types of syntax, as seen below:
    ```javascript
    let diffGreetings = {
      simple: "Hello.",
      dull: "Hey.",
    }

    // Assign new property to object
    diffGreetings.excited = "Wasssssup!"

    // Both Output: "Wasssssup!"
    console.log(diffGreetings['excited'])
    console.log(diffGreetings.excited)
    ```
7. [**Symbol**](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Don't worry about this one. It's rarely used. It is a data type whose instances are unique and immutable.
8. [**BigInt**](https://developer.mozilla.org/en-US/docs/Glossary/BigInt). Don't worry about this one either. It's rarely used. It is an integer with arbitrary precision. For example: `9007199254740992n`.

Primitives enable you to perform fundamental data operations.

## E1. Create a Suite of Primitives

1. Convert the `javascript` codeblock to an executable block with the `js`.
2. Declare and initialize your own suite of primitives (1-6) from an above: String, Number, Boolean, null, undefined, and Object.
    - **NOTE**: Have fun with it! Choose a theme like your favorite movie, story, hobby, etc.
3. Print them all to the console with `console.log()`.
4. Check your work, as you go, by opening the browser console with the **Inspect Element** tool.

```js
// Friends- themed suite of primitives

// String
let catchPhrase = "How you doin'?"

console.log("Joey's favorite dialogue :", catchPhrase)

// Number
let totalSeason = 10

console.log("Number of Episodes :", totalSeason)

// Boolean
let rossDivorcedAgain = true

console.log("Is Ross divorced (again)", rossDivorcedAgain)

// null
let joeyFridge = null

console.log("Joey's Fridge :",)

// undefined
let chandlersJob;

console.log("Chandler's Job", chandlersJob)

// Object
let monica = {
  name: "Monica Gelle",
  favoriteActivity: "Cleaning"
}

console.log("Monica's Profile:", monica.name)
console.log("Monica's Profile:", monica.favoriteActivity)

```

## Submission

1. Create a **PR** (**pull request**) and use the provided content in the template to start it.
2. No peer responses are required for this chapter.
3. Submit the PR link in Moodle, when you're ready.