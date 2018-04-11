/* eslint-disable global-require */
import React from 'react';
import {
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  View,
  ActivityIndicator,
  Alert,
  ToastAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../Common/SuperText';
import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';
import styles from './styles';
import propTypes from './propTypes';
import BaseClass from './BaseClass';

const iconStyles = {
  borderRadius: 20,
  paddingLeft: 20,
  paddingRight: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  iconStyle: {
    display: 'flex',
    alignItems: 'center',
  },
};

class User extends BaseClass {
  static navigationOptions = () => ({
    title: 'Login',
    header: null,
  });

  state = {
    registerMode: false,
    disabled: true,
    isLoading: false,
    loginUser: {
      email: '',
      password: '',
    },
    registerUser: {
      displayName: '',
      email: '',
      password: '',
    },
  };

  componentDidMount = async () => {
    Linking.addEventListener('url', this.handleOpenURL);
    const url = await Linking.getInitialURL();
    if (url) {
      this.handleOpenURL({ url });
    }
  }

  componentWillReceiveProps = async ({ error }) => {
    if (error && error !== this.props.error) {
      if (Platform.OS === 'ios') {
        Alert.alert(error);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          error,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          50,
        );
      }
    }
  }

  componentWillUnmount = () => {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  render() {
    const {
      registerMode, registerUser, loginUser, disabled,
    } = this.state;
    const user = registerMode ? registerUser : loginUser;
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="never"
      >
        <Image
          style={styles.image}
          source={require('../../images/bucketlist_front.jpg')}
        />
        <Image
          style={styles.logo}
          source={require('../../assets/icons/icon.png')}
        />
        {
          registerMode &&
          <TextInput
            ref={(element) => { this.DisplayName = element; }}
            defaultValue={user.displayName}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.input}
            placeholderTextColor="#eee"
            onChangeText={value => this.onChange('displayName', value)}
            placeholder="full name"
            returnKeyType="next"
            onSubmitEditing={() => {
              this.Email.focus();
            }}
          />}
        <TextInput
          ref={(element) => { this.Email = element; }}
          autoCapitalize="none"
          keyboardType="email-address"
          defaultValue={user.email}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          onChangeText={value => this.onChange('email', value)}
          placeholder="example@me.com"
          returnKeyType="next"
          onSubmitEditing={() => {
            this.Password.focus();
          }}
        />
        <TextInput
          ref={(element) => { this.Password = element; }}
          defaultValue={user.password}
          underlineColorAndroid="rgba(0,0,0,0)"
          style={styles.input}
          placeholderTextColor="#eee"
          secureTextEntry
          onChangeText={value => this.onChange('password', value)}
          placeholder="password"
          returnKeyType={registerMode ? 'next' : 'done'}
          onSubmitEditing={() => (registerMode ? this.Confirm.focus() : null)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onSubmit}
          disabled={disabled}
        >
          {
            this.props.currentApiCalls > 0 ?
              <ActivityIndicator color="#fff" size="large" /> :
              <Text style={styles.buttonText}>Sign {registerMode ? 'up' : 'in'}</Text>
          }
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={this.onToggle}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>
            {registerMode ? 'Already a member?' : 'Need an account? Sign up'}
          </Text>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={this.loginWithFacebook}
            {...iconStyles}
          >
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </Icon.Button>
          <Icon.Button
            name="google"
            backgroundColor="#DD4B39"
            onPress={this.loginWithGoogle}
            {...iconStyles}
          >
            <Text style={styles.buttonText}>Continue with Google</Text>
          </Icon.Button>
        </View>
      </ScrollView>
    );
  }
}

User.propTypes = propTypes;

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...userActions, ...navigationActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
