import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyCamera from './src/components/MyCamera';
import TabsNavigation from './src/config/navigation';

export default function App() {
  return (
    <View style={styles.container}>

      {/* <MyCamera /> */}

      <View style={styles.headBox}>
        <Text style={styles.mainHeading}> Share Your Stories </Text>
      </View>

      <TabsNavigation />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
  },
  headBox: {
    height: '20%',
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
