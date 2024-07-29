import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const BottomSheetComp = ({ ShowBottomSheet, setShowBottomSheet }: any) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  console.log(ShowBottomSheet);

  // variables
  const addressList = [];

  const snapPoints = useMemo(
    () => ["50%", addressList?.length > 0 ? "80%" : "50%"],
    []
  );

  // callbacks
  useEffect(() => {
    if (ShowBottomSheet.state) {
      Keyboard.dismiss();
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [ShowBottomSheet]);

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
        <View style={styles.addressCard}>
          <Text style={{ paddingVertical: "2%" }}>
            You don't have any saved address!
          </Text>
          <TouchableOpacity
            style={styles.addAddressBtn}
            onPress={handleAddAddressBtn}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <MaterialIcons
                name="delivery-dining"
                color={Colors.primary}
                size={20}
              />
              <Text>Add a delivery address now</Text>
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
  }, []);

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
    borderColor: Colors.medium,
    margin: "2%",
    borderWidth: 0.3,
    borderRadius: 10,
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    padding: "2%",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  addressCard: {
    backgroundColor: "#f3f3f3",
    padding: "2%",
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
});

export default BottomSheetComp;
