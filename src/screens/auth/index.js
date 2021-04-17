import React from "react";
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";

const Stack = createStackNavigator();

export default function AuthContainer() {
  return (
    <Stack.Navigator initialRouteName="Register" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}