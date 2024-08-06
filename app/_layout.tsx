import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import CustomHeader from "@/components/CustomHeader";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PaperProvider } from "react-native-paper";

import { ContextProvider } from "@/Context/LocationContext";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
    LatoMed: require("../assets/fonts/Lato-Regular.ttf"),
    LatoThin: require("../assets/fonts/Lato-Thin.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ContextProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <PaperProvider>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  header: () => <CustomHeader />,
                  freezeOnBlur: true,
                }}
              />

              <Stack.Screen
                name="(modal)/filter"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  // headerShown: false,
                  headerTitle: "Filters",
                  headerTitleStyle: { fontFamily: "LatoBold" },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <Pressable
                      onPress={() => router.back()}
                      style={{ paddingHorizontal: "2%" }}
                    >
                      <Ionicons name="close" color={"#000"} size={25} />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="(modal)/Details"
                options={{
                  presentation: "modal",
                  animation: "slide_from_bottom",
                  headerShown: false,
                  // headerTitle: "Filters",
                  // headerTitleStyle: { fontFamily: "LatoBold" },
                  // headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <Pressable
                      onPress={() => router.back()}
                      style={{ paddingHorizontal: "2%" }}
                    >
                      <Ionicons name="close" color={"#000"} size={25} />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen
                name="(modal)/mapScreen"
                options={{
                  presentation: "fullScreenModal",
                  animation: "slide_from_bottom",
                  // headerShown: false,
                  headerTitle: "Set Location",
                  headerTitleStyle: { fontFamily: "LatoBold" },
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                  headerLeft: () => (
                    <Pressable
                      onPress={() => router.back()}
                      style={{ paddingHorizontal: "2%" }}
                    >
                      <Ionicons name="close" color={"#000"} size={25} />
                    </Pressable>
                  ),
                }}
              />
              <Stack.Screen name="Anim" options={{ headerShown: false }} />
            </Stack>
          </PaperProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ContextProvider>
  );
}
