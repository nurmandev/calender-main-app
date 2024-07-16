import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import { Appbar, Button } from "react-native-paper";
import moment from "moment";
import { useSync } from "../contexts/Sync";
import { useCalendar } from "../contexts/Calendar";

LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};

LocaleConfig.defaultLocale = "en";

const Calendar = ({ navigation }) => {
  const { eventsGoogle } = useSync();
  const { calendars, events, fetchEvents, appCalendarId } = useCalendar();
  const [items, setItems] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [selectedCalendar, setSelectedCalendar] = useState(appCalendarId);

  useEffect(() => {
    if (eventsGoogle) {
      const formattedEvents = formatEvents(eventsGoogle);
      setItems(formattedEvents);
      const marks = generateMarkedDates(formattedEvents);
      setMarkedDates(marks);
    }

    if (events?.length) {
      const newItems = events.reduce((acc, event) => {
        const date = event.startDate.split("T")[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push({
          name: event.title,
          height: 50,
          ...event,
        });
        return acc;
      }, {});
      setItems((prev) => ({ ...prev, ...newItems }));

      const newMarkedDates = Object.keys(newItems).reduce((acc, date) => {
        acc[date] = { marked: true, dotColor: "blue" };
        return acc;
      }, {});
      setMarkedDates((prev) => ({ ...prev, ...newMarkedDates }));
    }
  }, [eventsGoogle, events]);

  const formatEvents = (events) => {
    const formatted = {};
    events.forEach((event) => {
      const date = event.start.date || event.start.dateTime.split("T")[0];
      if (!formatted[date]) {
        formatted[date] = [];
      }
      formatted[date].push({
        title: event.summary,
        startTime: event.start.dateTime || event.start.date,
        endTime: event.end.dateTime || event.end.date,
        description: event.description || "",
        height: 100,
      });
    });
    return formatted;
  };

  const generateMarkedDates = (events) => {
    let marked = {};
    Object.keys(events).forEach((date) => {
      marked[date] = {
        marked: true,
        dotColor: "#f67f00",
      };
    });
    return marked;
  };

  const InitialsAvatar = ({ title }) => {
    return (
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{title[0] + title[1]}</Text>
      </View>
    );
  };

  const handleFetchEvents = async (calendarId) => {
    setSelectedCalendar(calendarId);
    await fetchEvents(calendarId);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <Text style={styles.itemDate}>
            {moment(item.startTime).format("LT")} -{" "}
            {moment(item.endTime).format("LT")}
          </Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <InitialsAvatar title={item.title} />
      </View>
    );
  };

  const renderEmptyData = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyDateText}>No Event</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Calendar" titleStyle={{ fontWeight: "600" }} />
        <Appbar.Action
          icon="plus"
          onPress={() => navigation.push("AddEvent")}
        />
      </Appbar.Header>
      <FlatList
        data={[{ color: "blue", id: null, title: "All" }, ...calendars]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.itemButton,
              { borderColor: item.color },
              selectedCalendar === item.id && { backgroundColor: item.color },
            ]}
            onPress={() => handleFetchEvents(item.id)}
          >
            <Text
              style={[
                { color: item.color },
                selectedCalendar === item.id && { color: "white" },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 30 }}
      />
      <Agenda
        items={items}
        renderItem={renderItem}
        markedDates={markedDates}
        theme={{
          todayTextColor: "#f67f00",
          selectedDayBackgroundColor: "#f67f00",
          arrowColor: "#f67f00",
        }}
        renderEmptyData={renderEmptyData}
      />
      {/* <Button
        mode="contained"
        onPress={() => navigation.push("Events")}
        labelStyle={{ fontWeight: "600", fontSize: 16 }}
        style={[styles.upcoming, { borderRadius: 15, padding: 5 }]}
      >
        Up Coming
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  itemDate: { fontSize: 18, color: "gray" },
  avatar: {
    backgroundColor: "#f67f00",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  itemContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 5,
  },
  emptyDate: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyDateText: { fontSize: 20, color: "gray" },
  itemButton: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginHorizontal: 5,
  },
  upcoming: { position: "absolute", bottom: 10, right: 10 },
});

export default Calendar;
