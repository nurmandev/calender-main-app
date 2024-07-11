import React, { createContext, useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import * as Calendar from "expo-calendar";

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);
  const [appCalendarId, setAppCalendarId] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const fetchedCalendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        setCalendars(fetchedCalendars);

        let appCalendar = fetchedCalendars.find(
          (cal) => cal.name === "internalCalendarName"
        );

        if (!appCalendar) {
          try {
            const newCalendarID = await createAppCalendar();
            setAppCalendarId(newCalendarID);
          } catch (error) {
            // If it fails, find an existing calendar that allows modifications
            const modifiableCalendar = fetchedCalendars.find(
              (cal) => cal.allowsModifications
            );

            if (modifiableCalendar) {
              setAppCalendarId(modifiableCalendar.id);
            } else {
              Alert.alert("Error", "No modifiable calendar found.");
            }
          }
        } else {
          setAppCalendarId(appCalendar.id);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (calendars.length > 0) {
      fetchEvents();
    }
  }, [calendars]);

  const getDefaultCalendarSource = async () => {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  };

  const createAppCalendar = async () => {
    try {
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
    } catch (error) {
      throw error;
    }
  };

  const fetchEvents = async (calendarId = null) => {
    const calendarIds = calendarId
      ? [calendarId]
      : calendars.map((cal) => cal.id);
    const events = await Calendar.getEventsAsync(
      calendarIds,
      new Date().toISOString(),
      new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString()
    );
    setEvents(events);
  };

  const addEvent = async (event) => {
    if (!appCalendarId) {
      console.error("no app calendar");
      return;
    }
    const eventId = await Calendar.createEventAsync(appCalendarId, event);
    fetchEvents();
    return eventId;
  };

  return (
    <CalendarContext.Provider
      value={{
        calendars,
        events,
        appCalendarId,
        createAppCalendar,
        fetchEvents,
        addEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);
