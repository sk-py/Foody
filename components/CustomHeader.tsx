import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomHeader = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/deliveryboy.jpg")}
            height={30}
            width={30}
          />
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
    backgroundColor: "red",
  },
});

export default CustomHeader;
