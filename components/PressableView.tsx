import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useCallback } from "react";
import { Animated, Image, Pressable, Text, View } from "react-native";

const PressableView = React.memo(({ item }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  const onPressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Scale back to original size
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{
          backgroundColor: "#FFF",
          width: "90%",
          borderRadius: 20,
          marginHorizontal: "auto",
          overflow: "hidden",
          marginVertical: "2%",
          elevation: 4,
          shadowRadius: 2,
          shadowColor: "#4e4e4ecc",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.8,
        }}
      >
        <View style={{ width: "100%", height: 200 }}>
          <Image
            source={item?.imgSrc}
            style={{ width: "100%", height: "100%", resizeMode: "cover" }}
          />
        </View>
        <View style={{ padding: "2%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontFamily: "LatoBold",
                fontSize: 18,
                paddingBottom: "2%",
                marginTop: "1%",
              }}
            >
              {item?.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingRight: "1%",
              }}
            >
              <Text style={{ fontFamily: "LatoBold" }}>
                {item?.ratings.toFixed(1)}
              </Text>
              <Ionicons
                name={
                  item?.ratings >= 4
                    ? "star"
                    : item?.ratings > 3
                    ? "star-half-outline"
                    : "star-outline"
                }
                color={"green"}
                size={20}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Text style={{ fontFamily: "LatoMed", color: Colors.mediumDark }}>
              {item?.location}
            </Text>
            <Text style={{ fontFamily: "LatoMed", color: Colors.medium }}>
              •
            </Text>
            <Text style={{ fontFamily: "LatoBold" }}>{item?.distance}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {item?.dishes?.map((item, index) => {
              return (
                <Text
                  style={{
                    fontFamily: "LatoMed",
                    paddingVertical: "1%",
                    color: Colors.medium,
                  }}
                  key={index}
                >
                  {item}
                </Text>
              );
            })}
          </View>
          {item?.offer && (
            <>
              <View
                style={{
                  width: "90%",
                  marginHorizontal: "auto",
                  marginTop: "2%",
                  borderWidth: 0.2,
                  borderRadius: 10,
                  borderColor: Colors.mediumDark,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: "1%",
                }}
              >
                {item?.offer?.map((data, index) => {
                  return (
                    <View style={{ flexDirection: "row", gap: 10 }} key={index}>
                      <Text
                        style={{
                          fontFamily: "LatoBold",
                          paddingVertical: "1%",
                          color: "#056fc5",
                        }}
                        key={index}
                      >
                        {data}
                      </Text>
                      {index < item.offer.length - 1 && <Text>︱</Text>}
                    </View>
                  );
                })}
              </View>
            </>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
});

export default PressableView;
