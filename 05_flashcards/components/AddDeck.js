import React from 'react';
import {Text, TextInput, View, KeyboardAvoidingView,  StyleSheet,
  Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import {addDeck} from '../actions';
import {black, red} from '../utils/colors';

class AddDeck extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  state = {
    deckTitle: '',
    displayNoTitleMessage: false
  }

  submit = () => {
    const deckTitle = this.state.deckTitle.trim();
    if (deckTitle.length == 0) {
      this.setState({displayNoTitleMessage: true});
      return;
    }

    const deck = {
      [deckTitle]: {
        title: deckTitle,
        questions: []
      }
    };

    // Add deck to store, clear input box and navigate back
    Promise.resolve(this.props.dispatch(addDeck(deck)))
      .then(() => this.setState({deckTitle: ''}))
      .then(() => this.props.navigation.goBack());

      //TODO: TBD
    // clearLocalNotification()
    //   .then(setLocalNotification);
  };

  validateInput = (deckTitle) => {
    deckTitle = deckTitle.replace(/[^\w\s\?\!]/gi, '');
    this.setState({
      deckTitle: deckTitle,
      displayNoTitleMessage: false
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>What is the title of your new deck?</Text>
        <TextInput style={styles.input}
          placeholder='Deck Title'
          value={this.state.deckTitle}
          onChangeText={this.validateInput}/>
        {this.state.displayNoTitleMessage &&
          <Text style={styles.errorMessage}>
            Deck title cannot be empty
          </Text>
        }

        <View style={{alignItems: 'center'}}>
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
  },
  errorMessage: {
    textAlign: 'center',
    color: red,
    marginTop: 15
  }
});

const mapStateToProps = (state) => ({decks: state});

export default connect(mapStateToProps)(AddDeck);
