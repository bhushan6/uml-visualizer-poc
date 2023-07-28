/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import "./App.css";
import { UMLFileReader } from "./UmlFileReader";
import { UMLDiagramContext } from "./UMLContext";
import { UMLNode } from "./UMLNode";

function App() {
  const [uml, setUMLText] = useState();
  return (
    <>
      <UMLFileReader setUMLText={setUMLText} />
      <UMLDiagramContext>
        {uml && <UMLNode key={uml.attributes["xmi:id"]} node={uml} />}
      </UMLDiagramContext>
    </>
  );
}

export default App;
