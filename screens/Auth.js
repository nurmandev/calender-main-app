import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { useAuth } from "../contexts/Auth";
import { login } from "../utils/api";

const Auth = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { handleLogin } = useAuth();

  const handleLoginUser = async () => {
    // Check for empty username or password
    if (!username.trim() || !password.trim()) {
      alert("Username and password cannot be empty.");
      return;
    }
    setIsLoggingIn(true); // Start loading
    try {
      // const response = await login(username, password);
      handleLogin({ username, password, email }); // Set user in context
      navigation.push("BottomNav");
    } catch (error) {
      // Handle network errors or unexpected issues
      alert("Login error: " + error.message);
    } finally {
      setIsLoggingIn(false); // End loading
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Continue to app</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor={"#999"}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#999"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor={"#999"}
      />
      <TouchableOpacity style={styles.button1} onPress={handleLoginUser}>
        {isLoggingIn && <Text style={{ color: "#fff" }}>Loading...</Text>}
        {!isLoggingIn && <Text style={{ color: "#fff" }}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#FBFBFB",
    width: "100%",
    gap: 20,
  },
  input: {
    backgroundColor: "#F5F5F5",
    fontFamily: "DM Sans",
    fontSize: 18,
    lineHeight: 18,
    color: "#000",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    padding: 10,
    flexDirection: "row",
    // alignItems: 'center',
    width: "100%",
    height: 50,
  },
  button1: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  text: {
    color: "#222",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    lineHeight: 20,
  },
});

export default Auth;
