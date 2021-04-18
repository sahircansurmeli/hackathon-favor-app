import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import AddBook from "./AddBook";
import AddSkill from "./AddSkill";
import ProfileScreen from "./ProfileScreen";
import ExchangeScreen from "./ExchangeScreen";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createStackNavigator();

export default function AppContainer() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerTitle: () => null,
        headerBackTitleVisible: false,
        headerTintColor: "#FFFFFF",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ headerLeft: () => null, }} />
      <Stack.Screen name="AddBook" component={AddBook} />
      <Stack.Screen name="AddSkill" component={AddSkill} />
      <Stack.Screen name="Exchanges" component={ExchangeScreen} />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTintColor: "#000" }}
      />
    </Stack.Navigator>
  );
}
