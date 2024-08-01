import {
  View,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import React, { useMemo, useRef } from "react";
import LottieView from "lottie-react-native";
import { Colors } from "@/constants/Colors";
import ParallaxCarousel from "@/components/ParallaxCarousel";

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

const index = () => {
  const animation = useRef<LottieView>(null);
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* <View>
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
            // width: "15%",
            // height: "15%",
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height / 5,
          }}
          direction={-1}
          loop
          resizeMode="cover"
          source={require("../assets/Offers.json")}
        />
      </View> */}
      <View style={{ backgroundColor: "#FFFFFF", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "LatoBold",
            fontSize: 17,
            color: Colors.medium,
            paddingVertical: "1%",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          What's on your mind?
        </Text>
      </View>
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
      <ParallaxCarousel data={HorizontalSliderImages} />
    </ScrollView>
  );
};

export default index;
