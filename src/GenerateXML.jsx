import { useDiagram } from "./UMLContext";

export const GenerateXML = () => {
  const diagram = useDiagram();

  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10000000,
        bottom: "5%",
        left: "50%",
        transform: "translate(0, -50%)",
      }}
    >
      <button
        onClick={() => {
          console.log(diagram.nodes, diagram.links, ":::::::::");
        }}
      >
        Generate
      </button>
    </div>
  );
};
