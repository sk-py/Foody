// import {
//   FlatList,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import React, { useCallback, useState } from "react";
// import { Colors } from "@/constants/Colors";
// import { router } from "expo-router";
// import { List } from "react-native-paper";
// import { Ionicons } from "@expo/vector-icons";

// type ItemType = {
//   id: number;
//   option: string;
// };

// const SortByData: ItemType[] = [
//   { id: 1, option: "Delivery Time" },
//   { id: 2, option: "Rating" },
//   { id: 3, option: "Cost: Low To High" },
//   { id: 4, option: "Cost: High To Low" },
// ];

// const filter = () => {
//   const [Filter, setFilter] = useState({ sortBy: [{}], category: [{}] });

//   const handleItemSelect = (option: string, from: string) => {
//     console.log(from, option);
//   };

//   const renderSortItem = useCallback((item: ItemType, index: number) => {
//     return (
//       <List.Item
//         left={({ color, style }) => (
//           <Ionicons color={Colors.primary} name="radio-button-off" size={20} />
//         )}
//         title={item.option}
//         titleStyle={{ color: Colors.mediumDark }}
//         onPress={() => handleItemSelect}
//       />
//     );
//   }, []);

//   const handleDone = () => {
//     router.back();
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.filterView}>
//         <List.Accordion
//           rippleColor={Colors.ripple}
//           titleStyle={{ color: Colors.mediumDark }}
//           style={{
//             backgroundColor: "#FFF",
//             borderBottomWidth: 0.2,
//             borderBottomColor: "lightgrey",
//           }}
//           title="𝗦𝗼𝗿𝘁"
//           id="1"
//           right={({ isExpanded }) => (
//             <Ionicons
//               name={isExpanded ? "caret-up-outline" : "swap-vertical-sharp"}
//               size={20}
//             />
//           )}
//         >
//           <Text
//             style={{
//               paddingHorizontal: "4%",
//               paddingVertical: "1%",
//               fontFamily: "LatoBold",
//               color: Colors.medium,
//             }}
//           >
//             Sort by
//           </Text>
//           <View style={{ paddingHorizontal: 10, marginLeft: "1%" }}>
//             <FlatList
//               data={SortByData}
//               renderItem={renderSortItem}
//               keyExtractor={(item) => item.id}
//             />
//           </View>
//         </List.Accordion>
//       </View>

//       <View style={styles.footer}>
//         <TouchableOpacity
//           activeOpacity={0.6}
//           style={styles.doneBtn}
//           onPress={handleDone}
//         >
//           <Text style={styles.doneBtnTxt}>Done</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default filter;

// const styles = StyleSheet.create({
//   filterView: {},
//   mainContainer: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     position: "relative",
//   },
//   footer: {
//     position: "absolute",
//     bottom: 0,
//     backgroundColor: "#0000001c",
//     width: "100%",
//     borderTopRightRadius: 15,
//     borderTopLeftRadius: 15,
//     paddingBottom: "3%",
//   },
//   doneBtn: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "3%",
//   },
//   doneBtnTxt: {
//     color: "#FFFFFF",
//     backgroundColor: Colors.primary,
//     padding: "3%",
//     borderRadius: 5,
//     width: "80%",
//     textAlign: "center",
//     fontSize: 16,
//   },
// });

import {
  FlatList,
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
};

// Define the filter state type
type FilterType = {
  sortBy: { option?: string }[];
  category: { option?: string }[];
};

const SortByData: ItemType[] = [
  { id: 1, option: "Delivery Time" },
  { id: 2, option: "Rating" },
  { id: 3, option: "Cost: Low To High" },
  { id: 4, option: "Cost: High To Low" },
];

const FilterScreen = () => {
  const [Filter, setFilter] = useState<FilterType>({
    sortBy: [{}],
    category: [{}],
  });

  const handleItemSelect = (option: string, from: string) => {
    console.log(from, option);
    // Update the filter state based on selection
    setFilter((prevFilter) => ({
      ...prevFilter,
      sortBy: [{ option }],
    }));
  };

  const renderSortItem = useCallback(
    ({ item, index }: { item: ItemType; index: number }) => {
      return (
        <List.Item
          key={item.id.toString()}
          left={() => (
            <Ionicons
              color={Colors.primary}
              name="radio-button-off"
              size={20}
            />
          )}
          title={item.option}
          titleStyle={{ color: Colors.mediumDark }}
          onPress={() => handleItemSelect(item.option, "sortBy")}
        />
      );
    },
    [] // Add handleItemSelect if it's not using a stable identity
  );

  const handleDone = () => {
    router.back();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterView}>
        <List.Accordion
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
              name={isExpanded ? "caret-up-outline" : "swap-vertical-sharp"}
              size={20}
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
              keyExtractor={(item) => item.id.toString()} // Convert id to string
            />
          </View>
        </List.Accordion>
      </View>

      <View style={styles.footer}>
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
    backgroundColor: "#0000001c",
    width: "100%",
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingBottom: "3%",
  },
  doneBtn: {
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
  },
  doneBtnTxt: {
    color: "#FFFFFF",
    backgroundColor: Colors.primary,
    padding: "3%",
    borderRadius: 5,
    width: "80%",
    textAlign: "center",
    fontSize: 16,
  },
});
