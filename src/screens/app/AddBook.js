import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";

import { firebase } from "../../firebase";
import CustomButton from "../../components/CustomButton";
import BackArrowIcon from "../../components/icons/BackArrowIcon";

const Post = (props) => {
  firestore()
    .collection("Users")
    .add({
      name: "Ada Lovelace",
      age: 30,
    })
    .then(() => {
      console.log("User added!");
    });
};

const AddBook = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <BackArrowIcon onPress={() => navigation.goBack()} />
        <Text style={styles.header}>Add New Book</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputBox} placeholder="Title.."></TextInput>
        <TextInput style={styles.inputBox} placeholder="Details.."></TextInput>
        <TextInput style={styles.inputBox} placeholder="Points.."></TextInput>
      </View>
      <View style={styles.buttonView}>
        <CustomButton color="#56ccf2" style={styles.button} text="Post" />
        <CustomButton color="#bdbdbd" style={styles.button} text="Cancel" />
      </View>
    </SafeAreaView>
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

export default AddBook;
