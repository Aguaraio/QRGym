import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text, Dimensions} from 'react-native';
import realm from './../Realm/User';
import AppIOS from './AppIOS';
import Login from  './../Login';
let result;
var value = '';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
class UserProfile extends Component{
  constructor(props){
    super(props);
  }
  propTypes:{
    //source: React.propTypes.method
  }

  //_getUser(){
  //  result = realm.objects('FBUser').filtered('id=1');
  //  value = result[0].picture;
    //console.log(result[0].picture);
  //}




  render(){
    return(
    <View style={styles.container}>
      <View style={styles.viewProfile}>
        <Image source={{uri:'https://scontent.fasu1-1.fna.fbcdn.net/v/t1.0-9/13428417_10208150380510459_1410095327883466055_n.jpg?oh=4049de579a218aa8aeabb200019d7bcb&oe=58569BB4'}} style={{width:200, height:200}}/>
      </View>
      <View style={styles.opciones}>
      <Text>OPCIONES</Text>
      <Text>Gifs Escaneados</Text>
      <Text>Logros</Text>
      <Text>Entrenadores</Text>
      <Text>Aguará</Text>
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: 'column',
  },
  viewprofile:{
    backgroundColor: 'violet',
  },
  opciones:{
    //marginTop: windowHeight * .6,
    flexDirection: 'column',
    backgroundColor: 'yellow',
  },

})

export default UserProfile
