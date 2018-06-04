import {
  StyleSheet,
  Platform,
} from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    paddingHorizontal: 10,
    paddingBottom: 10,
    overflow: 'scroll',
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    borderRadius: 5,
    overflow: 'scroll',
    backgroundColor: '#fff',
  },
  scrollWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    overflow: 'scroll',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Platform.OS === 'ios' ? '#00bcd4' : 'grey',
    display: 'flex',
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  hr: {
    display: 'flex',
    margin: 5,
    borderBottomColor: '#00bcd4',
    borderBottomWidth: 1,
  },
  input: {
    display: 'flex',
    color: 'grey',
    fontWeight: '600',
    fontSize: 14,
    marginHorizontal: 0,
    marginBottom: 3,
    marginTop: 2,
    padding: 5,
    borderRadius: Platform.OS === 'ios' ? 5 : 0,
    backgroundColor: Platform.OS === 'ios' ? '#f9f9f9' : 'transparent',
  },
  category: {
    display: 'flex',
    marginHorizontal: 0,
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
    fontSize: 14,
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
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 5,
  },
  divider: {
    display: 'flex',
    backgroundColor: '#00bcd4',
  },
  grey: {
    display: 'flex',
    color: Platform.OS === 'ios' ? 'grey' : '#00bcd4',
    fontSize: 14,
    paddingHorizontal: 5,
    marginTop: 10,
  },
  uploading: {
    fontSize: 14,
  },
  flexOne: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#00bcd4',
    paddingHorizontal: 5,
    paddingBottom: 5,
    overflow: 'scroll',
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
    fontSize: 14,
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
  saveButtonText: {
    display: 'flex',
    fontSize: 14,
    fontWeight: '600',
    color: Platform.OS === 'ios' ? '#fff' : '#00bcd4',
    backgroundColor: 'transparent',
  },
  calendar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  checkbox: {
    display: 'flex',
    marginTop: 10,
  },
  dateButton: {
    display: 'flex',
    borderRadius: 5,
    backgroundColor: '#f7f7f7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  flex1: {
    flex: 1,
  },
  listView: {
    borderRadius: 5,
    backgroundColor: '#f7f7f7',
  },
  poweredContainer: {
    display: 'none',
  },
  textInputContainer: {
    display: 'flex',
    marginHorizontal: 0,
    marginTop: 2,
    marginBottom: -15,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    display: 'flex',
    flex: 1,
    color: 'grey',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 5,
    borderRadius: 0,
    paddingVertical: 5,
    paddingHorizontal: 0,
    left: -5,
    right: -5,
    fontFamily: 'Roboto',
    borderBottomWidth: 0,
    borderBottomColor: '#00bcd4',
  },
  description: {
    fontWeight: 'bold',
    color: 'grey',
  },
});