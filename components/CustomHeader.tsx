import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CustomHeader = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/deliveryboy.jpg")}
            resizeMode="contain"
            style={styles.bikerImg}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerTitleBtn}>
          <Text style={{ fontSize: 14 }}>Order · Now</Text>
          <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person" size={20} color={"teal"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyles: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingHorizontal: "2%",
    // backgroundColor: "red",
  },
  bikerImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  headerTitleBtn: {
    flex: 1,
  },
  profileBtn: {},
});

export default CustomHeader;
