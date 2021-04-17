import React from "react";
import { Text, TouchableOpacity } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

const CustomButton = (props) => {
  const color = props.color ?? "rgba(100, 90, 255)";

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }, props.style]} onPress={props.onPress ?? null}>
      <Text style={styles.text}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = {
  button: {
    // backgroundColor: 'rgb(100, 90, 255)',
    borderRadius: 100,
    paddingHorizontal: 35,
    paddingVertical: 15,
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat',
    letterSpacing: 2.78
  },
}

export default CustomButton;