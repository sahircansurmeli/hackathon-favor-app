import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import DetailModal from "../../components/DetailModal";
import { firebase } from "../../firebase";

import BackArrowIcon from "../../components/icons/BackArrowIcon";
import SearchIcon from "../../components/icons/SearchIcon";

const MOCK_LEADERBOARD = [
  { id: 1, name: "Snoop Dog", points: 15 },
  { id: 2, name: "Enes", points: 25 },
  { id: 3, name: "Michael Jackson", points: 35 },
  { id: 4, name: "Kaan", points: 45 },
];

function leaderboardItem({ item }) {
  return (
    <View style={leaderboardStyles.container}>
      <Text style={leaderboardStyles.points}>{item.points}</Text>
      <Text style={leaderboardStyles.name}>{item.name}</Text>
    </View>
  );
}

const leaderboardStyles = StyleSheet.create({
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
  },
  points: {
    fontSize: 22,
    minWidth: 70,
    marginRight: 5,
  },
  name: {
    fontSize: 18,
  },
});

export default function LeaderboardScreen() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .orderBy("points", "desc")
      .get()
      .then((snapshot) =>
        setUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      )
      .catch((err) => console.log("Error retrieving users", err));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <BackArrowIcon onPress={() => console.log("Back arrow")} />
        <Text style={styles.header}>LEADERBOARD</Text>
        <SearchIcon onPress={() => console.log("Leaderboard")} />
      </View>
      <View style={styles.bodyView}>
        <FlatList
          data={users}
          renderItem={leaderboardItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#57B3C8",
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "3%",
  },
  bodyView: {
    flex: 9,
    marginTop: "10%",
    width: "100%",
    justifyContent: "center",
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
  subtitle: {
    color: "#FFF",
    fontFamily: "Montserrat",
    fontSize: 26,
    letterSpacing: 2,
  },
  cards: {
    width: "88%",
    // paddingHorizontal: 3
    // backgroundColor: "yellow"
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    opacity: 0.7,
    width: 130,
    aspectRatio: 0.9,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    // backgroundColor: "red"
  },
});
