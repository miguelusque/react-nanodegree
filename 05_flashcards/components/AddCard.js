import React from 'react';
import {Text, TextInput, View, KeyboardAvoidingView,  StyleSheet,
  Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import {addCard} from '../actions';
import {black, red} from '../utils/colors';

class AddCard extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    question: '',
    answer: '',
    displayNoQuestionMessage: false,
    displayNoAnswerMessage: false
  }

  submit = () => {
    const question = this.state.question.trim();
    if (question.length == 0) {
      this.setState({displayNoQuestionMessage: true});
      return;
    }

    const answer = this.state.answer.trim();
    if (answer.length == 0) {
      this.setState({displayNoAnswerMessage: true});
      return;
    }

    // Add card to store and navigate back
    const deckTitle = this.props.navigation.state.params.deckTitle;
    const card = {question: question, answer: answer};
    Promise.resolve(this.props.dispatch(addCard(deckTitle, card)))
      .then(() => this.props.navigation.goBack());
  }

  validateQuestion = (question) => {
    this.setState({
      question: question,
      displayNoQuestionMessage: false
    });
  };

  validateAnswer = (answer) => {
    this.setState({
      answer: answer,
      displayNoAnswerMessage: false
    });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <TextInput style={styles.input}
          placeholder='Please enter a question'
          value={this.state.question}
          onChangeText={this.validateQuestion}/>
        {this.state.displayNoQuestionMessage &&
          <Text style={styles.errorMessage}>
            This field cannot be empty.{'\n'}Please enter a question
          </Text>
        }
        <TextInput style={styles.input}
          placeholder='Please enter the answer'
          value={this.state.answer}
          onChangeText={this.validateAnswer}/>
        {this.state.displayNoAnswerMessage &&
          <Text style={styles.errorMessage}>
            This field cannot be empty.{'\n'}Please enter the answer
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
    padding: 10
  },
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

export default connect(mapStateToProps)(AddCard);
