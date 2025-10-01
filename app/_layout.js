import { Stack, slot } from "expo-router";
import {Text, View} from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="login" options={{ headerShown: false}} />
      <Stack.Screen name="home" options={{ title:"Localizate", headerShown: false}} />
      <Stack.Screen name="unit_route" options={{ title:"Ruta", headerShown: true}} />
       <Stack.Screen name="settings" options={{ title: "Configuración" ,headerShown: false}} />
    </Stack>
    </GestureHandlerRootView>
    
        
  );
}