import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import BarcodeScannerIOS from './App/BarcodeScannerIOS';
import realm from './Realm/User';
const Realm = require('realm');
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} = FBSDK;
var userId = '';
var userName = '';
var userGender;
var userEmail;
var userBirthday;
var userPicture = '';

class Login extends Component{
  constructor(props){
    super(props);
  }
  propTypes:{
    passDone: React.propTypes.string,
    onPressFB: React.propTypes.func,
    fbButton: React.propTypes.func
  }

  


  //_MoveModal(){

  //  this.props.navigator.resetTo({
  //        name: 'Login',

    //})
  //};



  //_MoveModalParent(){

    //super.props.navigator.resetTo({
    //      name: 'Login',
    //})
  //};

  _UserIN(){
    realm.write(()=>{
      realm.create('User',{
        id: 1,
        done: true
      }, true);
    });
  }

  _UserOUT(){
    realm.write(()=>{
      realm.create('User',{
        id: 1,
        done: false
      }, true);
    });

  }

_saveUserFB(iduser, name, gender, email, birthday, picture){
  realm.write(()=>{
    realm.create('FBUser',{
      id: 1,
      iduser: iduser,
      name: name,
      gender: gender,
      picture: picture,
      email: email,
      birthday: birthday
    }, true);
  })
}

initUser(token) {
  fetch('https://graph.facebook.com/v2.7/me?fields=id,name,gender,email,birthday,picture.type(large)&access_token=' + token)
  .then((response) => response.json())
  .then((json) => {

    this._saveUserFB(JSON.stringify(json.id),JSON.stringify(json.name),JSON.stringify(json.gender),JSON.stringify(json.email),JSON.stringify(json.birthday), JSON.stringify(json.picture.data.url))
  })
  .catch(() => {
    console.log('ERROR GETTING DATA FROM FACEBOOK');
    //reject('ERROR GETTING DATA FROM FACEBOOK')
  })
}

  _renderLogin(){

      return (
        <View >
          <LoginButton
            onLoginFinished={(error, result) => {
              try {
                if (result.grantedPermissions) {

                    this._UserIN();

                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        const {accessToken} = data
                        this.initUser(accessToken)
                      }
                    );

                    console.log('estoy arriba de onpressfb');

                    this.props.onPressFB(false);

                    console.log('estoy debajo de onpressfb');

                } else if (result.isCancelled){
                  alert("Login was cancelled");
                }
              } catch (error) {
                // Error retrieving data
                alert("Login failed with error: " + result.error);
              }
            }
          }

          onLogoutFinished={() => {

              alert("User logged out");
              this._UserOUT();

              console.log('arriba gotobarcode');

              this.props.fbButton();

              //this.props.onPressFB(true);
            //  {ref={BarcodeScannerIOS => this.setModal(true) = BarcodeScannerIOS}};

              console.log('abajo gotobarcode');
            }
          }/>
        </View>
      );
      this._saveUserFB(userId, userName);
  }

  render() {
    return(
    this._renderLogin()

  );
  }
};
const styles = StyleSheet.create({
  Button: {
      marginTop:300,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },

  });
export default Login;
