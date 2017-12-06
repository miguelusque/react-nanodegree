import React from 'react';
import { Text, View, StatusBar as NativeStatusBar } from 'react-native';
import PropTypes from 'prop-types';
import {Constants} from 'expo';
import {purple} from './utils/colors';


const StatusBar = ({backgroundColor, ... props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <NativeStatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

StatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={purple} barStyle='light-content'/>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}
