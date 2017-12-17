import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {StackNavigator} from 'react-navigation';
import PropTypes from 'prop-types';
import AddCard from './AddCard';
import Quiz from './Quiz';
import TextButton from './TextButton';
import {gray, black, white, red} from '../utils/colors';

class DeckDetails extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    decks: PropTypes.object.isRequired
  }

  state = {
    displayEmptyDeckMessage: false
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.state.params.deckTitle
    };
  }

  addCard = (deckTitle) => {
    this.setState({displayEmptyDeckMessage: false});
    this.props.navigation.navigate('AddCard', {deckTitle: deckTitle});
  };

  startQuiz = (deckTitle) => {
    if (this.props.decks[deckTitle].questions.length === 0) {
      this.setState({displayEmptyDeckMessage: true});
    } else {
      this.props.navigation.navigate('Quiz', {deckTitle: deckTitle});
    }
  };

  render() {
    const {deckTitle} = this.props.navigation.state.params;
    const {decks} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>{deckTitle}</Text>
        <Text style={styles.details}>
          {decks[deckTitle].questions.length} card
          {decks[deckTitle].questions.length === 1 ? '' : 's'}
        </Text>
        <TextButton style={{borderColor: black, backgroundColor: white}}
          color={black} onPress={() => this.addCard(deckTitle)}>
            Add Card
        </TextButton>
        <TextButton style={{borderColor: black, backgroundColor: black}}
          color={white} onPress={() => this.startQuiz(deckTitle)}>
            Start Quiz
        </TextButton>
        {this.state.displayEmptyDeckMessage &&
          <Text style={styles.errorMessage}>Deck is empty!</Text>
        }
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
  },
  errorMessage: {
    textAlign: 'center',
    color: red,
    marginTop: 15
  }
});

const mapStateToProps = (decks) => ({ decks });
const DeckDetailsNavigator = StackNavigator({
  Home: {
    screen: connect(mapStateToProps)(DeckDetails),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTitle: 'Add card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTitle: 'Quiz'
    }
  },

}, {headerMode: 'none'});

export default DeckDetailsNavigator;
