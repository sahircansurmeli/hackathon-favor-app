import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from "expo-app-loading";
import { useFonts } from 'expo-font';
import { firebase } from "./src/firebase";

import AuthContainer from "./src/screens/auth";
import AppContainer from "./src/screens/app";

export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = React.useState(false);
  firebase.auth().onAuthStateChanged(setAuthenticatedUser);

  let [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
    MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf')
  });

  if (!loaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      {authenticatedUser ? <AppContainer /> : <AuthContainer />}
    </NavigationContainer>
  );
}
