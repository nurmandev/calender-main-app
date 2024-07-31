import React, { useState } from "react";
import { View, Alert, StyleSheet } from "react-native";
import {
  List,
  TextInput,
  Button,
  Text,
  Card,
  Menu,
  Appbar,
} from "react-native-paper";
import { useSync } from "../contexts/Sync";

const CalendarList = ({ selectedCalendar, calendars, onSelectCalendar }) => {
  return (
    <Card style={styles.card}>
      {calendars.map((calendar) => (
        <List.Item
          key={calendar.id}
          title={calendar.summary}
          left={(props) => (
            <List.Icon {...props} icon="calendar" color={calendar.color} />
          )}
          right={(props) =>
            selectedCalendar === calendar && (
              <List.Icon {...props} icon="check" color={calendar.color} />
            )
          }
          onPress={() => onSelectCalendar(calendar)}
          style={[styles.listItem]}
        />
      ))}
    </Card>
  );
};

const ShareCalendarForm = ({
  loading,
  email,
  setEmail,
  permission,
  setPermission,
  onShare,
}) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const permissions = [
    { label: "Reader", value: "reader" },
    { label: "Writer", value: "writer" },
    { label: "Owner", value: "owner" }, // Additional permission levels if needed
  ];
  return (
    <View style={styles.form}>
      <TextInput
        label="Email Address"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button onPress={openMenu} mode="outlined" style={styles.menuButton}>
            {permissions.find((perm) => perm.value === permission)?.label ||
              "Select Permission"}
          </Button>
        }
      >
        {permissions.map((perm) => (
          <Menu.Item
            key={perm.value}
            onPress={() => {
              setPermission(perm.value);
              closeMenu();
            }}
            title={perm.label}
          />
        ))}
      </Menu>
      <Button
        loading={loading}
        mode="contained"
        onPress={onShare}
        style={styles.button}
      >
        Share Calendar
      </Button>
    </View>
  );
};

const ShareCalendar = ({ navigation }) => {
  const { shareCalendar: onShareCalendar, googleCalendar: calendars } =
    useSync();
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [email, setEmail] = useState("");
  const [permission, setPermission] = useState("reader");
  const [loading, setLoading] = useState(false);

  const handleSelectCalendar = (calendar) => {
    setSelectedCalendar(calendar);
  };

  const handleShare = async () => {
    try {
      if (!selectedCalendar) {
        Alert.alert("Error", "Please select a calendar to share.");
        return;
      }
      if (!email) {
        Alert.alert("Error", "Please enter an email address.");
        return;
      }
      setLoading(true);
      await onShareCalendar(selectedCalendar.id, email, permission);
      setLoading(false);

      Alert.alert(`Successfully shared calendar to ${email}`);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Please try again later");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Share Calendar"
          titleStyle={{ fontWeight: "600" }}
        />
      </Appbar.Header>
      <View style={{ padding: 20 }}>
        <Text style={styles.header}>Select Calendar to Share</Text>
        <CalendarList
          selectedCalendar={selectedCalendar}
          calendars={calendars}
          onSelectCalendar={handleSelectCalendar}
        />
        {selectedCalendar && (
          <>
            <Text style={styles.selectedCalendar}>
              Selected Calendar: {selectedCalendar.summary}
            </Text>
            <ShareCalendarForm
              loading={loading}
              email={email}
              setEmail={setEmail}
              permission={permission}
              setPermission={setPermission}
              onShare={handleShare}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedCalendar: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default ShareCalendar;
