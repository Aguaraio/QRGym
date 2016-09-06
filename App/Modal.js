import React, {Component} from 'react';
import {Modal, View, Image, StyleSheet, Dimensions} from 'react-native';
import Login from './../Login';
import realm from './../Realm/User';

let windowHeight = Dimensions.get('window').height;
let windowWidth = Dimensions.get('window').width;

class ModalFB extends Component{
  constructor(props){
    super(props);
    this.state={
      modalVisible: false,
      transparent:true,
    };
    this._setModalVisible = this._setModalVisible.bind(this);
    this._validarLogin = this._validarLogin.bind(this);
  }

  propTypes:{
    source: React.propTypes.bool;
  }

  _setModalVisible(visible){
      this.setState({modalVisible: visible});
   }

  _validarLogin(){
       let isDone  = realm.objects('User').filtered('done = true');
       if(isDone.length == 0){
         this._setModalVisible(true);
       }else{
         this._setModalVisible(false);
       }
   }

   componentWillMount(){
     this._validarLogin();
   }

  render(){
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };
    return(

      <Modal
        animationType='slide'
        transparent={this.state.transparent}
        visible={this.state.modalVisible}

        >
        <View style={[styles.container, modalBackgroundStyle]}>
          <Image source={require('./../img/gym-wallpaper.jpg')} style={{width:windowWidth, height:windowHeight}}>
          <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
            <Login onPressFB={this._setModalVisible.bind(this)}/>
          </View>
        </Image>
        </View>
      </Modal>
    );
  }

  componentWillReceiveProps(modalVisible){
    this._validarLogin();
    //this._setModalVisible(modalVisible);
  };


}

const styles = StyleSheet.create({
  iButton: {
    flexDirection:'row',
    position:'relative',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,

  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    marginTop: windowHeight * .4
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
  //  overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
  statusBar: {
    position:'relative',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: windowHeight * .7

  },
  });

export default ModalFB
