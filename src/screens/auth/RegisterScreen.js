import React, { useState, useRef } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { auth } from "../../firebase";

import CustomButton from '../../components/CustomButton';

export default function App({ navigation, ...props }) {
  const [showWarning, toggleWarning] = useState(false);
  const [warningText, setWarningText] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const verifyPasswordInput = useRef(null);

  const warningTexts = {
    emptyUsername: "The username is not valid",
    passwordsDontMatch: "Passwords do not match",
    invalidEmail: "The email address is not valid",
    weakPassword: "The password is not strong enough",
    emailAlreadyInUse: 'This email is already used'
  };

  const routeToLogin = () => {
    navigation.navigate('Login');
  }

  const updateDisplayName = () => {
    Firebase.auth().currentUser.updateProfile({
      displayName: username
    }).then(() => {
      console.log("display name added");
    }).catch((error) => {
      console.log(error);
    });
  }

  const register = () => {
    if (!username.trim()) {
      // Username is empty
      setWarningText(warningTexts.emptyUsername);
      toggleWarning(true);
    } else if (password !== verifyPassword) {
      toggleWarning(true);
      setWarningText(warningTexts.passwordsDontMatch);
    } else {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          updateDisplayName();
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            setWarningText(warningTexts.invalidEmail);
          } else if (error.code === "auth/email-already-in-use") {
            setWarningText(warningTexts.emailAlreadyInUse);
          }
          if (error.code === "auth/weak-password") {
            setWarningText(warningTexts.weakPassword);
          }
          toggleWarning(true);
        });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient colors={['#A40DE9', '#1536F1']} style={{ flex: 1 }}>
          <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 3 }}
              keyboardVerticalOffset={40}>
              <View style={styles.headerView}>
                <Text style={styles.title}>DIVERSIFY</Text>
              </View>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Email"
                  placeholderStyle={styles.placeholder}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  style={styles.inputField}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  returnKeyType="next"
                  textContentType="emailAddress"
                  value={email}
                  onSubmitEditing={() => usernameInput.current.focus()}
                />
                <TextInput
                  ref={usernameInput}
                  placeholder="Username"
                  placeholderStyle={styles.placeholder}
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  style={styles.inputField}
                  autoCapitalize="none"
                  autoCompleteType="username"
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={setUsername}
                  returnKeyType="next"
                  textContentType="username"
                  value={username}
                  onSubmitEditing={() => passwordInput.current.focus()}
                />
                <TextInput
                  ref={passwordInput}
                  placeholder="Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  style={styles.inputField}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={setPassword}
                  returnKeyType="next"
                  value={password}
                  secureTextEntry={true}
                  onSubmitEditing={() => verifyPasswordInput.current.focus()}
                  textContentType="newPassword"
                />
                <TextInput
                  ref={verifyPasswordInput}
                  placeholder="Verify Password"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  style={styles.inputField}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  onChangeText={setVerifyPassword}
                  returnKeyType="send"
                  value={verifyPassword}
                  secureTextEntry={true}
                  textContentType="newPassword"
                  onSubmitEditing={register}
                />
                {showWarning ? (<Text style={styles.warning}>{warningText}</Text>) : null}
              </View>
            </KeyboardAvoidingView>
            <View style={styles.lowerView}>
              <CustomButton color="rgb(100, 90, 255)" text="REGISTER" onPress={register} />
              <View style={styles.altView}>
                <TouchableOpacity onPress={routeToLogin}>
                  <Text style={styles.altButton}>Already have an account? <Text style={{ ...styles.altButton, textDecorationLine: "underline" }}>Sign in</Text></Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around'
  },
  headerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60
  },
  title: {
    fontSize: 48,
    fontFamily: "Montserrat",
    color: "#fff",
    letterSpacing: 5
  },
  inputView: {
    flex: 2,
    justifyContent: 'center',
    margin: 40,
    marginTop: 0,
    marginBottom: 0,
    // backgroundColor: "#333"
  },
  inputField: {
    backgroundColor: "rgba(20, 15, 38, 0.65)",
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    padding: 20,
    color: '#fff',
    fontSize: 18,
  },
  lowerView: {
    flex: 1,
    marginRight: 40,
    marginLeft: 40,
    // backgroundColor: "#222"
  },
  altView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    margin: 5
    // backgroundColor: "#111"
  },
  altButton: {
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 2,
  },
  warning: {
    fontFamily: "Montserrat",
    textAlign: "center",
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  }
});