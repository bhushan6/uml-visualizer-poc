/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as go from "gojs";
import { templateCreator } from "./utils";
import { templates } from "./diagramTemplates";

const UMLDocCtx = createContext(null);

export const UMLDocContext = ({ children }) => {
  const umlDocState = useState();

  return (
    <UMLDocCtx.Provider value={umlDocState}>{children}</UMLDocCtx.Provider>
  );
};

export const useUmlDoc = () => useContext(UMLDocCtx);

const UMLDiagramCtx = createContext(null);

export const UMLDiagramContext = ({ children, ...props }) => {
  const [diagram, setDiagram] = useState(null);

  const [umlDoc, setUmlDoc] = useUmlDoc();

  const fn = useCallback(
    (key) => {
      // console.log(umlDoc.querySelectorAll(`[xmi:id="${key}"]`));
      // console.log(umlDoc.getElementsByTagName("packagedElement"));
      const packagedElementNodes =
        umlDoc.getElementsByTagName("packagedElement");

      for (let index = 0; index < packagedElementNodes.length; index++) {
        const packagedElementNode = packagedElementNodes[index];
      }
    },
    [umlDoc]
  );

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

    const modelChangeTracker = (e) => {
      if (e.isTransactionFinished) {
        // Handle transaction completion
        let txn = e.object;
        if (txn === null) return;
        // console.log("Transaction finished:", e);
        txn.changes.each((e) => {
          if (e.change === go.ChangedEvent.Insert) {
            console.log(e.newValue.data, "INSERT");
          } else if (e.change === go.ChangedEvent.Remove) {
            console.log(e.oldValue.data, "REMOVE");
          }
        });
      }
    };

    const changeSelection = (e) => {
      console.log("Selection changed:", e);
    };

    const linkDrawn = (e) => {
      // Handle new link creation here
      console.log("New link drawn:", e.subject);
    };

    const linkRelinked = (e) => {
      console.log("Link reconnected:", e.subject);
    };

    const droppedNode = (e) => {
      const diagram = e.diagram;
      const droppedParts = e.subject; // This contains the parts being dropped

      droppedParts.each(function (part) {
        // Check if the dropped part is a node
        if (part instanceof go.Node) {
          // Get the group under the mouse
          const group = diagram.findPartAt(
            diagram.lastInput.documentPoint,
            false
          );

          // Check if the group is a valid group node
          if (group instanceof go.Group) {
            // You can add the node to the group here
            // Example: group.add(memberNode);
            console.log(
              "Node dropped on group:",
              part.data.key,
              "Group:",
              group.data.key
            );
          }
        }
      });
    };

    const selectionMoved = (e) => {
      const diagram = e.diagram;
      const movedParts = e.subject; // This contains the parts moved

      movedParts.each(function (part) {
        // Check if the moved part is a node
        if (part instanceof go.Node) {
          // Get the group under the mouse
          const group = diagram.findPartAt(
            diagram.lastInput.documentPoint,
            false
          );

          // Check if the group is a valid group node
          if (group instanceof go.Group) {
            // You can add the node to the group here
            // Example: group.add(memberNode);
            console.log(
              "Node moved onto group:",
              part.data.key,
              "Group:",
              group.data.key
            );
          }
        }
      });
    };

    myDiagram.addModelChangedListener(modelChangeTracker);

    myDiagram.addDiagramListener("ChangedSelection", changeSelection);

    myDiagram.addDiagramListener("LinkDrawn", linkDrawn);

    myDiagram.addDiagramListener("LinkRelinked", linkRelinked);
    myDiagram.addDiagramListener("ExternalObjectsDropped", droppedNode);
    myDiagram.addDiagramListener("SelectionMoved", selectionMoved);

    return () => {
      myDiagram.div = null;
      myDiagram.removeModelChangedListener(modelChangeTracker);
      myDiagram.removeDiagramListener("ChangedSelection", changeSelection);
      myDiagram.removeDiagramListener("LinkDrawn", linkDrawn);
      myDiagram.removeDiagramListener("LinkRelinked", linkRelinked);
      myDiagram.removeDiagramListener("ExternalObjectsDropped", droppedNode);
      myDiagram.removeDiagramListener("SelectionMoved", selectionMoved);
    };
  }, [fn]);

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
