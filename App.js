import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import StackNav from "./navigations/Stack";
import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";
import { SyncProvider } from "./contexts/Sync";
import { CalendarProvider } from "./contexts/Calendar";
import { AuthProvider } from "./contexts/Auth";
import { ContactsProvider } from "./contexts/Contacts";

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <AuthProvider>
        <PaperProvider>
          <ContactsProvider>
            <CalendarProvider>
              <SyncProvider>
                <StatusBar style="auto" />
                <StackNav />
              </SyncProvider>
            </CalendarProvider>
          </ContactsProvider>
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
