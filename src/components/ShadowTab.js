import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

const ShadowTab = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={props.onPress}>
        <Text style={styles.text}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: "3%",
    borderRadius: 5,
    borderColor: "black",
    shadowRadius: 2,
    shadowColor: "#0000000A",
    shadowOpacity: 6,
    shadowOffset: {
      height: 8,
      width: 10,
    },
    elevation: 1,
    justifyContent: "center",
    paddingHorizontal: "5%",
    backgroundColor: "#fff",
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.06,
    // box-shadow: 0px 8px 40px 0px #0000000A;
  },
  button: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    // backgroundColor: "blue",
  },
  text: {
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
  },
});

export default ShadowTab;
