# Heather Cox Richardson's "Letters from an American" Series

Heather Cox Richardson (born October 8, 1962) is an American historian who works as a professor of history at Boston College, where she teaches courses on the American Civil War, the Reconstruction Era, the American West, and the Plains Indians. She previously taught history at MIT and the University of Massachusetts Amherst. Richardson has authored seven books on history and politics. In 2019, she started publishing Letters from an American ([https://heathercoxrichardson.substack.com/](https://heathercoxrichardson.substack.com/)), a nightly newsletter that chronicles current events in the larger context of American history. Richardson focuses on the health of American democracy. The newsletter has gained over one million subscribers, making her (as of December 2020) the most successful individual author of a paid publication on Substack. ([Wikipedia](https://en.wikipedia.org/wiki/Heather_Cox_Richardson), 2025)

## About the Data

- Scraped on 9/26/2025 & 9/27/2025.
- Exported as JSON file, wherein each row/object is a "letter" written and published by Richardson on Substack.com.
  ```json
  [
    {
      // String. Publication date of the letter
      "date": "September-25-2025",
      // String. URL of the post
      "url": "https://heathercoxrichardson.substack.com/p/september-25-2025",
      // Number. Total number of likes by last scrape
      "likes": 6601,
      // Integer. Number of comments by last scrape
      "comments": 742,
      // String text of entire posted letter
      "letter": "Today, with the popularity of ...",
      // Array list of links used in the letter
      "links": [
        "https://www.npr.org/2025/09/24/nx-s1-5551198/democrat-wins-congressional-seat-in-arizona-narrowing-gops-slim-house-majority",
        "https://thehill.com/homenews/house/5520512-massie-grijalva-epstein-petition/",
        // ...
      ],
    }
  ]
  ```