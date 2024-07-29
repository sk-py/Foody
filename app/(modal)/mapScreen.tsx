import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from "expo-location";

const mapScreen = () => {
  const [location, setLocation] = useState({
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
      }

      let location = await Location.getCurrentPositionAsync({});
      const latitude = location?.coords?.latitude;
      const longitude = location?.coords?.longitude;
      const accuracy = location?.coords?.accuracy;
      console.log(location);

      const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
      const circumference = (40075 / 360) * 1000;

      const latDelta = accuracy * (1 / (Math.cos(latitude) * circumference));
      const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

      setLocation({
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        latDelta: latDelta,
        longDelta: lonDelta,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
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
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
};

export default mapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  //   map: {
  //     width: "100%",
  //     height: "100%",
  //   },
});
