import React from 'react';
import { StyleSheet, Text, View, Modal, Image } from 'react-native';

import CustomButton from "./CustomButton";

const DetailModal = (props) => {
    return (
        <Modal transparent={true} animationType="fade" visible={props.visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalCard}>
                    <View style={styles.imageView}>
                        <Image source={require('../../assets/skateboard.jpeg')} style={styles.image} />
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Skateboarding Class</Text>
                        <Text style={styles.definition}>Learn skateboarding from a fellow Mason student</Text>
                        <Text style={styles.points}>10 PTS</Text>
                    </View>
                    <View style={styles.buttonView}>
                        <CustomButton color="#bdbdbd" style={styles.modalButton} text="Cancel" onPress={props.onCancel} />
                        <CustomButton color="#56ccf2" style={styles.modalButton} text="Contact" />
                    </View>
                </View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    modalBackground: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    modalCard: {
        backgroundColor: "#fff",
        width: "88%",
        borderRadius: 16,
        opacity: 0.97
        // padding: 20,
    },
    titleView: {
        alignItems: 'center',
        paddingHorizontal: "5%"
    },
    imageView: {
        backgroundColor: "blue"
    },
    image: {
        resizeMode: "cover",
        width: "100%",
        backgroundColor: "red",
    },
    title: {
        fontSize: 24,
        fontFamily: 'MontserratBold',
        textAlign: 'center',
        marginTop: "10%",
        marginBottom: "2%"
    },
    definition: {
        fontSize: 16,
        color: "#B4B6B8",
        marginVertical: "3%"
    },
    points: {
        fontSize: 18,
        marginVertical: "3%"
    },
    buttonView: {
        flexDirection: "row",
        margin: "3%",
        justifyContent: "center"
    },
    modalButton: {
        marginHorizontal: "3%",
        marginBottom: "5%"
    }
});


export default DetailModal;