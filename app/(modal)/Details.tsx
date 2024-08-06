import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const restaurantDetail = [
  {
    id: 1,
    name: "BurgerKing",
    location: "Thane West, Thane",
    distance: "2.2 Km",
    foodCategory: ["Burgers", "Fries", "Shakes"],
    ratings: 4.5,
    offer: ["50% OFF", "Buy 1 Get 1"],
    imgSrc: require("@/assets/images/restaurants/BurgerKing.jpeg"),
  },
  {
    id: 2,
    name: "Chicken Feast",
    location: "Andheri East, Mumbai",
    distance: "1 Km",
    foodCategory: ["Grilled Chicken", "Chicken Wings", "Chicken Salad"],
    ratings: 4.0,
    offer: ["30% OFF", "Free Drink"],
    imgSrc: require("@/assets/images/restaurants/chicken.jpg"),
  },
  {
    id: 3,
    name: "Culinary Delight",
    location: "Juhu, Mumbai",
    distance: "4 Km",
    foodCategory: ["Continental", "Italian", "Fusion Cuisine"],
    ratings: 4.8,
    offer: ["25% OFF", "Free Dessert"],
    imgSrc: require("@/assets/images/restaurants/culinary.jpeg"),
  },
  {
    id: 4,
    name: "Dominos",
    location: "Ghatkopar, Mumbai",
    distance: "2.5 Km",
    foodCategory: ["Pizza", "Pasta", "Chicken Wings"],
    ratings: 3.6,
    offer: ["Buy 1 Get 1", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/dominos.png"),
  },
  {
    id: 5,
    name: "Tryst Lounge",
    location: "Marine Drive, Mumbai",
    distance: "3 Km",
    foodCategory: ["Cocktails", "Mocktails", "Snacks"],
    ratings: 4.6,
    offer: ["Happy Hours", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/Drinks.jpg"),
  },
  {
    id: 6,
    name: "Bombay Duck",
    location: "Colaba, Mumbai",
    distance: "1 Km",
    foodCategory: ["Italian", "Seafood", "Fine Dining"],
    ratings: 4.9,
    offer: ["Special Discount", "Free Appetizer"],
    imgSrc: require("@/assets/images/restaurants/fiveStar.jpg"),
  },
  {
    id: 7,
    name: "Italian Bistro",
    location: "Bandra, Mumbai",
    distance: "0.5 Km",
    foodCategory: ["Pasta", "Pizza", "Salads"],
    ratings: 4.7,
    offer: ["30% OFF", "Free Drink"],
    imgSrc: require("@/assets/images/restaurants/Italian.jpg"),
  },
  {
    id: 8,
    name: "Mughlai Delights",
    location: "Mulund, Mumbai",
    distance: "2.2 Km",
    foodCategory: ["Biryani", "Kebabs", "Curries"],
    ratings: 4.3,
    offer: ["20% OFF", "Free Dessert"],
    imgSrc: require("@/assets/images/restaurants/Mughlai.jpg"),
  },
  {
    id: 9,
    name: "Therani Restaurant",
    location: "Borivali, Mumbai",
    distance: "1.5 Km",
    foodCategory: ["Paneer foodCategory", "Curries", "Roti"],
    ratings: 4.4,
    offer: ["50% OFF", "10% OFF"],
    imgSrc: require("@/assets/images/restaurants/NorthIndian.jpg"),
  },
  {
    id: 10,
    name: "Pasta Palace",
    location: "Powai, Mumbai",
    distance: "3 Km",
    foodCategory: ["Pasta", "Garlic Bread", "Salads"],
    ratings: 4.5,
    offer: ["Buy 1 Get 1", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/Pasta.jpg"),
  },
  {
    id: 11,
    name: "Noir Cafe",
    location: "Vile Parle, Mumbai",
    distance: "2 Km",
    foodCategory: ["Sandwiches", "Coffee", "Pastries"],
    ratings: 4.1,
    offer: ["10% OFF", "Free Coffee"],
    imgSrc: require("@/assets/images/restaurants/someCafe.jpg"),
  },
  {
    id: 12,
    name: "BurgerKing",
    location: "Thane West, Thane",
    distance: "2.2 Km",
    foodCategory: ["Burgers", "Fries", "Shakes"],
    ratings: 4.5,
    offer: ["50% OFF", "Buy 1 Get 1"],
    imgSrc: require("@/assets/images/restaurants/BurgerKing.jpeg"),
  },
  {
    id: 13,
    name: "Chicken Feast",
    location: "Andheri East, Mumbai",
    distance: "1 Km",
    foodCategory: ["Grilled Chicken", "Chicken Wings", "Chicken Salad"],
    ratings: 4.0,
    offer: ["30% OFF", "Free Drink"],
    imgSrc: require("@/assets/images/restaurants/chicken.jpg"),
  },
  {
    id: 14,
    name: "Culinary Delight",
    location: "Juhu, Mumbai",
    distance: "4 Km",
    foodCategory: ["Continental", "Italian", "Fusion Cuisine"],
    ratings: 4.8,
    offer: ["25% OFF", "Free Dessert"],
    imgSrc: require("@/assets/images/restaurants/culinary.jpeg"),
  },
  {
    id: 15,
    name: "Dominos",
    location: "Ghatkopar, Mumbai",
    distance: "2.5 Km",
    foodCategory: ["Pizza", "Pasta", "Chicken Wings"],
    ratings: 3.6,
    offer: ["Buy 1 Get 1", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/dominos.png"),
  },
  {
    id: 16,
    name: "Tryst Lounge",
    location: "Marine Drive, Mumbai",
    distance: "3 Km",
    foodCategory: ["Cocktails", "Mocktails", "Snacks"],
    ratings: 4.6,
    offer: ["Happy Hours", "20% OFF"],
    imgSrc: require("@/assets/images/restaurants/Drinks.jpg"),
  },
];

// type RestroDetails = {
//   id: number;
//   name: string;
//   location: string;
//   distance: string;
//   foodCategory: string[];
//   ratings: number;
//   offer: string[];
//   imgSrc: any;
// };

const Details = () => {
  const [RestroDetails, setRestroDetails] = useState<any>([]);
  const [liked, setliked] = useState(false);
  const { id } = useLocalSearchParams();
  console.log(id);

  const getDetails = () => {
    const fetchRestroDetails = restaurantDetail.filter((item) => {
      return item?.id === parseInt(id);
    });
    setRestroDetails(fetchRestroDetails);
  };

  useEffect(() => {
    console.log(RestroDetails);
    getDetails();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={RestroDetails[0]?.imgSrc} style={styles.parallaxImage} />

        <View style={{ paddingHorizontal: "4%", paddingTop: "3%" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: "4%",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "LatoBold" }}>
              {RestroDetails[0]?.name}
            </Text>
            <Ionicons
              onPress={() => setliked(!liked)}
              name={liked ? "heart" : "heart-outline"}
              color={liked ? "red" : "#000"}
              size={24}
              style={{
                borderWidth: 0.2,
                alignSelf: "center",
                borderColor: Colors.mediumDark,
                backgroundColor: "#FFF",
                padding: 4,
                borderRadius: 5,
              }}
            />
          </View>
          <View
            style={{
              gap: 5,
              // marginTop: "1.5%",
              flexDirection: "row",
              alignItems: "center",
              width: "85%",
              flexWrap: "wrap",
              // backgroundColor: "#000",
            }}
          >
            {RestroDetails[0]?.foodCategory.map((item) => {
              return (
                <Text
                  style={{ fontFamily: "LatoBold", color: Colors.medium }}
                  key={item}
                >
                  {item}
                </Text>
              );
            })}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: "3%",
              gap: 4,
            }}
          >
            <Ionicons name="location-sharp" color={Colors.primary} size={18} />
            <Text style={{ fontFamily: "LatoBold", color: Colors.mediumDark }}>
              {RestroDetails[0]?.location}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  parallaxImage: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
    resizeMode: "cover",
  },
});
