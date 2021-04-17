import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import DetailModal from '../../components/DetailModal';
import { firebase } from "../../firebase";

const MOCK_BOOKS = [{ id: 1, title: 'K&R' }, { id: 2, title: 'Cracking the Coding Interview' }, { id: 3, title: 'Hello' }, { id: 4, title: 'Hey' }];
const MOCK_SKILLS = [{ id: 1, title: 'Skateboarding' }, { id: 2, title: 'Skiing' }, { id: 3, title: 'Basketball' }, { id: 4, title: 'Maths' }];

const Card = ({ title }) => {
  const [modal, showModal] = useState(false);

  return (
    <TouchableOpacity onPress={() => showModal(true)}>
      <View style={styles.card}>
          <Text>{title}</Text>
        <DetailModal visible={modal} onCancel={() => showModal(false)} />
      </View>
    </TouchableOpacity>
  )
}

export default function App() {

  const renderCard = ({ item }) => (
    <Card title={item.title} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>EXCHANGE</Text>
      </View>
      <View style={styles.bodyView}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subtitle}>BOOKS</Text>
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList data={MOCK_BOOKS} renderItem={renderCard} keyExtractor={item => item.id.toString()} horizontal />
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subtitle}>SKILLS</Text>
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList data={MOCK_SKILLS} renderItem={renderCard} keyExtractor={item => item.id.toString()} horizontal />
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
    justifyContent: "center",
  },
  bodyView: {
    flex: 9,
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