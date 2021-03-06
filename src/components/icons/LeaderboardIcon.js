import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { TouchableOpacity } from "react-native";

function LeaderboardIcon(props) {

  return (
    <TouchableOpacity onPress={props.onPress} >
      <Svg
        height={30}
        viewBox="0 0 24 24"
        width={30}
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <Path d="M16.5 6a.5.5 0 01-.474-.342L15.14 3H8.86l-.886 2.658a.499.499 0 11-.948-.316l1-3A.5.5 0 018.5 2h7a.5.5 0 01.474.342l1 3A.5.5 0 0116.5 6zM7.5 24h-6C.673 24 0 23.327 0 22.5v-11a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v12a.5.5 0 01-.5.5zM1 12v10.5a.5.5 0 00.5.5H7V12z" />
        <Path d="M16.5 24h-9a.5.5 0 01-.5-.5v-18a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v18a.5.5 0 01-.5.5zM8 23h8V6H8z" />
        <Path d="M.5 12a.5.5 0 01-.474-.658l1-3A.5.5 0 011.5 8h6a.5.5 0 010 1H1.86l-.886 2.658A.5.5 0 01.5 12zM22.5 24h-6a.5.5 0 01-.5-.5v-11a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v10c0 .827-.673 1.5-1.5 1.5zM17 23h5.5a.5.5 0 00.5-.5V13h-6z" />
        <Path d="M23.5 13a.5.5 0 01-.474-.342L22.14 10H16.5a.5.5 0 010-1h6a.5.5 0 01.474.342l1 3A.5.5 0 0123.5 13z" />
      </Svg>
    </TouchableOpacity>
  );
}

export default LeaderboardIcon;
