import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import Calender from "../screens/Calender";
import Sync from "../screens/Sync";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Sync") {
            iconName = "sync";
          } else if (route.name === "Calendar") {
            iconName = "calendar";
          } else if (route.name === "Profile") {
            iconName = "user";
          }

          return <AntDesign name={iconName} size={30} color={color} />;
        },
        // tabBarActiveTintColor: "#f67f00",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          paddingHorizontal: 50,
          height: 120,
          paddingBottom: 50,
          paddingTop: 20,
        },
      })}
      initialRouteName="Calendar"
    >
      <Tab.Screen name="Sync" component={Sync} />
      <Tab.Screen name="Calendar" component={Calender} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default BottomNav;
