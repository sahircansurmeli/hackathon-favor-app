import * as React from "react";
import Svg, { Path } from "react-native-svg";

function CheckIcon(props) {
  return (
    <Svg
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      // viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M26.6667 8L12 22.6667L5.33334 16"
        stroke="#0E0F0F"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default CheckIcon;
