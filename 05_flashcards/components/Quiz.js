import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import {red, green, white} from '../utils/colors';
import {clearLocalNotification, setLocalNotification} from '../utils/helpers';

class Quiz extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    decks: PropTypes.object.isRequired
  }

  state = {
    correctAnswers: 0,
    currentQuestion: 0,
    flipCard: false
  }

  updateScore = (score) => {
    const deck = this.props.decks[this.props.navigation.state.params.deckTitle];
    this.setState({
      correctAnswers: Math.max(0, this.state.correctAnswers + score),
      currentQuestion:
        Math.min(this.state.currentQuestion + 1, deck.questions.length),
      flipCard: false
    });
  }

  render() {
    const deck = this.props.decks[this.props.navigation.state.params.deckTitle];
    const {flipCard, currentQuestion} = this.state;

    // Display while the user have not answered all the questions
    if (currentQuestion < deck.questions.length) {
      return (
        <View style={styles.container}>
          <Text>
            {this.state.currentQuestion + 1} / {deck.questions.length}
          </Text>
          <View style={{justifyContent: 'space-around', flex: 1}}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.header}>
                {flipCard
                  ? deck.questions[currentQuestion].answer
                  : deck.questions[currentQuestion].question}
              </Text>
              <TextButton style={{borderWidth: 0}} color={red}
                onPress={() => this.setState({flipCard: !flipCard})}>
                {flipCard ? 'Question' : 'Answer'}
              </TextButton>
            </View>
            <View style={{alignItems: 'center'}}>
              <TextButton style={{borderColor: green, backgroundColor: green}}
                color={white} onPress={() => this.updateScore(+1)}>
                  Correct
              </TextButton>
              <TextButton style={{borderColor: red, backgroundColor: red}}
                color={white} onPress={() => this.updateScore(0)}>
                Incorrect
              </TextButton>
            </View>
          </View>
        </View>
      );
    }

    // Reset reminder for tomorrow
    clearLocalNotification().then(setLocalNotification);
    // Display results
    return (
      <View style={[styles.container, {paddingTop: 25}]}>
        <Text style={styles.header}>Score</Text>
        <Text style={{textAlign: 'center', paddingTop: 5}}>
          {this.state.correctAnswers} of {deck.questions.length} passed!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  header: {
    textAlign: 'center',
    fontSize: 40
  },
  answer: {
    paddingBottom: 15,
    textAlign: 'center'
  }
});

const mapStateToProps = (state) => ({decks: state});

export default connect(mapStateToProps)(Quiz);
