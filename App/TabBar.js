import React, {Component} from 'react';
import {TabBarIOS, View, StyleSheet, Navigator} from 'react-native';
import BarcodeScannerIOS from './BarcodeScannerIOS';
import ViewImage from './ViewImage';
import UserProfile from './UserProfile';
import realm from './../Realm/User';
import Login from  './../Login';
import Modal from './Modal';
var showModal = false;
class TabBar extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'barcodeTab'
    };
    this._selectProfile = this._selectProfile.bind(this);
    this._selectBarcode = this._selectBarcode.bind(this);
    this._selectViewImage = this._selectViewImage.bind(this);
    this._setShowModal = this._setShowModal.bind(this);
  }

  _selectProfile(){
    this.setState({
      selectedTab: 'profileTab',
    });
  }

  _selectBarcode(){
    this.setState({
      selectedTab: 'barcodeTab',
    });
  }

  _setShowModal(){
    showModal = true;
  }

  _selectViewImage(){
    this.setState({
      selectedTab: 'viewTab',
    });
  }

  render(){
    return (
              <TabBarIOS
                unselectedTintColor="yellow"
                tintColor="white"
                barTintColor="darkslateblue">

                <TabBarIOS.Item
                  icon={{url:''}}
                  title="Profile"
                  selected={this.state.selectedTab === 'profileTab'}
                  onPress={this._selectProfile}>
                  <View>
                    <UserProfile/>
                    <Login fbButton={this._selectBarcode} showModal={this._setShowModal}/>
                  </View>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                  icon={{url:''}}
                  title="Barcode"
                  selected={this.state.selectedTab === 'barcodeTab'}
                  onPress={this._selectBarcode}>
                  <BarcodeScannerIOS source={this.showModal}/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                  icon={{url:''}}
                  title="ViewImage"
                  selected={this.state.selectedTab === 'viewTab'}
                  onPress={this._selectViewImage}>
                  <ViewImage/>
                </TabBarIOS.Item>

              </TabBarIOS>
            );
          }

}
const styles = StyleSheet.create({
  greenTab:{
    flex: 1,
    backgroundColor: 'green'
  },
  redTab:{
      flex: 1,
    backgroundColor: 'red'
  },
  blueTab:{
      flex: 1,
    backgroundColor: 'blue'
  }
})

export default TabBar
