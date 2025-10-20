# Alaskan Digital Archive Web Test Results

Tests were performed on 3-5 pages across a corpus of websites that are considered Alaskan archives. 

Tests simulated a mobile 3G connection at 1600 bandwidth speed, which is average for this type of connection.

Scores include:

### id

- Unique ID created by the test.

### url

- URL of the page tested

### first-contentful-paint-score & first-contentful-paint-numericValue

The first point in the page load timeline where the browser can start rendering content to the user's screen. The content that gets painted first could be anything ranging from:

- A block of text within a <p> or <div> element
- A graphic drawn in an SVG or <canvas> element
- An <img> element
- A background image set via CSS

- **Good**: Less than 1.8 second (1800 ms)
- **Needs improvement**: Between 1.8 seconds (1800 ms) and 3 seconds (3000 ms)
- **Poor**: Higher than 3 seconds (3000 ms)

These thresholds serve as guidelines for developers to understand where their site stands in terms of user-perceived load speed and where there is room for improvement.

- Float (decimal) number (X.X)

### largest-contentful-paint-score

Render time of the largest image or text block visible within the viewport, relative to when the page first started loading. Sites should strive to have LCP of 2.5 seconds or less.

### speed-index-score

-

### tbt-score & tbt-numericValue

**Total Blocking Time**: The amount of time it took the page to become responsive to user interactions. it's the total time when your website is "busy" and cannot respond to user interactions like clicks, screen taps, or keyboard inputs. The main culprit behind high TBT is typically long-running JavaScript tasks. However, other tasks like parsing HTML or updating the page layout can also contribute to a high TBT.

- score: 0-1 score, lower the better
- numericValue: Measured in milliseconds.
    - 0-300 == good
    - 300-600 == moderate
    - 600-xxx == bad

numRequests
- Total number of requests for resources called by the site

numScripts
- Total number of code scripts called by the site

numStylesheets
- Total number of CSS style files called by the site

numFonts
- Total number of font files/resources called by the site

numTasks
- Total number of tasks completed by the site

totalByteWeight
- Total number of bytes created by the site

totalTaskTime
- Total number of seconds expired to complete the rendering of the page

mainDocumentTransferSize
- Total number of bytes transferred back-and-forth between client and server(s)
