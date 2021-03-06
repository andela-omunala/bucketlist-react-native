import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Text from '../../../Common/SuperText';
import styles from '../styles';

const TabIcon = ({ navigation: { state }, counts, navigate: navigateTabs }) => {
  const { routes } = state;

  const names = {
    HomeBucketlists: 'home',
    Messages: 'message',
    UserAlerts: 'person-add',
    Notifications: 'notifications',
  };

  const activeTintColor = '#00bcd4';
  const inactiveTintColor = 'gray';

  return (
    <View style={styles.tabBarOptions}>
      {routes &&
        routes.map((route, index) => {
          const focused = index === state.index;
          const tintColor = focused ? activeTintColor : inactiveTintColor;
          const count = counts[route.routeName];
          return (
            <TouchableWithoutFeedback
              key={route.key}
              styles={styles.tab}
              onPress={() =>
                navigateTabs({
                  route: route.routeName,
                  navigator: 'HomeTabNav',
                })
              }
            >
              <View style={styles.counter}>
                <Icon
                  name={names[route.routeName]}
                  size={focused ? 25 : 20}
                  color={tintColor}
                  containerStyle={styles.tabIcon}
                />
                {count > 0 && <Text style={styles.badgeElement}>{count}</Text>}
              </View>
            </TouchableWithoutFeedback>
          );
        })}
    </View>
  );
};

TabIcon.propTypes = {
  navigate: PropTypes.func.isRequired,
  counts: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          routeName: PropTypes.string,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default TabIcon;
