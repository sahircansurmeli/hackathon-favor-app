import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import { firebase } from "../../firebase";

import ShadowTab from "../../components/ShadowTab";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("Loading");
  const [points, setPoints] = useState(0);

  const grabUser = async () => {
    const uid = firebase.auth()?.currentUser?.uid;
    if (uid) {
      const user = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get();
      setName(user.data().name);
      setPoints(user.data().points);
    }
  };

  useEffect(() => {
    grabUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
      </View>
      <View style={styles.titleView}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.userView}>
        <View style={styles.pictureView}>
          <Image
            source={require("../../../assets/profile-pic.png")}
            style={styles.profilePic}
          />
        </View>
        <View style={styles.nameView}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.points}>{points} PTS</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        <ShadowTab text="Achievements" />
        <ShadowTab text="Upcoming Exchanges" />
        <ShadowTab text="Previous Exchanges" />
      </View>
      <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FDFDFD",
  },
  headerView: {
    flex: 1,
    width: "80%",
  },
  titleView: {
    flex: 1,
    width: "80%",
    // backgroundColor: "blue"
  },
  userView: {
    flex: 2,
    flexDirection: "row",
    width: "80%",
    // backgroundColor: "red"
  },
  pictureView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "yellow"
  },
  contentView: {
    flex: 10,
    paddingTop: "10%",
  },
  title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 28,
  },
  profilePic: {
    width: 96,
    height: 96,
  },
  name: {
    fontFamily: "MontserratBold",
    fontSize: 24,
  },
  points: {
    fontSize: 18,
    color: "#0001FC",
    // alignSelf: "flex-start"
  },
});

export default ProfileScreen;
