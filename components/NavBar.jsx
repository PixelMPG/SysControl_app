import { Text, View, StyleSheet } from 'react-native'

import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function NavBar({ children }) {

    return (
        <SafeAreaProvider style={styles.overlay}>
            <View >
                {children}
            </View>
        </SafeAreaProvider>

    )

}
const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        marginTop:'5%',
        top: 0,              
        left: 0,
        right: 0,
        height: 100,
   
        justifyContent: "flex-start",
        alignItems: "flex-start",
        zIndex: 9999,
        elevation: 9999      
    }
});


