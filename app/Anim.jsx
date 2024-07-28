import { View, Text } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const Anim = () => {
  const tap = Gesture.Tap().onStart(() => {
    console.log("tap start");
  });

  const swipe = Gesture.Pan().onTouchesMove(() => {
    console.log("Swiping");
  });

  const pinch = Gesture.Pinch().onStart(() => {
    console.log("Pinched");
  });

  const longPress = Gesture.LongPress().onStart(() => {
    console.log("Pressed for more than 500ms");
  });

  return (
    <>
      <GestureDetector gesture={longPress}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>LongPress GestureDetector</Text>
        </View>
      </GestureDetector>
      <GestureDetector gesture={tap}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Tap GestureDetector</Text>
        </View>
      </GestureDetector>

      <GestureDetector gesture={swipe}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Swipe GestureDetector</Text>
        </View>
      </GestureDetector>

      <GestureDetector gesture={pinch}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Pinch GestureDetector</Text>
        </View>
      </GestureDetector>
    </>
  );
};

export default Anim;

// import { View, Text, StyleSheet } from "react-native";
// import React from "react";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
// } from "react-native-reanimated";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";

// const index = () => {
//   const isPressed = useSharedValue(false);
//   const offset = useSharedValue({ x: 0, y: 0 });

//   const start = useSharedValue({ x: 0, y: 0 });

//   const gesture = Gesture.Pan()
//     .onBegin(() => {
//       isPressed.value = true;
//     })
//     .onUpdate((e) => {
//       offset.value = {
//         x: e.translationX + start.value.x,
//         y: e.translationY + start.value.y,
//       };
//     })
//     .onEnd(() => {
//       start.value = {
//         x: offset.value.x,
//         y: offset.value.y,
//       };
//     })
//     .onFinalize(() => {
//       isPressed.value = false;
//     });
//   // ...

//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: offset.value.x },
//         { translateY: offset.value.y },
//         { scale: withSpring(isPressed.value ? 1.2 : 1) },
//       ],
//       backgroundColor: isPressed.value ? "yellow" : "blue",
//     };
//   });

//   return (
//     <GestureDetector gesture={gesture}>
//       <Animated.View style={[styles.ball, animatedStyles]} />
//     </GestureDetector>
//   );
// };

// export default index;

// const styles = StyleSheet.create({
//   ball: {
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     backgroundColor: "blue",
//     alignSelf: "center",
//   },
// });
