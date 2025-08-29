# 1.4 Conditionals

## Start Your GH Workflow

Remember, before you start anything else, always follow this GH methodological workflow:

1. Create meaningful **branch** that uses the agreed upon naming scheme: `CHP/X.x--lastname`.
2. Practice the iterative process to **commit** and **push** regularly with meaningful **commit messages**.

## Overview

By now, I hope you can see how writing code is a lot like writing a list of detailed instructions to the computer, telling it what you want it to do with the data.

Most of the time you will be asking the computer to perform certain tasks if certain conditions are met. For example:

- *If a person in the dataset is older than 30, then print out their name*
- *If a tweet contains the phrase "ok boomer," then automatically retweet it*
- *If Beyoncé is a Grammy award-winner, then print "Congratulations, Beyoncé!*

Here's how we would write out this last example in JS code. (Check the actual console in your browser to see it work.)

```js
let beyonce = "Grammy award-winner"

if (beyonce == "Grammy award-winner") {
  console.log("Congratulations, Beyonce!")
}
```

```javascript
let beyonce = "Grammy award-winner"

if (beyonce == "Grammy award-winner") {
  console.log("Congratulations, Beyonce!")
}
```

Let's learn about fundamental conditional statements and how to write and use them.

## 1.4.1 IF Statement

An `if` statement is an instruction to do something *if* a particular condition is met.

A common conditional will consist of three lines:
1. On the first line, you type the English word `if` followed by an expression inside of parantheses `()` and then an open and closed curly brace (`{}`): `if (conditionHere) {}`.
2. Create the second line by hitting return key in between your curly braces, so your code looks like this automatically, thanks to VS Code:
    ```javascript
    if (conditionHere) {
      // Statement in here
    }
    ```
3. After the autoindent, write an instruction or "statement" to be completed if the condition is met.
    ```javascript
    if (beyonce == "Grammy award-winner") {
      console.log("Congratulations, Beyonce!")
    }
    ```

The latest JS has some formatting tricks with conditionals. For example, you can also remove the curly braces:

```js
if (beyonce == "Grammy award-winner") console.log("Congratulations, Beyonce!")
```

```javascript
if (beyonce == "Grammy award-winner") console.log("Congratulations, Beyonce!")
```

This is great for simple and short statements. But, I highly recommend keeping the curly braces and indentation scheme for reading comprehension and consistency. Please wait on being fancy-pancy later. `:-)`

```javascript
if (beyonce == "Grammy award-winner") {
  console.log("Congratulations, Beyonce!")
}
```

## 1.4.2 ELSE Statement

You can add even more complexity in a conditional by adding an `else` statement. This will instruct the program to do something in case the condition is not met.

An `else` comes after an `if` statement and should be formatted it the same way.

```js
let beyonceCheck = "Grammy award-winner"
beyonceCheck = "not a Grammy award-winner this year"

if (beyonceCheck == "Grammy award-winner") {
  console.log("Congratulations, Beyonce!")
}
else {
  console.log("They messed up, Beyonce.")
}
```

```javascript
let beyonceCheck = "Grammy award-winner"
beyonceCheck = "not a Grammy award-winner this year"

if (beyonceCheck == "Grammy award-winner") {
  console.log("Congratulations, Beyonce!")
}
else {
  console.log("They messed up, Beyonce.")
}
```

## 1.4.3 ELSE IF Statement

Sometimes you want even more nuance to respond to slightly different conditions. For example, if Beyonce was nominated for a Grammy but didn't win, then we might want to express a slightly different sentiment than if she won or was not nominated at all.

You can add in this nuance with an `else if` statement. The computer will evaluate the first `if` statement. If that statement is not `true`, it will then evaluate the `else if` statement.

```javascript
let beyonceAwardCheck = "Grammy award-nominee"

if (beyonceAwardCheck == "Grammy award-winner") {
  console.log("Congratulations, Beyonce!")
}
else if (beyonceAwardCheck == "Grammy award-nominee") {
  console.log("Ok well at least they nominated you, Beyonce.")
}
else {
  console.log("They messed up, Beyonce.")
}
```

```js
let beyonceAwardCheck = "Grammy award-nominee"

if (beyonceAwardCheck == "Grammy award-winner") {
  console.log("Congratulations, Beyonce!")
}
else if (beyonceAwardCheck == "Grammy award-nominee") {
  console.log("Ok well at least they nominated you, Beyonce.")
}
else {
  console.log("They messed up, Beyonce.")
}
```

