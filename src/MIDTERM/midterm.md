# "Book Publication Data Analysis"

- **Name**: Nazifa Chowdhury
- **Dataset**: BooksDataset.csv

## Overview

I chose the book publication dataset because it contains a comprehensive collection of over 100,000 published books with detailed metadata that seemed most manageable among the three dataset options. 

The dataset includes rich information for each book: titles, authors, detailed descriptions, genre categories, publishers, publication dates, and pricing data. With over 100,000 records, this dataset offers the scale needed to identify meaningful statistical patterns in publishing industry trends, popular genres, and market dynamics that wouldn't be visible in smaller datasets.

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
Let me also examine the file properties like its name, mimeType, size etc to understand more about this dataset:

```js
const booksFile = FileAttachment("./../data/midterm-options/books/BooksDataset.csv")
```

<p class="codeblock-caption">
  BooksDataset Size and Structure Analysis
</p>

```js
booksFile
```

## Convert Dates

I will convert the publication date strings into Date objects using D3.js parsers and create multiple useful date formats for analysis. The original dates are in "%A, %B %d, %Y" format.

```js
import {utcParse,utcFormat} from "d3-time-format";

 // create parser for the specific date format in our data
const parseDateSlash = utcParse("%A, %B %d, %Y")

// create formatters using D3 parse
const formatYear = utcFormat("%Y")    // Year
const formatMonth = utcFormat("%m")   // Month
const formatDayOfWeek = utcFormat("%A")   //Day of Week 

for (const book of booksData) {
  const dateObject = parseDateSlash(book["Publish Date"])

  book.publish_date_obj = dateObject
  book.publish_year = formatYear(dateObject)
  book.publish_month = formatMonth(dateObject)
  book.publish_DayOfWeek = formatDayOfWeek(dateObject)

}
```
<p class="codeblock-caption">
Converting publication dates and adding formatted date properties
</p>

```js
booksData
```

## Grouping #1 - Name of grouping here

I want to analyze publishing trends over time by grouping books into era and counting how many books were published in each era. This will reveal patterns in publishing volume and help identify which era had the most prolific book production in this dataset.

```js
import {group} from "d3-array"

const bookByEraPublisher = group(
  booksData,
  (d) => {
    if (d.publish_year >= "1901" && d.publish_year <= "1925") {
      return "Early 20th Century (1901-1925)"
    }
    else if (d.publish_year >= "1926" && d.publish_year <= "1950") {
      return "Mid 20th Century (1926-1950)"
    }
    else if (d.publish_year >= "1951" && d.publish_year <= "1975") {
      return "Late 20th Century (1951-1975)"
    }
    else if (d.publish_year >= "1976" && d.publish_year <= "2000") {
      return "End of 20th Century (1976-2000)"
    }
    else if (d.publish_year >= "2001" && d.publish_year <= "2025") {
      return "Early 21st Century (2001-2025)"
    }
    return "Other"
  },
  (d) => d.Publisher
)
```
<p class="codeblock-caption">
Nested grouping of books by Era and publisher
</p>

```js
bookByEraPublisher
```

## Grouping #2 - Name of grouping here

```js
for (const book of booksData) {
  book["Price in Dollar"] = book.Price.split("$")[1]
  book.Price_Number = Number(book["Price in Dollar"])
}
```
```js
booksData
```

```js
const booksByPrice = rollup(
  booksData,
  (book) => book.length
  (d) => {
    if 
  }
)
```

## Reflection
