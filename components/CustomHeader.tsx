import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import BottomSheetComp from "./BottomSheetComp";

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <View style={styles.searchSection}>
      <View style={styles.searchField}>
        <Ionicons name="search" color={Colors.medium} size={22} />
        <TextInput
          enterKeyHint="search"
          style={{
            padding: 8,
            color: Colors.mediumDark,
            width: "100%",
            fontFamily: "LatoMed",
          }}
          inputMode="text"
          cursorColor={"orange"}
          placeholder="Restaurants and dishes"
          placeholderTextColor={Colors.medium}
        />
      </View>
      <Link href={"/(modal)/filter"} asChild>
        <TouchableOpacity style={styles.optionBtn}>
          <Ionicons name="options-outline" size={25} color={Colors.primary} />
        </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const CustomHeader = () => {
  const [ShowBottomSheet, setShowBottomSheet] = useState({
    state: false,
    calledBy: "",
  });

  const openBottomSheet = () => {
    setShowBottomSheet({ state: !ShowBottomSheet.state, calledBy: "header" });
  };

  return (
    <>
      <SafeAreaView style={styles.safeAreaStyles}>
        <BottomSheetComp
          ShowBottomSheet={ShowBottomSheet}
          setShowBottomSheet={setShowBottomSheet}
        />
        <View style={styles.container}>
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/deliveryboy.jpg")}
              resizeMode="contain"
              style={styles.bikerImg}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleBtn}>
            <Text
              style={{
                fontSize: 14,
                color: Colors.medium,
                fontFamily: "LatoBold",
              }}
            >
              Deliver to
            </Text>
            <TouchableOpacity
              onPress={openBottomSheet}
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  fontFamily: "LatoBold",
                }}
              >
                Thane, Manpada
              </Text>
              <Ionicons
                name="chevron-down-outline"
                size={20}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <SearchBar />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeAreaStyles: {
    backgroundColor: "#FFF",
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingHorizontal: "2%",
    backgroundColor: "#FFF",

    // backgroundColor: "red",
  },
  bikerImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  headerTitleBtn: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  profileBtn: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#FFF",
  },
  searchSection: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: "4%",
    alignItems: "center",
  },
  searchField: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: "3%",
    gap: 5,
  },
  optionBtn: {},
});

export default CustomHeader;
