import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ParallaxCarousel from "@/components/ParallaxCarousel";
import MiniCarousel from "@/components/MiniCarousel";
import Title from "@/components/Title";
import StrikeText from "@/components/StrikeText";

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

type restaurantsData = [
  {
    id: number;
    distance: "";
    name: "";
    image: string;
  }
];

const restaurantsData = [
  {
    id: 1,
    name: "Mc Donalds",
    distance: "1 Km",
    img: require("@/assets/images/macD.png"),
  },
  {
    id: 2,
    name: "Chings",
    distance: "1 Km",
    img: require("@/assets/images/kungPaoChicken.jpg"),
  },
];

const renderRestaurantsCard = ({ item }) => (
  <View>
    <Image source={item.img} style={{ height: 50, width: 50 }} />
  </View>
);

const index = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Title
        align="center"
        color={Colors.medium}
        text="What's on your mind?"
        fontFamily="LatoMed"
        letterSpacing={2}
        extraStyles={{
          view: { paddingTop: "1%" },
          text: { textTransform: "uppercase", fontSize: 15 },
        }}
      />
      <MiniCarousel />
      <ParallaxCarousel data={HorizontalSliderImages} />
      <StrikeText
        text="Top restaurants near you"
        color="#000000"
        opacity={0.6}
        strikes={3}
      />
      <FlatList
        horizontal
        data={restaurantsData}
        renderItem={renderRestaurantsCard}
      />
    </ScrollView>
  );
};

export default index;
