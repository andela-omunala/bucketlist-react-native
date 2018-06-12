import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    height: 100,
    width: 100,
  },
  logoWrapper: {
    height: 150,
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    padding: 25,
    overflow: 'hidden',
    zIndex: 1,
  },
  logoContainer: {
    height: 150,
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.5)',
    overflow: 'hidden',
    zIndex: 1,
  },
  title: {
    position: 'absolute',
    top: '20%',
    textAlign: 'center',
    width: '100%',
    color: '#00bcd4',
    fontFamily: 'Chalkduster',
    fontSize: 50,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});
