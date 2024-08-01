import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = ({
  text = "",
  color = "",
  align = "",
  extraStyles = {},
  fontFamily = "",
  letterSpacing = 1,
}) => {
  return (
    <View
      style={[{ backgroundColor: "#FFFFFF", alignItems: align }, extraStyles]}
    >
      <Text
        style={{
          fontFamily: fontFamily,
          fontSize: 17,
          color: color,
          paddingVertical: "1%",
          textTransform: "uppercase",
          letterSpacing,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Title;
