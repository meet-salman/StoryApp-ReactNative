import { StyleSheet, Text, View } from 'react-native';
import MyCamera from '../components/MyCamera';

const Camera = () => {
    return (
        <View style={styles.container}>
            {/* <Text> Camera </Text> */}
            <MyCamera />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headBox: {
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#107dac'
    },
    mainHeading: {
        marginTop: 50,
        color: '#fff',
        fontSize: 30
    }
});

export default Camera
