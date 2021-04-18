import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../../firebase";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import SearchIcon from "../../components/icons/SearchIcon";
import { useNavigation } from "@react-navigation/core";

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

function LeaderboardList() {
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
    <FlatList
      data={users}
      renderItem={leaderboardItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const renderScene = SceneMap({
  year: LeaderboardList,
  month: LeaderboardList,
  week: LeaderboardList,
  day: LeaderboardList,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={tabBar.indicator}
    style={tabBar.main}
    renderLabel={({ route }) => <Text style={tabBar.text}>{route.title}</Text>}
  />
);

const tabBar = StyleSheet.create({
  main: {
    color: "#57B3C8",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  text: {
    color: "#57B3C8",
  },
  indicator: {
    backgroundColor: "#57B3C8",
  },
});

export default function LeaderboardScreen() {
  const layout = useWindowDimensions();
  const navigator = useNavigation();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "year", title: "YEAR" },
    { key: "month", title: "MONTH" },
    { key: "week", title: "WEEK" },
    { key: "day", title: "DAY" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>LEADERBOARD</Text>
        <SearchIcon onPress={() => console.log("Leaderboard")} />
      </View>
      <View style={styles.bodyView}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
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
});
