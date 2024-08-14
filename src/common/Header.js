import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import {useNavigation} from "@react-navigation/native"

const { width, height } = Dimensions.get('window');

const Header = ({ title, leftIcon, rightIcon, onClickLeftIcon, onClickRightIcon, isCart }) => {
  const cartItems = useSelector(state => state.cart);
  const navigation = useNavigation()

  return (
    <View style={styles.header}>
      <View style={styles.btn} onPress={onClickLeftIcon}>
        <Image source={leftIcon} style={styles.Lefticon} />
      </View>

      <Text style={styles.title}>{title}</Text>
      {!isCart && <View></View>}

      {
        isCart && (     
          <TouchableOpacity style={styles.btn} onPress={()=>{
          navigation.navigate("Cart");
        }} >

          <Image source={rightIcon} style={styles.icon} />
          {cartItems.data.length > 0 && ( // Only show the count if there are items in the cart
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartItems.data.length}</Text>
            </View>
          )}
        </TouchableOpacity>)
      }


    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 65,
    backgroundColor: '#0786DAFD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  Lefticon: {
    width: 54,
    height: 54,
    resizeMode:'contain',
    // tintColor: 'white',
  },
  title: {
    color: '#fff',
    fontSize: 20,
  },
  cartBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    right: -5,  // Adjust the position as needed
    top: -5,    // Adjust the position as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
