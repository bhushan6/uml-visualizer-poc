/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import * as go from "gojs";

export const Node1 = ({ location, figure }) => {
  return (
    <>
      <node type="Vertical" locationSpot={go.Spot.Center} location={location}>
        <shape type="RoundedRectangle" figure={figure} />
        <textBlock type="default content" />
      </node>
    </>
  );
};

export const Node2 = ({ source, text }) => {
  return (
    <>
      <node type="Horizontal" background="#44CCFF">
        <picture
          margin={10}
          width={50}
          height={50}
          background={"red"}
          source={source}
        />
        <textBlock
          type={text}
          margin={12}
          stroke="white"
          font="bold 16px sans-serif"
        />
      </node>
    </>
  );
};
