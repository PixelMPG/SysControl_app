import { StyleSheet, View, ActivityIndicator, Text, Pressable } from "react-native";
export default function Loading( ){
    return(
        <View style={styles.loadingContainer}>
                        <View style={{ width: '100%' }}>
                            <ActivityIndicator size="large" color="#156082" />
                        </View>
                    </View>
    );
}
const styles = StyleSheet.create({
    
    loadingContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    }
    
});