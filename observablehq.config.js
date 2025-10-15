// See https://observablehq.com/framework/config for documentation.
export default {
  root: "src", // The path to the source root.
  output: "dist", // path to the output root for build

  // Configuration options and their defaults:
  title: "Justice Centered Data Design",
  theme: "light",
  sidebar: true, // whether to show the sidebar
  toc: true, // whether to show the table of contents
  pager: true, // whether to show previous & next links in the footer
  search: true, // activate search
  style: "style.css", // Global CSS styles
  preserveExtension: true, // preserves .html extension

  pages: [
    // GETTING STARTED
    {
      name: "0. Getting Started",
      open: false,
      pages: [
        {name: "0.0 What is Observable?", path: "/00-Getting-Started/00-what-is-framework"},
        {name: "0.1 Install git/Github", path: "/00-Getting-Started/01-git-github"},
        {name: "0.2 VC: Forking & Cloning", path: "/00-Getting-Started/02-vc-fork-clone"},
        {name: "0.3 Command Line", path: "/00-Getting-Started/03-cmd-line"},
        {name: "0.4 Reading & Writing Code Files", path: "/00-Getting-Started/04-reading-files"},
        {name: "0.5 Installing Node.js", path: "/00-Getting-Started/05-install-node"},
        {name: "0.6 Conclusion", path: "/00-Getting-Started/06-conclusion"}
      ]
    },
    // 1. JS FUNDAMENTALS
    {
      name: "1. JS Fundamentals",
      open: false,
      pages: [
        {
          name: "1.0. GH Methodology & Notebook Syntax",
          path: "/01-Learning-JS/00-gh-nb"},
        {
          name: "1.1. What is JS",
          path: "/01-Learning-JS/01-what-is-js"},
        {
          name: "1.2. Data Types",
          path: "/01-Learning-JS/02-data-types"},
        {
          name: "1.3. Operators",
          path: "/01-Learning-JS/03-operators"},
        {
          name: "1.4. Conditionals",
          path: "/01-Learning-JS/04-conditionals"},
        {
          name: "1.5. Lists & Loops",
          path: "/01-Learning-JS/05-lists-loops"},
        {
          name: "1.6. Strings",
          path: "/01-Learning-JS/06-strings"},
        {
          name: "1.7. Dates & Time",
          path: "/01-Learning-JS/07-dates"},
        {
          name: "1.8. Data Formats & Loading",
          path: "/01-Learning-JS/08-load-data"},
        {
          name: "1.9. Objects & Maps",
          path: "/01-Learning-JS/09-objs-maps"},
        {
          name: "1.10. Functions",
          path: "/01-Learning-JS/10-functions"},
      ]
    },
    // 2. STATS for SJ
    {
      name: "2. Stats for SJ",
      open: false,
      pages: [
        {
          name: "2.1 Why Stats?",
          path: "/02-Why-Stats/01-why-stats"
        },
        {
          name: "2.2 The Humanity of Data",
          path: "/02-Why-Stats/02-data-humanity"
        },
        {
          name: "2.3 Grouping & Calculating Frequency Distributions",
          path: "/02-Why-Stats/03-freq-dist-create"
        },
        {
          name: "E-2.3 Group & Count 3-Levels",
          path: "/02-Why-Stats/03-freq-dist-EDA"
        },
        {
          name: "2.4 Plotting Frequency Distributions",
          path: "/02-Why-Stats/04-freq-dist-plot"
        },
        {
          name: "2.5 Central Tendency",
          path: "/02-Why-Stats/05-central-tend"
        },
        // {
        //   name: "2.5 Central Tendency & Variability",
        //   path: "/02-Why-Stats/05-central-tend-plot--teachers_copy"
        // },
        // {
        //   name: "2.6 Correlation & Linear Regression",
        //   path: "/02-Why-Stats/06-correlation-and-regression--teachers_copy"
        // },
      ]
    },
    // HELP PAGES
    {
      name: "Help",
      open: false,
      pages: [
        {
          name: "Terminal Support",
          path: "/Help/terminal"
        },
        {
          name: "Markdown Support",
          path: "/Help/markdown"
        },
      ]
    },
    // MIDTERM
    {
      name: "Midterm",
      open: false,
      pages: [
        {name: "Directions", path: "/MIDTERM/index"},
        {name: "Lastname's Midterm", path: "/MIDTERM/midterm"},
      ]
    },
    // CLASS DEMOS
    {
      name: "Class Demos",
      open: false,
      pages: [
        {
          name: "Eyes on the Prize!",
          path: "/Class-Demos/00-eotp"
        },
        // {
        //   name: "Compromise Demo",
        //   path: "/Class-Demos/xx-compromise"
        // },
      ]
    },
    // {
    //   name: "Textual Analysis",
    //   open: false,
    //   pages: [
    //     {
    //       name: "Compromise",
    //       path: "/xx-Textual-Analysis/compromise"
    //     },
    //   ]
    // },
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32">\n<link rel="stylesheet" href="/assets/css/hljs.css">',
  footer: '<script src="/assets/js/toggle-section.js"></script>\n<script src="/assets/js/video-playback.js"></script>',
};
