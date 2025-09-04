# 1.6 Strings

<p class="cite_small">
  Some content below is reused and modified from <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String" target="_blank" rel="noopenner noreferrer">MDN's JS reference guide</a>.
</p>

## Start Your GH Workflow

Remember, before you start anything else, always follow this GH methodological workflow:

1. Create meaningful **branch** that uses the agreed upon naming scheme: `CHP/X.x--lastname`.
2. Practice the iterative process to **commit** and **push** regularly with meaningful **commit messages**.

## Overview

Strings are useful for holding data that can be represented in text form. Some of the most-used operations on strings are to check their length, to build and concatenate them using the + and += string operators, checking for the existence or location of substrings with the indexOf() method, or extracting substrings with the substring() method.

## 1.6.1 Creating Strings

Easy! Yet, there are a few ways to create strings, as seen in the below example. There are different more nuanced reasons for creating strings with particular methods. But, we will mostly rely on the most typical method of creating a string with double quotes.

```
// Double quotes
const string1 = "A string primitive"

// Single quotes
const string2 = 'Also a string primitive'

// Backticks
const string3 = `Yet another string primitive`
```

### Special tip with backticks

Yet, here's a fun trick using backticks as strings. Backticks tell the JS engine to interpret the string as a string literal, which unlocks some fun features to use variables within String literal consructions like the below example:

```
const a1 = "cat"
const a2 = "bullfrog"

// Use mustache syntax to incorporate string variables
// within the string construction more seamlessly
console.log(`A ${a1} will chase your ${a2}`)

// Log prints "A cat will chase your bullfrog
```

## 1.6.2 Accessing Characters

There are two ways to access an individual character in a string.

### charAt()

```
"cat".charAt(1) // gives value "a"

let stringEx = "Dog"
stringEx.charAt(1) // gives value of "o"
```

### Numerical index

The other way is to treat the string as an array-like object, where individual characters correspond to a numerical index:

```
"cat"[1] // gives value "a"
stringEx[1] // gives value of "o"
```

<p class="warning">
  When using bracket notation for character access, attempting to delete or assign a value to these properties will not succeed. The properties involved are neither writable nor configurable.
</p>

## 1.6.3 Common String Methods

Try out the following common methods for strings located in the table below. Start by defining the variable, `str1` below in your browser's console.

```
// Running string example
let str1 = "Cat In The Hat"
```

| Method | Action | Output  |
|--------|--------|---------|
| `str1.toUpperCase()`  | Converts all chars to uppercase. | `"CAT IN THE HAT"`|
| `str1.toLowerCase()`  | Converts all chars to lowercase. | `cat in the hat`|
| `str1.length`  | Retrieves the total length of String.<br>Returns Number value. | `14`|
| `str1.split(" ")`  | Splits String by given delimiter value.<br>Returns Array list of Strings. | `[ "Cat", "In", "The", "Hat" ]`|
| `str1.includes("The Hat")`  | Checks if the given String value is in the string.<br>Returns Boolean `true` or `false`. | `true`|
| `str1.startsWith("c")`  | Checks if String starts with character.<br>Returns Boolean `true` or `false`. | `false`|
| `str1.endsWidth("t")`  | Checks if String ends with character.<br>Returns Boolean `true` or `false`. | `true`|
| `str1.replace("Cat", "Dog")`  | If the method finds any matches of the<br>first `String` parameter (`"Cat"`),<br>it replaces the first matched instance ONLY<br>with the second `String` parameter (`"Dog"`).<br>Returns a `String`. | `"Dog In The Hat"`|
| `str1.replaceAll("a", "u")`  | If the method finds any matches of the<br>first `String` parameter (`"a"`),<br>it replaces ALL matched instance<br>with the second `String` parameter (`"u"`).<br>Returns a `String`. | `"Cut In The Hut"`|

## 1.6.4 Chaining JS Methods

Many methods can be ***chained*** in a desired sequence of execution in JS. By chained, I mean that you can link them together as follows:

```javascript
/**
  * Search for string but not worry about casing of characters
  * 1. .toLowerCase() --> make all chars lowercase in string.
  * 2. .includes() --> search for desired part of the string.
**/
str1.toLowerCase().includes("hat") // returns `true`
```

This chaining method can be applied with many JS methods—not just Strings.

## String Method Exercises

```js
const vonnegut = FileAttachment("./../data/vonnegut.txt").text()
```

