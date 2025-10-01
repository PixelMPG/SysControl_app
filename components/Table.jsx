import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function Table({ headers, data }) {
  return (
    <View style={styles.container}>
      {/* Encabezados */}
      <View style={styles.headerRow}>
        {headers.map((header, index) => (
          <Text key={index} style={[styles.cell, styles.headerCell]}>
            {header}
          </Text>
        ))}
      </View>

      {/* Filas */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {headers.map((header, index) => (
              <Text key={index} style={styles.cell}>
                {item[header.toLowerCase()] || "-"}
              </Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#eee",
    paddingVertical: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 15,
  },
});
