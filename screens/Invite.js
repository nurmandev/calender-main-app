import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import InviteUser from "../components/Invite";
import { AntDesign } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";

const Invite = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const { height, screenHeight } = Dimensions.get("window");

  const Data = [
    {
      name: "MarvinMcKinney",
      iconUrl: require("../assets/images/friends/MarvinMcKinney.png"),
    },
    {
      name: "TheresaWebb",
      iconUrl: require("../assets/images/friends/TheresaWebb.png"),
    },
    {
      name: "RobertFox",
      iconUrl: require("../assets/images/friends/RobertFox.png"),
    },
    {
      name: "SavannaNguyen",
      iconUrl: require("../assets/images/friends/SavannaNguyen.png"),
    },
    {
      name: "CourtneyHenry",
      iconUrl: require("../assets/images/friends/CourtneyHenry.png"),
    },
    {
      name: "ArleneMcCoy",
      iconUrl: require("../assets/images/friends/ArleneMcCoy.png"),
    },
    {
      name: "DarleneRobertson",
      iconUrl: require("../assets/images/friends/DarleneRobertson.png"),
    },
    {
      name: "CameronWilliamson",
      iconUrl: require("../assets/images/friends/CameronWilliamson.png"),
    },
  ];

  const handleTitleChange = (newText) => {
    setTitle(newText);
  };

  const searchData = Data.filter((item) =>
    item.name.toLowerCase().includes(title.toLowerCase())
  );

  const changeName = (name) => {
    let newName = "";
    for (let i = 0; i < name.length; i++) {
      if (i > 0 && name[i] === name[i].toUpperCase()) {
        newName = newName + " " + name[i];
      } else {
        newName += name[i];
      }
    }
    return newName;
  };

  return (
    <View style={[styles.container]}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title="Invite Friends"
          titleStyle={{ fontWeight: "600" }}
        />
      </Appbar.Header>
      <View style={{ padding: 20 }}>
        <View style={styles.section}>
          <Text style={styles.text}>Invite Via</Text>
          <View style={styles.colorContainer}>
            <TouchableOpacity>
              <Image source={require("../assets/images/social/Frame23.png")} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/social/Frame24.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/social/Frame25.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/social/Frame26.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/social/Frame27.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/social/Frame28.png")}
                style={styles.social}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.input}>
            <AntDesign name="search1" style={styles.searchIcon}></AntDesign>
            <TextInput
              onChangeText={handleTitleChange}
              value={title}
              placeholder="Find Friends"
              style={styles.searchText}
            />
          </View>
        </View>
        <ScrollView style={styles.section}>
          {searchData.map((item, index) => (
            <InviteUser
              name={changeName(item.name)}
              iconUrl={item.iconUrl}
              key={index}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FBFBFB",
    flex: 1,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: 20,
  },
  text: {
    color: "#222",
    fontFamily: "DM Sans",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#F5F5F5",
    fontFamily: "DM Sans",
    fontSize: 14,
    lineHeight: 18,
    color: "#222",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEEEEE",
    paddingLeft: 14,
    flexDirection: "row",
    alignItems: "center",
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
    height: 48,
    marginBottom: 8,
    alignItems: "center",
  },
  dropdownText: {
    color: "#222",
    fontFamily: "DM Sans",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
  },
  button1: {
    backgroundColor: "#007AFF",
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "DM Sans",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  dropdownMenu: {
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#EEEEEE",
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderLeftWidth: 0,
  },
  dropdownOptionText: {
    color: "#222",
    fontFamily: "DM Sans",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  colorBox: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  friend: {
    flexDirection: "row",
    alignItems: "center",
  },
  social: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  invite: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    borderRadius: 8,
    paddingTop: 4,
    paddingRight: 8,
    paddingBottom: 4,
    paddingLeft: 8,
    height: 28,
  },
  sm: {
    color: "#222",
    fontFamily: "DM Sans",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
  },
  addPerson: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  search: {
    height: 24,
    width: 24,
  },
  searchIcon: {
    fontSize: 24,
    marginRight: 4,
  },
  searchText: {
    flex: 1,
    height: 50,
    fontSize: 18,
  },
});

export default Invite;
