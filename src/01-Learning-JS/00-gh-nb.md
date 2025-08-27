# 1.0-Reviewing the GH Methodology & Learning to Write JS in Observable

Before we move forward, let's be sure we remember how to practice using our code-writing tools to work for us, rather than become impediments to our success.

## 1.0.1 Running your Framework environment

When you develop your OF notebooks, you'll need to remember how to setup your programming environment, i.e., the set of technologies that we need to run altogether to make our notebooks render our content.

1. In VSC, open the Terminal by selecting the following menu option: **Terminal** > **New Terminal**.
2. Verify that the terminal is using the correct environment.
    - Mac: `bash`
    - Windows: `cmd.exe`
3. If the environment is correct, start a ***localhost*** server to see your project live by running the following command: `yarn dev`.
    <p class="note">A new window in your default browser should have openned to the app locally on a ***localhost*** server.</p>

If any of these steps do not work, please post your issue to the Help forum.

## 1.0.2 Fundamental Observable Framework Syntax

Before we learn how to code JS in this chapter, you need to learn a few basic syntax forms that will help you write code that executes in your OF notebook versus code that you want to display in the OF notebook.

### Displaying code on the page

Sometimes you will need to display code in the OF notebook, because you want to document a process or explain what is happenning. Here are two ways to do so:

- **Inline Code**: Write code content in-between two backticks, i.e., backquotes, graves, or grave accents: <code>``</code>
    - **EXAMPLE**: `let inlineExample = "Inline code for reading display"`
- **MultiLine Code**: Write code content in-between two sequences of 3 backticks.
    1. <code>```javascript</code>: The first sequence of 3 backticks and the statement of ***javascript*** opens what's called a ***preformatted*** element.
    2. <code>```</code>: The second sequence of 3 backticks closes the scope of the preformatted element:
        <br>

        **EXAMPLE**:
        <br><br>
        **How it renders on the page**:

        ```javascript
        let multilineExample1 = "A multiline codeblock for display"
        let multilineExample2 = " for display"

        let joinMultlineExample = multilineExample1 + multilineExample2
        ```

        <br>

        **How it looks in your code editor**:

        <pre>```javascript
        let multilineExample1 = "A multiline codeblock for display"
        let multilineExample2 = " for display"

        let joinMultlineExample = multilineExample1 + multilineExample2
        \`\`\`</pre>

## 1.0.3 Practicing the Github development methodology

We also need to make sure that we practice our Github development methodology, which includes the following high-level steps:

1. For each chapter, ***before you start modifying any exercises***, create a new separate ***branch*** of work on the repo, so you isolate any new work on the repo to those specific set of files.
    <p class="note">
      Always create the new branch from the <strong>main</strong> branch, when starting a new chapter of work. By doing so, you avoid creating complex differences between files organized in the repo directories.
    </p>
2. Name the new branch with the following naming scheme: `CHP/X.x--lastname`.
3. Complete the work in the chapter, committing and pushing work as needed.
4. When you are ready to submit your work for review, create a ***pull request*** (PR).
    <p class="note">
      Copy and paste the content from the `TEMPLATE-PR.md` file in the project's root folder.
    </p>
5. Solicit feedback from your assigned peers.
6. Make any changes, as needed, based on any feedback by committing pushing those changes to the branch.
7. Notify me, Dr. Lindgren, that you are ready for a grade.
8. When I tell you that your work is complete, ***merge*** the PR into the ***main*** branch.

Here's that process again for you:

1. Open Github Desktop (GHD).
2. Select the correct ***repo***.
3. Verify that the current ***branch*** currently selected is the desired branch.
    <p class="tip">
      Each chapter will have its own branch.
      <br><strong>AND</strong><br>
      Always start from the <strong>main branch</strong>>, when starting a new chapter of work.
    </p>
4. After verifying the correct repo and branch are selected in GHD, select **Repository** > **Open in Visual Studio Code**.
5. In VS Code, complete each chapter of work on the correct branch.
    <p class="tip">
      Verify the correct branch is selected in VSC on the bottom-left corner of the UI.
    </p>
6. After you complete a section of a chapter, push your changes to the correct branch for that chapter of work.
7. When the chapter is complete, make sure all of the changes are committed and pushed to the branch. When such changes are complete, create a pull request (PR) with the class template for all PRs for the textbook, which can be found at the following location in the repo: `/TEMPLATE-PR.md`.

## E1. Practice GH Methodology

**Goal**: For this exercise, we're keeping the additional content simple, so we can focus on the GH methodology noted above. So, to make some changes to this chapter, complete the following tasks:

1. Create a multiline JS codeblock that renders to the page with the "javascript" keyword after the first 3 backticks.
2. Inside the "javascript" codeblock, add the following text `// I will show up on the page`.
    - **NOTE**: This codeblock should render on the locally hosted page.
3. Create another multiline JS codeblock that is executable by using the "js" keyword after the first 3 backticks.
4. Inside the "js" codeblock, add the following text `console.log("I do NOT show up on the page")`.
    - **NOTE**: This codeblock should NOT render on the locally hosted page. I'll show where to find it in class. `:-)`

**Solution**
```javascript 
// I will show up on the page
```

```js
console.log("I do NOT show up on the page")
```

## Conclusion

Techniques learned and practiced include:

1. How to jumpstart your development environment with the `yarn dev` command in the terminal.
2. How to write code in Observable Framework notebooks with the backtick character (<code>`</code>) that either:
    1. renders as formatted text on the page with either:
        - inline notation <code>`let inline = "code go here"`</code>, or
        - multiline notation prefaced with `javascript`:
          <pre>
          ```javascript
          // multiline code
          let it = "go in here"
          ```
          </pre>
    2. executes as actual JS code with a multiline block prefaced with `js`.
3. **GH methodological workflow** specific to this class, which involves:
    1. Developing new work on a meaningful **branch** that uses the agreed upon naming scheme: `CHP/X.x--lastname`.
    2. Practicing the iterative process to **commit** and **push** regularly with meaningful **commit messages**.
    3. Creating a **PR** (**pull request**) and use the provided content in the template to start it.
    4. No peer responses required for this chapter.
    5. Submit the PR link in Moodle, when you're ready.

## Submission

Submit the PR link in Moodle, when you're ready.
