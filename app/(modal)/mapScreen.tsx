import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import * as Location from "expo-location";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

type Location = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  latDelta: number;
  longDelta: number;
};

const mapScreen = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    latDelta: 0,
    longDelta: 0,
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } else {
        let location = await Location.getCurrentPositionAsync({});
        const latitude = location?.coords?.latitude;
        const longitude = location?.coords?.longitude;
        const accuracy = location?.coords?.accuracy;
        console.log(location);

        const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
        const circumference = (40075 / 360) * 1000;

        const latDelta = accuracy * (1 / (Math.cos(latitude) * circumference));
        const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;
        console.log(latDelta, lonDelta);

        setLocation({
          latitude: latitude,
          longitude: longitude,
          accuracy: accuracy,
          latDelta: 0.001,
          longDelta: 0.001,
        });
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {/* <View style={styles.container}> */}
      <GooglePlacesAutocomplete
        keyboardShouldPersistTaps="always"
        styles={{
          container: {
            flex: 0,
            backgroundColor: "#FFFFFF",
          },
          textInputContainer: {
            paddingTop: "1%",
            paddingHorizontal: "2%",
          },
        }}
        renderLeftButton={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Ionicons
              name="search"
              size={20}
              color={Colors.mediumDark}
              style={{ paddingHorizontal: "2%" }}
            />
          </View>
        )}
        fetchDetails={true}
        placeholder="Search"
        onPress={(data, details = null) => {
          const address = details?.formatted_address;
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          });
          console.log(point);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
      />
      <MapView
        showsMyLocationButton
        userLocationUpdateInterval={5000}
        provider={PROVIDER_GOOGLE} //*------Here
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: location.latDelta,
          longitudeDelta: location.longDelta,
        }}
        showsUserLocation
        loadingEnabled
        showsBuildings
        showsCompass
        style={{ flex: 1 }}
      />
      <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.6}>
        <Text style={styles.confirmBtnTxt}>CONFIRM</Text>
      </TouchableOpacity>
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

export default mapScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    position: "relative",
  },
  confirmBtn: {
    position: "absolute",
    bottom: "2%",
    backgroundColor: Colors.primary,
    width: "90%",
    marginHorizontal: "5%",
    padding: "3.3%",
    alignItems: "center",
    borderRadius: 10,
  },
  confirmBtnTxt: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "LatoBold",
  },
});
