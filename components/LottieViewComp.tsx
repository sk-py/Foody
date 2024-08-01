import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { Colors } from "@/constants/Colors";

const LottieViewComp = () => {
  const animation = useRef<LottieView>(null);

  return (
    <View>
      <View style={{ backgroundColor: "#FFFFFF", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "LatoBold",
            fontSize: 17,
            color: Colors.mediumDark,
            paddingVertical: "1%",
          }}
        >
          Find Every Offer, from Good to Best!
        </Text>
      </View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height / 5,
        }}
        direction={-1}
        loop
        resizeMode="cover"
        source={require("../assets/Offers.json")}
      />
    </View>
  );
};

export default LottieViewComp;
