import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const OfflineScreen = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/no-wifi.png')} // Reemplaza con tu ícono local
        style={styles.icon}
      />
      <Text style={styles.title}>Sin conexión a internet</Text>
      <Text style={styles.subtitle}>
        Verifica tu red y toca el botón para reintentar.
      </Text>

      <TouchableOpacity style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    tintColor: '#ff3b30',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
