# "Book Publication Data Analysis"

- **Name**: Nazifa Chowdhury
- **Dataset**: BooksDataset.csv

## Overview

I chose the book publication dataset because it contains a comprehensive collection of over 100,000 published books with detailed metadata that seemed most manageable among the three dataset options. 

The dataset includes rich information for each book: titles, authors, detailed descriptions, genre categories, publishers, publication dates, and pricing data. With over 100,000 records, this dataset offers the scale needed to identify meaningful statistical patterns in publishing industry trends, popular genres, and market dynamics that wouldn't be visible in smaller datasets.

```js
import {utcParse,utcFormat} from "d3-time-format";
```
## Attach the data

I will now load the dataset using FileAttachment to begin the analysis process.

```js
const booksData = FileAttachment("./../data/midterm-options/books/BooksDataset.csv").csv({typed: true})
```
<p class="codeblock-caption">
  Interactive Display of the BookDataset
</p>

```js
booksData
```
Let me also examine the file properties to understand more about this dataset:

```js
const booksFile = FileAttachment("./../data/midterm-options/books/BooksDataset.csv")
```

<p class="codeblock-caption">
  BookDataset Size and Structure Analysis
</p>

```js
booksFile
```

## Convert Dates

## Grouping #1 - Name of grouping here

## Grouping #2 - Name of grouping here

## Reflection
