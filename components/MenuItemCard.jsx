import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";

export default function MenuItemCard({ label, route, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.content}>
        {/*icon && <Image source={icon} style={styles.icon} />*/}
        <Text style={styles.text}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    elevation: 4, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 14,
    resizeMode: "contain",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
