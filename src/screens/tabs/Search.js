import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import Header from '../../common/Header';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {useDispatch} from "react-redux";
import { addItemToCart } from '../../redux/slices/CartSlice';

const FULL_STAR = require('../../images/star.png');
const HALF_STAR = require('../../images/halfstar.png');
const EMPTY_STAR = require('../../images/emptystar.png');
const Search = () => {
  const products = useSelector(state => state.product.data || []);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [searchedList, setSearchedList] = useState(products);


  const dispatch = useDispatch();


  const filterData = (txt) => {
    if (!products || products.length === 0) return; // Handle empty or undefined products
    const newData = products.filter(item => item.title.toLowerCase().includes(txt.toLowerCase()));
    setSearchedList(newData);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  // Clear the search input when the close button is pressed
  const clearSearch = () => {
    setSearch('');
    setSearchedList(products); // Reset search results
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
    const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Find Products'} 
      isCart={true}
        leftIcon={require('../../images/osos-logo.png')} 
        rightIcon={require('../../images/cart.png')}

      />


      <View style={styles.searchView}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../images/search.png')} style={styles.icon} />
          <TextInput
            value={search}
            onChangeText={text => {
              setSearch(text);
              filterData(text);
            }}
            placeholder="Find Your Products Here"
            style={styles.input}
          />
        </View>

        {search !== '' && (
          <TouchableOpacity onPress={clearSearch} style={styles.icon}>
            <Image source={require('../../images/close.png')} style={[styles.icon, { width: 16, height: 16 }]} />
          </TouchableOpacity>
        )}
      </View>




      <FlatList
        data={searchedList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => openModal(item)}
            style={styles.productItem}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View>
              <Text style={styles.name}>{item.title.length > 20 ? item.title.substring(0, 15) + '...' : item.title}</Text>
                <View style={styles.starContainer}>
                  
                  {getStars(item.rating.rate).map((star, index) => (
                    <Image key={index} source={star} style={styles.star} />
                  ))}
                  <Text style={styles.countrating}>{item.rating.count}</Text>
                </View>
              <Text style={styles.desc}>{item.description.length > 30 ? item.description.substring(0, 20) + '...' : item.description}</Text>
              <Text style={styles.price}>{'₹ ' + item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
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

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  input: {
    width: '80%',
    marginLeft: 10,
  },
  productItem: {
    width: 340,
    height: 130,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    margin :"auto", 
    marginTop: 7,
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
    fontWeight: 'bold',
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
    justifyContent: 'space-between',
    width: '100%',
  },
  AddtoCart: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  AddtoCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCartIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginLeft: 10,
  },
  AddtoCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'grey',
    paddingHorizontal: 14,
    paddingVertical: 10,
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
