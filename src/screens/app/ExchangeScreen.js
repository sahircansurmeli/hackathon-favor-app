import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import { firebase } from "../../firebase";

import ShadowTab from "../../components/ShadowTab";
import BackArrow from "../../components/icons/BackArrow";

const MOCK_EXCHANGES = [
  {
    requester: "enes",
    recepient: "kaan",
    points: 125,
  },
  {
    requester: "sahircan",
    recepient: "jeong",
    points: 234,
  },
  {
    requester: "enes",
    recepient: "jeong",
    points: 12,
  },
];

function Exchange({ item: { requester, recepient, points } }) {
  return (
    <View style={exchangeStyle.container}>
      <Text style={exchangeStyle.text}>{points}</Text>
      <Text style={exchangeStyle.text}>{requester}</Text>
      <BackArrow style={{ transform: [{ rotate: "180deg" }] }} />
      <Text style={exchangeStyle.text}>{recepient}</Text>
    </View>
  );
}

const exchangeStyle = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 30,
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    justifyContent: "space-around",
  },
  text: {
    fontSize: 18,
  },
});

const ExchangeScreen = ({ navigation }) => {
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
        <BackArrow onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Exchanges</Text>
      </View>
      <FlatList
        data={MOCK_EXCHANGES}
        renderItem={Exchange}
        keyExtractor={(item) => item.id}
        style={styles.body}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FDFDFD",
    height: "100%",
  },
  headerView: {
    // flex: 1,
    height: 90,
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    // justifyContent: "space-around",
  },
  title: {
    fontFamily: "MontserratSemiBold",
    fontSize: 28,
    marginLeft: 35,
  },
  body: {
    flex: 15,
  },
});

export default ExchangeScreen;
