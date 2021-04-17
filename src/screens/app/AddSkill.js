import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Alert,
  Button,
  Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import { firebase } from "../../firebase";
import CustomButton from "../../components/CustomButton";
import BackArrowIcon from "../../components/icons/BackArrowIcon";

const AddSkill = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [points, setPoints] = useState("");
  const [image, setImage] = React.useState(null);

  const getPermissionMediaLibrary = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status;
    }
  }

  const getPermissionCamera = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      return status;
    }
  }

  const pickImageMediaLibrary = async () => {
    const status = await getPermissionMediaLibrary();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need media library permissions to make this work!');
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  const pickImageCamera = async () => {
    const status = await getPermissionCamera();
    if (status !== "granted") {
      Alert.alert('Sorry, we need camera permissions to make this work!');
    } else {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1
      });

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

  const Post = async () => {
    firebase
      .firestore()
      .collection("skills")
      .add({
        title: title,
        details: details,
        points: Number(points),
        picture: "cracking.jpg",
        user: firebase
          .firestore()
          .doc("users/" + firebase.auth().currentUser.uid),
      })
      .then(() => {
        console.log("Skill added!");
        navigation.goBack();
      });
  };

  const alertButton = () =>
    Alert.alert("Confirmation", "Are you sure?", [
      {
        text: "Cancel",
      },
      { text: "OK", onPress: () => Post() },
    ]);

  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.headerView}>
            <BackArrowIcon onPress={() => navigation.goBack()} />
            <Text style={styles.header}>Add New Skill</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputBox}
              placeholder="Title.."
              onChangeText={setTitle}
              value={title}
            ></TextInput>
            <TextInput
              style={styles.inputBox}
              placeholder="Details.."
              onChangeText={setDetails}
              value={details}
            ></TextInput>
            <TextInput
              style={styles.inputBox}
              placeholder="Points.."
              onChangeText={setPoints}
              value={points}
              keyboardType="numeric"
            ></TextInput>
            <Button title="Pick an image from media library" onPress={pickImageMediaLibrary} />
            <Button title="Take a photo from the camera" onPress={pickImageCamera} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
          </View>
          <View style={styles.buttonView}>
            <CustomButton
              color="#56ccf2"
              style={styles.button}
              text="Post"
              onPress={alertButton}
            />
            <CustomButton
              color="#bdbdbd"
              style={styles.button}
              text="Cancel"
              onPress={() => navigation.goBack()}
            />
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#57B3C8",
    justifyContent: "center",
    alignItems: "stretch",
  },
  headerView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "3%",
  },
  section: {
    marginVertical: 15,
  },
  header: {
    color: "#FFF",
    fontFamily: "Montserrat",
    fontSize: 24,
    letterSpacing: 2,
    margin: 15,
  },
  sectionHeader: {
    color: "#FFF",
    margin: 15,
  },
  inputView: {
    flex: 9,
    margin: 50,
    marginTop: 0,
    marginBottom: 20,
  },
  inputBox: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
  },
  buttonView: {
    flexDirection: "row",
    margin: "3%",
    justifyContent: "center",
  },
  button: {
    marginHorizontal: "3%",
    marginBottom: "5%",
  },
});

export default AddSkill;
