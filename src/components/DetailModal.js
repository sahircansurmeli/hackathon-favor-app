import React from "react";
import { StyleSheet, Text, View, Modal, Image, Linking } from "react-native";
import { firebase } from "../firebase";

import CustomButton from "./CustomButton";

const DetailModal = ({
  item: { title, details, points, name, user, itemPath },
  visible,
  onCancel,
}) => {
  const request = async () => {
    let currentUser = firebase.auth().currentUser.uid;
    // get reference of current user
    currentUser = firebase.firestore().doc(`users/${currentUser}`);
    user
      .get()
      .then((doc) => {
        let requests = doc.data().requests || [];
        if (itemPath !== undefined) {
          requests.push({
            item: itemPath,
            userRequesting: currentUser,
          });
        }
        user.update({ requests });
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
          <View style={styles.imageView}>
            <Image
              source={require("../../assets/skateboard.jpeg")}
              style={styles.image}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.title}>{title} Class</Text>
            <Text style={styles.definition}>
              Learn {title} from a fellow Mason student
            </Text>
            <Text style={styles.user}>by {name}</Text>
            <Text style={styles.points}>{points} PTS</Text>
          </View>
          <View style={styles.buttonView}>
            <CustomButton
              color="#bdbdbd"
              style={styles.modalButton}
              text="Cancel"
              onPress={onCancel}
            />
            <CustomButton
              color="#56ccf2"
              style={styles.modalButton}
              text="Request"
              onPress={request}
            />
          </View>
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
    // padding: 20,
  },
  titleView: {
    alignItems: "center",
    paddingHorizontal: "5%",
  },
  imageView: {
    backgroundColor: "blue",
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    backgroundColor: "red",
  },
  title: {
    fontSize: 24,
    fontFamily: "MontserratBold",
    textAlign: "center",
    marginTop: "10%",
    marginBottom: "2%",
  },
  definition: {
    fontSize: 16,
    color: "#B4B6B8",
    marginVertical: "3%",
  },
  user: {
    fontFamily: "Montserrat",
    fontSize: 16,
    marginVertical: "3%",
  },
  points: {
    fontSize: 18,
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
});

export default DetailModal;
