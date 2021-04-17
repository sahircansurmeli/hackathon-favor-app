import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Button,
  Alert,
  Platform,
  Image
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from "@react-navigation/native";

const AddBook = ({ navigation, route }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>Add New Book</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput style={styles.inputBox} placeholder="Title.."></TextInput>
        <TextInput
          style={styles.inputBox}
          placeholder="Details.."
        ></TextInput>
        <TextInput style={styles.inputBox} placeholder="Points.."></TextInput>
        <Button title="Pick an image from media library" onPress={pickImageMediaLibrary} />
        <Button title="Take a photo from the camera" onPress={pickImageCamera} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
    flex: 1,
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
});

export default AddBook;
