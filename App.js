import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/AppNavigator';
import { Provider } from 'react-redux';
import {store} from "./src/redux/store"

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
);
}
