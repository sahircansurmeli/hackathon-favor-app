import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

function BackArrowIcon(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M20.3333 11H1.66663M1.66663 11L11 20.3332M1.66663 11L11 1.6665"
          stroke="#ffffff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default BackArrowIcon;
