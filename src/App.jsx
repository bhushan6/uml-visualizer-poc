/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import actorImg from "./assets/actor.png";
import * as go from "gojs";
import { UMLFileReader } from "./UmlFileReader";

const $ = go.GraphObject.make;

const interfaceCreator = {
  Package: (diagram, text, key, parent) => {
    diagram.model.addNodeData({
      key: key,
      text,
      color: "white",
      isGroup: true,
      group: parent,
      category: "Package",
    });
  },

  UseCase: (diagram, text, key, parent) => {
    diagram.model.addNodeData({
      key: key,
      text,
      color: "white",
      group: parent,
      category: "UseCase",
    });
  },

  Actor: (diagram, text, key, parent) => {
    diagram.model.addNodeData({
      key: key,
      text,
      color: "white",
      group: parent,
      image: actorImg,
      category: "Actor",
    });
  },

  Association: (diagram, from, to, label = "") => {
    console.log(label);
    diagram.model.addLinkData({
      from,
      to,
      category: "Association",
      label,
    });
  },

  Include: (diagram, from, to, label = "<<include>>") => {
    console.log(from, to);
    diagram.model.addLinkData({
      from,
      to,
      category: "Include",
      label,
    });
  },

  Extend: (diagram, from, to, label = "<<extend>>") => {
    diagram.model.addLinkData({
      from,
      to,
      category: "Include",
      label,
    });
  },
};

const UmlContructor = ({ node, parent }) => {
  const diagram = useDiagram();

  useEffect(() => {
    if (!diagram) return;

    let nodeData = null;
    let linkData = null;

    if (node.node === "packagedElement") {
      const type = node.attributes["xmi:type"].split(":");
      const category = type[type.length - 1];
      if (category === "Association") {
        const ends = [];
        // let isLinkByLink = false;
        const label = node.attributes.name || "";

        node.children.forEach((child) => {
          if (child.node === "ownedEnd") {
            ends.push(child.attributes.type);
          }
        });

        interfaceCreator[category] &&
          interfaceCreator[category](diagram, ends[1], ends[0], label);

        linkData = diagram.model.linkDataArray.find(function (link) {
          return link.from === ends[1] && link.to === ends[0];
        });
      } else {
        interfaceCreator[category] &&
          interfaceCreator[category](
            diagram,
            node.attributes.name || category,
            node.attributes["xmi:id"],
            parent.attributes["xmi:id"]
          );

        nodeData = diagram.model.findNodeDataForKey(node.attributes["xmi:id"]);
      }
    } else if (node.node === "include") {
      const type = node.attributes["xmi:type"].split(":");
      const category = type[type.length - 1];
      const from = parent.attributes["xmi:id"];
      const to = node.attributes["addition"];
      interfaceCreator[category] &&
        interfaceCreator[category](diagram, from, to);

      linkData = diagram.model.linkDataArray.find(function (link) {
        return link.from === from && link.to === to;
      });
    } else if (node.node === "extend") {
      const type = node.attributes["xmi:type"].split(":");
      const category = type[type.length - 1];
      const to = node.attributes["extendedCase"];
      const from = parent.attributes["xmi:id"];

      interfaceCreator[category] &&
        interfaceCreator[category](diagram, from, to);

      linkData = diagram.model.linkDataArray.find(function (link) {
        return link.from === from && link.to === to;
      });
    }

    return () => {
      if (nodeData) {
        console.log(nodeData);
        diagram.model.removeNodeData(nodeData);
        diagram.updateAllTargetBindings();
      }

      if (linkData) {
        console.log(linkData);
        diagram.model.removeLinkData(linkData);
        diagram.updateAllTargetBindings();
      }
    };
  }, [diagram, node]);

  return (
    <>
      {node.children.map((child, i) => (
        <UmlContructor
          key={child.attributes["xmi:id"]}
          node={child}
          parent={node}
        />
      ))}
    </>
  );
};

const UMLDiagramCtx = createContext(null);

const UMLDiagramContext = ({ children, ...props }) => {
  const [diagram, setDiagram] = useState(null);

  useEffect(() => {
    const myDiagram = new go.Diagram("myDiagramDiv", {
      "undoManager.isEnabled": true,
      initialAutoScale: go.Diagram.Uniform, // zoom to make everything fit in the viewport
      layout: new go.ForceDirectedLayout(),
    });

    setDiagram(myDiagram);

    const useCaseNode = new go.Node("Auto")
      .add(new go.Shape("ellipse", { stroke: "black" }).bind("fill", "color"))
      .add(
        new go.TextBlock({ margin: 6, font: "18px sans-serif" }).bind("text")
      );

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

    myDiagram.nodeTemplateMap.add("UseCase", useCaseNode);
    myDiagram.nodeTemplateMap.add("Actor", actorTemplate);

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

    myDiagram.linkTemplateMap.add("Association", associationLink);
    myDiagram.linkTemplateMap.add("Include", includeLink);

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

    myDiagram.groupTemplateMap.add("Package", packageTemplate);

    myDiagram.model = new go.GraphLinksModel(
      [
        // node data,
      ],
      [
        // links data
      ]
    );

    return () => {
      myDiagram.div = null;
    };
  }, []);

  return (
    <UMLDiagramCtx.Provider value={diagram}>
      <div
        id="myDiagramDiv"
        style={{
          width: "100%",
          height: "100vh",
          background: "#DAE4E4",
        }}
        {...props}
      >
        {children}
      </div>
    </UMLDiagramCtx.Provider>
  );
};

const useDiagram = () => useContext(UMLDiagramCtx);

function App() {
  const [uml, setUMLText] = useState();
  return (
    <>
      <UMLFileReader setUMLText={setUMLText} />
      <UMLDiagramContext>
        {uml && <UmlContructor key={uml.attributes["xmi:id"]} node={uml} />}
      </UMLDiagramContext>
    </>
  );
}

export default App;
