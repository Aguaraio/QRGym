import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
  Modal
} from 'react-native'
import Switcher from './Switcher';
import BulkingModel from './../Realm/User';
var viewGif = '';
var viewWeight = '';
var viewRepeat = '';

class ViewImage extends Component {
  constructor(props) {
    super(props);
  }
  propTypes:{
    source: React.propTypes.string
  }

  _RealmModel(){
    //Borramos todos los registros
    let AllBulking = BulkingModel.objects('Bulking');
    BulkingModel.write(() => {
      BulkingModel.delete(AllBulking);
    });

    let NewBulking;
    //Creamos uno nuevo
    BulkingModel.write(() => {
      NewBulking = BulkingModel.create('Bulking', {
        id:1,
        gifString: 'curvy-bench-press',
        weight: '50 k',
        repeat: '10 minutos'
      })
    });
    viewGif = NewBulking.gifString;
    viewWeight = NewBulking.weight;
    viewRepeat = NewBulking.repeat;
  }

  render () {

    this._RealmModel();

    return (
      <View style={styles.container}  >

        <View style={styles.gif}   >
          <Switcher source={viewGif}>
          </Switcher>
        </View>
        <View style={styles.details}>
          <Image source={require('./../img/Icon-Workout.png')} style={{width: 100, height: 100}}/>
          <Text>    {viewWeight}          </Text>
          <Image source={require('./../img/stopwach.png')} style={{width: 100, height: 100}}/>
          <Text>   {viewRepeat}   </Text>
        </View>
        <View style={styles.statusBar}>
          <TouchableHighlight  style={styles.statusBar}  underlayColor='transparent' onPress={this.props.closeModal.bind(this)}  >
            <Image source={require('./../img/BackButton.png')}/>
          </TouchableHighlight>
          <TouchableHighlight  style={styles.statusBarVolver}  underlayColor='transparent' onPress={this.props.gotoFBbutton.bind(this)}  >
            <Image source={require('./../img/BackButton.png')}/>
          </TouchableHighlight>
        </View>
      </View>
		);
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex:  1,
  },
  gif:{
    flex: .55,
    borderRadius: 1,
    borderWidth: 4,
    borderColor: '#8AB82D',
  },
  details:{
    flexDirection: 'row',
    flex: .20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBE9C0'
  },
  statusBar: {
    flex: .25,
    //position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    //left:90
  },
  statusBarVolver: {
    transform: [{rotate: '180deg'}],
    flex: .25,
    //position:'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    //left:90
  },
  statusBarText: {
    fontSize: 20,
  },
  iButton: {
    position:'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },

});

export default ViewImage
