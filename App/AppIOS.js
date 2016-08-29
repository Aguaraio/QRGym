import React, {Component} from 'react';
import {View, Navigator, Text} from 'react-native';
import BarcodeScannerIOS from './BarcodeScannerIOS';
import ViewImage from './ViewImage';
import Login from './../Login';
import realm from './../Realm/User';

class App extends Component{
  constructor(props){
    super(props);
  }

  renderScene (route, navigator) {

      if (route.name === 'Login') {

        let isDone  = realm.objects('User').filtered('done = true');

        if(isDone.length == 0){

          return <Login navigator={navigator} {...route.passProps} />
        }else{

          return <BarcodeScannerIOS navigator={navigator} {...route.passProps} />
        }


      }
      if (route.name === 'BarcodeScanner') {
        return <BarcodeScannerIOS navigator={navigator} {...route.passProps} />
      }
      if (route.name === 'ViewImage') {
        return <ViewImage navigator={navigator} {...route.passProps} />
      }
    }

    configureScene (route) {
      return Navigator.SceneConfigs.VerticalDownSwipeJump
    }

    render () {
      return (
        <Navigator
          configureScene={this.configureScene.bind(this)}
          style={{ flex: 1, backgroundColor: 'white' }}
          initialRoute={{ name: 'Login' }}
          renderScene={this.renderScene.bind(this)} />
      );
    }
}

export default App
