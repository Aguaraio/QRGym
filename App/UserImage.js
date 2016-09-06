import React, {Component} from 'react';
import {Image, View} from 'react-native';
import realm from './../Realm/User';

class UserImage extends Component{
  propTypes:{
    source: React.propTypes.source
  }
  render(){
    result = realm.objects('FBUser').filtered('id=1')
    this.userPicture = result[0].picture
    console.log(this.props.source);
    return(
      <View>
      <Image source={{uri:this.props.source}} style={{width:200, height:200}}/>
      </View>
    );
  }
}

export default UserImage;
