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
  FlatList,
  Share,
  Alert,
} from "react-native";
import InviteUser from "../components/Invite";
import { AntDesign } from "@expo/vector-icons";
import { Appbar } from "react-native-paper";
import { useContacts } from "../contexts/Contacts";

const Invite = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const { height, screenHeight } = Dimensions.get("window");
  const { contacts } = useContacts();

  const handleTitleChange = (newText) => {
    setTitle(newText);
  };
  const searchData = contacts.filter(
    (item) => item.name && item.name.toLowerCase().includes(title.toLowerCase())
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

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: "Calendar App",
        message:
          'Hey! I am using this amazing app called "Calendar App". Download it now from the link below. \n\nhttps://www.calendarapp.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
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
            <TouchableOpacity onPress={onShare}>
              <Image source={require("../assets/images/social/Frame23.png")} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <Image
                source={require("../assets/images/social/Frame24.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <Image
                source={require("../assets/images/social/Frame25.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <Image
                source={require("../assets/images/social/Frame26.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
              <Image
                source={require("../assets/images/social/Frame27.png")}
                style={styles.social}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onShare}>
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
        <FlatList
          data={searchData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <InviteUser
              name={changeName(item.name)}
              number={item?.phoneNumbers[0].digits}
              iconUrl={item.iconUrl}
            />
          )}
          initialNumToRender={10} // Adjust based on your needs
          maxToRenderPerBatch={5} // Adjust based on your needs
          windowSize={5}
        />
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
