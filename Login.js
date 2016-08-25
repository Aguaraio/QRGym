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
const Realm = require('realm');
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;


class Login extends Component{
  constructor(props){
    super(props);
  }
  propTypes:{
    passDone: React.propTypes.string
  }

  _MoveModal(){

    this.props.navigator.resetTo({
          name: 'Login',                                                        //solo BarcodeScanner, si se desea especificar ios o android tendremos que crear LoginIOS y LoginAndroid
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



  _renderLogin(){

      return (
        <View>
          <LoginButton
            style={styles.Button}
            publishPermissions={["publish_actions"]}
            onLoginFinished={(error, result) => {
              try {
                if (result.grantedPermissions) {

                    this._UserIN();
                    this._MoveModal();


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
