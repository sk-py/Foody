import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { List } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

// Define the type for an item
type ItemType = {
  id: number;
  option: string;
  category: string;
  imageSrc?: string;
};

// Define the filter state type
type FilterType = {
  sortBy: string | null;
  categories: string[];
};

const SortByData: ItemType[] = [
  { id: 2, option: "Rating", category: "Sort" },
  { id: 5, option: "Pure Veg", category: "Sort" },
  { id: 1, option: "Delivery Time", category: "Sort" },
  { id: 4, option: "Cost: High To Low", category: "Sort" },
  { id: 3, option: "Cost: Low To High", category: "Sort" },
];

const CategoryData: ItemType[] = [
  {
    id: 1,
    option: "Pizza",
    category: "Category",
    imageSrc: require("@/assets/images/Pizza.jpg"),
  },
  {
    id: 2,
    option: "Drinks",
    category: "Category",
    imageSrc: require("@/assets/images/Drinks.jpg"),
  },
  {
    id: 3,
    option: "Desserts",
    category: "Category",
    imageSrc: require("@/assets/images/Dessert.png"),
  },
  {
    id: 4,
    option: "North Indian",
    category: "Category",
    imageSrc: require("@/assets/images/NorthIndian.png"),
  },
  {
    id: 5,
    option: "Pasta",
    category: "Category",
    imageSrc: require("@/assets/images/Pasta.jpg"),
  },
  {
    id: 6,
    option: "Burgers",
    category: "Category",
    imageSrc: require("@/assets/images/Burger.jpg"),
  },
  {
    id: 7,
    option: "Biryani",
    category: "Category",
    imageSrc: require("@/assets/images/Biryani.jpg"),
  },
  {
    id: 8,
    option: "Chinese",
    category: "Category",
    imageSrc: require("@/assets/images/Chinese.jpg"),
  },
  {
    id: 9,
    option: "South Indian",
    category: "Category",
    imageSrc: require("@/assets/images/SouthIndian.jpg"),
  },
  {
    id: 10,
    option: "Shawarma",
    category: "Category",
    imageSrc: require("@/assets/images/Shawarma.jpg"),
  },
  {
    id: 11,
    option: "Salad",
    category: "Category",
    imageSrc: require("@/assets/images/Salad.png"),
  },
  {
    id: 12,
    option: "Shakes",
    category: "Category",
    imageSrc: require("@/assets/images/Shakes.jpg"),
  },
];

