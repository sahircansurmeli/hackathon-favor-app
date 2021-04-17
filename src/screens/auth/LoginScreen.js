import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import { firebase } from "../../firebase";

import CustomButton from '../../components/CustomButton';

const Login = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, toggleWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const passwordInput = React.useRef(null);

  const warningTexts = {
    invalidEmail: "The email address is not valid.",
    userNotFound: "User not found",
    wrongPassword: "The password is invalid."
  };

  const routeToRegister = () => {
    navigation.navigate('Register');
  }

  const signIn = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          setWarningText(warningTexts.wrongPassword);
        } else if (error.code === "auth/invalid-email") {
          setWarningText(warningTexts.invalidEmail);
        } else if (error.code === "auth/user-not-found") {
          setWarningText(warningTexts.userNotFound);
        }
        toggleWarning(true);
      });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* rgba(0, 28, 81, 1)', 'rgba(32, 135 , 242, 1) */}
        <LinearGradient colors={['#165595', '#5DBDCD']} style={{ flex: 1 }}>
          <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
              <Text style={styles.title}>FAVORR</Text>
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputView}>
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
                returnKeyType="send"
                value={password}
                secureTextEntry={true}
                textContentType={"password"}
                blurOnSubmit={false}
                onSubmitEditing={signIn}
              />
              {showWarning ? (<Text style={styles.warning}>{warningText}</Text>) : null}
            </KeyboardAvoidingView>
            <View style={styles.lowerView}>
              <CustomButton color="rgba(100, 90, 255, 0.69)" text="SIGN IN" onPress={signIn} />
              <View style={styles.altView}>
                <TouchableOpacity>
                  <Text style={styles.altButton}>FORGOT{"\n"}DETAILS?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={routeToRegister}>
                  <Text style={[styles.altButton, styles.registerButton]}>CREATE{"\n"}ACCOUNT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
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
    flex: 1,
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
    color: 'rgba(255, 255, 255, 0.5)',
    fontFamily: 'Montserrat',
    fontSize: 20,
    letterSpacing: 0.5
  },
  lowerView: {
    flex: 1,
    marginRight: 40,
    marginLeft: 40,
    // backgroundColor: "#222"
  },
  altView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    margin: 5
    // backgroundColor: "#111"
  },
  altButton: {
    fontSize: 14,
    fontFamily: "MontserratSemiBold",
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 2
  },
  registerButton: {
    textAlign: "right"
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

export default Login;