import * as React from "react";
import { TouchableOpacity } from "react-native"; 
import Svg, { Path } from "react-native-svg";

function BackArrow(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
        width={27}
        height={27}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm10-8a8 8 0 100 16 8 8 0 000-16z"
          fill="#fff"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.3341 12.0839V14.2809L8.24011 14.2809L11.8026 17.8429L10.2488 19.3964L4.03381 13.1823L10.2488 6.96808L11.8026 8.52162L8.23985 12.0839L22.3341 12.0839Z"
          fill="#000"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default BackArrow;
