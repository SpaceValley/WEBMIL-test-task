import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import SinglePostScreen from './screens/SinglePostScreen';

const NavigationRoot = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  SinglePostScreen: {
    screen: SinglePostScreen,
  },
});

export default createAppContainer(NavigationRoot);
