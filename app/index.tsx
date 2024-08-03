import {
  ActivityIndicator,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "@/constants/Colors";
import ParallaxCarousel from "@/components/ParallaxCarousel";
import MiniCarousel from "@/components/MiniCarousel";
import Title from "@/components/Title";
import StrikeText from "@/components/StrikeText";

import GridViewComp from "@/components/GridViewComp";
import PressableView from "@/components/PressableView";
import { Stack } from "expo-router";

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

const restaurantDetail = [
  {
    id: 1,
    name: "BurgerKing",
    location: "Thane West, Thane",
    distance: "2.2 Km",
    dishes: ["Burgers", "Fries", "Shakes"],
    ratings: 4.5,
    offer: ["50% OFF", "Buy 1 Get 1"],
    imgSrc: require("@/assets/images/restaurants/BurgerKing.jpeg"),
  },
  {
    id: 2,
    name: "Chicken Feast",
    location: "Andheri East, Mumbai",
    distance: "1 Km",
    dishes: ["Grilled Chicken", "Chicken Wings", "Chicken Salad"],
    ratings: 4.0,
    offer: ["30% OFF", "Free Drink"],
    imgSrc: require("@/assets/images/restaurants/chicken.jpg"),
  },
  {
    id: 3,
    name: "Culinary Delight",
    location: "Juhu, Mumbai",
    distance: "4 Km",
    dishes: ["Continental", "Italian", "Fusion Cuisine"],
    ratings: 4.8,
    offer: ["25% OFF", "Free Dessert"],
    imgSrc: require("@/assets/images/restaurants/culinary.jpeg"),
  },
  {
    id: 4,
    name: "Dominos",
    location: "Ghatkopar, Mumbai",
    distance: "2.5 Km",
    dishes: ["Pizza", "Pasta", "Chicken Wings"],
    ratings: 3.6,
    offer: ["Buy 1 Get 1", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/dominos.png"),
  },
  {
    id: 5,
    name: "Tryst Lounge",
    location: "Marine Drive, Mumbai",
    distance: "3 Km",
    dishes: ["Cocktails", "Mocktails", "Snacks"],
    ratings: 4.6,
    offer: ["Happy Hours", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/Drinks.jpg"),
  },
  {
    id: 6,
    name: "Bombay Duck",
    location: "Colaba, Mumbai",
    distance: "1 Km",
    dishes: ["Italian", "Seafood", "Fine Dining"],
    ratings: 4.9,
    offer: ["Special Discount", "Free Appetizer"],
    imgSrc: require("@/assets/images/restaurants/fiveStar.jpg"),
  },
  {
    id: 7,
    name: "Italian Bistro",
    location: "Bandra, Mumbai",
    distance: "0.5 Km",
    dishes: ["Pasta", "Pizza", "Salads"],
    ratings: 4.7,
    offer: ["30% OFF", "Free Drink"],
    imgSrc: require("@/assets/images/restaurants/Italian.jpg"),
  },
  {
    id: 8,
    name: "Mughlai Delights",
    location: "Mulund, Mumbai",
    distance: "2.2 Km",
    dishes: ["Biryani", "Kebabs", "Curries"],
    ratings: 4.3,
    offer: ["20% OFF", "Free Dessert"],
    imgSrc: require("@/assets/images/restaurants/Mughlai.jpg"),
  },
  {
    id: 9,
    name: "Therani Restaurant",
    location: "Borivali, Mumbai",
    distance: "1.5 Km",
    dishes: ["Paneer Dishes", "Curries", "Roti"],
    ratings: 4.4,
    offer: ["50% OFF", "10% OFF"],
    imgSrc: require("@/assets/images/restaurants/NorthIndian.jpg"),
  },
  {
    id: 10,
    name: "Pasta Palace",
    location: "Powai, Mumbai",
    distance: "3 Km",
    dishes: ["Pasta", "Garlic Bread", "Salads"],
    ratings: 4.5,
    offer: ["Buy 1 Get 1", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/Pasta.jpg"),
  },
  {
    id: 11,
    name: "Noir Cafe",
    location: "Vile Parle, Mumbai",
    distance: "2 Km",
    dishes: ["Sandwiches", "Coffee", "Pastries"],
    ratings: 4.1,
    offer: ["10% OFF", "Free Coffee"],
    imgSrc: require("@/assets/images/restaurants/someCafe.jpg"),
  },
  {
    id: 12,
    name: "BurgerKing",
    location: "Thane West, Thane",
    distance: "2.2 Km",
    dishes: ["Burgers", "Fries", "Shakes"],
    ratings: 4.5,
    offer: ["50% OFF", "Buy 1 Get 1"],
    imgSrc: require("@/assets/images/restaurants/BurgerKing.jpeg"),
  },
  {
    id: 13,
    name: "Chicken Feast",
    location: "Andheri East, Mumbai",
    distance: "1 Km",
    dishes: ["Grilled Chicken", "Chicken Wings", "Chicken Salad"],
    ratings: 4.0,
    offer: ["30% OFF", "Free Drink"],
    imgSrc: require("@/assets/images/restaurants/chicken.jpg"),
  },
  {
    id: 14,
    name: "Culinary Delight",
    location: "Juhu, Mumbai",
    distance: "4 Km",
    dishes: ["Continental", "Italian", "Fusion Cuisine"],
    ratings: 4.8,
    offer: ["25% OFF", "Free Dessert"],
    imgSrc: require("@/assets/images/restaurants/culinary.jpeg"),
  },
  {
    id: 15,
    name: "Dominos",
    location: "Ghatkopar, Mumbai",
    distance: "2.5 Km",
    dishes: ["Pizza", "Pasta", "Chicken Wings"],
    ratings: 3.6,
    offer: ["Buy 1 Get 1", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/dominos.png"),
  },
  {
    id: 16,
    name: "Tryst Lounge",
    location: "Marine Drive, Mumbai",
    distance: "3 Km",
    dishes: ["Cocktails", "Mocktails", "Snacks"],
    ratings: 4.6,
    offer: ["Happy Hours", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/Drinks.jpg"),
  },
];

const index = () => {
  const scrollY = useRef(new Animated.Value(0));
  const [page, setpage] = useState(4);
  const [loading, setloading] = useState(false);
  const headerHeight = 60;

  // const handleScroll = Animated.event(
  //   [
  //     {
  //       nativeEvent: {
  //         contentOffset: {
  //           y: scrollY.current,
  //         },
  //       },
  //     },
  //   ],
  //   {
  //     useNativeDriver: true,
  //   }
  // );

  // const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerHeight);

  // const translateY = scrollYClamped.interpolate({
  //   inputRange: [0, headerHeight],
  //   outputRange: [0, -(headerHeight / 2)],
  // });

  // const translateYNumber = useRef();

  // translateY.addListener(({ value }) => {
  //   translateYNumber.current = value;
  // });

  // useEffect(() => {
  //   console.log("TranslateY", translateY);
  // }, [translateY]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    // const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  return (
    <>
      {/* <Stack.Screen options={{ headerShown: true }} /> */}
      <ScrollView
        // onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        // style={styles.container}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setloading(true), setpage((prev) => prev + 4);
            setloading(false);
          }
        }}
        style={[
          styles.container,
          {
            // transform: [{ translateY }]
          },
        ]}
      >
        <Title
          align="center"
          color={Colors.medium}
          text="What's your mind?"
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
          text="Explore new deals"
          color="#000000"
          opacity={0.6}
          strikes={3}
        />
        <GridViewComp />
        <StrikeText
          text={`Top ${restaurantDetail.length} restaurants near you`}
          color="#000000"
          opacity={0.7}
          strikes={2}
        />
        <View style={{ marginTop: "4%", marginBottom: "1%" }}>
          {restaurantDetail.slice(0, page).map((item) => {
            return <PressableView key={item.id} item={item} />;
          })}
        </View>
        {loading && <ActivityIndicator size={"small"} color={Colors.primary} />}
      </ScrollView>
    </>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    position: "relative",
    zIndex: 5,
  },
});
