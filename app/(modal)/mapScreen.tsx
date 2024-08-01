// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// import * as Location from "expo-location";
// import { Colors } from "@/constants/Colors";
// import { Ionicons } from "@expo/vector-icons";

// type Location = {
//   latitude: number;
//   longitude: number;
//   accuracy: number | null;
//   latDelta: number;
//   longDelta: number;
// };

// const mapScreen = () => {
//   const [location, setLocation] = useState<Location>({
//     latitude: 0,
//     longitude: 0,
//     accuracy: 0,
//     latDelta: 0,
//     longDelta: 0,
//   });
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       } else {
//         let location = await Location.getCurrentPositionAsync({});
//         const latitude = location?.coords?.latitude;
//         const longitude = location?.coords?.longitude;
//         const accuracy = location?.coords?.accuracy;
//         console.log(location);

//         const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
//         const circumference = (40075 / 360) * 1000;

//         const latDelta = accuracy * (1 / (Math.cos(latitude) * circumference));
//         const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;
//         console.log(latDelta, lonDelta);

//         setLocation({
//           latitude: latitude,
//           longitude: longitude,
//           accuracy: accuracy,
//           latDelta: 0.001,
//           longDelta: 0.001,
//         });
//       }
//     })();
//   }, []);

//   return (
//     <KeyboardAvoidingView behavior="height" style={styles.container}>
//       {/* <View style={styles.container}> */}
//       <GooglePlacesAutocomplete
//         keyboardShouldPersistTaps="always"
//         styles={{
//           container: {
//             flex: 0,
//             backgroundColor: "#FFFFFF",
//           },
//           textInputContainer: {
//             paddingTop: "1%",
//             paddingHorizontal: "2%",
//           },
//         }}
//         renderLeftButton={() => (
//           <View style={{ alignItems: "center", justifyContent: "center" }}>
//             <Ionicons
//               name="search"
//               size={20}
//               color={Colors.mediumDark}
//               style={{ paddingHorizontal: "2%" }}
//             />
//           </View>
//         )}
//         fetchDetails={true}
//         placeholder="Search"
//         onPress={(data, details = null) => {
//           const address = details?.formatted_address;
//           const point = details?.geometry?.location;
//           if (!point) return;
//           setLocation({
//             ...location,
//             latitude: point.lat,
//             longitude: point.lng,
//           });
//           console.log(point);
//         }}
//         query={{
//           key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
//           language: "en",
//         }}
//       />
//       <MapView
//         showsMyLocationButton
//         userLocationUpdateInterval={5000}
//         provider={PROVIDER_GOOGLE} //*------Here
//         region={{
//           latitude: location.latitude,
//           longitude: location.longitude,
//           latitudeDelta: location.latDelta,
//           longitudeDelta: location.longDelta,
//         }}
//         showsUserLocation
//         loadingEnabled
//         showsBuildings
//         showsCompass
//         style={{ flex: 1 }}
//       />
//       <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.6}>
//         <Text style={styles.confirmBtnTxt}>CONFIRM</Text>
//       </TouchableOpacity>
//       {/* </View> */}
//     </KeyboardAvoidingView>
//   );
// };

// export default mapScreen;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     height: "100%",
//     position: "relative",
//   },
//   confirmBtn: {
//     position: "absolute",
//     bottom: "2%",
//     backgroundColor: Colors.primary,
//     width: "90%",
//     marginHorizontal: "5%",
//     padding: "3.3%",
//     alignItems: "center",
//     borderRadius: 10,
//   },
//   confirmBtnTxt: {
//     color: "#FFFFFF",
//     fontSize: 17,
//     fontFamily: "LatoBold",
//   },
// });
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Keyboard,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  MapViewProps,
} from "react-native-maps";
import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LottieView from "lottie-react-native";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

type LocationType = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  latDelta: number;
  longDelta: number;
};

