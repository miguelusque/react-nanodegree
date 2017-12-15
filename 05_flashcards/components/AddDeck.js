import React from 'react';
import {Text, TextInput, View, KeyboardAvoidingView,  StyleSheet,
  Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import TextButton from './TextButton';
import {addDeck} from '../actions';
import {addDeck as addDeckToStorage} from '../utils/api';
import {black, red} from '../utils/colors';

class AddDeck extends React.Component {
  state = {
    deckTitle: '',
    displayErrorMessage: false
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  };

  submit = () => {
    const deckTitle = this.state.deckTitle.trim();

    if (deckTitle.length == 0) {
      this.setState({displayErrorMessage: true});
      return;
    }

    const deck = {
      [deckTitle]: {
        title: deckTitle,
        questions: []
      }
    };

    // Add deck into AsyncStorage and then update store
    addDeckToStorage(deck)
      .then(() => this.props.dispatch(addDeck(deck)));

    this.setState(() => ({
      deckTitle: ''
    }));

    this.toHome();


    //TODO: TBD
    // clearLocalNotification()
    //   .then(setLocalNotification);
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}));
  };

  validateInput = (deckTitle) => {
    deckTitle = deckTitle.replace(/[^\w\s\?\!]/gi, '');
    this.setState({
      deckTitle: deckTitle,
      displayErrorMessage: false
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}
        behavior="padding">
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <TextInput style={styles.input}
          placeholder='Deck Title'
          value={this.state.deckTitle}
          onChangeText={this.validateInput}/>
        <View style={{alignItems: 'center'}}>
          {this.state.displayErrorMessage &&
          <Text style={{color:red, marginTop: 15}}>
            Deck title cannot be empty
          </Text>
          }
          <TextButton style={{borderColor: black, backgroundColor: black}}
            color={'white'} onPress={this.submit}>
            SUBMIT
          </TextButton>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  header: {textAlign: 'center', fontSize: 40},
  input: {
    height: 40,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop : 17,
    borderRadius: Platform.OS === 'ios' ? 16 : 4,
    borderColor: 'gray',
    borderWidth: 1,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {width: 0, height: 3}
  }
});

export default connect()(AddDeck);
