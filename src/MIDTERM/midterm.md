# "Book Publication Data Analysis"

- **Name**: Nazifa Chowdhury
- **Dataset**: BooksDataset.csv

## Overview

I decided to work with the book publication dataset because it was the clearest and most structured of the three options. When I compared the datasets, the meta ads and pollution data looked intimidating with lots of technical variables I wasn't sure how to interpret. The book dataset, on the other hand, had straightforward columns like title, author, category, and price - information that made immediate sense to me. 

My plan is to explore how the the book industry has changed over time. I am particularly interested in grouping books by different eras, and since it also includes pricing information, I can examine how book costs vary across different categories. These approaches will allow me to demonstrate the date conversion and grouping techniques we have been practicing in class.

## Attach the data

Before starting the analysis, I need to load the dataset and get familiar with its structure and contents. This step will help me verify that the data loaded correctly and give me a clear idea of what I'm working with.

```js
const booksData = FileAttachment("./../data/midterm-options/books/BooksDataset.csv").csv({typed: true})
```
<p class="codeblock-caption">
  Interactive Display of the BookDataset
</p>

```js
booksData
```
Let me also examine the file properties like its name, mimeType, size etc to  get additional insights about the dataset:

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

In this step, I will convert the publication date strings into Date objects using D3.js parsers. Since the dataset stores dates as long strings like "Friday, January 1, 1993", I will also add new fields for year, month, and day of the week after parsing, so I can group and analyze by time later.

```js
import {utcParse,utcFormat} from "d3-time-format";

// parser for the specific date format in our data
const parseDateSlash = utcParse("%A, %B %d, %Y")

// create formatters using D3 parse
const formatYear = utcFormat("%Y")    // Year
const formatMonth = utcFormat("%B")   // Full Month Name
const formatDayOfWeek = utcFormat("%A")   //Day of Week 

for (const book of booksData) {
  const dateObject = parseDateSlash(book["Publish Date"])

  book.publish_date_obj = dateObject
  book.publish_year = Number(formatYear(dateObject))
  book.publish_month = formatMonth(dateObject)
  book.publish_day_of_week = formatDayOfWeek(dateObject)
}
```
<p class="codeblock-caption">
Converting publication dates and adding formatted date properties
</p>

```js
booksData
```

## Grouping 1 - Books by Historical Era and Publisher

I want to analyze publishing trends over time by grouping books into historical eras and then by publisher within each era. It will help me understand how publishing activity has evolved across different time periods and which publishers were most active during specific eras. By using 25-year periods, I can create meaningful historical divisions that might reveal interesting patterns in the publishing industry.

**Procedures of grouping plan:**

1. Import d3.group from d3-array
2. Convert the publish_year string to number in the "convert date" section
3. Group books by historical era using if/else conditions based on publish_year (25-year periods)
4. Group by publisher within each era
5. Display the result

```js
import {group} from "d3-array"

// Group books by historical era, then by publisher
const bookByEraPublisher = group(
  booksData,
  (d) => {
    // Assign each book into an era based on publish_year
    if (d.publish_year >= 1901 && d.publish_year <= 1925) {
      return "Early 20th Century (1901-1925)"
    }
    else if (d.publish_year >= 1926 && d.publish_year <= 1950) {
      return "Mid 20th Century (1926-1950)"
    }
    else if (d.publish_year >= 1951 && d.publish_year <= 1975) {
      return "Late 20th Century (1951-1975)"
    }
    else if (d.publish_year >= 1976 && d.publish_year <= 2000) {
      return "End of 20th Century (1976-2000)"
    }
    else if (d.publish_year >= 2001 && d.publish_year <= 2025) {
      return "Early 21st Century (2001-2025)"
    }
    return "Other"
  },
  (d) => d.Publisher // Group by publisher within each era
)
```
<p class="codeblock-caption">
Nested grouping of books by Era and publisher
</p>

```js
bookByEraPublisher
```

## Grouping 2 - Books by Category and Price Range

Now, I want to analyze the relationship between book categories and pricing by grouping books first by their genre categories, then by price ranges within each category. This will help me understand how pricing varies across different types of books.

**Procedures of grouping plan:**

1. Extract numerical price values from the "Price" key using for...of loop and .split()
2. Convert price strings to numbers
3. Import d3.rollup from d3-array
4. Group the books by category
5. Group the books by price_number under each category
6. Display the results

```js
for (const book of booksData) {
  // split the price by $ and take the number string and convert it to number
  book.price_number = Number(book.Price.split("$")[1])
}
```
<p class="codeblock-caption">
Added new price_number
</p>

```js
booksData
```

```js
import {rollup} from "d3-array"

let booksByCategory_Price = rollup(
  booksData,
  (D) => D.length,
  (d) => d.Category,
  (d) => {
    // Group by price
    if (d.price_number < 5) {
      return "under $5"
    }
    else if (d.price_number >= 5 && d.price_number < 10) {
      return "$5 - $9.99"
    }
    else if (d.price_number >= 10 && d.price_number < 15) {
      return "$10 - $14.99"
    }
    else if (d.price_number >= 15 && d.price_number < 20) {
      return "$15 - $19.99"
    }
    else {
      return "$20+"
    }
  }
)
```

<p class="codeblock-caption">
Books grouped by category and price range
</p>

```js
booksByCategory_Price
```
## Reflection

**Insights**

1. The dataset shows more books published in the late 20th century (1976–2000) than in the early 21st century (2001–2025). At first this was surprising, since I expected more recent decades to dominate publishing. 
2. Certain publishers stood out across different eras. For example, "Simon & Schuster" had a very large number of publications in the late 20th century but far fewer in the early 21st century. This change highlights how publisher activity shifts over time.
3. When grouping books by category and price range, the majority of books fell into the $5–$9.99 range, followed by a significant number under $5. In contrast, very few books were priced above $15. This suggests that most of the dataset reflects mass-market or affordable books, rather than high-end or specialty pricing.

**Question**

1. Why does the dataset show fewer books for the early 21st century compared to the late 20th century? I was wondering if this is due to incomplete data collection or actual publishing trends?
