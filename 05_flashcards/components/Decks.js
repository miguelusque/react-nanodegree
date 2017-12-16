import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AppLoading} from 'expo';
import {setDecks as setDecksToStore} from '../actions';
import {fetchDecks as fetchDecksFromStorage} from '../utils/api';
import {white, gray} from '../utils/colors';

class Decks extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  state = {
    isDataLoaded: false
  };

  componentDidMount() {
    fetchDecksFromStorage()
      .then((decks) => this.props.dispatch(setDecksToStore(decks)))
      .then(() => this.setState({isDataLoaded: true}));
  }

  render() {
    const {decks} = this.props;

    // Display AppLoading while the data is being loaded
    if (this.state.isDataLoaded === false) {
      return <AppLoading/>;
    }

    // Display a message when no decks have been added yet
    if (Object.keys(decks).length === 0 && decks.constructor === Object) {
      return (
        <View style={styles.item}>
        <Text style={styles.noDataText}>You didn‘t add any deck yet.</Text>
        <Text>Press ‘New Deck’ to create your first deck.</Text>
      </View>
      );
    }

    // Display the decks
    return (
      <View style={{flex:1}}>
        {Object.keys(decks).map((deck) => (
          <View style={styles.item} key={deck}>
            <TouchableOpacity onPress={() =>
              this.props.navigation.navigate('DeckDetails', {deckTitle: decks[deck].title})}>
              <Text style={{fontSize: 20, textAlign: 'center'}}>
                {decks[deck].title}
              </Text>
              <Text style={{fontSize: 16, textAlign: 'center', color: gray}}>
                {decks[deck].questions.length} card
                {decks[deck].questions.length === 1 ? '' : 's'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop : 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {width: 0, height: 3}
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
});

const mapStateToProps = (state) => ({decks: state});

export default connect(mapStateToProps)(Decks);
