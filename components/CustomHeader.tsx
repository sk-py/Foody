import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import BottomSheetComp from "./BottomSheetComp";
import LottieView from "lottie-react-native";

const SearchBar = () => {
  return (
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
};

const CustomHeader = () => {
  const [ShowBottomSheet, setShowBottomSheet] = useState({
    state: false,
    calledBy: "",
  });

  const [temperature, settemperature] = useState("Sun");

  const getWetherDetails = async () => {
    try {
      const data = await fetch(
        "http://api.weatherapi.com/v1/current.json?key=a949930bca0d46fa92f115049240208&q=Mumbai"
      );
      const temp = await data.json();
      const { temp_c, condition, precip_mm } = temp?.current;
      if (condition?.text?.toLowerCase()?.includes("rain") || precip_mm > 0) {
        settemperature("Rain");
      } else if (
        temp_c < 19 ||
        condition?.text?.toLowerCase()?.includes("snow")
      ) {
        settemperature("Winter");
      } else if (
        temp_c < 28 ||
        condition?.text?.toLowerCase()?.includes("sun")
      ) {
        settemperature("Sun");
      } else {
        settemperature("Sun");
      }

      console.log(temp?.current?.temp_c);
    } catch (error) {
      console.log("Error while fetching data: ", error);
    }
  };

  useEffect(() => {
    getWetherDetails();
  }, []);

  const openBottomSheet = () => {
    setShowBottomSheet({ state: !ShowBottomSheet.state, calledBy: "header" });
  };

  const animation = useRef<LottieView>(null);

  return (
    <>
      <SafeAreaView style={styles.safeAreaStyles}>
        <BottomSheetComp
          ShowBottomSheet={ShowBottomSheet}
          setShowBottomSheet={setShowBottomSheet}
        />
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: Dimensions.get("window").width,
            height: 5,
            position: "absolute",
            zIndex: -5,
          }}
          direction={1}
          loop
          resizeMode="cover"
          source={
            temperature == "Winter"
              ? require("@/assets/images/Winter.json")
              : temperature == "Rain"
              ? require("../assets/images/Rain.json")
              : require("@/assets/images/Sun.json")
          }
        />
        <View style={styles.container}>
          {/* <LinearGradient
            colors={["#e7b9ad84", "transparent"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              width: Dimensions.get("window").width,
              height: "100%",
              zIndex: -1,
            }}
          /> */}
          <TouchableOpacity>
            <Image
              source={require("@/assets/images/deliveryboy.jpg")}
              resizeMode="contain"
              style={styles.bikerImg}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openBottomSheet}
            style={styles.headerTitleBtn}
          >
            <Text
              style={{
                fontSize: 14,
                color: "grey",
                zIndex: 5,
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
          </TouchableOpacity>
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
    // backgroundColor: "transparent",
    position: "relative",
  },
  container: {
    position: "relative",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
    paddingHorizontal: "2%",
    backgroundColor: "transparent",
    zIndex: 0,
    // backgroundColor: "red",
  },
  bikerImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    zIndex: 5,
  },
  headerTitleBtn: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
  },
  profileBtn: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#FFF",
    position: "relative",
    zIndex: 5,
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
