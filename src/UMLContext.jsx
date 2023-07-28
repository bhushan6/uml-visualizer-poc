/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import * as go from "gojs";
import { templateCreator } from "./utils";
import { templates } from "./diagramTemplates";

const UMLDiagramCtx = createContext(null);

export const UMLDiagramContext = ({ children, ...props }) => {
  const [diagram, setDiagram] = useState(null);

  useEffect(() => {
    const myDiagram = new go.Diagram("myDiagramDiv", {
      "undoManager.isEnabled": true,
      initialAutoScale: go.Diagram.Uniform, // zoom to make everything fit in the viewport
      layout: new go.ForceDirectedLayout(),
    });

    setDiagram(myDiagram);

    templateCreator(myDiagram, templates);

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

export const useDiagram = () => useContext(UMLDiagramCtx);
