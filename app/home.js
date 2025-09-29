import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, ActivityIndicator, Text, Pressable } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import getUnidades from "../lib/unidades";
import { SysMapUnits } from "../lib/homeMapHtml";
import BottomSheet from "../components/bottonsheet";
import Row from "../components/Row"
import { useRouter } from 'expo-router';
import NavBar from "../components/NavBar";
import Sidebar from "../components/SideBar";
import { loadSession, removeSession } from "../utils/session";


function HomeMap() {
    const htmlContent = SysMapUnits;
    const router = useRouter();
    const webviewRef = useRef();
    const [unidades, setUnidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [presasbleStatus, setpresasbleStatus] = useState(true);
    const [UnitSelected, setSelectedUnit] = useState([]);
    const [userSession, setUserSession] = useState(null);
    const CarImage = require("../assets/images/carimage.png");
    useEffect(() => {
        const fetchSession = async () => {
            const session = await loadSession();
            if (session) {
                setUserSession(session);

            } else {
                // Si no hay sesión, volver al login
                router.replace("/login");
            }
        };
        fetchSession();
    }, []);

    useEffect(() => {
        if (!userSession) return;

        const fetchData = async () => {
            try {
                const data = await getUnidades(userSession.user_id);
                if (data && data.resultado && Array.isArray(data.resultado.resultado)) {
                    setLoading(false);
                    setUnidades(data.resultado.resultado);
                } else {
                    console.log("No se encontraron unidades");
                }
            } catch (error) {
                console.error("Error cargando unidades:", error);
            }
        };

        fetchData();
    }, [userSession]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <View style={{ width: '100%' }}>
                    <ActivityIndicator size="large" color="#156082" />
                </View>
            </View>
        );

    }

    const Col = ({ numRows, children }) => {
        return (
            <View style={styles[`col${numRows}`]}>{children}</View>
        )
    }


    return (
        <SafeAreaProvider>
            <View style={{ flex: 1, position: 'relative' }}>
                <NavBar>

                </NavBar>
                <Sidebar menuItems={[
                    { label: "GeoCercas" },

                    
                ]}
                    onSelect={(item) => console.log("Seleccionaste:", item.label)}>

                </Sidebar>


                <View style={styles.mapWrapper}>
                    <WebView
                        containerStyle={{ flex: 1, width: "100%", height: "100%" }}
                        ref={webviewRef}
                        originWhitelist={['*']}
                        source={{ html: htmlContent }}
                        javaScriptEnabled={true}

                        onMessage={(event) => {
                            const unidadSeleccionada = JSON.parse(event.nativeEvent.data);

                            if (unidadSeleccionada != null || unidadSeleccionada != "") {
                                setpresasbleStatus(false);
                                setSelectedUnit(unidadSeleccionada);
                                console.log("Unidad seleccionada:", unidadSeleccionada.icono);
                            }
                        }}
                        onLoadEnd={() => {
                            if (webviewRef.current) {
                                webviewRef.current.postMessage(JSON.stringify(unidades));
                            }
                        }}
                    />
                </View>
                <BottomSheet children={

                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%', flex: 1 }}>
                        <Col numRows={1} >
                            <Row>
                                <Pressable style={presasbleStatus ? styles.buttonDisabled : styles.button} ><Text style={{ color: '#ffffff' }} on onPress={() => { router.push({ pathname: '/unit_route', params: { esn: UnitSelected.esn, icon: UnitSelected.icono } }); }} disabled={presasbleStatus} >Ver recorrido</Text></Pressable>
                            </Row>
                            <Row>

                                <View style={{ marginTop: 20, flex: 2, flexDirection: "row", borderWidth: 2, borderColor: '#ccc' }}>

                                    <Col numRows={2}>
                                        <Row><Text style={styles.dataText}>Alias:</Text></Row>
                                        <Row><Text style={styles.dataText}>Latitude:</Text></Row>
                                        <Row><Text style={styles.dataText}>Longitude:</Text></Row>
                                        <Row><Text style={styles.dataText}>Estatus:</Text></Row>
                                    </Col>
                                    <Col numRows={3}>
                                        <Row><Text style={styles.dataText}>{UnitSelected?.alias}</Text></Row>
                                        <Row><Text style={styles.dataText}>{UnitSelected?.latitude}</Text></Row>
                                        <Row><Text style={styles.dataText}>{UnitSelected?.longitude}</Text></Row>
                                        <Row><Text style={styles.dataText}>{UnitSelected?.estatus}</Text></Row>
                                    </Col>

                                </View>
                            </Row>
                        </Col>

                    </View>
                } />

            </View>

        </SafeAreaProvider>



    );
}

const styles = StyleSheet.create({
    mapWrapper: {
        flex: 1,
        overflow: "hidden",
        backgroundColor: "#fff",

    },
    pressableContainer: {
    },

    loadingContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    col1: {
        borderColor: "#000000ff",

        flex: 1,
        width: '100%'
    },
    col2: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#ccc'
    },
    col3: {
        flex: 2,
        margin: 5,
    },
    dataText: {
        fontSize: 18
    },
    button: {
        backgroundColor: '#156082', width: '100%', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
    },
    buttonDisabled: {
        backgroundColor: '#bebebeff', width: '100%', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center'
    }

});


export default HomeMap