import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Event = ({ event, date, daysLeft }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <View
      style={{
        ...styles.contact,
        borderRadius: 12,
        backgroundColor: getRandomColor(),
      }}
    >
      <View style={styles.avatarLeft}>
        <Image
          style={(styles.avatar, styles.mr)}
          source={require("../assets/images/event/event5.png")}
        />
        <View style={styles.avatarMd}>
          <Text style={styles.eventName}>{event}</Text>
          <Text style={styles.date}>{formatDate(date)}</Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 25, color: "white", fontWeight: "bold" }}>
          {daysLeft}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
          Days
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contact: {
    backgroundColor: "red",
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
  },
  icon: {
    width: 24,
    height: 24,
  },
  mr: {
    marginRight: 12,
  },
  avatarLeft: {
    flexDirection: "row",
  },
  eventName: {
    color: "#FFFFFF",
    fontFamily: "DM Sans",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 18,
  },
  date: {
    color: "#FFFFFF",
    fontFamily: "DM Sans",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  avatarMd: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default Event;
