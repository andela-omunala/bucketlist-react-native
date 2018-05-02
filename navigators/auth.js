import { StackNavigator } from 'react-navigation';

import User from '../components/User';
import Drawer from '../components/Drawer';
import Splash from '../components/Splash';
import Intro from '../components/Intro';

const authScreens = {
  splash: {
    screen: Splash,
  },
  user: {
    screen: User,
  },
  home: {
    screen: Drawer,
  },
  intro: {
    screen: Intro,
  },
};

export default initialRouteName => StackNavigator(authScreens, {
  initialRouteName,
  navigationOptions: {
    header: null,
    gesturesEnabled: false,
  },
});
