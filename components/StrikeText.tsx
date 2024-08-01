import { View, Text } from "react-native";
import React from "react";

const StrikeText = ({ text = "", color = "", opacity = 0.4, strikes = 1 }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: "2%",
        paddingHorizontal: "3%",
        marginTop: "4%",
      }}
    >
      {strikes == 2 && (
        <View style={{ flex: 1, height: 1, backgroundColor: "#5050504c" }} />
      )}

      <Text
        style={{
          fontFamily: "LatoBold",
          paddingHorizontal: "2%",
          opacity,
          letterSpacing: 2,
          color,
        }}
      >
        {text.toUpperCase()}
      </Text>
      <View style={{ flex: 1, height: 1, backgroundColor: "#50505036" }} />
      {strikes === 3 && (
        <View style={{ flex: 1, height: 1, backgroundColor: "#7e7e7e37" }} />
      )}
    </View>
  );
};

export default StrikeText;
