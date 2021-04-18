import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

import CameraIcon from "./icons/CameraIcon";

const CameraButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>TAKE A PHOTO</Text>
                <CameraIcon />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#777",
        paddingHorizontal: "5%",
        paddingVertical: "8%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    text: {
        fontFamily: "Montserrat",
        fontSize: 13,
        color: "#fff",
    }
});

export default CameraButton;