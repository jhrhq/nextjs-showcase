import { Code } from "bright";
import Revealable from "./revealable";

const FIRST_SNIPPET = `\
# This is a comment. Python ignores anything after the # symbol
name = "John Doe"  # This is a string
age = 30  # This is an integer
height = 5.9  # This is a floating point number

# Let's print these out
print("Name:", name)
print("Age:", age)
print("Height:", height)\
`;

function CodeSnippet() {
  return (
    <Revealable>
      <Code className="code-snippet" theme="dracula" lang="py">
        {FIRST_SNIPPET}
      </Code>
    </Revealable>
  );
}

export default CodeSnippet;
