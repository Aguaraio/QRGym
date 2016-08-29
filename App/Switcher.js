import React, {Component} from 'react';
import {Image, View, Text, Dimensions,TouchableHighlight,StyleSheet,Modal} from 'react-native';
//import BulkingModel from './../Realm/Bulking';
let windowWidth = Dimensions.get('window').width
let windowHeight = Dimensions.get('window').height
var ReturnedStr = '';
class Switcher extends Component{
  constructor(props){
    super(props);
    this.state={modalVisible:false,
                transparent: true};
  }
  
  propTypes:{
    source: React.propTypes.string
  }

 _setModalVisible(visible){
     this.setState({modalVisible: visible});
  }

  _renderSwitcher(){
    switch (this.props.source) {
      case 'cable-bicep-exercises':
            ReturnedStr = require('./../img/cable-bicep-exercises.gif');
        break;
      case 'curvy-bench-press':
          ReturnedStr = require('./../img/curvy-bench-press.gif');
        break;
      case 'curvy-leg-curls':
          ReturnedStr = require('./../img/curvy-leg-curls.gif');
        break;
      case 'curvy-women-back-exercises':
          ReturnedStr = require('./../img/curvy-women-back-exercises.gif');
        break;
      case 'curvy-women-leg-exercises':
          ReturnedStr = require('./../img/curvy-women-leg-exercises.gif');
        break;
        case 'decline-bench-press':
          ReturnedStr = require('./../img/decline-bench-press.gif');
          break;
          case 'dumbbell-exercises':
              ReturnedStr = require('./../img/dumbbell-exercises.gif');
            break;
            case 'giphy':
                ReturnedStr = require('./../img/giphy.gif');
              break;
      default:
          ReturnedStr = '';
    }
  }

  render(){
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };
    this._renderSwitcher();
    return(
      <View>
            <Image source={ReturnedStr} style={{width: windowWidth-8, height: windowWidth-8}}>
                <View style={styles.iButton}>
                    <TouchableHighlight onPress={() => {this._setModalVisible(!this.state.modalVisible)}} >
                        <Image source={require('./../img/iButton.png')} style={{width: 30, height: 30}}/>
                    </TouchableHighlight>
                </View>
            </Image>

              <Modal
                animationType='slide'
                transparent={this.state.transparent}
                visible={this.state.modalVisible}
                onRequestClose={() => {this._setModalVisible(false)}}
                >
                <View style={[styles.container, modalBackgroundStyle]}>
                  <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                    <Text>PUTO EL QUE LEE</Text>
                    <Button
                      onPress={this._setModalVisible.bind(this, false)}
                      style={styles.modalButton}>
                      Close
                    </Button>
                  </View>
                </View>
              </Modal>
      </View>
    );
  }
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
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
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
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});
export default Switcher
