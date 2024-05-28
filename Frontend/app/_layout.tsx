import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="CeloSwap" />
      <Stack.Screen name="Product" />
      <Stack.Screen name="CartScreen" />
      <Stack.Screen name="HomeScreen" />
      <Stack.Screen name="ProductDetailsScreen" />
    </Stack>
  );
}
