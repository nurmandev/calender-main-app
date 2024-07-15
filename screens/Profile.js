import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import {
  Feather,
  Ionicons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useAuth } from "../contexts/Auth";

const Profile = ({ navigation }) => {
  const { user, handleLogout } = useAuth();
  const logout = () => {
    handleLogout();
    navigation.replace("Auth");
  };
  return (
    <View style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.Content title="Profile" titleStyle={{ fontWeight: "600" }} />
      </Appbar.Header>
      <View style={{ flex: 1, padding: 20 }}>
        <View style={styles.info}>
          <View style={styles.infoDetail}>
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG7WjONaOfilXR3bebrfe_zcjl58ZdAzJHYw&s",
              }}
              style={styles.profileImag}
            />
            <Text style={styles.profileName}>{user?.username}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>
        <View style={styles.options}>
          <TouchableOpacity style={styles.dropdownButton}>
            <View style={styles.option}>
              <Feather name="edit" size={24} color="black" />
              <Text style={styles.md}>Edit Profile</Text>
            </View>
            <View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownButton}>
            <View style={styles.option}>
              <Ionicons name="notifications-outline" size={24} color="black" />
              <Text style={styles.md}>Notifications</Text>
            </View>
            <View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownButton}>
            <View style={styles.option}>
              <AntDesign name="sync" size={24} color="black" />
              <Text style={styles.md}>Sync Settings</Text>
            </View>
            <View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => navigation.push("Invite")}
          >
            <View style={styles.option}>
              <AntDesign name="user" size={24} color="black" />
              <Text style={styles.md}>Manage Users</Text>
            </View>
            <View>
              <Feather name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity style={styles.dropdownButton} onPress={logout}>
            <View style={styles.option}>
              <SimpleLineIcons name="logout" size={24} color="black" />
              <Text style={styles.redMd}>Log Out</Text>
            </View>
            <View></View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
  },
  info: {
    alignItems: "center",
  },
  infoDetail: {
    width: 154,
    height: 177,
    alignItems: "center",
    marginBottom: 24,
  },
  profileImag: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 80,
  },
  profileName: {
    fontFamily: "DM Sans",
    fontSize: 14,
    lineHeight: 18,
    color: "#222",
    marginBottom: 4,
  },
  options: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  dropdownButton: {
    color: "#222",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderBottomColor: "#EEEEEE",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    // height: 48,
    marginBottom: 5,
    alignItems: "center",
  },
  md: {
    color: "#222",
    fontFamily: "DM Sans",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
    // lineHeight: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  selectedIcon: {
    width: 24,
    height: 24,
  },
  redMd: {
    color: "#FF0000",
    fontFamily: "DM Sans",
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 10,
    lineHeight: 20,
  },
  logout: {
    width: "100%",
    position: "absolute",
    bottom: 12,
    right: 20,
  },
});

export default Profile;
