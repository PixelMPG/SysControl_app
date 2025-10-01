
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet , Pressable} from "react-native";
import { WebView } from "react-native-webview";
import { sysMapGeo } from "../../lib/homeMapHtml";
import Table from "../../components/Table";

export default function Geocercas() {
    // Estado de geocercas registradas
    const [geocercas, setGeocercas] = useState([
        { id:"20", nombre: "Leon", zona: "2"  },
        {  id:"40", nombre: "aguas", zona: "1"  },
    ]);
    const webviewRef = useRef();
    const [nombre, setNombre] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const agregarGeocerca = () => {
        if (!nombre || !lat || !lng) return alert("Completa todos los campos");

        const nueva = {
            id: Date.now().toString(),
            nombre,
            lat,
            lng,
        };

        setGeocercas([...geocercas, nueva]);
        setNombre("");
        setLat("");
        setLng("");
    };
    function cleanMap() {
        
    }

    return (
        <View style={{ flex: 1 }}>
            {/* WebView ocupa la mitad de la pantalla */}
            <View style={{ flex: 1 }}>
                <WebView
                    ref={webviewRef}
                    source={{ html: sysMapGeo }}
                    style={{ flex: 1 }}
                />
            </View>

             {/* Abajo tabla + inputs */}
      <View style={{ flex: 1, padding: 10, backgroundColor: "#f9f9f9" }}>
        <Text style={styles.title}>Geocercas registradas</Text>
        <Table headers={["Id", "Nombre" , "Zona" ]} data={geocercas} />

        <Text style={styles.title}>Agregar nueva geocerca</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Zona"
          value={lat}
          onChangeText={setLat}
          keyboardType="numeric"
        />
        
        <Pressable style={styles.buttons} onPress={agregarGeocerca}><Text style={styles.TextButons}>Guradar GeoCerca</Text></Pressable>
        <Pressable style={styles.buttons} on onPress={cleanMap}> <Text style={styles.TextButons}>Limpiar Mapa</Text></Pressable>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "bold",
        fontSize: 16,
        marginVertical: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    cell: {
        flex: 1,
        textAlign: "center",
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginVertical: 4,
    },
    buttons:{
        display:'flex',
        alignContent:'center',
        justifyContent:'center',
        backgroundColor: '#156082',
        marginTop:'10',
        height:60
    },
    TextButons:{
        color: 'white',
        textAlign:'center',
        fontSize:16,

    }
});
