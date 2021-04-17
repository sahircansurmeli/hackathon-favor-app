import * as React from "react";
import { TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

function ProfileIcon(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Svg
        width={24}
        height={26}
        viewBox="0 0 24 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path
          d="M22.333 25v-2.667A5.333 5.333 0 0017 17H6.333A5.333 5.333 0 001 22.333V25M11.667 11.667a5.333 5.333 0 100-10.667 5.333 5.333 0 000 10.667z"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default ProfileIcon;
