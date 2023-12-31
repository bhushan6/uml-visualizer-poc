import * as go from "gojs";

const $ = go.GraphObject.make;

const actorTemplate = $(
  go.Node,
  "Auto", // Use "Auto" panel to automatically size the node based on its content
  $(
    go.Panel,
    "Vertical", // Use "Vertical" panel to arrange the image and text vertically
    $(
      go.Picture, // The image element
      { width: 60, height: 60, margin: 5 }, // Adjust the width, height, and margin as needed
      new go.Binding("source", "image") // Bind the image source to the 'image' property in the node data
    ),
    $(
      go.TextBlock, // The text element below the image
      { margin: 5, font: "12px sans-serif" }, // Adjust the margin and font as needed
      new go.Binding("text", "text") // Bind the text to the 'caption' property in the node data
    )
  )
);

const useCaseTemplate = new go.Node("Auto")
  .add(new go.Shape("ellipse", { stroke: "black" }).bind("fill", "color"))
  .add(new go.TextBlock({ margin: 6, font: "18px sans-serif" }).bind("text"));

const associationLink = $(
  go.Link,
  {},
  $(go.Shape, {}),
  $(
    go.TextBlock,
    {
      segmentFraction: 0.5,
      font: "10pt Arial, sans-serif",
      stroke: "black",
      margin: new go.Margin(3, 0, 0, 0),
      background: "white",
    },
    new go.Binding("text", "label")
  )
);

const includeLink = $(
  go.Link,
  {},
  $(go.Shape, { stroke: "black", strokeDashArray: [4, 2] }),
  $(go.Shape, { toArrow: "Standard" }),
  $(
    go.TextBlock,
    {
      segmentFraction: 0.5,
      font: "10pt Arial, sans-serif",
      stroke: "black",
      margin: new go.Margin(3, 0, 0, 0),
      background: "white",
    },
    new go.Binding("text", "label")
  )
);

const packageTemplate = $(
  go.Group,
  "Vertical",
  $(
    go.TextBlock, // group title
    { alignment: go.Spot.Left, font: "Bold 12pt Sans-Serif", margin: 5 },
    new go.Binding("text", "text")
  ),
  $(
    go.Panel,
    "Auto",
    $(
      go.Shape,
      "Rectangle", // surrounds the Placeholder
      { parameter1: 14, fill: "rgba(128,128,128,0.33)" }
    ),
    $(
      go.Placeholder, // represents the area of all member parts,
      { padding: 20 }
    ) // with some extra padding around them
  )
);

export const templates = {
  Nodes: { Actor: actorTemplate, UseCase: useCaseTemplate },
  Links: { Association: associationLink, Include: includeLink },
  Groups: { Package: packageTemplate },
};
