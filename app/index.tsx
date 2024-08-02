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
  {
    id: 3,
    name: "Pawan Restaurant",
    distance: "1 Km",
    img: require("@/assets/images/northDish.jpg"),
  },
  {
    id: 4,
    name: "Wow Momos",
    distance: "1 Km",
    img: require("@/assets/images/momos.jpg"),
  },
  {
    id: 5,
    name: "Tandoori Deight",
    distance: "1 Km",
    img: require("@/assets/images/tandoori.jpg"),
  },
  {
    id: 6,
    name: "Bombay Duck",
    distance: "1 Km",
    img: require("@/assets/images/prawns.jpeg"),
  },
  {
    id: 7,
    name: "Pizza Hut",
    distance: "1 Km",
    img: require("@/assets/images/pizzaRest.jpg"),
  },
  {
    id: 8,
    name: "Culinary Deight",
    distance: "1 Km",
    img: require("@/assets/images/culinaryDelight.png"),
  },
  {
    id: 9,
    name: "Gourmet Cafe",
    distance: "1 Km",
    img: require("@/assets/images/cheesyBrocolli.jpg"),
  },
  {
    id: 10,
    name: "Momos Hub",
    distance: "1 Km",
    img: require("@/assets/images/schezwanMomos.jpg"),
  },
  {
    id: 11,
    name: "Udupi House",
    distance: "1 Km",
    img: require("@/assets/images/veg1.jpg"),
  },
  {
    id: 12,
    name: "Bombay Duck",
    distance: "1 Km",
    img: require("@/assets/images/Pizza.jpg"),
  },
];

const index = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
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
      {/* <FlatList
        horizontal
        data={restaurantsData}
        renderItem={renderRestaurantsCard}
        contentContainerStyle={{
          gap: 10,
          paddingVertical: "4%",
          paddingHorizontal: "2%",
          width: Dimensions.get("window").width * 2,
          flexWrap: "wrap",
        }}
        showsHorizontalScrollIndicator={false}
      /> */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: 1100,
          flexWrap: "wrap",
          gap: 20,
          paddingVertical: 30,
          flexDirection: "row",
          // backgroundColor: "#000",
          padding: 20,
        }}
      >
        {restaurantsData.map((item) => {
          return (
            <View key={item.id} style={{ width: 160, height: 200 }}>
              <Image
                source={item.img}
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
          );
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default index;
