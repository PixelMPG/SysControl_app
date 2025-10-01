import * as SecureStore from 'expo-secure-store';

// Guardar datos
export  async function saveSession(user_id, username) {
  try {
    
    
    await SecureStore.setItemAsync(
      "user_session",
      JSON.stringify({ user_id, username })
    );
  } catch (error) {
    console.error("Error guardando sesión:", error);
  }
}

// Leer datos
export  async function loadSession() {
  const session = await SecureStore.getItemAsync("user_session");
  if (session) return JSON.parse(session);
  return null;
}

// Eliminar datos
export  async function removeSession() {
  await SecureStore.deleteItemAsync("user_session");
}