For these String method exercises, let's use a larger, longer, and more interesting String: Kurt Vonnegut's short story, "2 B R 0 2 B" ([gutenberg.org source](https://www.gutenberg.org/files/21279/21279-h/21279-h.htm)). I have assigned Vonnegut's short story, because it is simply a plain-text (`.txt`) file that I have input as a very large `String`.

In the codeblock below, I have rendered the String assigned to the variable, `vonnegut`, for your review. If you want to see the full file, it is located relative to this file here: [./../data/vonnegut.txt](./../data/vonnegut.txt).

<p class="codeblock-caption">
  String output of <code>vonnegut.txt</code> file.
</p>

```js
vonnegut
```

### E1. Find the length of a String

Let's start simple. Output the length of the String, `vonnegut`, in a `js` codeblock below.

```js
console.log(vonnegut.length)
```

### E2. Replace parts of a String

If you review the String, you will notice how there are section breaks represented with the following characters: `       *       *       *       *       *`. Here's what I want you to practice doing across 4 codeblocks:

1. In the first codeblock, remove ***all*** of these section breaks in `vonnegut` and replace them with an empty string (`""`). Assign it to a new variable: `vonnegutNoSB`.
2. In the second codeblock, output the new variable, `vonnegutNoSB`, to verify if it worked.
3. If it worked, use a third codeblock to remove ***all*** major types of puncutation with a chained set of replaceAll() methods on the new `vonnegutNoSB` variable. Assign it to a new variable: `vonnegutClean`. Specifically, create a chain of `removeAll()` methods for each of the following characters: double-quotes (`"`), single-quotes (`'`), commas (`,`), periods (`.`), question marks (`?`), semi-colons (`;`), and the following pattern of two dashes (`--`). Replace the `--` with a single space (`" "`), but replace every other puncuation with an empty String (`""`).
    <div class="tip">
      <p>
        <strong>Escaping quotes</strong>: Strings are assigned with quotation marks. This means the single and double quotes are handled in special ways. For you to tell the <code>replaceAll()</code> method to match either type of quote characters, you need to escape them with a backslash (<code>\</code>). So, in your code, you will need to use an escaped character for double-quotes and single-quotes: <code>"\""</code> and <code>"\'"</code>.
      </p>
    </div>
4. In the fourth codeblock, output the new variable, `vonnegutNoSBDQ`, to verify if it worked.

```js
let vonnegutNoSB = vonnegut.replaceAll("       *       *       *       *       *", "")
```

```js
console.log(vonnegutNoSB)
```

```js
let vonnegutClean = vonnegutNoSB
  .replaceAll("\"", "")
  .replaceAll("'", "")
  .replaceAll(",", "")
  .replaceAll(".", "")
  .replaceAll("?", "")
  .replaceAll(";", "")
  .replaceAll("--", " ");

```

```js

let vonnegutNoSBDQ = vonnegutClean

console.log(vonnegutNoSBDQ)

```

### E3. Same thing, but better method with a for loop

Ok, those chains were ridiculous, right? Below, complete the same outcome, but use a `for...of` loop to accomplish the aim instead. Assign it to a new variable called `vonnegutNoPuncs`.

<p class="tip">
  Put those desired marks to replace in an Array. You will also need to write a conditional statement to handle the <code>--</code> differently.
</p>

```js
// Array of punctuation marks and section breaks to remove

let marks = ["\"", "'", ",", ".", "?", ";", "--", "       *       *       *       *       *"];

// Starting from the original vonnegut text

let vonnegutNoPuncs = vonnegut;

// Using the for...loop condition as per instructions

for (let mark of marks) {
  if (mark == "--") {
    vonnegutNoPuncs = vonnegutNoPuncs.replaceAll(mark, " ");
  } else {
    // Removing all other marks
    vonnegutNoPuncs = vonnegutNoPuncs.replaceAll(mark, "");
  }
}
```

```js
console.log(vonnegutNoPuncs)
```

### E4. Split the String into an Array of Strings

Sometimes, we need to isolate parts of a text for analysis by splitting it into meaningful units for analysis. One such unit is at the per word level. While we definitely would need to process our short story more, we can begin to see how we can easily convert our short story into an array of strings that indeed are at the per word level.

Create an array of strings of Vonnegut's story as a new variable called `vonnSplit`. Do so by splitting the newly cleaned String, `vonnegutNoPuncs`, with an empty single space (`" "`).

```js
let vonnSplit = vonnegutNoPuncs.split(" ")
```

```js
console.log(vonnSplit)
```

### E5. Create array of all hyphenated words

Ok, last exercise! Complete the following steps to create a new array that only includes hyphenated words.

<p class="note">There will be an oddity to observe and discuss in the question after you complete the exercise.</p>

1. In a first codeblock, declare a new array called `hyphenatedWords`. Then, push only hyphenated words into it.
2. In a second codeblock, output the new array to verify your work.

```js
let hyphenatedWords = [];

for (let word of vonnSplit) {
  if (word.indexOf("-") >= 0) {
    hyphenatedWords = hyphenatedWords.concat(word);
  }
}
```

```js
console.log(hyphenatedWords)
```

**Question**: What oddities do you notice about the outcome? Below, explain what you suggest is happenning, and what you would do to resolve the issue with isolating a better list of hyphenated words.

ENTER_YOUR_RESPONSE_HERE

Some words are together with line breaks (\n) or other parts of text, like "forty-million\nsouls\n\nOne" instead of just "forty-million". I think, the .split(" ") methods only cuts at spaces. It doesn't remove or clean linebreaks \n. This is why some hyphenated words are appearing with extra characters attached. One possible step would be to split by more than just spaces, or check conditions to remove unwanted characters.

## Submission

1. Create a **PR** (**pull request**) and use the provided content in the template to start it.
2. Respond to your peers and comment on their work on at least one chapter..
3. Submit the PR link in Moodle, when you're ready.
