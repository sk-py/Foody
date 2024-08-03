import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="feed" options={{ title: "Feed" }} />
      <Stack.Screen name="messages" options={{ title: "Messages" }} />
    </Stack>
  );
};

export default _layout;