const MapScreen = () => {
  const [location, setLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
    latDelta: 0,
    longDelta: 0,
  });
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [LocationSearchValue, setLocationSearchValue] = useState("");
  const [SelectedDetails, setSelectedDetails] =
    useState<GooglePlaceDetail | null>(null);
  const maxRetry = 3;

  const [locationChanged, setLocationChanged] = useState(false);

  const animation = useRef<LottieView>(null);
  const mapViewRef = useRef<MapView>(null);
  const saveLocation = async (loc: LocationType) => {
    try {
      await AsyncStorage.setItem("userLocation", JSON.stringify(loc));
    } catch (error) {
      console.error("Error saving location to AsyncStorage:", error);
    }
  };

  const getLocationFromCache = async () => {
    try {
      const loc = await AsyncStorage.getItem("userLocation");
      return loc ? JSON.parse(loc) : null;
    } catch (error) {
      console.error("Error getting location from AsyncStorage:", error);
      return null;
    }
  };

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Permission to access location was denied"
        );
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 10000,
      });

      const latitude = location?.coords?.latitude;
      const longitude = location?.coords?.longitude;
      const accuracy = location?.coords?.accuracy;

      const oneDegreeOfLongitudeInMeters = 111.32 * 1000;
      const circumference = (40075 / 360) * 1000;

      const latDelta = accuracy * (1 / (Math.cos(latitude) * circumference));
      const lonDelta = accuracy / oneDegreeOfLongitudeInMeters;

      const newLocation = {
        latitude: latitude,
        longitude: longitude,
        accuracy: accuracy,
        latDelta: 0.001,
        longDelta: 0.001,
      };

      const cachedLocation = await getLocationFromCache();

      // Check if the new location is significantly different from the cached one
      if (
        !cachedLocation ||
        Math.abs(newLocation.latitude - cachedLocation.latitude) > 0.001 ||
        Math.abs(newLocation.longitude - cachedLocation.longitude) > 0.001
      ) {
        setLocation(newLocation);
        saveLocation(newLocation);
        setLocationChanged(true);
      }

      if (mapViewRef.current) {
        mapViewRef.current.animateToRegion(
          {
            latitude: newLocation.latitude,
            longitude: newLocation.longitude,
            latitudeDelta: newLocation.latDelta,
            longitudeDelta: newLocation.longDelta,
          },
          1000
        );
      }

      setLoading(false);
    } catch (error) {
      if (retryCount < maxRetry) {
        setRetryCount(retryCount + 1);
        fetchLocation();
      } else {
        Alert.alert(
          "Error",
          "Current location is unavailable. Make sure that location services are enabled."
        );
        setLoading(false);
      }
    }
  };

  const LocationCrad = useCallback(() => {
    return (
      <View style={styles.locationCard}>
        <Image
          source={{ uri: SelectedDetails?.icon }}
          style={{ height: 45, width: 45, resizeMode: "contain" }}
        />
        <View
          style={{
            width: "80%",
            minHeight: 70,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontFamily: "LatoBold" }}>
            {SelectedDetails?.name.slice(0, 40)}
          </Text>
          <Text style={{ color: Colors.mediumDark }}>
            {SelectedDetails?.formatted_address.length > 100
              ? `${SelectedDetails?.formatted_address.slice(0, 100)}...`
              : SelectedDetails?.formatted_address}
          </Text>
        </View>
      </View>
    );
  }, [SelectedDetails]);

  useEffect(() => {
    const initializeLocation = async () => {
      const cachedLocation = await getLocationFromCache();
      if (cachedLocation) {
        setLocation(cachedLocation);
        setLoading(false);
        fetchLocation(); // Fetch the location in the background
      } else {
        fetchLocation();
      }
    };

    initializeLocation();
  }, [retryCount]);

  // console.log(LocationSearchValue);

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "15%",
              height: "15%",
            }}
            source={require("../../assets/compass.json")}
          />
          <Text style={{ fontFamily: "LatoBold" }}>
            Hang tight, we're pinpointing your exact location...
          </Text>
          <Text style={{ fontFamily: "LatoBold" }}>
            We appreciate your patience!
          </Text>
        </View>
      ) : (
        <MapView
          ref={mapViewRef}
          showsMyLocationButton={false}
          userLocationUpdateInterval={5000}
          provider={PROVIDER_GOOGLE}
          rotateEnabled={false}
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
        >
          {SelectedDetails !== null && (
            <Marker
              // draggable //* can use it later, as it requires reversegeocoding, emits an event that gives us cordinate object with latitude, longitude using that detail we need to fetch address and details
              coordinate={{
                latitude: SelectedDetails?.geometry?.location?.lat,
                longitude: SelectedDetails?.geometry?.location?.lng,
              }}
            ></Marker>
          )}
        </MapView>
      )}

      <GooglePlacesAutocomplete
        keepResultsAfterBlur={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={100}
        // predefinedPlaces={[{}]}     //* Will be helpful while already showing recently selected places or address in search suggestion
        suppressDefaultStyles={true} //* Will be helpful later to create swiggy/zomato like floating search bar
        keyboardShouldPersistTaps="always"
        listEmptyComponent={
          <View style={styles.listEmptyComp}>
            <Text>
              Sorry, we couldn't find a match for the place you were looking
              for.
            </Text>
          </View>
        }
        styles={styles.floatingSearchBar}
        renderLeftButton={() => (
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Ionicons
              name="search"
              size={25}
              color={"grey"}
              style={{ paddingRight: "2%" }}
            />
          </View>
        )}
        fetchDetails={true}
        placeholder="Search for area, street name..."
        onPress={(data, details = null) => {
          setSelectedDetails(details);
          const point = details?.geometry?.location;
          if (!point) return;
          const newLocation = {
            ...location,
            latitude: point.lat,
            longitude: point.lng,
          };
          setLocation(newLocation);
          saveLocation(newLocation);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
      />
      <TouchableOpacity
        onPress={fetchLocation}
        activeOpacity={0.7}
        style={styles.locateMe}
      >
        <Ionicons name="locate" color={Colors.primary} size={25} />
      </TouchableOpacity>
      {SelectedDetails !== null && <LocationCrad />}

      <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.6}>
        <Text style={styles.confirmBtnTxt}>CONFIRM</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    position: "relative",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20%",
    backgroundColor: "#FFFFFF",
  },
  refreshBtn: {
    position: "absolute",
    bottom: "10%",
    backgroundColor: "#e2e2e26a",
    borderColor: Colors.primary,
    borderWidth: 1,
    width: "90%",
    marginHorizontal: "5%",
    padding: "3.3%",
    alignItems: "center",
    borderRadius: 10,
  },
  refreshBtnTxt: {
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "LatoBold",
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
  locationCard: {
    width: "95%",
    marginHorizontal: "2.5%",
    position: "absolute",
    flexDirection: "row",
    padding: "1%",
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: "2%",
    borderRadius: 10,
    bottom: "10%",
    shadowColor: "#000000b5",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  floatingSearchBar: {
    container: {
      // flex: 0,
      position: "absolute",
      zIndex: 1,
      width: "90%",
      top: "2%",
      marginHorizontal: "5%",
      padding: "2%",
      backgroundColor: "#FFF",
      borderRadius: 7,
      borderColor: Colors.ripple,
      // borderWidth: 0.4,
      shadowColor: "#ff6600b5",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 4,
      alignItems: "flex-start",
      justifyContent: "center",
      overflow: "hidden",
    },
    textInputContainer: {
      flexDirection: "row",
      paddingHorizontal: "2%",
      innerWidth: "100%",
    },
    textInput: {
      marginLeft: "3%",
      fontFamily: "LatoMed",
      color: Colors.mediumDark,
      width: "100%",
      cursorColor: Colors.primary,
    },
    listView: {
      backgroundColor: "#dadada17",
      paddingTop: "4%",
      padding: "2%",
    },
    row: {
      padding: "2%",
      alignItems: "flex-start",
    },
    description: {
      color: Colors.mediumDark,
    },
    poweredContainer: {
      width: "100%",
      alignItems: "flex-end",
      paddingTop: "2%",
    },
    separator: {
      height: 0.7,
      backgroundColor: Colors.grey,
      opacity: 0.7,
    },
  },
  listEmptyComp: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%",
    backgroundColor: "#FFF",
    borderBottomWidth: 0.2,
    borderBottomColor: "lightgrey",
  },
  locateMe: {
    position: "absolute",
    zIndex: 0,
    top: "10%",
    right: "4%",
    paddingHorizontal: "2%",
    // marginHorizontal: "30%",
    // width: "40%",
    borderRadius: 8,
    padding: "1.5%",
    gap: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000000b5",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    justifyContent: "center",
  },
});
