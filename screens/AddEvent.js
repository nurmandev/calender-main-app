import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  Button,
  RadioButton,
  Avatar,
  Menu,
  Divider,
  Appbar,
  Text,
  List,
} from "react-native-paper";
import { Feather, Entypo } from "@expo/vector-icons";
import { useCalendar } from "../contexts/Calendar";

const AddEvent = ({ navigation }) => {
  const { addEvent } = useCalendar();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("blue");
  const [duration, setDuration] = useState("2 Days");
  const [person, setPerson] = useState("Darlene Robertson");
  const [menuVisible, setMenuVisible] = useState(false);
  const [durationVisible, setDurationVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const colors = ["purple", "blue", "red", "green", "pink", "yellow"];

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleDuration = (value) => {
    setDuration(value);
    setDurationVisible(false);
  };

  const handlePerson = (value) => {
    setPerson(value);
    setMenuVisible(false);
  };

  const handleAddEvent = async () => {
    if (selectedDate) {
      const startDate = new Date(selectedDate);
      let endDate = new Date(selectedDate);
      switch (duration) {
        case "1 hour":
          endDate.setHours(startDate.getHours() + 1);
          break;
        case "2 hours":
          endDate.setHours(startDate.getHours() + 2);
          break;
        case "5 hours":
          endDate.setHours(startDate.getHours() + 5);
          break;
        case "1 day":
          endDate.setDate(startDate.getDate() + 1);
          break;
        case "2 days":
          endDate.setDate(startDate.getDate() + 2);
          break;
      }
      const newEvent = {
        title,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        notes: description,
        color,
        person,
      };
      const eventId = await addEvent(newEvent);
      console.log(`New event ID: ${eventId}`);
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Add an Event"
          titleStyle={{ fontWeight: "600" }}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}> Title</Text>
        <TextInput
          label="Title"
          value={title}
          placeholder="Event title"
          onChangeText={setTitle}
          style={styles.input}
        />
        <Text style={styles.label}> Description</Text>
        <TextInput
          style={[styles.textarea, styles.input]}
          placeholder={"Enter description"}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
        <Text style={styles.label}> Color</Text>
        <View style={styles.colorContainer}>
          {colors.map((clr, index) => (
            <View key={index} style={[styles.radio, { backgroundColor: clr }]}>
              <RadioButton.IOS
                value={clr}
                status={color === clr ? "checked" : "unchecked"}
                onPress={() => setColor(clr)}
                color={"white"}
              />
            </View>
          ))}
        </View>
        <Text style={styles.label}> Date</Text>
        <View style={[styles.dateContainer, styles.shadowContainer]}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                marked: true,
                selectedColor: color,
              },
            }}
            theme={{
              selectedDayBackgroundColor: color,
            }}
          />
        </View>
        <Text style={styles.label}> Duration</Text>
        <View style={{ marginBottom: 20 }}>
          <Menu
            visible={durationVisible}
            onDismiss={() => setDurationVisible(false)}
            anchor={
              <List.Item
                title={duration}
                right={() => (
                  <Feather name="chevron-down" size={24} color="black" />
                )}
                titleStyle={{ fontSize: 18, fontWeight: "500" }}
                style={styles.shadowContainer}
                onPress={() => setDurationVisible(!durationVisible)}
              />
            }
          >
            <Menu.Item
              onPress={() => handleDuration("1 hour")}
              title="1 hour"
            />
            <Menu.Item
              onPress={() => handleDuration("2 hours")}
              title="2 hours"
            />
            <Menu.Item
              onPress={() => handleDuration("5 hours")}
              title="5 hours"
            />
            <Menu.Item onPress={() => handleDuration("1 day")} title="1 day" />
            <Menu.Item
              onPress={() => handleDuration("2 days")}
              title="2 days"
            />
          </Menu>
        </View>
        <Text style={styles.label}> Person</Text>
        <View style={{ marginBottom: 50 }}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <List.Item
                title={person}
                left={() => (
                  <Avatar.Image
                    size={30}
                    style={{ marginLeft: 10 }}
                    source={{ uri: "https://via.placeholder.com/40" }}
                  />
                )}
                right={() => (
                  <Feather name="chevron-down" size={24} color="black" />
                )}
                style={[styles.shadowContainer]}
                titleStyle={{ fontSize: 18 }}
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              leadingIcon={() => (
                <Avatar.Image
                  size={30}
                  source={{ uri: "https://via.placeholder.com/40" }}
                />
              )}
              onPress={() => handlePerson("Darlene Robertson")}
              title="Darlene Robertson"
            />
            <Menu.Item
              leadingIcon={() => (
                <Avatar.Image
                  size={30}
                  source={{ uri: "https://via.placeholder.com/40" }}
                />
              )}
              onPress={() => handlePerson("John Doe")}
              title="John Doe"
            />
            <Divider />
            <Menu.Item
              leadingIcon={() => <Entypo name="plus" size={24} color="black" />}
              title="Add Person"
            />
          </Menu>
        </View>
        <Button
          icon="plus"
          mode="contained"
          onPress={handleAddEvent}
          labelStyle={{ fontWeight: "600", fontSize: 16 }}
          style={{ borderRadius: 15, padding: 5 }}
        >
          Add Event
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#eeeeee",
    fontSize: 18,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  dateContainer: {
    marginBottom: 16,
  },
  personContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  textarea: {
    height: 100,
  },
  label: {
    fontSize: 19,
    marginBottom: 10,
    color: "#333",
    fontWeight: "600",
  },
  radio: {
    padding: 2,
    borderRadius: 50,
  },
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

export default AddEvent;
