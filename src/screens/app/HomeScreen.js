import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { auth } from "../../firebase";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button title="Sign out" onPress={() => auth.signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});