import { View, Text, StyleSheet, FlatList, Dimensions, Image, TouchableOpacity,Modal, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../common/Header';
import { useNavigation } from '@react-navigation/native';
import {useDispatch} from "react-redux";

import { addProducts } from '../../redux/slices/ProductsSlice';
import { addItemToCart } from '../../redux/slices/CartSlice';

const FULL_STAR = require('../../images/star.png');
const HALF_STAR = require('../../images/halfstar.png');
const EMPTY_STAR = require('../../images/emptystar.png');


const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };


  useEffect(() => {
    getProducts();
  }, []);


  const getProducts = () => {
    fetch('https://fakestoreapi.com/products')  // Fetching all products
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        data.map(item=>{
          item.qty = 1;
        });
        dispatch(addProducts(data));
      }) 
      .catch(error => console.error('Error fetching products:', error));
  };




  // Rating
  const getStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(FULL_STAR);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(HALF_STAR);
    }

    // Add empty stars to make up to 5 stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(EMPTY_STAR);
    }

    return stars;
  };


  return (
    <SafeAreaView style={styles.container}>
      <Header 
        leftIcon={require('../../images/osos-logo.png')} 
        rightIcon={require('../../images/cart.png')}
        title={'Shopping'}
        isCart={true}
      />
      
      <FlatList 
          data={products} 
          keyExtractor={(item) => item.id.toString()}  
          renderItem={({ item }) => {
            return (
              <TouchableOpacity 
                activeOpacity={1}
                isVisble = {true}
                onPress={() => openModal(item)}
                style={styles.productItem}>

                <Image source={{uri: item.image}} style = {styles.itemImage} />
                <View>
                  <Text style={styles.name}>{item.title.length>20 ? 
                  item.title.substring(0,15) + '...' : 
                  item.title}</Text>

                  <View style={styles.starContainer}>
                  
                    {getStars(item.rating.rate).map((star, index) => (
                      <Image key={index} source={star} style={styles.star} />
                    ))}
                    <Text style={styles.countrating}>{item.rating.count}</Text>
                  </View>

                  <Text style = {styles.desc}>{item.description.length>30 ? 
                  item.description.substring(0,20) + '...' : 
                  item.description}</Text>
                  <Text style = {styles.price}>{'₹ '+item.price }</Text>
                </View>
              
              </TouchableOpacity>
            );
          }}

          contentContainerStyle={{ paddingBottom: 100 }}
        />
          

          {selectedProduct && (

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}>

              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                  <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
                  <Text style={styles.modalPrice}>Price: ₹{selectedProduct.price}</Text>
                  
                  <Text style={styles.modalDescription}> Description :  {selectedProduct.description}</Text>
                  
                  <View style={styles.Buttons}>
                    <Pressable style={styles.AddtoCart} onPress={() => {dispatch(addItemToCart(selectedProduct))}}>
                      <View style={styles.AddtoCartContent}>
                        <Text style={styles.AddtoCartText}>Add to Cart</Text>
                        <Image source={require('../../images/cart.png')} style={styles.modalCartIcon} />
                      </View>
                    </Pressable>
                    
                    <Pressable style={styles.closeButton} onPress={closeModal}>
                      <Text style={styles.closeButtonText}>Close</Text>
                    </Pressable>
                  </View>


                </View>
              </View>

            </Modal>
          )}



      </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems : 'center',
    // justifyContent : 'center',
  },
  productItem: {
    width: 340,
    height: 140,
    backgroundColor: '#fff',
    alignItems : 'center',
    flexDirection : 'row',
    margin : 4,
    padding : 8,
    borderWidth : 1,
    borderColor : 'grey',
    borderRadius : 8,
  },
  itemImage :{
    width : 100,
    height : 100,
  },
  name : {
    fontSize : 18,
    fontWeight : '600',
    marginLeft : 20,
  },
  desc : {
    marginLeft : 24,

  },
  price : {
    fontWeight : 'bold',
    fontSize : 18,
    marginLeft : 30,
    marginTop : 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 310,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 18,
    color: 'green',
    fontWeight : 'bold',
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    marginVertical: 10,
  },
  Buttons: {
    marginTop: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',  // Add space between buttons
    width: '100%',  // Take up the full width
  },
  AddtoCart : {
    backgroundColor: 'red',  
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',  // Align text and icon horizontally
    alignItems: 'center',  // Center vertically
  },
  AddtoCartContent: {
    flexDirection: 'row',  // Align text and icon horizontally
    alignItems: 'center',  // Center items vertically
  },
  modalCartIcon:{
    width: 20,
    height: 20,
    tintColor: 'white',
    marginLeft: 10,  // Space between text and icon
  },
  AddtoCartText : {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  closeButton : {
    backgroundColor : 'grey',
    paddingHorizontal:14,
    paddingVertical:10,
    // padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  starContainer: {
    flexDirection: 'row',
    marginVertical : 8,
    marginLeft : 25,
  },
  star: {
    width: 14,
    height: 14,
    marginHorizontal: 1,
  },
  countrating :{
    color : 'grey',
    marginLeft : 5,
  }
});
