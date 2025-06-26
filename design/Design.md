# AlphaMath Project

The goal of this project is to create an application that aids users in exploring mathematics. This includes toying around equations, theorems, or just plainly solving problems.

## Data Models

Other "math explorers", like calculators, generally work with number values. They are designed towards a goal of calculating a final number. In alphamath, this isn't and should not be the final goal. Equations should only be solved when the user wants to solve it, that is, if it is solvable.

Math is a very broad thing so we cannot just have one data model to represent the values. I propose that we should have "Formula Context"s and each Formula Context should have its own data model, interoperable with other Formula Contexts.

For example, in the statement:

$\forall x \in S, \exists x \lt 5$

The "$x \lt 5$" part is in an **algebraic formula context** , where the values are often numbers

However, the "$\forall x \in S$" part is in a **set theory formula context**, where we are operating with sets.

Another example context can be the **logical context**: "$p \implies q \equiv 0$"

This context distinction allows us to categorize expression types in our data models more efficiently and logically.

---

After we are able to distinguish contexts, we can now define a couple things:

A **workspace** should be something like a project and should have a root context.

A **context** contains multiple formulas, expressions, extra custom UI content and may contain any amount of child contexts. Expressions inside a context doesn't do anything (we allow them for UI/UX purposes but they do not contribute to any solution)

A **formula** is a way to relate multiple expressions together in order to be able to do mathematics. A formula, in its data form, includes multiple expressions. A formula can be one of the defined Formula Contexts. Examples of formulas are: algebraic equations ($2x = 10$) or inequalities ($x \lt 5$), set theory statements ($A \subset B$) etc.

An **expression** is basically a math node. Making it a list of expressions do not really make sense.

A **math node**, (in the Algebraic Context) is the building block of alphamath. It can be one of the following depending on its type:
- Literal number ($1$)
- A variable ($x$)
- Negation, which has a single math node child ($-1$)
- Addition: as a list of math nodes ($9 + 10$)
- Subtraction can be defined as a negated node in an addition node's list, so we do not define it.
- Multiplication: as a list of math nodes ($2 * 5$)
- Fraction: 2 child math nodes ($\frac{1}{2}$)
- etc.

---

Contexts being able to have their own child contexts is a crucial feature. An example usecase for this is when you are trying to solve this example formula:

$|x-1| > 5$

You would need to have a way to handle 2 cases, one where $x-1$ is positive and another where its negative.

Child contexts fix this issue because you can create 2 child contexts and one of them can assume $x-1$ is positive and the other can assume its negative.

## User Interface

I want it like Figma. I never really used figma but thats the best way I can exactly explain it I think.

Workspace is basically an infinitely scrollable/pannable and zoomable area where you can drag formulas, expressions, nodes and windows/gizmos around.

I really want to make most stuff being drag-and-drop-able. Being able to have $2x - 2 = x + 2$ and dragging $x$ to the left side to have it automatically subtract and become $x - 2 = 2$ would be cool.

Also yes this thing should have graphs built in like desmos but inside windows.
