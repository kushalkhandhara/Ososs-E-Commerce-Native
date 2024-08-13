import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
// import ProductDetail from './screens/ProductDetail';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Main" component={Main} options={{headerShown:false}} />
            {/* <Stack.Screen name="ProductDetail" component={ProductDetail} options={{headerShown:false}} /> */}
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator