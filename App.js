import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import StackNav from "./navigations/Stack";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { SyncProvider } from "./contexts/Sync";

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <PaperProvider>
        <SyncProvider>
          <StatusBar style="auto" />
          <StackNav />
        </SyncProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
