import React, { createContext, useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import * as Calendar from "expo-calendar";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const fetchedCalendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        setCalendars(fetchedCalendars);
      }
    })();
  }, []);

  const getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  };

  const createCalendar = async () => {
    const defaultCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: "Expo Calendar",
      color: "blue",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: "internalCalendarName",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    const fetchedCalendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    setCalendars(fetchedCalendars);
    return newCalendarID;
  };

  const fetchEvents = async (calendarId) => {
    const events = await Calendar.getEventsAsync(
      [calendarId],
      new Date().toISOString(),
      new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString()
    );
    setEvents(events);
  };
  const addEvent = async (calendarId, event) => {
    const eventId = await Calendar.createEventAsync(calendarId, event);
    await fetchEvents(calendarId);
    return eventId;
  };

  return (
    <CalendarContext.Provider
      value={{ calendars, events, createCalendar, fetchEvents, addEvent }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
