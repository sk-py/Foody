import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Title = ({
  text = "",
  color = "",
  align = "",
  extraStyles = { view: {}, text: {} },
  fontFamily = "",
  letterSpacing = 1,
}) => {
  return (
    <View
      style={[
        { backgroundColor: "#FFFFFF", alignItems: align },
        extraStyles.view,
      ]}
    >
      <Text
        style={[
          {
            fontFamily: fontFamily,
            color: color,
            paddingVertical: "1%",
            letterSpacing,
          },
          extraStyles.text,
        ]}
      >
        {text}
      </Text>
    </View>
  );
};

export default Title;
