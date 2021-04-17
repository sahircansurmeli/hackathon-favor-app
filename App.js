import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AuthContainer from "./src/screens/auth";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContainer />
    </NavigationContainer>
  );
}
