import { View, Text, Dimensions,StyleSheet,Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width,height} = Dimensions.get('window');
const Header = ({title,leftIcon,rightIcon,onClickLeftIcon,onClickRightIcon}) => {

  return (
    <View style={styles.header}>
        <TouchableOpacity style = {styles.btn} onPress={()=>{onClickLeftIcon();}}>
            <Image source={leftIcon} style = {styles.icon} />
        </TouchableOpacity>
        
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style = {styles.btn}>
            <Image source={rightIcon} style = {styles.icon} />
        </TouchableOpacity>
    
    </View>
  )
}

export default Header
const styles = StyleSheet.create({
    header: {

        width : width,
        height : 65,
        backgroundColor:'#0786DAFD',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingLeft : 15,
        paddingRight : 15,
    },
    btn :{
        width : 40,
        height : 40,
        justifyContent : 'center',
        alignItems : 'center'
    },
    icon :{
        width : 30,
        height : 30,
        tintColor : 'white',
    },
    title :{
        color : '#ffff',
        fontSize : 20
    }
})