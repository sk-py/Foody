import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ParallaxCarousel from "@/components/ParallaxCarousel";
import MiniCarousel from "@/components/MiniCarousel";
import Title from "@/components/Title";

const HorizontalSliderImages = [
  {
    id: 1,
    image: require("@/assets/images/slider1.jpg"),
  },
  {
    id: 2,
    image: require("@/assets/images/slider2.jpg"),
  },
  {
    id: 3,
    image: require("@/assets/images/s.jpg"),
  },
];

const index = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Title
        align="center"
        color={Colors.medium}
        text="What's on your mind?"
        fontFamily="LatoMed"
        letterSpacing={2}
      />
      <MiniCarousel />
      <ParallaxCarousel data={HorizontalSliderImages} />
      <Title
        align="left"
        color={"black"}
        text="Top restaurants to explore"
        extraStyles={{
          padding: "2%",
          paddingTop: "3%",
        }}
      />
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({
  lightHeaderText: {
    fontFamily: "LatoBold",
    fontSize: 17,
    color: Colors.medium,
    paddingVertical: "1%",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
});
