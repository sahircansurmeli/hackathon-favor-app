import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import DetailModal from '../../components/DetailModal';
import { firebase } from "../../firebase";
import { useNavigation } from '@react-navigation/native';

import LeaderboardIcon from "../../components/icons/LeaderboardIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import AddIcon from "../../components/icons/AddIcon";
import PointsIcon from "../../components/icons/PointsIcon";

import { createStackNavigator } from '@react-navigation/stack';



const MOCK_BOOKS = [{ id: 1, title: 'K&R' }, { id: 2, title: 'Cracking the Coding Interview' }, { id: 3, title: 'Hello' }, { id: 4, title: 'Hey' }];
const MOCK_SKILLS = [{ id: 1, title: 'Skateboarding' }, { id: 2, title: 'Skiing' }, { id: 3, title: 'Basketball' }, { id: 4, title: 'Maths' }];

const Card = ({ title, details, points, name }) => {
  const [modal, showModal] = useState(false);

  return (
    <TouchableOpacity onPress={() => showModal(true)}>
      <View style={styles.card}>
        <Text>{title}</Text>
        <DetailModal
          visible={modal}
          title={title}
          points={points}
          details={details}
          name={name}
          onCancel={() => showModal(false)} />
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [points, setPoints] = useState(0);


  /*
    book : {
      datils,
      picture,
      points
      title
      user: {
        name: 
        points:
      }
    }
  */

  const extractUsername = async (userCollection) => {
    const user = await userCollection.get();
    const name = await user.data().name;
    return name;
  }

  const getBooks = () => {
    firebase.firestore().collection("books").get()
      .then((snapshot) => {
        const tempBooks = snapshot.docs.map(async (doc) => {
          const username = await extractUsername(doc.data().user);
          return { id: doc.id, name: username, ...doc.data() };
        });
        Promise.all(tempBooks).then((values) => setBooks(values));
      })
      .catch((err) => console.log("Error retrieving books", err));
  }

  const getSkills = () => {
    firebase.firestore().collection("skills").get()
      .then((snapshot) => {
        const tempSkills = snapshot.docs.map(async (doc) => {
          const username = await extractUsername(doc.data().user);
          return { id: doc.id, name: username, ...doc.data() };
        });
        Promise.all(tempSkills).then((values) => setSkills(values))
      })
      .catch((err) => console.log("Error retrieving skills", err));
  }

  const getPoints = async () => {
    const uid = firebase.auth().currentUser.uid;
    const data = await firebase.firestore().collection("users").doc(uid).get();
    const points = data.data().points;
    setPoints(points);
  }

  useEffect(() => {
    getBooks();
    getSkills();
    getPoints();
  }, []);

  const renderCard = ({ item }) => (
    <Card title={item.title} details={item.details} points={item.points} name={item.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <ProfileIcon onPress={() => navigation.navigate("Profile")} />
        <Text style={styles.header}>EXCHANGE</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Leaderboard")}>
          <LeaderboardIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.pointsView}>
        <PointsIcon />
        <Text style={styles.pointText}>{points} PTS</Text>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subtitle}>BOOKS</Text>
            <AddIcon onPress={() => navigation.navigate('AddBook')} />
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList data={books} renderItem={renderCard} keyExtractor={item => item.id} horizontal />
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subtitle}>SKILLS</Text>
            <AddIcon onPress={() => navigation.navigate('AddSkill')} />
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
    // backgroundColor: "red"
  },
  bodyView: {
    flex: 9,
    marginTop: "3%"
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
  pointsView: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "#FFFA",
    width: "35%",
    borderRadius: 8,
    padding: "3%",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "8%",
    marginTop: "5%"
  },
  pointText: {
    fontFamily: "MontserratMedium",
    fontSize: 20,
    marginLeft: "5%"
  },
  list: {
    // backgroundColor: "red"
  }
});