## 1.4 Exercises with Conditionals

We're going to use demographic information about the 19th century Irish immigrants featured in the [Bellevue Almshouse data](https://gih-nyc.org/almshouse/the-almshouse-records/) for this exercise.

Use the following variables and their values to create some conditional statements:

```javascript
let person1Name = 'Mary Gallagher'
let person1Age = 28
let person1Disease = 'recent emigrant'
let person1Profession = 'married'
let person1Gender = 'f'
let person1ChildStatus = 'Child Alana 10 days'
```

```js
let person1Name = 'Mary Gallagher'
let person1Age = 28
let person1Disease = 'recent emigrant'
let person1Profession = 'married'
let person1Gender = 'f'
let person1ChildStatus = 'Child Alana 10 days'
```

## E1

Write an `if` statement that reports whether `person1Age` is less than 30 years old.

Use the following console log, when the condition is `true`: `console.log("Person is less than 30 years old.")`. **HINT**: It should look something like the following:

```javascript
if () {
  console.log("Person is less than 30 years old.")
}
```

```js
let person1Name = 'Mary Gallagher'
let person1Age = 28
let person1Disease = 'recent emigrant'
let person1Profession = 'married'
let person1Gender = 'f'
let person1ChildStatus = 'Child Alana 10 days'

if (person1Age < 30) {
    console.log("Person is less than 30 years old")
}
```

## E2

Write an `if` statement that reports whether `person1Profession` is `"married"`.

Use the following console log, when the condition is `true`: `console.log("Person is married.")`

```js
let person1Name = 'Mary Gallagher'
let person1Age = 28
let person1Disease = 'recent emigrant'
let person1Profession = 'married'
let person1Gender = 'f'
let person1ChildStatus = 'Child Alana 10 days'

if (person1Profession == "married") {
    console.log("Person is married.")
}
```

## E3

Write an `if` statement that reports whether `person1Age` is less than 30 years old *and* `person1Profession` is "married".

Use the following console log, when the condition is `true`: `console.log("Person is less than 30 years old and married.")`

```js
let person1Name = 'Mary Gallagher'
let person1Age = 28
let person1Disease = 'recent emigrant'
let person1Profession = 'married'
let person1Gender = 'f'
let person1ChildStatus = 'Child Alana 10 days'

if (person1Age < 30 && person1Profession == "married"){
    console.log("Person is less than 30 years old and married.")
}
```

## E4

Ok, let's add some more variables:

```javascript
let person2Name = 'Anthony Clark'
let person2Age = 60
let person2Disease = 'recent emigrant'
let person2Profession = 'laborer'
let person2Gender = 'm'
let person2ChildStatus = 'Charles Riley afed 10 days'
```

```js
let person2Name = 'Anthony Clark'
let person2Age = 60
let person2Disease = 'recent emigrant'
let person2Profession = 'laborer'
let person2Gender = 'm'
let person2ChildStatus = 'Charles Riley afed 10 days'
```

Combine an`if` statement with an `else` statement that will report whether `person2Age` is less than 30 years old or, if not, more than 30 years old

Use the following console logs:

- For `true`: `console.log('Person is less than 30 years old.')`
- For `else`: `console.log('Person is more than 30 years old.')`

```js
let person2Name = 'Anthony Clark'
let person2Age = 60
let person2Disease = 'recent emigrant'
let person2Profession = 'laborer'
let person2Gender = 'm'
let person2ChildStatus = 'Charles Riley afed 10 days'

if (person2Age < 30) {
    console.log("Person is less than 30 years old.")
}
else {
    console.log("Person is more than 30 years old.")
}
```

## E5 - ELSE IF time!

Ok, even more variables!

```javascript
let person3Name = 'Margaret Farrell'
let personAage = 30
let person3Disease = 'recent emigrant'
let person3Profession = 'widow'
let person3Gender = 'w'
let person3ChildStatus = ''
```

```js
let person3Name = 'Margaret Farrell'
let personAage = 30
let person3Disease = 'recent emigrant'
let person3Profession = 'widow'
let person3Gender = 'w'
let person3ChildStatus = ''
```

Add an `else if` statement that reports whether `person3Age` is exactly 30 years old.

Use the following console logs:

- When `if` is `true`: `console.log('Person is less than 30 years old.')`
- When `else if` is `true`: `console.log('Person is exactly 30 years old.')`
- `else`: `console.log('Person is more than 30 years old.')`

