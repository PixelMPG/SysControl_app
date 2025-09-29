import { View , StyleSheet} from "react-native";
const Row = ({ children }) => (
        <View style={styles.row} >{children}</View>
    )
    export default Row;
const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        marginTop:10,
        marginBottom:10,
        
        justifyContent:'flex-start',
    }
});