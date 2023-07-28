/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const parser = new DOMParser();

function traverseNode(node, parent) {
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
    // tree[nodeJson.attributes["xmi:id"]] = nodeJson;
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

export const UMLFileReader = ({ setUMLText }) => {
  //   const [umlText, setUMLText] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const content = reader.result;
        // Remove the first line from the content
        const contentWithoutFirstLine = content.substring(
          content.indexOf("\n") + 1
        );

        const xmlDoc = parser.parseFromString(
          contentWithoutFirstLine,
          "text/xml"
        );

        const rootElement = xmlDoc.documentElement;
        const umlJson = traverseNode(rootElement);
        setUMLText(umlJson);
        event.target.value = null;
      };
      reader.readAsText(file);
    }
  };

  //   console.log(umlText);

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10000000,
        top: "5%",
        left: "50%",
        transform: "translate(0, -50%)",
      }}
    >
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};
