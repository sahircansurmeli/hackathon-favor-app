import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import DetailModal from '../../components/DetailModal';
import { firebase } from "../../firebase";

import LeaderboardIcon from "../../components/icons/LeaderboardIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import AddIcon from "../../components/icons/AddIcon";

const MOCK_BOOKS = [{ id: 1, title: 'K&R' }, { id: 2, title: 'Cracking the Coding Interview' }, { id: 3, title: 'Hello' }, { id: 4, title: 'Hey' }];
const MOCK_SKILLS = [{ id: 1, title: 'Skateboarding' }, { id: 2, title: 'Skiing' }, { id: 3, title: 'Basketball' }, { id: 4, title: 'Maths' }];

const Card = ({ title }) => {
  const [modal, showModal] = useState(false);

  return (
    <TouchableOpacity onPress={() => showModal(true)}>
      <View style={styles.card}>
          <Text>{title}</Text>
        <DetailModal visible={modal} title={title} onCancel={() => showModal(false)} />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    firebase.firestore().collection("books").get()
      .then((snapshot) => setBooks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
      .catch((err) => console.log("Error retrieving books", err));
    firebase.firestore().collection("skills").get()
      .then((snapshot) => setSkills(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))))
      .catch((err) => console.log("Error retrieving skills", err));
  }, []);

  const renderCard = ({ item }) => (
    <Card title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <ProfileIcon onPress={() => navigation.navigate("Profile")} />
        <Text style={styles.header}>EXCHANGE</Text>
        <LeaderboardIcon onPress={() => console.log("Leaderboard")} />
      </View>
      <View style={styles.bodyView}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subtitle}>BOOKS</Text>
            <AddIcon />
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList data={books} renderItem={renderCard} keyExtractor={item => item.id} horizontal />
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subtitle}>SKILLS</Text>
            <AddIcon />
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList data={skills} renderItem={renderCard} keyExtractor={item => item.id.toString()} horizontal />
        </View>

        <Button title="Sign out" onPress={() => firebase.auth().signOut()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#57B3C8',
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: "10%"
    // backgroundColor: "#444"
  },
  section: {
    marginVertical: 15
  },
  header: {
    color: "#FFF",
    fontFamily: "Montserrat",
    fontSize: 24,
    letterSpacing: 2,
    margin: 15
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "#FFF",
    margin: 15
  },
  subtitle: {
    color: "#FFF",
    fontFamily: "Montserrat",
    fontSize: 26,
    letterSpacing: 2
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
    alignItems: "center"
  },
  list: {
    // backgroundColor: "red"
  }
});