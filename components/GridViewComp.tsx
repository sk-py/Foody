import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const restaurantsData = [
  {
    id: 1,
    name: "Mc Donalds",
    distance: "1 Km",
    img: require("@/assets/images/macD.png"),
    offer: ["60% OFF", "UPTO ₹120"],
    desc: "Burgers, Fast Food, Snacks",
  },
  {
    id: 2,
    name: "Chings",
    distance: "1 Km",
    img: require("@/assets/images/kungPaoChicken.jpg"),
    offer: ["30% OFF", "UPTO ₹60"],
    desc: "Chinese, Noodles, Dumplings",
  },
  {
    id: 3,
    name: "Pawan Restaurant",
    distance: "1 Km",
    img: require("@/assets/images/northDish.jpg"),
    offer: ["FLAT ₹50", "OFF"],
    desc: "North Indian, Curries, Roti, Paneer Dishes",
  },
  {
    id: 4,
    name: "Wow Momos",
    distance: "1 Km",
    img: require("@/assets/images/momos.jpg"),
    offer: ["FLAT 40% OFF"],
    desc: "Momos, Dumplings, Fast Food",
  },
  {
    id: 5,
    name: "Tandoori Delight",
    distance: "1 Km",
    img: require("@/assets/images/tandoori.jpg"),
    offer: ["FLAT ₹80 OFF"],
    desc: "Tandoori Chicken, Kebabs, Naan",
  },
  {
    id: 6,
    name: "Bombay Duck",
    distance: "1 Km",
    img: require("@/assets/images/prawns.jpeg"),
    offer: ["30% OFF", "UPTO ₹75"],
    desc: "Seafood, Prawns, Fish Curry",
  },
  {
    id: 7,
    name: "Pizza Hut",
    distance: "1 Km",
    img: require("@/assets/images/pizzaRest.jpg"),
    offer: ["Buy 1 Get 1"],
    desc: "Pizza, Pasta, Garlic Bread",
  },
  {
    id: 8,
    name: "Culinary Delight",
    distance: "1 Km",
    img: require("@/assets/images/culinaryDelight.png"),
    offer: ["FLAT ₹125 OFF", "Above ₹399"],
    desc: "Gourmet Dishes, Continental, Fusion Cuisine",
  },
  {
    id: 9,
    name: "Gourmet Cafe",
    distance: "1 Km",
    img: require("@/assets/images/cheesyBrocolli.jpg"),
    offer: ["FLAT ₹60 OFF", "Above ₹299"],
    desc: "Cafe, Sandwiches, Salads, Coffee",
  },
  {
    id: 10,
    name: "Momos Hub",
    distance: "1 Km",
    img: require("@/assets/images/schezwanMomos.jpg"),
    offer: ["ITEMS", "AT ₹50"],
    desc: "Momos, Fast Food, Dumplings",
  },
  {
    id: 11,
    name: "Udupi House",
    distance: "1 Km",
    img: require("@/assets/images/veg1.jpg"),
    offer: ["50% OFF", "UPTO ₹199"],
    desc: "South Indian, Dosa, Idli, Vada",
  },
  {
    id: 12,
    name: "Dominoes",
    distance: "1 Km",
    img: require("@/assets/images/Pizza.jpg"),
    offer: ["FLAT 30% OFF"],
    desc: "Pizza, Pasta, Chicken Wings",
  },
];

const GridViewComp = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        width: 1110,
        flexWrap: "wrap",
        gap: 20,
        paddingVertical: 15,
        flexDirection: "row",
        padding: 20,
      }}
    >
      {restaurantsData.map((item) => {
        return (
          <TouchableOpacity key={item?.id} activeOpacity={0.7}>
            <View
              style={{
                width: 160,
                height: 200,
                position: "relative",
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: "#FFF",
                shadowColor: "#000000cc",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 6,
              }}
            >
              <Image
                source={item.img}
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
              />
              <View
                style={{
                  position: "absolute",
                  width: 160,
                  height: 200,
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-end",
                  zIndex: 2,
                }}
              >
                <View
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    gap: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "LatoBold",
                      fontSize: 16,
                    }}
                  >
                    {item.offer ? item.offer[0].toString() : ""}
                  </Text>
                  {item.offer && item.offer.length > 1 && (
                    <Text
                      style={{
                        color: "white",
                        fontFamily: "LatoMed",
                        fontSize: 13,
                      }}
                    >
                      {item.offer[1].toString()}
                    </Text>
                  )}
                </View>
              </View>
              <LinearGradient
                // Background Linear Gradient
                colors={["transparent", "rgba(0, 0, 0, 0.801)"]}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  width: 160,
                  height: 200,
                }}
              />
            </View>
            <View style={{ maxWidth: 160, overflow: "hidden" }}>
              <View style={{ padding: 5, flexDirection: "column" }}>
                <Text style={{ fontFamily: "LatoBold", fontSize: 18 }}>
                  {item?.name.length > 16
                    ? `${item?.name.slice(0, 14)}...`
                    : item?.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "LatoMed",
                    fontSize: 13,
                    color: Colors.medium,
                  }}
                >
                  {item?.desc.length > 25
                    ? `${item?.desc.slice(0, 25)}...`
                    : item?.desc}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default GridViewComp;
