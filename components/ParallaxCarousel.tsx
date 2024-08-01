import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const ParallaxCarousel = ({ data }) => {
  const width = Dimensions.get("window").width;

  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      data={data}
      // enabled={false}
      scrollAnimationDuration={2000}
      // onSnapToItem={(index) => console.log("current index:", index)}
      vertical
      renderItem={({ item, index }) => (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            margin: "0.5%",
          }}
        >
          <Image
            source={item.image}
            resizeMode="cover"
            style={{
              width: width * 0.99,
              height: "100%",
              // borderRadius: 10,
            }}
          />
        </View>
      )}
    />
  );
};

export default ParallaxCarousel;

const styles = StyleSheet.create({});
