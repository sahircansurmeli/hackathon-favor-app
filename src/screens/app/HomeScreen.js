import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import DetailModal from "../../components/DetailModal";
import { firebase } from "../../firebase";
import { useFocusEffect } from "@react-navigation/native";

import LeaderboardIcon from "../../components/icons/LeaderboardIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import AddIcon from "../../components/icons/AddIcon";
import PointsIcon from "../../components/icons/PointsIcon";
import RequestModal from "../../components/RequestModal";

const Card = ({ item }) => {
  const [modal, showModal] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const [isPictureReady, setIsPictureReady] = useState(false);

  React.useEffect(() => {
    firebase
      .storage()
      .ref(item.id + ".jpg")
      .getDownloadURL()
      .then(setPictureUrl)
      .catch((err) => {
        if (err.code === "storage/object-not-found") {
          setPictureUrl("");
        }
      });
  }, [item.id]);

  React.useEffect(() => {
    if (pictureUrl) {
      console.log("prefetch");
      Image.prefetch(pictureUrl).then(setIsPictureReady);
    }
  }, [pictureUrl]);

  return (
    <TouchableOpacity onPress={() => showModal(true)}>
      <View style={styles.card}>
        {pictureUrl && isPictureReady ? (
          <Image
            source={{ uri: pictureUrl }}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              borderRadius: 14,
            }}
          />
        ) : (
          <Text>{item.title}</Text>
        )}
        <DetailModal
          visible={modal}
          item={item}
          close={() => showModal(false)}
          pictureUrl={pictureUrl}
          isPictureReady={isPictureReady}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [skills, setSkills] = useState([]);
  const [points, setPoints] = useState(0);
  const [requestModal, showRequestModal] = useState(false);
  const uid = firebase.auth().currentUser.uid;

  const [receivedRequestItem, setReceivedRequestItem] = useState({});
  const [receivedRequestUser, setReceivedRequestUser] = useState({});

  const extractUsername = async (userCollection) => {
    const user = await userCollection.get();
    const name = await user.data().name;
    return name;
  };

  const getBooks = () => {
    firebase
      .firestore()
      .collection("books")
      .get()
      .then((snapshot) => {
        const tempBooks = snapshot.docs.map(async (doc) => {
          const username = await extractUsername(doc.data().user);
          return {
            id: doc.id,
            name: username,
            ...doc.data(),
            // will be used when attaching requet
            itemPath: doc.ref,
          };
        });
        Promise.all(tempBooks).then((values) => setBooks(values));
      })
      .catch((err) => console.log("Error retrieving books", err));
  };

  const getSkills = () => {
    firebase
      .firestore()
      .collection("skills")
      .get()
      .then((snapshot) => {
        const tempSkills = snapshot.docs.map(async (doc) => {
          const username = await extractUsername(doc.data().user);
          return {
            id: doc.id,
            name: username,
            ...doc.data(),
            itemPath: doc.ref.path,
          };
        });
        Promise.all(tempSkills).then((values) => setSkills(values));
      })
      .catch((err) => console.log("Error retrieving skills", err));
  };

  const getPoints = async () => {
    const data = await firebase.firestore().collection("users").doc(uid).get();
    const points = data.data().points;
    setPoints(points);
  };

  const followRequests = async () => {
    const doc = await firebase.firestore().collection("users").doc(uid);
    const observer = doc.onSnapshot(
      async (docSnapshot) => {
        const lastRequest = docSnapshot.data().requests[0];
        const item = await lastRequest.item.get();
        const user = await lastRequest.userRequesting.get();
        const { details, picture, points, title } = item.data();
        const { name, points: userPoints } = user.data();

        console.log(`item: ${title} ${points}`);
        console.log(`user: ${name} ${userPoints}`);

        setReceivedRequestItem({
          details,
          picture,
          points,
          title,
          ref: item.ref,
        });
        setReceivedRequestUser({ name, points: userPoints, ref: user.ref });
        showRequestModal(true);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );
  };

  useEffect(() => {
    console.log("receivedRequestItem");
    console.log(receivedRequestItem);
    console.log("receivedRequestUser");
    console.log(receivedRequestUser);
    console.log("requestModal");
    console.log(requestModal);
  }, [receivedRequestItem, receivedRequestUser, requestModal]);

  useFocusEffect(
    React.useCallback(() => {
      getBooks();
      getSkills();
      getPoints();
    }, [])
  );

  const renderCard = ({ item }) => <Card item={item} />;

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
            <AddIcon onPress={() => navigation.navigate("AddBook")} />
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList
            data={books}
            renderItem={renderCard}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.subtitle}>SKILLS</Text>
            <AddIcon onPress={() => navigation.navigate("AddSkill")} />
          </View>
        </View>
        <View style={styles.cards}>
          <FlatList
            data={skills}
            renderItem={renderCard}
            keyExtractor={(item) => item.id.toString()}
            horizontal
          />
        </View>
      </View>
      <View style={styles.lowerView}>
        <TouchableOpacity style={styles.requestsButton}>
          <Text style={styles.requestsText}>REQUESTS</Text>
        </TouchableOpacity>
        <RequestModal
          visible={requestModal}
          item={receivedRequestItem}
          user={receivedRequestUser}
          close={() => showRequestModal(false)}
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
    marginTop: "3%",
    // backgroundColor: "#444"
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginTop: "5%",
  },
  pointText: {
    fontFamily: "MontserratMedium",
    fontSize: 20,
    marginLeft: "5%",
  },
  lowerView: {
    flex: 1,
  },
  requestsButton: {
    backgroundColor: "#FFFA",
  },
  requestsText: {
    fontFamily: "Montserrat",
    width: Dimensions.get("window").width * 0.4,
    paddingVertical: "3%",
    textAlign: "center",
  },
  list: {
    // backgroundColor: "red"
  },
});
