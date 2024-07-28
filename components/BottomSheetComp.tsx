import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Keyboard,
  View,
} from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const BottomSheetComp = ({ ShowBottomSheet, setShowBottomSheet }: any) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  console.log(ShowBottomSheet);

  // variables
  const statusBarHeight = Constants.statusBarHeight;

  const snapPoints = useMemo(
    () => ["60%", Dimensions.get("window").height],
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

  // renders
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      backgroundStyle={{ borderRadius: 0 }}
      snapPoints={snapPoints}
      onDismiss={() => setShowBottomSheet({ state: false, calledBy: "modal" })}
      backdropComponent={renderBackdrop}
      enableDismissOnClose
      handleIndicatorStyle={{ display: "none" }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Awesome 🎉</Text>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default BottomSheetComp;
