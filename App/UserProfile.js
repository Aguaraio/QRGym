import React, {Component} from 'react';
import {View, StyleSheet, Image, TouchableHighlight, Text, Dimensions, ListView} from 'react-native';
import realm from './../Realm/User';
import AppIOS from './AppIOS';
import Login from  './../Login';
import UserImage from './UserImage';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} = FBSDK;
let result;
var value = '';
var valueStr = '';
var userPicture = '';
let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

class UserProfile extends Component{
  constructor(props){
    super(props);
    this.state={
      dataSource: '',
      loading: true,
      images: [],
      userPicture:''
    }
    //this.userPicture = '';
    //this._getUser = this._getUser.bind(this);
    this.value = '';
    //this.renderImage = this._renderImage.bind(this);
    this.getUserPic = this._getUserPic.bind(this);
    this.setImage == this._setImage.bind(this);
  }
  propTypes:{
    source: React.propTypes.string
  }

  _getUserPic(token){
    return fetch('https://graph.facebook.com/v2.7/me?fields=picture.type(large)&access_token=' +token)
    .then((response) =>response.json())
    .then((responseJson) => {
      this.setState({userPicture : responseJson.picture.data.url});
    })
    .catch((error) => {
    console.error(error);
    });
  }

  _setImage(){
    if (this.state.userPicture == ''){
      <Image source={require('./../img/loading.jpg')}  style={{width:200, height:200}}/>
    }else{
      return(
        <Image source={{uri:this.state.userPicture}}  style={{width:200, height:200}}/>
      );
    }
  }

  componentWillMount(){
    this.setState({userPicture : 'http://www.islandairways.com/loading.jpg'});
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        const {accessToken} = data
        this.getUserPic(accessToken)
      }
    );
  }

  render(){
    return(
    <View style={styles.container}>
      <View style={styles.viewProfile}>
        <Image source={{uri:this.state.userPicture}}  style={{width:200, height:200}}/>
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

  //componentWillReceiveProps(userPicture){
  //  return fetch('https://graph.facebook.com/v2.7/me?fields=picture.type(large)&access_token=EAAK8yup1vxIBANeYbaUudYw5NFib5A8W9vyYOWbSe9f532Uk3trq4tMqwMMGdTu7Ml68JARNJOyY4Lycr3GpOibdSSI0bwElkdUtTC240pOP04bJjOzAR49VfDE39vCcb7dyURfo1KT6gE5FQHXzQoqRvNsBHUaAG0kDEQZDZD')
  //    .then((response) => response.json())
  //    .then((responseJson) => {
        //return responseJson.picture;
  //      console.log(responseJson.picture.data.url);
  //      this.setState({userPicture : responseJson.picture.data.url});
  //    })
  //    .catch((error) => {
  //      console.error(error);
  //    });
  //}
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
  }
})
export default UserProfile
