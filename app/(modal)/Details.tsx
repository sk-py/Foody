import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const Details = () => {
  const params = useLocalSearchParams();
  console.log(params);

  return (
    <SafeAreaView>
      <Text>Details</Text>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({});
