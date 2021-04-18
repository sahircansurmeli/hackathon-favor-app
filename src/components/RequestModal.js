import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, Modal, Image, Linking } from "react-native";
import { firebase } from "../firebase";

import CustomButton from "./CustomButton";
import CheckIcon from "./icons/CheckIcon";

const RequestModal = ({
  item: { title, details, points: itemPoints, name: itemName, ref: itemRef },
  user: { name: userName, points, ref: userRef },
  visible,
  close,
}) => {
  const [requested, setRequested] = useState(false);

  const accept = async () => {
    let currentUser = firebase.auth().currentUser.uid;
    // get reference of current user
    currentUser = firebase.firestore().doc(`users/${currentUser}`);

    firebase
      .firestore()
      .collection("transactions")
      .add({
        giver: currentUser,
        taker: userRef,
        item: itemRef,
      })
      .then(() => {
        console.log("Transaction added!");
      })
      .catch((err) => {
        console.error(err);
      });

    close();
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
          <Fragment>
            <View style={styles.imageView}>
              <Image
                source={require("../../assets/skateboard.jpeg")}
                style={styles.image}
              />
            </View>
            <View style={styles.titleView}>
              <Text style={styles.title}>You have a new request</Text>
              <Text style={styles.description}>
                {userName} is requesting {title} which is worth {itemPoints} pts{" "}
              </Text>
            </View>
            <View style={styles.buttonView}>
              <CustomButton
                color="#bdbdbd"
                style={styles.modalButton}
                text="Reject"
                onPress={close}
              />
              <CustomButton
                color="#56ccf2"
                style={styles.modalButton}
                text="Accept"
                onPress={accept}
              />
            </View>
          </Fragment>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalCard: {
    backgroundColor: "#fff",
    width: "88%",
    borderRadius: 16,
    opacity: 0.97,
  },
  titleView: {
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  imageView: {
    borderRadius: 16,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "2%",
  },
  description: {
    fontSize: 21,
    color: "black",
    marginVertical: "3%",
  },
  buttonView: {
    flexDirection: "row",
    margin: "3%",
    justifyContent: "center",
  },
  modalButton: {
    marginHorizontal: "3%",
    marginBottom: "5%",
  },
  requestedContainer: {
    padding: 20,
    margin: 40,
    height: "100%",
    backgroundColor: "black",
    flex: 1,
    width: "100%",
  },
});

export default RequestModal;
