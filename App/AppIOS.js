import React, {Component} from 'react';
import {View, Navigator, Text} from 'react-native';
import BarcodeScannerIOS from './BarcodeScannerIOS';
import ViewImage from './ViewImage';
import Login from './../Login';
import UserProfile from './UserProfile';
import TabBar from './TabBar';
import realm from './../Realm/User';

class App extends Component{

  renderScene (route, navigator) {

      if (route.name === 'Login') {
        let isDone  = realm.objects('User').filtered('done = true');
        if(isDone.length == 0){
          return <Login navigator={navigator} {...route.passProps} />
        }else{
          return <TabBar navigator={navigator} {...route.passProps} />
        }
      }
      if (route.name === 'TabBar') {
        return <TabBar navigator={navigator} {...route.passProps}/>
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
          initialRoute={{ name: 'TabBar' }}
          renderScene={this.renderScene.bind(this)} />
      );
    }
}

export default App
