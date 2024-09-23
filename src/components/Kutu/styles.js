import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  kutu: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.1,
    borderWidth: windowWidth * 0.002,
    borderRadius: windowWidth * 0.03,
    marginBottom: windowWidth * 0.03,
  },
  ayarla: {
    marginLeft: windowWidth * 0.1,
  },
  ayarfont: {
    marginLeft: windowWidth * 0.03,
    fontSize: windowWidth * 0.035,
    fontWeight: '600',
    color: 'black',
  },
});
