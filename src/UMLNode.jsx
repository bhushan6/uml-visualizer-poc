/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDiagram } from "./UMLContext";
import { interfaceCreator } from "./utils";

export const UMLNode = ({ node, parent }) => {
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
      {node.children.map((child) => (
        <UMLNode key={child.attributes["xmi:id"]} node={child} parent={node} />
      ))}
    </>
  );
};
