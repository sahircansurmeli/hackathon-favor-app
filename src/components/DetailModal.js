import React, { useState, Fragment } from "react";
import { StyleSheet, Text, View, Modal, Image, Linking } from "react-native";
import { firebase } from "../firebase";

import CustomButton from "./CustomButton";
import CheckIcon from "./icons/CheckIcon";

const DetailModal = ({
  item: { title, details, points, name, user, itemPath },
  visible,
  close,
}) => {
  const [requested, setRequested] = useState(false);

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
        setRequested(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.modalBackground}>
        <View style={styles.modalCard}>
          {requested ? (
            <Fragment>
              <View style={styles.imageView}>
                <Image
                  source={require("../../assets/check.png")}
                  style={styles.checkImage}
                />
              </View>
              <View style={styles.titleView}>
                <Text style={styles.title}>Requested</Text>
              </View>
              <View style={styles.buttonView}>
                <CustomButton
                  color="#bdbdbd"
                  style={styles.modalButton}
                  text="Dismiss"
                  onPress={close}
                />
              </View>
            </Fragment>
          ) : (
            <Fragment>
              <View style={styles.imageView}>
                <Image
                  source={require("../../assets/skateboard.jpeg")}
                  style={styles.image}
                />
              </View>
              <View style={styles.titleView}>
                <Text style={styles.title}>{title} Class</Text>
                <Text style={styles.definition}>
                  {details}
                </Text>
                <Text style={styles.user}>by {name}</Text>
                <Text style={styles.points}>{points} PTS</Text>
              </View>
              <View style={styles.buttonView}>
                <CustomButton
                  color="#bdbdbd"
                  style={styles.modalButton}
                  text="Cancel"
                  onPress={close}
                />
                <CustomButton
                  color="#56ccf2"
                  style={styles.modalButton}
                  text="Request"
                  onPress={request}
                />
              </View>
            </Fragment>
          )}
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
  requestedContainer: {
    padding: 20,
    margin: 40,
    height: "100%",
    backgroundColor: "black",
    flex: 1,
    width: "100%",
  },
  checkImage: {
    height: 200,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 16,
  },
});

export default DetailModal;
