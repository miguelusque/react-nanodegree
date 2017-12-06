import React from 'react';
import { Text, View } from 'react-native';

export default class Decks extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Decks</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
