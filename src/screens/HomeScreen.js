import { View, Text, StyleSheet, Image,Keyboard } from 'react-native';
import React,{useEffect, useState} from 'react';
import Header from '../common/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Home from './tabs/Home';
import Search from './tabs/Search';
import WishList from './tabs/WishList';
import Notification from './tabs/Notification';
import User from './tabs/User';

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
      {/* <Header 
        leftIcon={require('../images/menu.png')} 
        rightIcon={require('../images/cart.png')}
        title={'Grocery App'}
      /> */}

      {selectedTab==0 ? (<Home/>) : selectedTab==1 ? (<Search/>) : selectedTab==2 ?  (<WishList/>) : selectedTab==3 ? (<Notification/>) :(<User/>)}

        {!isKeyboardVisible && (      <View style={styles.bottomView}>
        <TouchableOpacity style={styles.bottomTab} onPress={()=>{setSelectedTab(0)}}>
          <Image source={ selectedTab==0 ? require('../images/homefill.png') : require('../images/home.png') } style={styles.bottomTabIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTab}  onPress={()=>{setSelectedTab(1)}}>
          <Image source={require('../images/search.png')} style={styles.bottomTabIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTab}  onPress={()=>{setSelectedTab(2)}}>
          <Image source={selectedTab==2 ? require('../images/heartfill.png') : require('../images/heart.png')} style={styles.bottomTabIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTab}  onPress={()=>{setSelectedTab(3)}}>
          <Image source={selectedTab==3? require('../images/bell_fill.png') : require('../images/bell.png')} style={styles.bottomTabIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.bottomTab}  onPress={()=>{setSelectedTab(4)}}>
          <Image source={selectedTab==4? require('../images/user_fill.png') : require('../images/user.png')} style={styles.bottomTabIcon} />
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
    backgroundColor: '#fff',
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
