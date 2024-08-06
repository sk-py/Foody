import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";
import BottomSheetComp from "./BottomSheetComp";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getCurrentPositionAsync,
  hasServicesEnabledAsync,
  LocationAccuracy,
  reverseGeocodeAsync,
} from "expo-location";
import { useLocation } from "@/Context/LocationContext";

const SearchBar = () => {
  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    console.log("Height of header", height);
  };

  return (
    <View onLayout={onLayout} style={styles.searchContainer}>
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

type userLocationType = {
  region?: string;
  city?: string;
  district?: string;
};

const CustomHeader = () => {
  const [UserLocation, setUserLocation] = useState<userLocationType | null>(
    null
  );

  const {
    setUserLocationContext,
    userLocation,
    coOrdinates,
    setCoOrdinatesContext,
    setSavedUserLocation,
    SavedUserLocation,
  } = useLocation();

  // console.log("Location context: ", userLocation);

  const [ShowBottomSheet, setShowBottomSheet] = useState({
    state: false,
    calledBy: "",
  });

  const [temperature, settemperature] = useState("Sun");

  const getLocationFromCache = async () => {
    try {
      const loc = await AsyncStorage.getItem("userLocation");
      // console.log("loc: ", loc);

      const savedLocation = await AsyncStorage.getItem("selectedLocation");

      // console.log("Saved Location: ", await JSON.parse(savedLocation));
      const addr = await JSON.parse(savedLocation);
      setSavedUserLocation(addr);
      const parsedData = await JSON.parse(loc);
      // console.log(parsedData);

      if (loc !== null) {
        try {
          const data = await reverseGeocodeAsync({
            latitude: parsedData?.latitude,
            longitude: parsedData?.longitude,
          });
          setUserLocationContext(data);
          setUserLocation({
            city: data[0]?.city,
            region: data[0]?.region,
            district: data[0].district,
          });
        } catch (error) {
          console.log("Error while reverse geocoding: ", error);
        }
      }
      // console.log(data);

      // console.log(await JSON.parse(loc));

      return loc ? JSON.parse(loc) : null;
    } catch (error) {
      console.error("Error getting location from AsyncStorage:", error);
      return null;
    }
  };
  console.log("UserLocation.region = ", UserLocation?.city);

  const getWeatherDetails = async () => {
    const key = process.env.EXPO_PUBLIC_WEATHER_API_KEY;
    if (userLocation !== null || UserLocation !== null) {
      try {
        let region;

        if (UserLocation?.region == null) {
          region = userLocation[0]?.region;
        } else {
          region = UserLocation?.region;
        }
        const data = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${key}&q=${region}`
          // `http://api.weatherapi.com/v1/current.json?key=${key}&q=Thane`
        );
        const temp = await data.json();
        console.log(temp);

        const { temp_c, condition, precip_mm } = temp?.current;
        if (condition?.text?.toLowerCase()?.includes("rain") || precip_mm > 0) {
          settemperature("Rain");
        } else if (
          temp_c < 19 ||
          condition?.text?.toLowerCase()?.includes("snow")
        ) {
          settemperature("Winter");
        } else if (
          temp_c < 29 ||
          condition?.text?.toLowerCase()?.includes("sun")
        ) {
          settemperature("Sun");
        } else {
          settemperature("Sun");
        }

        console.log("Temperature:", temp?.current?.temp_c);
      } catch (error) {
        console.log("Error while fetching data: ", error);
      }
    }
  };

  const fetchCoOrdinates = async () => {
    try {
      const status = await hasServicesEnabledAsync();

      if (!status) {
        return;
      }

      let location = await getCurrentPositionAsync({
        accuracy: LocationAccuracy.High,
        timeout: 5000, // Set timeout for fetching location
      });

      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      const accuracy = location.coords.accuracy;

      // Constants for calculations
      const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
      const circumference = (40075 / 360) * 1000;

      // Calculate deltas
      const latDelta =
        accuracy * (1 / (Math.cos(latitude * (Math.PI / 180)) * circumference));
      const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

      const newLocation = {
        latitude,
        longitude,
        accuracy,
        latDelta: Math.max(latDelta, 0.001), // Ensure reasonable delta
        longDelta: Math.max(lonDelta, 0.001),
      };

      setCoOrdinatesContext(newLocation);
    } catch (error) {
      console.log(
        "Error while fetching CoOrdinates from CustomHeader: ",
        error
      );
    }
  };

  useEffect(() => {
    // Fetch coordinates when component mounts
    if (coOrdinates !== null) {
      fetchCoOrdinates();
    }
    getLocationFromCache().then((value) => {
      // console.log(value, "from get cache");
    });
    getWeatherDetails();
  }, []);

  useEffect(() => {
    getWeatherDetails();
  }, [SavedUserLocation, UserLocation]);

  const openBottomSheet = () => {
    setShowBottomSheet({ state: !ShowBottomSheet.state, calledBy: "header" });
  };

  const animation = useRef<LottieView>(null);
  // console.log(UserLocation);
  // console.log("Saved User Location: ", SavedUserLocation);

  return (
    <>
      <SafeAreaView style={styles.safeAreaStyles}>
        <BottomSheetComp
          ShowBottomSheet={ShowBottomSheet}
          setShowBottomSheet={setShowBottomSheet}
        />
        <>
          {(UserLocation !== null || userLocation !== null) && (
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
          )}
          <View style={styles.container}>
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
                    // fontSize: 16,
                    fontWeight: "600",
                    fontFamily: "LatoBold",
                  }}
                >
                  {SavedUserLocation !== null
                    ? SavedUserLocation?.name?.length > 30
                      ? `${SavedUserLocation?.name?.slice(0, 30)}...`
                      : SavedUserLocation?.name
                    : userLocation !== null
                    ? `${userLocation[0]?.district}, ${userLocation[0].city}`
                    : UserLocation == null
                    ? `Set location`
                    : `${UserLocation.district}, ${UserLocation.city}`}
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
        </>
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
