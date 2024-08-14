import { View, Text, StyleSheet, Image,Keyboard } from 'react-native';
import React,{useEffect, useState} from 'react';
import Header from '../common/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Home from './tabs/Home';
import Search from './tabs/Search';


const HomeScreen = () => {

    const[selectedTab,setSelectedTab] = useState(0);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setKeyboardVisible(true); // or some other action
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setKeyboardVisible(false); // or some other action
        }
      );
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

  return (
    <View style={styles.container}>

      {selectedTab==0 ? (<Home/>) : (<Search/>) }

        {!isKeyboardVisible && (      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(0)}}>
          <Image source={ selectedTab==0 ? require('../images/homefill.png') : require('../images/home.png') } style={styles.bottomTabIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTab}  onPress={()=>{setSelectedTab(1)}}>
          <Image source={require('../images/search.png')} style={styles.bottomTabIcon} />
        </TouchableOpacity>
      </View>
    )}

    
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomTab: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
