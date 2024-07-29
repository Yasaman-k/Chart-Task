Total time spent on the project: `60h`

1. [How to run the project](#How-to-run-the-project)
2. [Task Definition](#Task-Definition)
3. [Evaluation Criteria](#Evaluation-Criteria)
4. [Performance](#Performance)
5. [Improvement Opportunities](#Improvement-Opportunities)
6. [Performance](#Performance)

## How to run the project

1. Install dependencies
   - `npm install`
2. Run project in dev mode
   - `npm run start`

## Task Definition

#### Dynamic Chart:

Create a React application that generates a dynamic chart using either SVG or Canvas.
The chart should plot a series of (x, y) data points provided in an array.
The chart should update dynamically if the data changes.

#### Zoom Tool:

Implement a zoom tool similar to the selection tool in Windows when selecting multiple items on the desktop.
The user should be able to click and drag to create a rectangular selection area.
The chart should zoom into the area selected by the user without losing quality.

## Evaluation Criteria

1. Correctness and functionality of the dynamic chart.
2. Usability and smoothness of the zoom tool.
3. Code quality and adherence to best practices.
4. Clarity and completeness of the README file.
5. Overall user experience of the application.

## Performance

1. To enhance performance and responsiveness, we've added event.preventDefault() in our event handlers. This prevents default actions that can cause delays or unwanted behavior during interactive operations like drawing.

## 🔥 Improvement Opportunities

1. Enhance the chart's user interface for a more intuitive and visually
2. appealing experience.
   Increase the precision of the zoom area for more accurate user interactions.
