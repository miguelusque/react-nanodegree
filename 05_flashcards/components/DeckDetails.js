import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import TextButton from './TextButton';
import {gray, black, white} from '../utils/colors';

export default class DeckDetails extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.deck.title
    };
  }

  addCard = () => (
    true
  );

  submit = () => (
    true
  );
  render() {
    const {deck} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{deck.title}</Text>
        <Text style={styles.details}>
          {deck.questions.length} card
          {deck.questions.length === 1 ? '' : 's'}
        </Text>

        <TextButton style={{borderColor: black, backgroundColor: white}}
          color={black} onPress={this.addCard}>
            Add Card
        </TextButton>

        <TextButton style={{borderColor: black, backgroundColor: black}}
          color={white} onPress={this.submit}>
            Start Quiz
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    textAlign: 'center',
    fontSize: 40,
    paddingTop: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 12
  },
  details: {
    fontSize: 24,
    marginBottom: 100,
    textAlign: 'center',
    color: gray
  }
});
