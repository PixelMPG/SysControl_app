// screens/UnitRoute.js
import { useState, useEffect, useRef } from "react";
import { View, ActivityIndicator , StyleSheet} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { WebView } from "react-native-webview";
import {Get_unit_route , Get_unit_stops} from "../lib/unit_route";
import { SysMapRoutes } from "../lib/homeMapHtml";
import Loading from "../components/Loading";

export default function UnitRoute() {
  const { esn , icon } = useLocalSearchParams();
  const [routeData, setRouteData] = useState([]);
  const [stopsData, setStopsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);
  const webviewRef = useRef();


  // Traer datos de la ruta
 useEffect(() => {
  async function fetchData() {
    try {
      const data = await Get_unit_route(esn);
      const stops = await Get_unit_stops(esn);

      if (data?.resultado && Array.isArray(data.resultado) && stops?.resultado && Array.isArray(stops.resultado) ) {
        
        const routeData = data.resultado.map(item => ({
          ...item,
          icono: icon,
        }));

        setRouteData(routeData);
        setStopsData(stops);

      } else {
        console.log("No se encontraron datos de ruta");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [esn, icon]);
    // Enviar datos al WebView solo cuando esté listo
{ /*useEffect(() => {
  if (mapReady && routeData.length  && webviewRef.current) {
    const payload = {
      route: routeData,
      stops: stopsData,
    };
    console.log(payload);
    
    webviewRef.current.postMessage(JSON.stringify(payload));
  }
}, [mapReady, routeData, stopsData]);
*/}

  // Enviar datos al WebView solo cuando esté listo
  useEffect(() => {
    if(mapReady && routeData.length  && webviewRef.current){
     
      webviewRef.current.postMessage(JSON.stringify(routeData) );
    }
  }, [mapReady, routeData]);

  if (loading) return <Loading/>;

  return (
    <View style={{ flex:1 }}>
      <WebView
        ref={webviewRef}
        originWhitelist={['*']}
        source={{ html: SysMapRoutes }}
        javaScriptEnabled
        onMessage={(event) => {
          const msg = JSON.parse(event.nativeEvent.data);
          if(msg.type === 'mapReady') setMapReady(true);
          else console.log('Marker clicked:', msg);
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ffffffcc',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoText: { fontSize: 16, marginBottom: 2 },
});


