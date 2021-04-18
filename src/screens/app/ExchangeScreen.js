import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { firebase } from "../../firebase";

import BackArrow from "../../components/icons/BackArrow";

const MOCK_EXCHANGES = [
  {
    requester: "enes",
    recepient: "kaan",
    points: 125,
    id: 1,
  },
  {
    requester: "sahircan",
    recepient: "jeong",
    points: 234,
    id: 2,
  },
  {
    requester: "enes",
    recepient: "jeong",
    points: 12,
    id: 3,
  },
];

function Exchange({ item: { takerName, giverName, itemPoints, itemName } }) {
  return (
    <TouchableOpacity>
      <View style={exchangeStyle.container}>
        <Text style={exchangeStyle.text}>{itemPoints}</Text>
        <Text style={exchangeStyle.text}>{takerName}</Text>
        <BackArrow style={{ transform: [{ rotate: "180deg" }] }} />
        <Text style={exchangeStyle.text}>{giverName}</Text>
      </View>
    </TouchableOpacity>
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
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    const tempArr = [];
    const uid = firebase.auth()?.currentUser?.uid;
    if (uid) {
      const transactionSnapshot = await firebase
        .firestore()
        .collection("transactions")
        .get();
      const transPromises = transactionSnapshot.docs.map(async (doc) => {
        const data = doc.data();
        const giver = await data.giver.get();
        const taker = await data.taker.get();
        const item = await data.item.get();
        const { name: giverName } = giver.data();
        const { name: takerName } = taker.data();
        const { title, points } = item.data();
        return {
          itemTitle: title,
          giverName,
          takerName,
          itemPoints: points
        };
      });
      Promise.all(transPromises).then((data) => setTransactions(data));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const releasePoints = (takerRef, giverRef, itemRef) => {
    const item = await itemRef.get();
    const { points } = item.data();

    giverRef.get().then(snapshot => {
      let currPoints = snapshot.data().points;
      currPoints = Number(currPoints);
      giverRef.update({ points: currPoints + points })
    }).catch(err => console.error(err)) ;

    takerRef.get().then(snapshot => {
      let currPoints = snapshot.data().points;
      currPoints = Number(currPoints);
      takerRef.update({ points: currPoints - points })
    }).catch(err => console.error(err));

    console.log("Points released")
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <BackArrow onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Exchanges</Text>
      </View>
      <FlatList
        data={transactions}
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
