import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Keyboard,
  View,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

import * as Location from "expo-location";
import { openSettings } from "expo-linking";
import { useLocation } from "@/Context/LocationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomSheetComp = ({ ShowBottomSheet, setShowBottomSheet }: any) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  console.log("Bootom Sheet Status: ", ShowBottomSheet);
  // const [SavedAddress, setSavedAddress] = useState(null);
  // variables
  const addressList = [];

  const snapPoints = useMemo(
    () => ["50%", addressList?.length > 0 ? "80%" : "50%"],
    []
  );

  const { setSavedUserLocation, SavedUserLocation } = useLocation();

  // callbacks
  useEffect(() => {
    if (ShowBottomSheet.state) {
      Keyboard.dismiss();
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [ShowBottomSheet]);

  const extractFromAsync = async () => {
    const savedLocation = await AsyncStorage.getItem("selectedLocation");
    const data = await JSON.parse(savedLocation);
    setSavedUserLocation(data);
    // setSavedAddress(data);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Location access denied",
          "Please allow this app location access",
          [
            { text: "Cancel", isPreferred: false },
            { text: "Allow", isPreferred: true, onPress: () => openSettings() },
          ]
        );
      }
    })();
    extractFromAsync();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <Pressable
        {...props}
        style={{
          backgroundColor: "#00000065",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      ></Pressable>
    ),
    []
  );

  const handleAddAddressBtn = () => {
    bottomSheetModalRef?.current?.forceClose({ duration: 500 });
    router.push("/(modal)/mapScreen");
  };

  // console.log("Saved User Location for cache", SavedAddress);
  // console.log("Saved User Location for Context", SavedUserLocation);

  const UnExpandedView = useCallback(() => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontFamily: "LatoBold",
            marginBottom: "5%",
          }}
        >
          Delivery adress
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: "2%",
            paddingHorizontal: "3%",
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "#50505060" }} />
          <Text
            style={{
              fontFamily: "LatoBold",
              paddingHorizontal: "2%",
              opacity: 0.4,
              letterSpacing: 2,
            }}
          >
            SAVED ADDRESSES
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: "#50505060" }} />
        </View>
        <View style={{ paddingVertical: "4%" }} />
        {SavedUserLocation === null ? (
          <View style={styles.addressCard}>
            <Text style={{ paddingVertical: "2%" }}>
              You don't have any saved address!
            </Text>
          </View>
        ) : (
          <View style={styles.locationCard}>
            <Image
              source={{ uri: SavedUserLocation?.icon }}
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
                {SavedUserLocation?.name.slice(0, 40)}
              </Text>
              <Text style={{ color: Colors.mediumDark }}>
                {SavedUserLocation?.formatted_address.length > 100
                  ? `${SavedUserLocation?.formatted_address.slice(0, 100)}...`
                  : SavedUserLocation?.formatted_address}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.addressCard}>
          <TouchableOpacity
            style={styles.addAddressBtn}
            onPress={handleAddAddressBtn}
            activeOpacity={0.7}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderRadius: 10,
              }}
            >
              <MaterialIcons
                name="delivery-dining"
                color={Colors.primary}
                size={20}
              />
              <Text
                style={{
                  textAlign: "center",
                  marginHorizontal: "auto",
                  fontFamily: "LatoBold",
                }}
              >
                {SavedUserLocation !== null
                  ? "Update your delivery address"
                  : "Add a new delivery address"}
              </Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              color={Colors.primary}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [SavedUserLocation]);

  const bottomSheetFooterComp = () => {
    return (
      <View>
        <TouchableOpacity>
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      // footerComponent={bottomSheetFooterComp}
      snapPoints={snapPoints}
      onDismiss={() => setShowBottomSheet({ state: false, calledBy: "modal" })}
      backdropComponent={renderBackdrop}
      enableDismissOnClose
      // handleIndicatorStyle={{  }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <UnExpandedView />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  addAddressBtn: {
    shadowColor: "#000000b5",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    margin: "2%",
    // borderWidth: 1,
    borderRadius: 8,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
  addressCard: {
    backgroundColor: "#f3f3f3",
    padding: "2%",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  locationCard: {
    width: "95%",
    marginHorizontal: "2.5%",
    marginTop: "5%",
    flexDirection: "row",
    padding: "1%",
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: "2%",
    borderRadius: 10,
    bottom: "10%",
    shadowColor: "#000000df",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default BottomSheetComp;
