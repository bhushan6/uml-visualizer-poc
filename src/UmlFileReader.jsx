/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { parser, traverseNode } from "./utils";

export const UMLFileReader = ({ setUMLText }) => {
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
