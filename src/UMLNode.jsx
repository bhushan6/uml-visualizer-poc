/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDiagram } from "./UMLContext";
import { createGoJsGraphics } from "./utils";

export const UMLNode = ({ node, parent }) => {
  const diagram = useDiagram();

  useEffect(() => {
    if (!diagram) return;

    const cleanUpGoJsGraphics = createGoJsGraphics({ diagram, node, parent });

    return () => {
      cleanUpGoJsGraphics && cleanUpGoJsGraphics();
    };
  }, [diagram, node]);

  return (
    <>
      {node.children.map((child) => (
        <UMLNode key={child.attributes["xmi:id"]} node={child} parent={node} />
      ))}
    </>
  );
};
