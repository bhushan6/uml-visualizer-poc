/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
import { UMLFileReader } from "./UmlFileReader";
import { UMLDiagramContext, UMLDocContext } from "./UMLContext";
import { UMLNode } from "./UMLNode";
import { GenerateXML } from "./GenerateXML";

function App() {
  const [uml, setUMLText] = useState();
  return (
    <>
      <UMLDocContext>
        <UMLFileReader setUMLText={setUMLText} />
        <UMLDiagramContext umlDoc={uml}>
          <GenerateXML />
          {uml && <UMLNode key={uml.attributes["xmi:id"]} node={uml} />}
        </UMLDiagramContext>
      </UMLDocContext>
    </>
  );
}

export default App;
