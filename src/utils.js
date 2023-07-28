import actorImg from "./assets/actor.png";

export const interfaceCreator = {
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
