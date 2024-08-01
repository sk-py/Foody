import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const MiniCarousel = () => {
  const CategoryData = [
    {
      id: 6,
      imageSrc: require("@/assets/images/Burger.jpg"),
    },
    {
      id: 3,
      imageSrc: require("@/assets/images/Dessert.png"),
    },
    {
      id: 10,
      imageSrc: require("@/assets/images/Shawarma.jpg"),
    },
    {
      id: 12,
      imageSrc: require("@/assets/images/Shakes.jpg"),
    },
    {
      id: 2,
      imageSrc: require("@/assets/images/Drinks.jpg"),
    },
    {
      id: 11,
      imageSrc: require("@/assets/images/Salad.png"),
    },
    {
      id: 1,
      imageSrc: require("@/assets/images/Pizza.jpg"),
    },
    {
      id: 4,
      imageSrc: require("@/assets/images/NorthIndian.png"),
    },
    {
      id: 5,
      imageSrc: require("@/assets/images/Pasta.jpg"),
    },
    {
      id: 7,
      imageSrc: require("@/assets/images/Biryani.jpg"),
    },
    {
      id: 8,
      imageSrc: require("@/assets/images/Chinese.jpg"),
    },
    {
      id: 9,
      imageSrc: require("@/assets/images/SouthIndian.jpg"),
    },
  ];

  return (
    <FlatList
      horizontal
      data={CategoryData}
      contentContainerStyle={{
        gap: 15,
        paddingVertical: "5%",
        paddingHorizontal: "2%",
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            overflow: "hidden",
          }}
        >
          <Image
            source={item.imageSrc}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </View>
      )}
    />
  );
};

export default MiniCarousel;

const styles = StyleSheet.create({});
