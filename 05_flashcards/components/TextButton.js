import React from 'react';
import {Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {purple} from '../utils/colors';

const TextButton = ({children, onPress, style={}}) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={[styles.reset, style]}>{children}</Text>
  </TouchableOpacity>
);

TextButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
    borderRadius: Platform.OS === 'ios' ? 16 : 6,
    borderColor: purple,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop : 15,
    width: 160,
    padding: 10
  }
});

export default TextButton;
