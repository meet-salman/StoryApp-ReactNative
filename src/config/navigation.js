import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Camera from '../screens/Camera';
import Gallery from '../screens/Gallery';
import Story from '../screens/Story';


const Tab = createMaterialTopTabNavigator();

function TabsNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Camera" component={Camera} />
                <Tab.Screen name="Gallery" component={Gallery} />
                <Tab.Screen name="Story" component={Story} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}



export default TabsNavigation