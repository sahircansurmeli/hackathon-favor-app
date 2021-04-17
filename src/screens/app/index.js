import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./HomeScreen";
import LeaderboardScreen from "./LeaderboardScreen";

const Stack = createStackNavigator();

export default function AuthContainer() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
}