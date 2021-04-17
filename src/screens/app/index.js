import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import LeaderboardScreen from "./LeaderboardScreen";
import AddBook from "./AddBook";
import AddSkill from "./AddSkill";
import ProfileScreen from "./ProfileScreen";
import ExchangeScreen from "./ExchangeScreen";

const Stack = createStackNavigator();

export default function AuthContainer() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Stack.Screen name="AddBook" component={AddBook} />
      <Stack.Screen name="AddSkill" component={AddSkill} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Exchanges" component={ExchangeScreen} />
    </Stack.Navigator>
  );
}
