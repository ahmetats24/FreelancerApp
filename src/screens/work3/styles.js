import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  hosgelginiz: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: windowWidth * 0.1,
  },
  hosgelginiztext: {
    fontSize: windowWidth * 0.05,
    color: 'black',
    fontWeight: '500',
  },
  kutu: {
    width: windowWidth * 0.85,
    height: windowWidth * 0.12,
    borderWidth: windowWidth * 0.002,
    marginBottom: windowWidth * 0.03,
    borderRadius: windowWidth * 0.01,
  },
  kutuortala: {
    alignItems: 'center',
    marginBottom: windowWidth * 0.05,
  },
  butonstil: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: windowWidth * 0.05,
  },
  buton: {
    width: windowWidth * 0.85,
    height: windowWidth * 0.1,
    backgroundColor: '#2C98F0',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWidth * 0.009,
  },
  butontext: {
    fontSize: windowWidth * 0.035,
    fontWeight: '600',
    color: 'white',
  },
  ortabaslik: {
    fontSize: windowWidth * 0.07,
    color: '#2C3E50',
    fontWeight: '400',
  },
  gorevortala: {
    alignItems: 'center',
    marginBottom: windowWidth * 0.02,
  },
  taskkutu: {
    width: windowWidth,
    height: windowWidth * 0.32,
    backgroundColor: '#FFFFFF',
    marginBottom: windowWidth * 0.005,
    //borderColor: '#BDC3C7',
    //borderWidth: windowWidth * 0.001,
    shadowColor: '#BDC3C7',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
    borderRadius: windowWidth * 0.03,
  },
  taskortala: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.15,
    height: windowWidth * 0.32,
    borderRadius: windowWidth * 0.03,
    marginLeft: windowWidth * 0.03,
    marginRight: windowWidth * 0.02,
  },
  namestil: {
    fontSize: windowWidth * 0.05,
    color: '#2C3E50 ',
    fontWeight: '500',
  },
  descriptionsstil: {
    fontSize: windowWidth * 0.04,
    color: '#7F8C8D',
    fontWeight: '400',
    paddingLeft: windowWidth * 0.03,
  },
  yazilar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: windowWidth * 0.015,
    marginBottom: windowWidth * 0.02,
  },
  timestil: {
    alignItems: 'center',
    marginRight: windowWidth * 0.08,
  },
  descalan: {
    width: windowWidth * 0.78,
    height: windowWidth * 0.1,
  },
});
