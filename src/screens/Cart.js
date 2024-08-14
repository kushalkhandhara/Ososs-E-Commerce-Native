import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addItemToCart, reduceItemFromCart, removeItemFromCart } from '../redux/slices/CartSlice';
const Cart = () => {
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(items.data);

  },[items])


  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Cart Items'} />

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item,index }) => (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.productItem}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View>
              <Text style={styles.name}>
                {item.title.length > 20 ? item.title.substring(0, 15) + '...' : item.title}
              </Text>

              <Text style={styles.desc}>
                {item.description.length > 30 ? item.description.substring(0, 20) + '...' : item.description}
              </Text>

              <View style={styles.qtyView}>
                <Text style={styles.price}>{'₹ ' + item.price}</Text>
                <TouchableOpacity style={styles.btn} 
                onPress={()=>{
                  if(item.qty>1){
                    dispatch(reduceItemFromCart(item));
                  }
                  else{
                    dispatch(removeItemFromCart(index));
                  }
                }}
                >
                  <Text style={{fontSize:18,fontWeight:'600',}}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={styles.qty}>{item.qty}</Text>
                <TouchableOpacity style={styles.btn} onPress={()=>{
                    dispatch(addItemToCart(item));

                  }}>
                  <Text style={{fontSize:18,fontWeight:'600',}} >
                    +
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  productItem: {
    width: 340,
    height: 140,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 20,
  },
  desc: {
    marginLeft: 24,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 30,
    marginTop: 5,
  },
  qtyView : {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop : 10,
  },
  btn : {
    padding :5,
    width:30,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius:10,
    borderWidth : 0.5,
    marginLeft:10,
  },
  qty : {
    marginLeft :10,
    fontSize : 18,
  }
});
