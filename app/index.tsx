import { View, Text, ScrollView, Dimensions } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { Colors } from "@/constants/Colors";

const index = () => {
  const animation = useRef<LottieView>(null);

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#FFFFFF", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "LatoBold",
            fontSize: 17,
            color: Colors.mediumDark,
          }}
        >
          Find Every Offer, from Good to Best!
        </Text>
      </View>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          // width: "15%",
          // height: "15%",
          width: "100%",
          height: 100,
        }}
        source={require("../assets/Offers.json")}
      />
    </ScrollView>
  );
};

export default index;
