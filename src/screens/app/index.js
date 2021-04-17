import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function AuthContainer() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}