const FilterScreen = () => {
  const [filter, setFilter] = useState<FilterType>({
    sortBy: null,
    categories: [],
  });

  const handleItemSelect = (option: string, type: keyof FilterType) => {
    setFilter((prevFilter) => {
      if (type === "sortBy") {
        return {
          ...prevFilter,
          sortBy: option, // Set the selected sort option
        };
      } else if (type === "categories") {
        // Toggle category selection
        const isSelected = prevFilter.categories.includes(option);
        return {
          ...prevFilter,
          categories: isSelected
            ? prevFilter.categories.filter((cat) => cat !== option)
            : [...prevFilter.categories, option],
        };
      }
      return prevFilter;
    });
  };

  const renderSortItem = useCallback(
    ({ item }: { item: ItemType }) => {
      return (
        <List.Item
          key={item.id.toString()}
          left={() => (
            <Ionicons
              color={
                filter.sortBy === item.option ? Colors.primary : Colors.medium
              }
              name={
                filter.sortBy === item.option
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              style={{ paddingLeft: "1%" }}
            />
          )}
          title={item.option}
          titleStyle={{
            color:
              filter.sortBy === item.option
                ? Colors.primary
                : Colors.mediumDark,
          }}
          onPress={() => handleItemSelect(item.option, "sortBy")}
        />
      );
    },
    [filter.sortBy] // Ensure dependency on filter.sortBy
  );

  const renderCategoryItem = useCallback(
    ({ item }: { item: ItemType }) => {
      const isSelected = filter.categories.includes(item.option);
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          key={item?.id?.toString()}
          onPress={() => handleItemSelect(item.option, "categories")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: "2%",
            // backgroundColor: item.id == 1 ? "#000" : "#FFF",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
            }}
          >
            <Ionicons
              color={isSelected ? Colors.primary : Colors.medium}
              name={isSelected ? "checkbox" : "square-outline"}
              size={20}
              style={{ paddingLeft: "1%" }}
            />
            <Text
              style={{
                color: isSelected ? Colors.primary : Colors.mediumDark,
                fontSize: 16,
              }}
            >
              {item?.option}
            </Text>
          </View>
          <View style={{ width: "20%" }}>
            <Image
              source={item.imageSrc}
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                resizeMode: "cover",
                alignItems: "center",
              }}
            />
          </View>
        </TouchableOpacity>
      );
    },
    [filter.categories] // Ensure dependency on filter.categories
  );

  const handleClearFilter = () => {
    setFilter({
      sortBy: null,
      categories: [],
    });
  };

  const handleDone = () => {
    console.log("Selected Filters: ", filter);
    router.back();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterView}>
        <List.Accordion
          expanded
          rippleColor={Colors.ripple}
          titleStyle={{ color: Colors.mediumDark }}
          style={{
            backgroundColor: "#FFF",
            borderBottomWidth: 0.2,
            borderBottomColor: "lightgrey",
          }}
          title="𝗦𝗼𝗿𝘁"
          id="1"
          right={({ isExpanded }) => (
            <Ionicons
              name={"swap-vertical-sharp"}
              color={Colors.primary}
              size={20}
              style={{ marginRight: "8%" }}
            />
          )}
        >
          <Text
            style={{
              paddingHorizontal: "4%",
              paddingVertical: "1%",
              fontFamily: "LatoBold",
              color: Colors.medium,
            }}
          >
            Sort by
          </Text>
          <View style={{ paddingHorizontal: 10, marginLeft: "1%" }}>
            <FlatList
              data={SortByData}
              renderItem={renderSortItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </List.Accordion>

        <List.Accordion
          expanded
          rippleColor={Colors.ripple}
          titleStyle={{ color: Colors.mediumDark }}
          style={{
            backgroundColor: "#FFF",
            borderBottomWidth: 0.2,
            borderBottomColor: "lightgrey",
          }}
          title="𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝗶𝗲𝘀"
          id="2"
          right={({ isExpanded }) => (
            <Ionicons
              name="fast-food-outline"
              color={Colors.primary}
              size={20}
              style={{ marginRight: "8%" }}
            />
          )}
        >
          <Text
            style={{
              paddingHorizontal: "4%",
              paddingVertical: "1%",
              fontFamily: "LatoBold",
              color: Colors.medium,
            }}
          >
            Choose Categories
          </Text>
          <View style={{ paddingHorizontal: 10, marginLeft: "1%" }}>
            <FlatList
              data={CategoryData}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item.id.toString()}
              style={{
                height: Dimensions.get("window").height / 2.2,
              }}
              ListFooterComponent={() => (
                <View style={{ padding: "20%" }}></View>
              )}
            />
          </View>
        </List.Accordion>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          disabled={
            filter.categories.length > 0 || filter.sortBy !== null
              ? false
              : true
          }
          activeOpacity={0.6}
          style={[
            styles.clearFilterBtn,
            {
              opacity:
                filter.categories.length > 0 || filter.sortBy !== null
                  ? 1
                  : 0.3,
            },
          ]}
          onPress={handleClearFilter}
        >
          <Text style={styles.clearBtnTxt}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.doneBtn}
          onPress={handleDone}
        >
          <Text style={styles.doneBtnTxt}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  filterView: {},
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.grey,
    width: "100%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: "5%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "4%",
  },
  doneBtn: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
    width: "40%",
    borderRadius: 5,
  },
  clearFilterBtn: {
    backgroundColor: Colors.lightGrey,
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
    width: "40%",
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.medium,
  },
  doneBtnTxt: {
    color: "#ffffff",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
  },
  clearBtnTxt: {
    color: "#000000",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
  },
});
