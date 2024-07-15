import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import Event from "../components/Event";
import { useSync } from "../contexts/Sync";
import { useCalendar } from "../contexts/Calendar";
import moment from "moment";

const Events = ({ navigation }) => {
  const { eventsGoogle } = useSync();
  const { events } = useCalendar();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (eventsGoogle) {
      const formattedEvents = formatEvents(eventsGoogle);
      setItems(formattedEvents);
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
  console.log(items);
  const renderItem = ({ item }) => {
    return (
      <Event date={item.date} event={item.title} daysLeft={item.daysLeft} />
    );
  };

  const getUpcomingEvents = () => {
    const upcomingEvents = [];
    const today = moment().startOf("day");

    Object.keys(items).forEach((date) => {
      items[date].forEach((event) => {
        const eventDate = moment(date);
        if (eventDate.isAfter(today)) {
          const daysLeft = eventDate.diff(today, "days");
          upcomingEvents.push({
            title: event.title,
            date: eventDate.format("YYYY-MM-DD"),
            daysLeft,
          });
        }
      });
    });

    return upcomingEvents.sort((a, b) => moment(a.date).diff(moment(b.date)));
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="All Events" titleStyle={{ fontWeight: "600" }} />
      </Appbar.Header>
      <FlatList
        data={getUpcomingEvents()}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ flex: 1, padding: 20 }}
      />
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({});
