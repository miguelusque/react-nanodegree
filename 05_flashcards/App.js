import React from 'react';
import {View, Platform, StatusBar as NativeStatusBar} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Constants} from 'expo';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {purple, white} from './utils/colors';
import AddDeck from './components/AddDeck';
import DeckDetails from './components/DeckDetails';
import Decks from './components/Decks';
import reducer from './reducers';

const StatusBar = ({backgroundColor, ... props}) => (
  <View style={{backgroundColor, height: Constants.statusBarHeight}}>
    <NativeStatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>
);

StatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};

const Tabs = TabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({tintColor}) => <MaterialIcons name='library-books' size={30}
        color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      // eslint-disable-next-line react/display-name, react/prop-types
      tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30}
        color={tintColor}/>
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {width: 0, height: 3},
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {backgroundColor: purple}
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <StatusBar backgroundColor={purple} barStyle='light-content'/>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}
