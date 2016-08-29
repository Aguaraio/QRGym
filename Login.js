import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
//import Realm from 'realm';
import BarcodeScannerIOS from './App/BarcodeScannerIOS';
import realm from './Realm/User';
//import realm from './Realm/UserFB';
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

class Login extends Component{
  constructor(props){
    super(props);
  }
  propTypes:{
    passDone: React.propTypes.string
  }

  _MoveModal(){

    this.props.navigator.resetTo({
          name: 'Login',                                                     //solo BarcodeScanner, si se desea especificar ios o android tendremos que crear LoginIOS y LoginAndroid
    })
  };

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

_saveUserFB(iduser, name, gender, email, birthday){
  console.log(iduser)
  console.log(name)
  console.log(gender)
  console.log(email)
  console.log(birthday)

  realm.write(()=>{
    realm.create('FBUser',{
      id: 1,
      iduser: iduser,
      name: name,
      gender: gender,
      email: email,
      birthday: birthday
    }, true);
  })
}

initUser(token) {
  fetch('https://graph.facebook.com/v2.7/me?fields=id,name,gender,email,birthday&access_token=' + token)
  .then((response) => response.json())
  .then((json) => {
    this._saveUserFB(JSON.stringify(json.id),JSON.stringify(json.name),JSON.stringify(json.gender),JSON.stringify(json.email),JSON.stringify(json.birthday))
  })
  .catch(() => {
    console.log('ERROR GETTING DATA FROM FACEBOOK');
    //reject('ERROR GETTING DATA FROM FACEBOOK')
  })
}

  _renderLogin(){

      return (
        <View>
          <LoginButton
            style={styles.Button}
            onLoginFinished={(error, result) => {
              try {
                if (result.grantedPermissions) {

                    this._UserIN();
                    //this._MoveModal();

                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        const {accessToken} = data
                        this.initUser(accessToken)
                      }
                    );




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
