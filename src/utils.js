import actorImg from "./assets/actor.png";

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

export const templateCreator = (diagram, templatesMap) => {
  Object.entries(templatesMap).forEach(([goDataType, templates]) => {
    Object.entries(templates).forEach(([type, template]) => {
      if (goDataType === "Nodes") {
        diagram.nodeTemplateMap.add(type, template);
      } else if (goDataType === "Links") {
        diagram.linkTemplateMap.add(type, template);
      } else if (goDataType === "Groups") {
        diagram.groupTemplateMap.add(type, template);
      }
    });
  });
};

const cleanNode = ({ diagram, node }) => {
  diagram.model.removeNodeData(node);
  diagram.updateAllTargetBindings();
};

const cleanLink = ({ diagram, link }) => {
  diagram.model.removeLinkData(link);
  diagram.updateAllTargetBindings();
};

export const createGoJsGraphics = ({ node, parent, diagram }) => {
  if (node.node === "packagedElement") {
    const type = node.attributes["xmi:type"].split(":");
    const category = type[type.length - 1];
    if (category === "Association") {
      const ends = [];
      const label = node.attributes.name || "";

      node.children.forEach((child) => {
        if (child.node === "ownedEnd") {
          ends.push(child.attributes.type);
        }
      });

      interfaceCreator[category] &&
        interfaceCreator[category](diagram, ends[1], ends[0], label);

      const linkData = diagram.model.linkDataArray.find(function (link) {
        return link.from === ends[1] && link.to === ends[0];
      });

      return () => {
        cleanLink({ link: linkData, diagram });
      };
    } else {
      interfaceCreator[category] &&
        interfaceCreator[category](
          diagram,
          node.attributes.name || category,
          node.attributes["xmi:id"],
          parent.attributes["xmi:id"]
        );

      const nodeData = diagram.model.findNodeDataForKey(
        node.attributes["xmi:id"]
      );
      return () => {
        cleanNode({ node: nodeData, diagram });
      };
    }
  } else if (node.node === "include") {
    const type = node.attributes["xmi:type"].split(":");
    const category = type[type.length - 1];
    const from = parent.attributes["xmi:id"];
    const to = node.attributes["addition"];
    interfaceCreator[category] && interfaceCreator[category](diagram, from, to);

    const linkData = diagram.model.linkDataArray.find(function (link) {
      return link.from === from && link.to === to;
    });

    return () => {
      cleanLink({ link: linkData, diagram });
    };
  } else if (node.node === "extend") {
    const type = node.attributes["xmi:type"].split(":");
    const category = type[type.length - 1];
    const to = node.attributes["extendedCase"];
    const from = parent.attributes["xmi:id"];

    interfaceCreator[category] && interfaceCreator[category](diagram, from, to);

    const linkData = diagram.model.linkDataArray.find(function (link) {
      return link.from === from && link.to === to;
    });

    return () => {
      cleanLink({ link: linkData, diagram });
    };
  }
};

export function traverseNode(node, parent) {
  const nodeJson = {
    node: undefined,
    attributes: {},
    children: [],
  };
  if (node.nodeType === 1) {
    nodeJson.node = node.nodeName;
    if (node.attributes.length > 0) {
      for (let i = 0; i < node.attributes.length; i++) {
        const attribute = node.attributes[i];
        nodeJson.attributes[attribute.nodeName] = attribute.nodeValue;
      }
    }
    if (parent) {
      parent.children.push(nodeJson);
    }
    const children = node.childNodes;
    for (let i = 0; i < children.length; i++) {
      traverseNode(children[i], nodeJson);
    }

    return nodeJson;
  }
}

export const parser = new DOMParser();
