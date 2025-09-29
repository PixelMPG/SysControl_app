import { StyleSheet, View, Text, Image, TextInput, Pressable, ActivityIndicator  } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import doLogin from "../lib/login";
import { useRouter } from 'expo-router';
import { saveSession , loadSession } from "../utils/session";


export default function LogIn() {
    const MainLogo = require("../assets/images/logo_original.png");
    const [inputValue, setInputValues] = useState({
        username: "",
        pass: ""
    });
    const router = useRouter();
    const [passStatus, setStatus] = useState(true);
    const [userSession, setUserSession] = useState(null);

    const handleChange = (fieldName, value) => {
        setInputValues((prev) => ({ ...prev, [fieldName]: value }));
    };

    async function login() {
        if (inputValue.username != "" && inputValue.pass != "") {
            const data = await doLogin(inputValue.username, inputValue.pass);
            if (data.tipo == 1 && data != null) {
                try {
                    await saveSession(data.resultado.id_empresa, data.resultado.usuario); 
                    if (await loadSession()){
                        router.push('/home');
                        
                    }
                }catch{
                    alert("Error al cargar la sesion.")
                }
            } else {
                alert("claves incorrectas");
            }
        } else {
            alert("los campos son obligatorios");
        }
    }
    function changestatus() {
        if (passStatus == true) {
            setStatus(false);
        } else {
            setStatus(true);
        }
    }
    

    return (
        <View style={styles.container}>
            <Image source={MainLogo} style={styles.logo} />

            <View style={styles.inputContainer}>
               
                <View style={styles.inputWrapper}>
                    <FontAwesome name="user" size={24} color="#888" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        placeholderTextColor="#888"
                        value={inputValue.username}
                        onChangeText={(text) => handleChange("username", text)}
                    />
                     
                </View>

                <View style={styles.inputWrapper}>
                    <FontAwesome name="lock" size={24} color="#888" style={styles.iconLeft} />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#888"
                        value={inputValue.pass}
                        secureTextEntry={passStatus}
                        onChangeText={(text) => handleChange("pass", text)}
                    />

                    <Pressable onPress={changestatus} >
                        <FontAwesome name="eye" size={20} color="#4e4c4cff" />
                    </Pressable>
                </View>
            </View>

            <View style={{ width: "100%", height: 50, marginTop: "10%" }}>
                <Pressable
                    style={styles.button}
                    onPress={login}
                >
                    <Text style={{ color: "white", fontSize: 18 }}>Iniciar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff", // sin los 8 'f', solo 6
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    logo: {
        width: 300,
        height: 100,

        marginBottom: 80,
    },
    inputContainer: {
        width: "100%",
    },
    input: {
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#156082'
    },
    icon: {
        margin: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        paddingVertical: 10,
        fontSize: 16,
    },
});
