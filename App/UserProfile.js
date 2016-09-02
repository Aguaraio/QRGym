import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text, Dimensions} from 'react-native';
import realm from './../Realm/User';
import AppIOS from './AppIOS';
import Login from  './../Login';
let result;
//var value = '';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;
class UserProfile extends Component{
  constructor(props){
    super(props);
    this._getUser = this._getUser.bind(this);
    this.value = '';
  }
  propTypes:{

  }

  _getUser(){
    result = realm.objects('FBUser').filtered('id=1');
    this.value = result[0].picture;
    //console.log(result[0].picture);
  }

  //componentWillMount(){
  //  this._getUser();
  //}

  render(){
    return(
    <View style={styles.container}>
      <View style={styles.viewProfile}>
        <Image source={{uri: ''}} style={{width:200, height:200}}>
          <Text style={{marginTop:windowHeight * .1}}> Dick pic</Text>
        </Image>
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
