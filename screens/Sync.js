import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Appbar, Button, IconButton, List, Switch } from "react-native-paper";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { useSync } from "../contexts/Sync";

WebBrowser.maybeCompleteAuthSession();

const Sync = ({ navigation }) => {
  const {
    syncToOutlook,
    syncToApple,
    syncToGoogle,
    userGoogle,
    userOutlook,
    logoutGoogle,
    logoutOutlook,
    signOutApple,
    userApple,
  } = useSync();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.Content
          title="Sync Calendars"
          titleStyle={{ fontWeight: "600" }}
        />
      </Appbar.Header>
      <View style={{ padding: 20, flex: 1, justifyContent: "space-between" }}>
        <View>
          <List.Item
            title="Auto Sync"
            right={(props) => (
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            )}
            titleStyle={{ fontSize: 18 }}
            style={styles.shadowContainer}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              paddingVertical: 15,
              paddingTop: 25,
            }}
          >
            Calendars
          </Text>
          <View style={{ marginBottom: 20 }}>
            <List.Item
              title="Apple"
              left={() => (
                <AntDesign
                  style={{ padding: 4 }}
                  name="apple1"
                  size={24}
                  color="black"
                />
              )}
              right={() =>
                userApple ? (
                  <IconButton
                    onPress={signOutApple}
                    iconColor="#ff0000"
                    icon={"close"}
                  />
                ) : (
                  <Button
                    onPress={syncToApple}
                    labelStyle={{ fontSize: 18, fontWeight: "700" }}
                  >
                    Sync
                  </Button>
                )
              }
              style={[styles.shadowContainer, { paddingHorizontal: 10 }]}
              titleStyle={{ fontSize: 18 }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <List.Item
              title="Google"
              left={() => (
                <AntDesign
                  style={{ padding: 4 }}
                  name="google"
                  size={24}
                  color="black"
                />
              )}
              right={() =>
                userGoogle ? (
                  <IconButton
                    onPress={logoutGoogle}
                    iconColor="#ff0000"
                    icon={"close"}
                  />
                ) : (
                  <Button
                    onPress={syncToGoogle}
                    labelStyle={{ fontSize: 18, fontWeight: "700" }}
                  >
                    Sync
                  </Button>
                )
              }
              style={[styles.shadowContainer, { paddingHorizontal: 10 }]}
              titleStyle={{ fontSize: 18 }}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <List.Item
              title="Outlook"
              left={() => (
                <MaterialCommunityIcons
                  name="microsoft-outlook"
                  size={24}
                  color="black"
                />
              )}
              right={() =>
                userOutlook ? (
                  <IconButton
                    onPress={logoutOutlook}
                    iconColor="#ff0000"
                    icon={"close"}
                  />
                ) : (
                  <Button
                    onPress={syncToOutlook}
                    labelStyle={{ fontSize: 18, fontWeight: "700" }}
                  >
                    Sync
                  </Button>
                )
              }
              style={[styles.shadowContainer, { paddingHorizontal: 10 }]}
              titleStyle={{ fontSize: 18 }}
            />
          </View>
        </View>
        <Button
          icon="plus"
          mode="contained"
          onPress={() => navigation.push("AddEvent")}
          labelStyle={{ fontWeight: "600", fontSize: 16 }}
          style={{ borderRadius: 15, padding: 5 }}
        >
          Add Calendar
        </Button>
      </View>
    </View>
  );
};

export default Sync;

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
