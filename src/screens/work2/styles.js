import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default StyleSheet.create({
  kutu: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.1,
    backgroundColor: '#EDEDED',
  },
  kutuAyar: {
    marginLeft: windowWidth * 0.1,
    marginBottom: windowWidth * 0.03,
  },
  picker: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.1,
  },
  kayit: {
    alignItems: 'center',
    marginTop: windowWidth * 0.08,
  },
  kayittext: {
    fontSize: windowWidth * 0.06,
    fontWeight: '600',
    color: 'black',
  },
  pickercerceve: {
    borderWidth: windowWidth * 0.002,
    width: windowWidth * 0.8,
    justifyContent: 'center',
    borderRadius: windowWidth * 0.03,
  },
  cizgi: {
    height: windowWidth * 0.0001,
    backgroundColor: '#EDEDED',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: windowWidth * 0.05,
    marginTop: windowWidth * 0.03,
  },
  roltext: {
    marginLeft: windowWidth * 0.03,
    fontSize: windowWidth * 0.035,
    fontWeight: '600',
    color: 'black',
  },
  bioContainer: {marginLeft: windowWidth * 0.1},
  label: {
    marginLeft: windowWidth * 0.03,
    fontSize: windowWidth * 0.035,
    fontWeight: '600',
    color: 'black',
  },
  bioInput: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.3,
    borderWidth: windowWidth * 0.002,
    borderRadius: windowWidth * 0.03,
    marginBottom: windowWidth * 0.01,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    marginRight: windowWidth * 0.1,
  },
  buton: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.1,
    borderWidth: windowWidth * 0.002,
    borderRadius: windowWidth * 0.02,
    marginTop: windowWidth * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kayitbutton: {
    fontSize: windowWidth * 0.04,
    fontWeight: '600',
    color: 'black',
  },
  girisbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  giristext: {
    fontSize: windowWidth * 0.04,
    color: 'black',
    fontWeight: '500',
  },
  kayitlitext: {
    fontSize: windowWidth * 0.035,
  },
  showPasswordText: {},
  resim: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
  },
  buttonpasswordshow: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: windowWidth * 0.1,
    top: windowWidth * 0.05,
  },
});
