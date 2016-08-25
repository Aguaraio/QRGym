import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Vibration,
  View,
  TouchableHighlight,
  Image,
  Dimensions
} from 'react-native';
//import {Actions} from 'react-native-router-flux';
import Camera from 'react-native-camera';
import ViewImage from './ViewImage';
import realm from './../Realm/User';
//import TimerMixing from 'react-timer-mixin';

let windowHeight = Dimensions.get('window').height

var qrString = '';
var sendCode = false;
class BarcodeScannerApp extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.temp,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.portrait,
        flashMode: Camera.constants.FlashMode.off,
        barCodeType: 'org.iso.QRCode'
      },
      barcode:''
    };
  }

  _closeModal(){
    this.props.navigator.pop(); //REVISAR BIEN ACá
    qrString = '';
  }

  _gotoFBbutton(){
    realm.write(()=>{
      realm.create('User',{
        id: 1,
        done: false
      }, true);
    });

    this.props.navigator.pop();
  }

  barcodeReceived(e) {
    if (e.data !== qrString && e.type == this.state.camera.barCodeType && sendCode )
    {

      Vibration.vibrate();

      this.props.navigator.push({
            name: 'ViewImage',
            passProps: {
              closeModal: this._closeModal,
              gotoFBbutton : this._gotoFBbutton,
              source:e.data
            }
          });
      qrString = e.data;
    }
  }

  _sendCodeIn(){
    return sendCode = true;
  }
  _sendCodeOut(){
    return sendCode = false;
  }
  _renderCamera(){
    return(
        <View style={styles.container}>
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            style={{flex:1}}
            onBarCodeRead={this.barcodeReceived.bind(this)}
            torchMode={this.state.torchMode}
            cameraType={this.state.cameraType}
            viewFinderHeight={this.state.viewFinderHeight}
            viewFinderWidth={this.state.viewFinderWidth}>

            <View style={styles.statusBar}>
              <TouchableHighlight style={styles.button}
                underlayColor='transparent'
                onLongPress={this._sendCodeIn.bind(this)}
                onPressOut={this._sendCodeOut.bind(this)}>
                  <Image source={require('./../img/SnapButton.png')}/>
              </TouchableHighlight>
            </View>

          </Camera>

        </View>

    );
  }

  render() {
    return (
      this._renderCamera()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    position:'relative',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: windowHeight * .7

  },
  statusBarText: {
    fontSize: 20,
  },

  });

export default BarcodeScannerApp