```js
let person3Name = 'Margaret Farrell'
let personAage = 30
let person3Disease = 'recent emigrant'
let person3Profession = 'widow'
let person3Gender = 'w'
let person3ChildStatus = ''

if (personAage < 30) {
    console.log('Person is less than 30 years old.')
}
else if (personAage == 30) {
    console.log('Person is exactly 30 years old.')
}
else {
    console.log('Person is more than 30 years old.')
}
```

## E6 - Conditional with numbers and an object!

Ok, let's add more information, but let's use an object with properties, since that's usually more appropriate than strung out simple variables.

```javascript
let childrenTotal = {
  person1: 1,
  person2: 2,
  person3: 0,
}
```

```js
let childrenTotal = {
  person1: 1,
  person2: 2,
  person3: 0,
}
```

Write an `if` statement that will report whether `childrenTotal['person1']` has any number of children. **HINT**: You will need to use either the `>` or `>=` or `!=` operator.

Use the following console log, when `if` is `true`: `console.log('Person has children.')`.

```js
let childrenTotal = {
  person1: 1,
  person2: 2,
  person3: 0,
}

if (childrenTotal.person1 >= 1) {
    console.log('Person has children.')
}

```

## E7

Write a single `if` statement that will accurately report whether `childrenTotal['person1']` has any children. Then, another `if` that will accurately report if `childrenTotal['person2']` has children.

Think about how you might use the `!=` operator.

```javascript
// Your first if statement here
if (childrenTotal['person1']) {
  console.log(('Person has children.'))
}

// Your second if statement here
if (childrenTotal['person2']) {
  console.log(('Person has children.'))
}
```

```js
let childrenTotal = {
  person1: 1,
  person2: 2,
  person3: 0,
}


if (childrenTotal.person1 != 0) {
    console.log('Person has children.')
}

if (childrenTotal.person2 = 1) {
    console.log('Person has children.')
}
```

## E8

Finally, write a conditional that will report whether `person1['profession']` is `"married"`, `"laborer"`, `"widow"`, or `"unknown profession"`.

Then, test your code by reassigning the variable as indicated below.

```javascript
let person1 = {
  profession: "married"
}

// Your code here {
  console.log('Person is married.')
}
// Your code here {
  console.log('Person is a laborer.')
}
// Your code here {
  console.log('Person is a widow.')
}
// Your code here {
  console.log('Person has unknown profession.')
}
```

```js
let person1 = {
  profession: "married"
}

if (person1.profession == 'married') {
    console.log('Person is married.')
}
else if (person1.profession == 'laborer') {
    console.log('Person is a laborer.')
}
else if (person1.profession == 'widow') {
    console.log('Person is a widow.')
}
else {
    console.log('Person has unknown profession.')
}
```

### E8.1 Change to laborer

It should print out the laborer profession.

```javascript
person1['profession'] = "laborer"

// Your code here {
  console.log('Person is married.')
}
// Your code here {
  console.log('Person is a laborer.')
}
// Your code here {
  console.log('Person is a widow.')
}
// Your code here {
  console.log('Person has unknown profession.')
}
```

```js
person1.profession = 'laborer'

if (person1.profession == 'married') {
    console.log('Person is married.')
}
else if (person1.profession == 'laborer') {
    console.log('Person is a laborer.')
}
else if (person1.profession == 'widow') {
    console.log('Person is a widow.')
}
else {
    console.log('Person has unknown profession.')
}

```

### E8.2 Change to student

It should print out the unknown profession.

```javascript
person1['profession'] = "student"

// Your code here {
  console.log('Person is married.')
}
// Your code here {
  console.log('Person is a laborer.')
}
// Your code here {
  console.log('Person is a widow.')
}
// Your code here {
  console.log('Person has unknown profession.')
}
```

```js
person1.profession = 'student'

if (person1.profession == 'married') {
    console.log('Person is married.')
}
else if (person1.profession == 'laborer') {
    console.log('Person is a laborer.')
}
else if (person1.profession == 'widow') {
    console.log('Person is a widow.')
}
else {
    console.log('Person has unknown profession.')
}
```

## Submission

1. Create a **PR** (**pull request**) and use the provided content in the template to start it.
2. Respond to your peers and comment on their work on at least one chapter.
3. Submit the PR link in Moodle, when you're ready.
