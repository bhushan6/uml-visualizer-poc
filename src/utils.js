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
