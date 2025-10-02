import React, { useRef, useState , useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image
} from "react-native";
import MenuItemCard from "./MenuItemCard";
import { loadSession, removeSession } from "../utils/session";
import { useRouter } from 'expo-router';


const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.7;
const MainLogo = require("../assets/images/logo_original.png");


export default function Sidebar({ menuItems = [], onSelect }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
  const [userSession, setUserSession] = useState(null);

   useEffect(() => {
          const fetchSession = async () => {
              const session = await loadSession();
              if (session) {
                  setUserSession(session);
                  
              } else {
                  console.log("Error al cargar sesion.");
                  
              }
          };
          fetchSession();
      }, []);

  const toggleSidebar = () => {
    if (open) {
      Animated.timing(slideAnim, {
        toValue: -SIDEBAR_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  async function handleLogout() {
    try {
    await removeSession();
      console.log("Sesión eliminada correctamente");
      
      // Redirigir a login
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

  return (
    <>
      {/* Botón flotante (solo visible cuando está cerrado) */}
      {!open && (
        <TouchableOpacity style={styles.fab} onPress={toggleSidebar}>
          <Text style={{ color: "#fff", fontSize: 20 }}>☰</Text>
        </TouchableOpacity>
      )}

      {/* Backdrop (clic para cerrar) */}
      {open && <TouchableOpacity style={styles.backdrop} onPress={toggleSidebar} />}

     
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
        <View style={{ flex: 1 }}>
      
          <Image source={MainLogo} style={styles.mainlogo} />
          <View style={styles.userContainer}>
          <Text style={styles.welcomeLabel}>👤 Bienvenido:</Text>
          <Text style={styles.username}>{userSession?.username ?? "Invitado"}</Text>
        </View>
          {/* Menú */}
          {menuItems.map((item, index) => (
            <MenuItemCard
              key={index}
              label={item.label}
              icon={item.icon}
              onPress={() => {
                onSelect && onSelect(item);
                toggleSidebar();
              }}
            />
          ))}

          {/* Botón de cerrar sesión al final */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} >
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );

}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#156082",
    padding: 12,
    borderRadius: 20,
    elevation: 5,
    zIndex: 9999,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    width: SIDEBAR_WIDTH,
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 20,
    zIndex: 20,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemText: {
    fontSize: 16,
  },
  mainlogo: {
    width: SIDEBAR_WIDTH - 50,
    height: 80,
    marginBottom: 20,
    marginTop: '5%',
  },
  logoutButton: {
    marginTop: 'auto',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000ff',
    alignItems: "center",
  },
  logoutText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 16,
  },
  userContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  height:"8%",
  marginVertical: 15,
  paddingHorizontal: 10,
  backgroundColor: '#f0f4f8',
  borderRadius: 8,
},

welcomeLabel: {
  fontSize: 18,
  color: '#333',
  fontWeight: '600',
  marginRight: 6,
},

username: {
  fontSize: 18,
  color: '#000000ff',
  fontWeight: '700',
},
});
