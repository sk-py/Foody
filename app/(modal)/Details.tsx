import {
  Dimensions,
  Image,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

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
    description:
      "Enjoy a wide variety of delicious burgers and crispy fries. Perfect for a quick meal or a casual outing with friends.",
    avgDeliveryTime: "35 mins",
    food: [
      {
        category: "Burgers",
        options: [
          {
            id: 1,
            name: "Crispy Veg Burger",
            info: "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce",
            price: "₹70",
            imgSrc: require("@/assets/images/Category/crispyVeg.png"),
          },
          {
            id: 2,
            name: "Crispy Chicken Burger",
            info: "Crispy Chicken Patty, Onion & Our Signature Tomato Herby Sauce",
            price: "₹150",
            imgSrc: require("@/assets/images/Category/crispyChi.png"),
          },
          {
            id: 5,
            name: "Fiery Chicken Burger",
            info: "Spicy fried Chicken,Loads of Sauces In Square Masala Buns",
            price: "₹210",
            imgSrc: require("@/assets/images/Category/fieryChi.png"),
          },
        ],
      },
      {
        category: "Wraps",
        options: [
          {
            id: 1,
            name: "Paneer Royale Wrap",
            info: "60 gm Paneer Patty, Sauces in soft tortilla Wrap",
            price: "₹109",
            imgSrc: require("@/assets/images/Category/paneerWrap.jpeg"),
          },
          {
            id: 3,
            name: "Chicken Wrap",
            info: "Spicy chicken, Sauces in soft tortilla Wrap",
            price: "₹150",
            imgSrc: require("@/assets/images/Category/chiWrap.jpeg"),
          },
        ],
      },
    ],
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
    description:
      "Indulge in mouthwatering grilled chicken and juicy wings. A great spot for chicken lovers with enticing offers and a cozy atmosphere.",
    avgDeliveryTime: "30 mins",
    food: [
      {
        category: "Grilled Chicken",
        options: [
          {
            id: 1,
            name: "Spicy Grilled Chicken",
            info: "Juicy grilled chicken with a spicy rub",
            price: "₹200",
            imgSrc: require("@/assets/images/Category/honeygarlicwings.jpg"),
          },
          {
            id: 2,
            name: "Herb Grilled Chicken",
            info: "Grilled chicken with a mix of fresh herbs",
            price: "₹220",
          },
          {
            id: 3,
            name: "Lemon Grilled Chicken",
            info: "Grilled chicken with a tangy lemon flavor",
            price: "₹210",
          },
        ],
      },
      {
        category: "Chicken Wings",
        options: [
          {
            id: 1,
            name: "BBQ Chicken Wings",
            info: "Chicken wings glazed with BBQ sauce",
            price: "₹180",
          },
          {
            id: 2,
            name: "Spicy Chicken Wings",
            info: "Chicken wings with a spicy kick",
            price: "₹190",
          },
          {
            id: 3,
            name: "Honey Garlic Wings",
            info: "Chicken wings with honey and garlic sauce",
            price: "₹200",
          },
        ],
      },
    ],
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
    description:
      "Experience a fusion of Continental and Italian dishes with a touch of creativity. Enjoy a delightful meal in a chic and modern setting.",
    avgDeliveryTime: "45 mins",
    food: [
      {
        category: "Continental",
        options: [
          {
            id: 1,
            name: "Grilled Fish",
            info: "Fresh fish grilled to perfection",
            price: "₹350",
          },
          {
            id: 2,
            name: "Roast Chicken",
            info: "Juicy roasted chicken with herbs",
            price: "₹300",
          },
          {
            id: 3,
            name: "Veg Lasagna",
            info: "Layers of pasta with vegetables and cheese",
            price: "₹250",
          },
        ],
      },
      {
        category: "Italian",
        options: [
          {
            id: 1,
            name: "Margherita Pizza",
            info: "Classic pizza with tomato, mozzarella, and basil",
            price: "₹400",
          },
          {
            id: 2,
            name: "Pasta Carbonara",
            info: "Pasta with creamy sauce, bacon, and cheese",
            price: "₹350",
          },
          {
            id: 3,
            name: "Tiramisu",
            info: "Traditional Italian coffee-flavored dessert",
            price: "₹200",
          },
        ],
      },
    ],
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
    description:
      "Savor a variety of pizzas and pastas with great deals. Ideal for family dinners and casual gatherings with friends.",
    avgDeliveryTime: "40 mins",
    food: [
      {
        category: "Pizza",
        options: [
          {
            id: 1,
            name: "Pepperoni Pizza",
            info: "Classic pepperoni pizza with mozzarella cheese",
            price: "₹450",
          },
          {
            id: 2,
            name: "Veggie Pizza",
            info: "Pizza topped with a variety of fresh vegetables",
            price: "₹400",
          },
          {
            id: 3,
            name: "BBQ Chicken Pizza",
            info: "Pizza with BBQ chicken and onions",
            price: "₹500",
          },
        ],
      },
      {
        category: "Pasta",
        options: [
          {
            id: 1,
            name: "Pasta Arrabbiata",
            info: "Spicy tomato pasta with garlic and chili",
            price: "₹250",
          },
          {
            id: 2,
            name: "Creamy Alfredo Pasta",
            info: "Pasta in a creamy Alfredo sauce",
            price: "₹300",
          },
          {
            id: 3,
            name: "Pesto Pasta",
            info: "Pasta with a fresh basil pesto sauce",
            price: "₹280",
          },
        ],
      },
    ],
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
    description:
      "Unwind with a selection of cocktails and mocktails while enjoying light snacks. A perfect place for relaxation and socializing.",
    avgDeliveryTime: "38 mins",
    food: [
      {
        category: "Cocktails",
        options: [
          {
            id: 1,
            name: "Mojito",
            info: "Classic mojito with fresh mint and lime",
            price: "₹300",
          },
          {
            id: 2,
            name: "Margarita",
            info: "Refreshing margarita with lime and tequila",
            price: "₹350",
          },
          {
            id: 3,
            name: "Cosmopolitan",
            info: "Vodka-based cocktail with cranberry juice",
            price: "₹320",
          },
        ],
      },
      {
        category: "Snacks",
        options: [
          {
            id: 1,
            name: "Nachos",
            info: "Crispy nachos with cheese and salsa",
            price: "₹200",
          },
          {
            id: 2,
            name: "Chicken Wings",
            info: "Spicy chicken wings with a side of dip",
            price: "₹250",
          },
          {
            id: 3,
            name: "Garlic Bread",
            info: "Toasted bread with garlic butter",
            price: "₹150",
          },
        ],
      },
    ],
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
    description:
      "Delight in exquisite seafood and Italian cuisine in an elegant setting. Ideal for a special occasion or a luxurious dining experience.",
    avgDeliveryTime: "30 mins",
    food: [
      {
        category: "Seafood",
        options: [
          {
            id: 1,
            name: "Grilled Lobster",
            info: "Lobster grilled with garlic butter",
            price: "₹1200",
          },
          {
            id: 2,
            name: "Seafood Pasta",
            info: "Pasta with a mix of fresh seafood",
            price: "₹600",
          },
          {
            id: 3,
            name: "Crab Cakes",
            info: "Crab cakes served with a tangy dip",
            price: "₹500",
          },
        ],
      },
      {
        category: "Italian",
        options: [
          {
            id: 1,
            name: "Risotto",
            info: "Creamy risotto with mushrooms",
            price: "₹450",
          },
          {
            id: 2,
            name: "Bruschetta",
            info: "Grilled bread topped with fresh tomatoes",
            price: "₹300",
          },
          {
            id: 3,
            name: "Tiramisu",
            info: "Traditional Italian coffee-flavored dessert",
            price: "₹350",
          },
        ],
      },
    ],
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
    description:
      "Enjoy authentic Italian dishes including pasta and pizza. A cozy spot perfect for both family meals and romantic dinners.",
    avgDeliveryTime: "30 mins",
    food: [
      {
        category: "Pasta",
        options: [
          {
            id: 1,
            name: "Spaghetti Bolognese",
            info: "Classic spaghetti with meat sauce",
            price: "₹350",
          },
          {
            id: 2,
            name: "Penne Alfredo",
            info: "Penne pasta in a creamy Alfredo sauce",
            price: "₹300",
          },
          {
            id: 3,
            name: "Pesto Pasta",
            info: "Pasta with a fresh basil pesto sauce",
            price: "₹320",
          },
        ],
      },
      {
        category: "Pizza",
        options: [
          {
            id: 1,
            name: "Margherita Pizza",
            info: "Classic pizza with tomato, mozzarella, and basil",
            price: "₹400",
          },
          {
            id: 2,
            name: "Pepperoni Pizza",
            info: "Pepperoni pizza with mozzarella cheese",
            price: "₹450",
          },
          {
            id: 3,
            name: "Veggie Pizza",
            info: "Pizza topped with a variety of fresh vegetables",
            price: "₹380",
          },
        ],
      },
    ],
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
    description:
      "Relish flavorful Mughlai dishes such as biryani and kebabs. A must-visit for those craving rich and aromatic Indian cuisine.",
    avgDeliveryTime: "35 mins",
    food: [
      {
        category: "Biryani",
        options: [
          {
            id: 1,
            name: "Chicken Biryani",
            info: "Aromatic basmati rice with chicken and spices",
            price: "₹250",
          },
          {
            id: 2,
            name: "Mutton Biryani",
            info: "Flavorful biryani with tender mutton pieces",
            price: "₹300",
          },
          {
            id: 3,
            name: "Veg Biryani",
            info: "Biryani with mixed vegetables and spices",
            price: "₹200",
          },
        ],
      },
      {
        category: "Kebabs",
        options: [
          {
            id: 1,
            name: "Chicken Seekh Kebab",
            info: "Spicy minced chicken kebabs",
            price: "₹180",
          },
          {
            id: 2,
            name: "Paneer Tikka",
            info: "Grilled paneer cubes marinated in spices",
            price: "₹200",
          },
          {
            id: 3,
            name: "Mutton Seekh Kebab",
            info: "Flavorful minced mutton kebabs",
            price: "₹220",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Therani Restaurant",
    location: "Borivali, Mumbai",
    distance: "1.5 Km",
    foodCategory: ["Paneer Dishes", "Curries", "Roti"],
    ratings: 4.4,
    offer: ["50% OFF", "10% OFF"],
    imgSrc: require("@/assets/images/restaurants/NorthIndian.jpg"),
    description:
      "Savor traditional North Indian dishes including paneer and curries. A great choice for hearty meals and generous portions.",
    avgDeliveryTime: "32 mins",
    food: [
      {
        category: "Paneer Dishes",
        options: [
          {
            id: 1,
            name: "Paneer Butter Masala",
            info: "Paneer cubes in a creamy tomato sauce",
            price: "₹250",
          },
          {
            id: 2,
            name: "Palak Paneer",
            info: "Paneer cooked with spinach and spices",
            price: "₹220",
          },
          {
            id: 3,
            name: "Paneer Tikka Masala",
            info: "Grilled paneer in a spicy masala sauce",
            price: "₹270",
          },
        ],
      },
      {
        category: "Curries",
        options: [
          {
            id: 1,
            name: "Chicken Curry",
            info: "Chicken cooked in a spicy curry sauce",
            price: "₹200",
          },
          {
            id: 2,
            name: "Mutton Curry",
            info: "Tender mutton pieces in a rich curry",
            price: "₹280",
          },
          {
            id: 3,
            name: "Dal Makhani",
            info: "Slow-cooked black lentils in a creamy sauce",
            price: "₹150",
          },
        ],
      },
    ],
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
    description:
      "Indulge in a variety of pasta dishes and freshly baked garlic bread. A cozy place for pasta lovers and casual dining.",
    avgDeliveryTime: "38 mins",
    food: [
      {
        category: "Pasta",
        options: [
          {
            id: 1,
            name: "Spaghetti Aglio e Olio",
            info: "Simple spaghetti with garlic and olive oil",
            price: "₹280",
          },
          {
            id: 2,
            name: "Fettuccine Alfredo",
            info: "Fettuccine in a creamy Alfredo sauce",
            price: "₹320",
          },
          {
            id: 3,
            name: "Penne Arrabbiata",
            info: "Spicy penne pasta with tomato sauce",
            price: "₹300",
          },
        ],
      },
      {
        category: "Salads",
        options: [
          {
            id: 1,
            name: "Caesar Salad",
            info: "Classic Caesar salad with romaine lettuce and croutons",
            price: "₹250",
          },
          {
            id: 2,
            name: "Greek Salad",
            info: "Fresh salad with tomatoes, cucumbers, olives, and feta cheese",
            price: "₹270",
          },
          {
            id: 3,
            name: "Caprese Salad",
            info: "Tomatoes and mozzarella with fresh basil",
            price: "₹300",
          },
        ],
      },
    ],
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
    description:
      "Enjoy a relaxed café atmosphere with sandwiches, coffee, and pastries. Perfect for a casual meet-up or a coffee break.",
    avgDeliveryTime: "34 mins",
    food: [
      {
        category: "Sandwiches",
        options: [
          {
            id: 1,
            name: "Grilled Cheese Sandwich",
            info: "Classic grilled cheese sandwich",
            price: "₹150",
          },
          {
            id: 2,
            name: "Club Sandwich",
            info: "Triple-decker sandwich with chicken, bacon, and veggies",
            price: "₹200",
          },
          {
            id: 3,
            name: "Veggie Delight Sandwich",
            info: "Sandwich with fresh vegetables and hummus",
            price: "₹180",
          },
        ],
      },
      {
        category: "Pastries",
        options: [
          {
            id: 1,
            name: "Chocolate Croissant",
            info: "Flaky croissant filled with chocolate",
            price: "₹120",
          },
          {
            id: 2,
            name: "Blueberry Muffin",
            info: "Muffin with fresh blueberries",
            price: "₹100",
          },
          {
            id: 3,
            name: "Cinnamon Roll",
            info: "Roll with cinnamon and sugar",
            price: "₹130",
          },
        ],
      },
    ],
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
    description:
      "Enjoy a wide variety of delicious burgers and crispy fries. Perfect for a quick meal or a casual outing with friends.",
    avgDeliveryTime: "35 mins",
    food: [
      {
        category: "Burgers",
        options: [
          {
            id: 1,
            name: "Crispy Veg Burger",
            info: "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce",
            price: "₹70",
          },
          {
            id: 2,
            name: "Crispy Chicken Burger",
            info: "Crispy Chicken Patty, Onion & Our Signature Tomato Herby Sauce",
            price: "₹150",
          },
          {
            id: 5,
            name: "Fiery Chicken Burger",
            info: "Spicy fried Chicken,Loads of Sauces In Square Masala Buns",
            price: "₹210",
          },
        ],
      },
      {
        category: "Wraps",
        options: [
          {
            id: 1,
            name: "Paneer Royale Wrap",
            info: "60 gm Paneer Patty, Sauces in soft tortilla Wrap",
            price: "₹209",
          },
          {
            id: 3,
            name: "Paneer Royale Wrap",
            info: "60 gm Paneer Patty, Sauces in soft tortilla Wrap",
            price: "₹209",
          },
        ],
      },
    ],
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
    description:
      "Indulge in mouthwatering grilled chicken and juicy wings. A great spot for chicken lovers with enticing offers and a cozy atmosphere.",
    avgDeliveryTime: "30 mins",
    food: [
      {
        category: "Grilled Chicken",
        options: [
          {
            id: 1,
            name: "BBQ Chicken",
            info: "Grilled chicken with BBQ sauce",
            price: "₹300",
          },
          {
            id: 2,
            name: "Peri-Peri Chicken",
            info: "Spicy grilled chicken with peri-peri sauce",
            price: "₹320",
          },
          {
            id: 3,
            name: "Lemon Herb Chicken",
            info: "Chicken grilled with lemon and herbs",
            price: "₹290",
          },
        ],
      },
      {
        category: "Chicken Wings",
        options: [
          {
            id: 1,
            name: "Buffalo Wings",
            info: "Spicy buffalo wings with blue cheese dip",
            price: "₹250",
          },
          {
            id: 2,
            name: "Honey Garlic Wings",
            info: "Wings tossed in honey garlic sauce",
            price: "₹270",
          },
          {
            id: 3,
            name: "Crispy Fried Wings",
            info: "Crispy fried chicken wings",
            price: "₹240",
          },
        ],
      },
    ],
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
    description:
      "Experience a fusion of Continental and Italian dishes with a touch of creativity. Enjoy a delightful meal in a chic and modern setting.",
    avgDeliveryTime: "45 mins",
    food: [
      {
        category: "Continental",
        options: [
          {
            id: 1,
            name: "Grilled Salmon",
            info: "Grilled salmon with lemon butter sauce",
            price: "₹750",
          },
          {
            id: 2,
            name: "Beef Steak",
            info: "Tender beef steak with pepper sauce",
            price: "₹900",
          },
          {
            id: 3,
            name: "Chicken Schnitzel",
            info: "Breaded chicken cutlet served with mashed potatoes",
            price: "₹500",
          },
        ],
      },
      {
        category: "Fusion Cuisine",
        options: [
          {
            id: 1,
            name: "Sushi Tacos",
            info: "Fusion of sushi and tacos with fresh ingredients",
            price: "₹400",
          },
          {
            id: 2,
            name: "Butter Chicken Pizza",
            info: "Pizza topped with butter chicken",
            price: "₹450",
          },
          {
            id: 3,
            name: "Tandoori Quesadilla",
            info: "Quesadilla filled with tandoori chicken",
            price: "₹380",
          },
        ],
      },
    ],
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
    description:
      "Savor a variety of pizzas and pastas with great deals. Ideal for family dinners and casual gatherings with friends.",
    avgDeliveryTime: "40 mins",
    food: [
      {
        category: "Pizza",
        options: [
          {
            id: 1,
            name: "Cheese Burst Pizza",
            info: "Pizza with extra cheese burst",
            price: "₹500",
          },
          {
            id: 2,
            name: "Farmhouse Pizza",
            info: "Pizza topped with farm fresh vegetables",
            price: "₹450",
          },
          {
            id: 3,
            name: "Pepperoni Pizza",
            info: "Pizza topped with pepperoni and cheese",
            price: "₹550",
          },
        ],
      },
      {
        category: "Pasta",
        options: [
          {
            id: 1,
            name: "White Sauce Pasta",
            info: "Pasta in creamy white sauce",
            price: "₹300",
          },
          {
            id: 2,
            name: "Red Sauce Pasta",
            info: "Pasta in tangy red sauce",
            price: "₹280",
          },
          {
            id: 3,
            name: "Mixed Sauce Pasta",
            info: "Pasta in a mix of red and white sauce",
            price: "₹320",
          },
        ],
      },
    ],
  },
];

// const restaurantDetail = [
//   {
//     id: 1,
//     name: "BurgerKing",
//     location: "Thane West, Thane",
//     distance: "2.2 Km",
//     foodCategory: ["Burgers", "Fries", "Shakes"],
//     ratings: 4.5,
//     offer: ["50% OFF", "Buy 1 Get 1"],
//     imgSrc: require("@/assets/images/restaurants/BurgerKing.jpeg"),
//     description:
//       "Enjoy a wide variety of delicious burgers and crispy fries. Perfect for a quick meal or a casual outing with friends.",
//     avgDeliveryTime: "35 mins",
//     food: [
//       {
//         category: "Burgers",
//         options: [
//           {
//             id: 1,
//             name: "Crispy Veg Burger",
//             info: "Masaledar Veg Patty, Onion & Our Signature Tomato Herby Sauce",
//             price: "₹70",
//           },
//           {
//             id: 2,
//             name: "Crispy Chicken Burger",
//             info: "Crispy Chicken Patty, Onion & Our Signature Tomato Herby Sauce",
//             price: "₹150",
//           },
//           {
//             id: 3,
//             name: "Fiery Chicken Burger",
//             info: "Spicy fried Chicken, Loads of Sauces In Square Masala Buns",
//             price: "₹210",
//           },
//         ],
//       },
//       {
//         category: "Fries",
//         options: [
//           {
//             id: 1,
//             name: "Classic Fries",
//             info: "Crispy fries with a touch of salt",
//             price: "₹60",
//           },
//           {
//             id: 2,
//             name: "Cheesy Fries",
//             info: "Fries topped with melted cheese",
//             price: "₹90",
//           },
//           {
//             id: 3,
//             name: "Spicy Fries",
//             info: "Fries seasoned with spicy blend",
//             price: "₹80",
//           },
//         ],
//       },
//       {
//         category: "Shakes",
//         options: [
//           {
//             id: 1,
//             name: "Chocolate Shake",
//             info: "Rich chocolate shake with whipped cream",
//             price: "₹120",
//           },
//           {
//             id: 2,
//             name: "Vanilla Shake",
//             info: "Classic vanilla shake with a creamy texture",
//             price: "₹110",
//           },
//           {
//             id: 3,
//             name: "Strawberry Shake",
//             info: "Refreshing strawberry shake with real fruit",
//             price: "₹130",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     name: "Chicken Feast",
//     location: "Andheri East, Mumbai",
//     distance: "1 Km",
//     foodCategory: ["Grilled Chicken", "Chicken Wings", "Chicken Salad"],
//     ratings: 4.0,
//     offer: ["30% OFF", "Free Drink"],
//     imgSrc: require("@/assets/images/restaurants/chicken.jpg"),
//     description:
//       "Indulge in mouthwatering grilled chicken and juicy wings. A great spot for chicken lovers with enticing offers and a cozy atmosphere.",
//     avgDeliveryTime: "30 mins",
//     food: [
//       {
//         category: "Grilled Chicken",
//         options: [
//           {
//             id: 1,
//             name: "Herb Grilled Chicken",
//             info: "Chicken marinated with herbs and grilled to perfection",
//             price: "₹250",
//           },
//           {
//             id: 2,
//             name: "Spicy Grilled Chicken",
//             info: "Spicy marinated chicken grilled to perfection",
//             price: "₹270",
//           },
//           {
//             id: 3,
//             name: "Lemon Garlic Grilled Chicken",
//             info: "Grilled chicken with lemon and garlic seasoning",
//             price: "₹260",
//           },
//         ],
//       },
//       {
//         category: "Chicken Wings",
//         options: [
//           {
//             id: 1,
//             name: "Buffalo Wings",
//             info: "Spicy buffalo wings with tangy sauce",
//             price: "₹220",
//           },
//           {
//             id: 2,
//             name: "Barbecue Wings",
//             info: "Wings coated in smoky barbecue sauce",
//             price: "₹230",
//           },
//           {
//             id: 3,
//             name: "Garlic Parmesan Wings",
//             info: "Wings with garlic and parmesan seasoning",
//             price: "₹240",
//           },
//         ],
//       },
//       {
//         category: "Chicken Salad",
//         options: [
//           {
//             id: 1,
//             name: "Grilled Chicken Salad",
//             info: "Fresh salad with grilled chicken pieces",
//             price: "₹200",
//           },
//           {
//             id: 2,
//             name: "Caesar Chicken Salad",
//             info: "Chicken salad with Caesar dressing",
//             price: "₹220",
//           },
//           {
//             id: 3,
//             name: "Spicy Chicken Salad",
//             info: "Spicy chicken pieces on a bed of mixed greens",
//             price: "₹210",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 3,
//     name: "Culinary Delight",
//     location: "Juhu, Mumbai",
//     distance: "4 Km",
//     foodCategory: ["Continental", "Italian", "Fusion Cuisine"],
//     ratings: 4.8,
//     offer: ["25% OFF", "Free Dessert"],
//     imgSrc: require("@/assets/images/restaurants/culinary.jpeg"),
//     description:
//       "Experience a fusion of Continental and Italian dishes with a touch of creativity. Enjoy a delightful meal in a chic and modern setting.",
//     avgDeliveryTime: "45 mins",
//     food: [
//       {
//         category: "Continental",
//         options: [
//           {
//             id: 1,
//             name: "Grilled Salmon",
//             info: "Salmon fillet grilled with herbs",
//             price: "₹350",
//           },
//           {
//             id: 2,
//             name: "Beef Stroganoff",
//             info: "Tender beef cooked in a creamy sauce",
//             price: "₹400",
//           },
//           {
//             id: 3,
//             name: "Vegetable Risotto",
//             info: "Creamy risotto with seasonal vegetables",
//             price: "₹320",
//           },
//         ],
//       },
//       {
//         category: "Italian",
//         options: [
//           {
//             id: 1,
//             name: "Margherita Pizza",
//             info: "Classic pizza with tomato, mozzarella, and basil",
//             price: "₹250",
//           },
//           {
//             id: 2,
//             name: "Pasta Alfredo",
//             info: "Pasta in a creamy Alfredo sauce",
//             price: "₹270",
//           },
//           {
//             id: 3,
//             name: "Lasagna",
//             info: "Layers of pasta with meat sauce and cheese",
//             price: "₹300",
//           },
//         ],
//       },
//       {
//         category: "Fusion Cuisine",
//         options: [
//           {
//             id: 1,
//             name: "Sushi Tacos",
//             info: "Fusion of sushi and tacos",
//             price: "₹280",
//           },
//           {
//             id: 2,
//             name: "Spicy Mac and Cheese",
//             info: "Mac and cheese with a spicy twist",
//             price: "₹290",
//           },
//           {
//             id: 3,
//             name: "BBQ Chicken Pizza",
//             info: "Pizza with BBQ chicken and onions",
//             price: "₹270",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 4,
//     name: "Dominos",
//     location: "Ghatkopar, Mumbai",
//     distance: "2.5 Km",
//     foodCategory: ["Pizza", "Pasta", "Chicken Wings"],
//     ratings: 3.6,
//     offer: ["Buy 1 Get 1", "20% OFF"],
//     imgSrc: require("@/assets/images/restaurants/dominos.png"),
//     description:
//       "Savor a variety of pizzas and pastas with great deals. Ideal for family dinners and casual gatherings with friends.",
//     avgDeliveryTime: "40 mins",
//     food: [
//       {
//         category: "Pizza",
//         options: [
//           {
//             id: 1,
//             name: "Pepperoni Pizza",
//             info: "Classic pizza with pepperoni slices",
//             price: "₹270",
//           },
//           {
//             id: 2,
//             name: "Veggie Supreme",
//             info: "Pizza loaded with fresh vegetables",
//             price: "₹250",
//           },
//           {
//             id: 3,
//             name: "BBQ Chicken Pizza",
//             info: "Pizza with BBQ chicken and red onions",
//             price: "₹280",
//           },
//         ],
//       },
//       {
//         category: "Pasta",
//         options: [
//           {
//             id: 1,
//             name: "Penne Arrabbiata",
//             info: "Penne pasta in a spicy tomato sauce",
//             price: "₹220",
//           },
//           {
//             id: 2,
//             name: "Mac and Cheese",
//             info: "Creamy macaroni and cheese",
//             price: "₹230",
//           },
//           {
//             id: 3,
//             name: "Lasagna",
//             info: "Layers of pasta with meat and cheese",
//             price: "₹270",
//           },
//         ],
//       },
//       {
//         category: "Chicken Wings",
//         options: [
//           {
//             id: 1,
//             name: "Buffalo Wings",
//             info: "Spicy wings with tangy sauce",
//             price: "₹220",
//           },
//           {
//             id: 2,
//             name: "Honey BBQ Wings",
//             info: "Sweet and smoky BBQ wings",
//             price: "₹230",
//           },
//           {
//             id: 3,
//             name: "Garlic Parmesan Wings",
//             info: "Wings with garlic and parmesan",
//             price: "₹240",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 5,
//     name: "Tryst Lounge",
//     location: "Marine Drive, Mumbai",
//     distance: "3 Km",
//     foodCategory: ["Cocktails", "Mocktails", "Snacks"],
//     ratings: 4.6,
//     offer: ["Happy Hours", "20% OFF"],
//     imgSrc: require("@/assets/images/restaurants/Drinks.jpg"),
//     description:
//       "Unwind with a selection of cocktails and mocktails while enjoying light snacks. A perfect place for relaxation and socializing.",
//     avgDeliveryTime: "38 mins",
//     food: [
//       {
//         category: "Cocktails",
//         options: [
//           {
//             id: 1,
//             name: "Mojito",
//             info: "Refreshing mint and lime cocktail",
//             price: "₹250",
//           },
//           {
//             id: 2,
//             name: "Margarita",
//             info: "Classic cocktail with lime and tequila",
//             price: "₹270",
//           },
//           {
//             id: 3,
//             name: "Old Fashioned",
//             info: "Traditional cocktail with bourbon",
//             price: "₹280",
//           },
//         ],
//       },
//       {
//         category: "Mocktails",
//         options: [
//           {
//             id: 1,
//             name: "Virgin Mojito",
//             info: "Non-alcoholic mojito with mint and lime",
//             price: "₹180",
//           },
//           {
//             id: 2,
//             name: "Fruit Punch",
//             info: "Mixed fruit juice with a splash of soda",
//             price: "₹200",
//           },
//           {
//             id: 3,
//             name: "Lemonade",
//             info: "Refreshing lemonade with a hint of mint",
//             price: "₹160",
//           },
//         ],
//       },
//       {
//         category: "Snacks",
//         options: [
//           {
//             id: 1,
//             name: "Garlic Bread",
//             info: "Toasted bread with garlic butter",
//             price: "₹120",
//           },
//           {
//             id: 2,
//             name: "Nachos",
//             info: "Tortilla chips with cheese and salsa",
//             price: "₹150",
//           },
//           {
//             id: 3,
//             name: "Spring Rolls",
//             info: "Crispy spring rolls with dipping sauce",
//             price: "₹170",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 6,
//     name: "Bombay Duck",
//     location: "Colaba, Mumbai",
//     distance: "1 Km",
//     foodCategory: ["Italian", "Seafood", "Fine Dining"],
//     ratings: 4.9,
//     offer: ["Special Discount", "Free Appetizer"],
//     imgSrc: require("@/assets/images/restaurants/fiveStar.jpg"),
//     description:
//       "Delight in exquisite seafood and Italian cuisine in an elegant setting. Ideal for a special occasion or a luxurious dining experience.",
//     avgDeliveryTime: "30 mins",
//     food: [
//       {
//         category: "Italian",
//         options: [
//           {
//             id: 1,
//             name: "Pasta Carbonara",
//             info: "Creamy pasta with pancetta and parmesan",
//             price: "₹320",
//           },
//           {
//             id: 2,
//             name: "Margherita Pizza",
//             info: "Classic pizza with tomato and mozzarella",
//             price: "₹250",
//           },
//           {
//             id: 3,
//             name: "Lasagna",
//             info: "Layered pasta with meat and cheese",
//             price: "₹300",
//           },
//         ],
//       },
//       {
//         category: "Seafood",
//         options: [
//           {
//             id: 1,
//             name: "Grilled Lobster",
//             info: "Lobster grilled with garlic butter",
//             price: "₹500",
//           },
//           {
//             id: 2,
//             name: "Fish Tacos",
//             info: "Tacos filled with crispy fish",
//             price: "₹280",
//           },
//           {
//             id: 3,
//             name: "Seafood Paella",
//             info: "Traditional Spanish rice dish with seafood",
//             price: "₹350",
//           },
//         ],
//       },
//       {
//         category: "Fine Dining",
//         options: [
//           {
//             id: 1,
//             name: "Beef Wellington",
//             info: "Beef fillet wrapped in pastry with mushroom duxelles",
//             price: "₹600",
//           },
//           {
//             id: 2,
//             name: "Duck Confit",
//             info: "Slow-cooked duck leg with a rich sauce",
//             price: "₹550",
//           },
//           {
//             id: 3,
//             name: "Lamb Chops",
//             info: "Grilled lamb chops with rosemary",
//             price: "₹580",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 7,
//     name: "Italian Bistro",
//     location: "Bandra, Mumbai",
//     distance: "0.5 Km",
//     foodCategory: ["Pasta", "Pizza", "Salads"],
//     ratings: 4.7,
//     offer: ["30% OFF", "Free Drink"],
//     imgSrc: require("@/assets/images/restaurants/Italian.jpg"),
//     description:
//       "Enjoy authentic Italian dishes including pasta and pizza. A cozy spot perfect for both family meals and romantic dinners.",
//     avgDeliveryTime: "25 mins",
//     food: [
//       {
//         category: "Pasta",
//         options: [
//           {
//             id: 1,
//             name: "Spaghetti Bolognese",
//             info: "Spaghetti with meat sauce",
//             price: "₹260",
//           },
//           {
//             id: 2,
//             name: "Fettuccine Alfredo",
//             info: "Fettuccine pasta in a creamy Alfredo sauce",
//             price: "₹280",
//           },
//           {
//             id: 3,
//             name: "Penne Arrabbiata",
//             info: "Penne pasta in a spicy tomato sauce",
//             price: "₹240",
//           },
//         ],
//       },
//       {
//         category: "Pizza",
//         options: [
//           {
//             id: 1,
//             name: "Pepperoni Pizza",
//             info: "Pizza with pepperoni slices",
//             price: "₹270",
//           },
//           {
//             id: 2,
//             name: "Vegetarian Pizza",
//             info: "Pizza topped with fresh vegetables",
//             price: "₹250",
//           },
//           {
//             id: 3,
//             name: "Margherita Pizza",
//             info: "Classic pizza with tomato and mozzarella",
//             price: "₹260",
//           },
//         ],
//       },
//       {
//         category: "Salads",
//         options: [
//           {
//             id: 1,
//             name: "Caesar Salad",
//             info: "Salad with romaine lettuce and Caesar dressing",
//             price: "₹220",
//           },
//           {
//             id: 2,
//             name: "Greek Salad",
//             info: "Salad with feta cheese, olives, and tomatoes",
//             price: "₹230",
//           },
//           {
//             id: 3,
//             name: "Caprese Salad",
//             info: "Salad with tomatoes, mozzarella, and basil",
//             price: "₹240",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 8,
//     name: "Mughlai Delights",
//     location: "Mulund, Mumbai",
//     distance: "2.2 Km",
//     foodCategory: ["Biryani", "Kebabs", "Curries"],
//     ratings: 4.3,
//     offer: ["20% OFF", "Free Dessert"],
//     imgSrc: require("@/assets/images/restaurants/Mughlai.jpg"),
//     description:
//       "Relish flavorful Mughlai dishes such as biryani and kebabs. A must-visit for those craving rich and aromatic Indian cuisine.",
//     avgDeliveryTime: "35 mins",
//     food: [
//       {
//         category: "Biryani",
//         options: [
//           {
//             id: 1,
//             name: "Chicken Biryani",
//             info: "Spicy chicken biryani with fragrant rice",
//             price: "₹300",
//           },
//           {
//             id: 2,
//             name: "Mutton Biryani",
//             info: "Flavorful mutton biryani with aromatic spices",
//             price: "₹350",
//           },
//           {
//             id: 3,
//             name: "Vegetable Biryani",
//             info: "Biryani with mixed vegetables and spices",
//             price: "₹280",
//           },
//         ],
//       },
//       {
//         category: "Kebabs",
//         options: [
//           {
//             id: 1,
//             name: "Seekh Kebabs",
//             info: "Minced meat kebabs with spices",
//             price: "₹250",
//           },
//           {
//             id: 2,
//             name: "Chicken Tikka",
//             info: "Marinated chicken pieces grilled to perfection",
//             price: "₹270",
//           },
//           {
//             id: 3,
//             name: "Shami Kebabs",
//             info: "Spiced meat patties with herbs",
//             price: "₹260",
//           },
//         ],
//       },
//       {
//         category: "Curries",
//         options: [
//           {
//             id: 1,
//             name: "Butter Chicken",
//             info: "Chicken cooked in creamy tomato sauce",
//             price: "₹290",
//           },
//           {
//             id: 2,
//             name: "Rogan Josh",
//             info: "Spicy mutton curry with aromatic spices",
//             price: "₹320",
//           },
//           {
//             id: 3,
//             name: "Paneer Butter Masala",
//             info: "Paneer cubes in creamy butter sauce",
//             price: "₹270",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 9,
//     name: "Therani Restaurant",
//     location: "Borivali, Mumbai",
//     distance: "1.5 Km",
//     foodCategory: ["Paneer Dishes", "Curries", "Roti"],
//     ratings: 4.4,
//     offer: ["50% OFF", "10% OFF"],
//     imgSrc: require("@/assets/images/restaurants/NorthIndian.jpg"),
//     description:
//       "Savor traditional North Indian dishes including paneer and curries. A great choice for hearty meals and generous portions.",
//     avgDeliveryTime: "30 mins",
//     food: [
//       {
//         category: "Paneer Dishes",
//         options: [
//           {
//             id: 1,
//             name: "Paneer Tikka",
//             info: "Marinated paneer pieces grilled to perfection",
//             price: "₹250",
//           },
//           {
//             id: 2,
//             name: "Paneer Butter Masala",
//             info: "Paneer cubes in creamy tomato sauce",
//             price: "₹270",
//           },
//           {
//             id: 3,
//             name: "Palak Paneer",
//             info: "Paneer cooked with spinach and spices",
//             price: "₹260",
//           },
//         ],
//       },
//       {
//         category: "Curries",
//         options: [
//           {
//             id: 1,
//             name: "Butter Chicken",
//             info: "Chicken in creamy butter sauce",
//             price: "₹290",
//           },
//           {
//             id: 2,
//             name: "Chole Bhature",
//             info: "Spicy chickpea curry with fried bread",
//             price: "₹280",
//           },
//           {
//             id: 3,
//             name: "Dal Makhani",
//             info: "Slow-cooked lentils in a creamy sauce",
//             price: "₹260",
//           },
//         ],
//       },
//       {
//         category: "Roti",
//         options: [
//           {
//             id: 1,
//             name: "Naan",
//             info: "Soft and fluffy Indian bread",
//             price: "₹50",
//           },
//           {
//             id: 2,
//             name: "Roti",
//             info: "Whole wheat Indian bread",
//             price: "₹40",
//           },
//           {
//             id: 3,
//             name: "Paratha",
//             info: "Stuffed flatbread with vegetables",
//             price: "₹60",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 10,
//     name: "Aroma Cafe",
//     location: "Vile Parle, Mumbai",
//     distance: "0.8 Km",
//     foodCategory: ["Coffee", "Sandwiches", "Pastries"],
//     ratings: 4.2,
//     offer: ["Buy 1 Get 1", "15% OFF"],
//     imgSrc: require("@/assets/images/restaurants/Cafe.jpg"),
//     description:
//       "Relax with a cup of coffee and a variety of snacks and pastries. Ideal for a casual hangout or a quick bite.",
//     avgDeliveryTime: "20 mins",
//     food: [
//       {
//         category: "Coffee",
//         options: [
//           {
//             id: 1,
//             name: "Espresso",
//             info: "Strong coffee brewed by forcing hot water through finely-ground coffee beans",
//             price: "₹150",
//           },
//           {
//             id: 2,
//             name: "Latte",
//             info: "Coffee with steamed milk and a small amount of foam",
//             price: "₹180",
//           },
//           {
//             id: 3,
//             name: "Cappuccino",
//             info: "Coffee with equal parts espresso, steamed milk, and foam",
//             price: "₹190",
//           },
//         ],
//       },
//       {
//         category: "Sandwiches",
//         options: [
//           {
//             id: 1,
//             name: "Grilled Cheese Sandwich",
//             info: "Classic grilled cheese sandwich",
//             price: "₹130",
//           },
//           {
//             id: 2,
//             name: "Club Sandwich",
//             info: "Three layers of bread with chicken and vegetables",
//             price: "₹180",
//           },
//           {
//             id: 3,
//             name: "Veggie Sandwich",
//             info: "Sandwich with fresh vegetables and cheese",
//             price: "₹150",
//           },
//         ],
//       },
//       {
//         category: "Pastries",
//         options: [
//           {
//             id: 1,
//             name: "Chocolate Cake",
//             info: "Rich and moist chocolate cake",
//             price: "₹200",
//           },
//           {
//             id: 2,
//             name: "Apple Pie",
//             info: "Classic apple pie with a flaky crust",
//             price: "₹180",
//           },
//           {
//             id: 3,
//             name: "Cheesecake",
//             info: "Creamy cheesecake with a graham cracker crust",
//             price: "₹220",
//           },
//         ],
//       },
//     ],
//   },
// ];

const Details = () => {
  const [RestroDetails, setRestroDetails] = useState<any>([]);
  const [liked, setliked] = useState(false);

  const { id } = useLocalSearchParams();
  console.log(id);

  const DATA = RestroDetails.length
    ? RestroDetails[0]?.food.map((item) => ({
        title: item?.category,
        data: item?.options,
      }))
    : [];

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

  const renderSectionList = ({ item }) => {
    return (
      <View
        style={{ flexDirection: "row", width: "100%", alignItems: "center" }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: "5%",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ fontFamily: "PoppinsMedium" }}>{item.name}</Text>
          <Text style={{ fontFamily: "LatoBold", color: Colors.mediumDark }}>
            {item.price}
          </Text>
          <Text style={styles.infoText}>
            {item?.info.length > 60
              ? item?.info.slice(0, 60) + "..."
              : item?.info}
          </Text>
        </View>
        <View style={{ paddingRight: "5%", position: "relative" }}>
          <Image
            source={
              item?.imgSrc
                ? item.imgSrc
                : require("@/assets/images/Category/placeholder.png")
            }
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
          <TouchableOpacity style={styles.addBtnWrapper}>
            <View style={styles.addBtn}>
              <Text style={{ color: Colors.primary, fontFamily: "LatoBold" }}>
                ADD
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const IMG_HEIGHT = Dimensions.get("window").height / 3;
  const containerWidth = Dimensions.get("window").width;

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [0.9, 1, 1.2]
          ),
        },
      ],
    };
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT], [0, 1]),
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerBackVisible: false,
          headerTitle: () => (
            <Animated.Text
              style={[{ fontFamily: "LatoBold", fontSize: 20 }, headerStyle]}
            >
              {RestroDetails[0]?.name}
            </Animated.Text>
          ),
          headerTitleAlign: "center",
          headerTransparent: true,
          headerBackground: () => (
            <Animated.View style={[styles.header, headerStyle]} />
          ),

          headerLeft: () => (
            <Pressable
              onPress={() => router.back()}
              style={{
                paddingHorizontal: "2%",
                backgroundColor: "#ffffffb3",
                borderRadius: 20,
              }}
            >
              <Ionicons
                name="chevron-back"
                color={"#000"}
                size={25}
                style={{ padding: 5 }}
              />
            </Pressable>
          ),
        }}
      />
      <View style={styles.container}>
        <Animated.ScrollView
          overScrollMode="never"
          ref={scrollRef}
          scrollEventThrottle={16}
        >
          <Animated.Image
            source={RestroDetails[0]?.imgSrc}
            style={[
              styles.parallaxImage,
              imageAnimatedStyle,
              { height: IMG_HEIGHT },
            ]}
          />

          <View style={styles.detailsContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: "4%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "LatoBold",
                  // marginBottom: "2%",
                }}
              >
                {RestroDetails[0]?.name}
              </Text>
              <Ionicons
                onPress={() => setliked(!liked)}
                name={liked ? "heart" : "heart-outline"}
                color={liked ? "red" : Colors.mediumDark}
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
                    style={{
                      fontFamily: "LatoBold",
                      color: Colors.medium,
                      fontSize: 13,
                    }}
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
                marginTop: "4%",
                gap: 6,
              }}
            >
              <FontAwesome5 name="map-pin" size={16} color={Colors.primary} />
              <Text
                style={{ fontFamily: "LatoBold", color: Colors.mediumDark }}
              >
                {RestroDetails[0]?.location}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <View
                style={{ marginVertical: "5%", alignItems: "center", gap: 5 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Ionicons name="star" size={16} color={Colors.primary} />
                  <Text style={{ color: "#303030", opacity: 0.7 }}>
                    {RestroDetails[0]?.ratings.toFixed(1)}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "LatoBold",
                    opacity: 0.6,
                  }}
                >
                  Ratings
                </Text>
              </View>
              <View style={styles.verticalSeparator} />
              <View
                style={{ marginVertical: "5%", alignItems: "center", gap: 5 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Ionicons
                    name="time-outline"
                    color={Colors.primary}
                    size={16}
                  />
                  <Text style={{ color: "#303030", opacity: 0.7 }}>
                    {RestroDetails[0]?.avgDeliveryTime}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: "LatoBold",
                    opacity: 0.6,
                  }}
                >
                  Delivery
                </Text>
              </View>
              <View style={styles.verticalSeparator} />
              <View
                style={{ marginVertical: "5%", alignItems: "center", gap: 5 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <FontAwesome5 name="location-arrow" color={Colors.primary} />
                  <Text style={{ color: "#303030", opacity: 0.7 }}>
                    {RestroDetails[0]?.distance}
                  </Text>
                </View>
                <Text style={styles.distanceText}>Distance</Text>
              </View>
            </View>
            <View style={{ padding: "1%", marginVertical: "4%" }}>
              <Text style={styles.descText}>
                {RestroDetails[0]?.description}
              </Text>
            </View>
          </View>
          <SectionList
            style={{
              backgroundColor: "#FFFFFF",
              transform: [{ translateY: -11 }],
            }}
            scrollEnabled={false}
            keyExtractor={(item, index) => item.id + index}
            sections={DATA}
            renderItem={renderSectionList}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            SectionSeparatorComponent={() => (
              <View style={styles.sectionSeparator} />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionTitle}>{title}</Text>
            )}
            contentContainerStyle={{ paddingBottom: "10%" }}
          />
        </Animated.ScrollView>
      </View>
    </>
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
    // height: Dimensions.get("window").height / 3,
    resizeMode: "cover",
  },
  infoCard: {
    backgroundColor: "#fcede3d7",
    width: "100%",
    marginTop: "4%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  sectionTitle: {
    fontFamily: "PoppinsBold",
    paddingLeft: "4%",
    marginTop: "5%",
    fontSize: 17,
  },
  sectionSeparator: {
    width: "95%",
    height: 0.6,
    opacity: 0.4,
    marginHorizontal: "auto",
    borderRadius: 50,
    marginBottom: "5%",
  },
  itemSeparator: {
    width: "95%",
    height: 0.6,
    opacity: 0.4,
    backgroundColor: Colors.medium,
    marginHorizontal: "auto",
    borderRadius: 50,
    marginVertical: "5%",
  },
  detailsContainer: {
    paddingHorizontal: "4%",
    paddingTop: "3%",
    transform: [{ translateY: -10 }],
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  addBtn: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    alignItems: "center",
    backgroundColor: Colors.ripple,
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 20,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  addBtnWrapper: {
    position: "absolute",
    bottom: -14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    fontFamily: "LatoMed",
    color: Colors.medium,
    opacity: 0.8,
    fontSize: 13,
    marginTop: "8%",
  },
  descText: {
    fontFamily: "LatoMed",
    color: Colors.mediumDark,
    opacity: 0.8,
  },
  distanceText: {
    fontSize: 13,
    fontFamily: "LatoBold",
    opacity: 0.6,
  },
  verticalSeparator: {
    width: 1,
    opacity: 0.6,
    backgroundColor: Colors.medium,
    height: "60%",
  },
  header: {
    backgroundColor: "#ffffff",
    height: 100,
  },
});
