import {
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    backgroundColor: '#fff',
    width,
    paddingHorizontal: 20,
    paddingBottom: 10,
    overflow: 'scroll',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Platform.OS === 'ios' ? '#00bcd4' : 'grey',
    display: 'flex',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  hr: {
    borderBottomColor: Platform.OS === 'android' ? 'grey' : '#00bcd4',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  input: {
    display: 'flex',
    color: 'grey',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 3,
    marginTop: 2,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: Platform.OS === 'ios' ? 5 : 0,
    backgroundColor: Platform.OS === 'ios' ? '#f9f9f9' : 'transparent',
  },
  category: {
    display: 'flex',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 3,
    marginTop: 2,
    padding: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderBottomColor: '#00bcd4',
  },
  categoryAndroid: {
    borderWidth: 0.5 + StyleSheet.hairlineWidth,
    borderBottomColor: '#00bcd4',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    height: 30,
  },
  buttonText: {
    display: 'flex',
    fontSize: 12,
    fontWeight: '600',
    color: Platform.OS === 'ios' ? '#fff' : '#00bcd4',
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    color: Platform.OS === 'ios' ? '#fff' : 'grey',
  },
  button: {
    display: 'flex',
    borderRadius: 5,
    flexDirection: 'row',
    backgroundColor: Platform.OS === 'ios' ? '#00bcd4' : 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 5,
  },
  cancelButton: {
    display: 'flex',
    backgroundColor: Platform.OS === 'ios' ? 'grey' : 'transparent',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#f7f7f7',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    paddingHorizontal: 20,
  },
  divider: {
    display: 'flex',
    backgroundColor: '#00bcd4',
  },
  grey: {
    display: 'flex',
    color: Platform.OS === 'ios' ? 'grey' : '#00bcd4',
    fontSize: 12,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  uploading: {
    fontSize: 16,
  },
  flexOne: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  imageWrapper: {
    marginTop: 10,
    height: 80,
    width: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  plusSign: {
    display: 'flex',
    backgroundColor: '#ccc',
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 80,
    width: 80,
    height: 80,
  },
  image: {
    flexGrow: 1,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: 80,
    bottom: 0,
    height: 20,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
});