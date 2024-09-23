import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
const Kutu = props => {
  const {
    isim,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType,
    label,
  } = props;
  return (
    <View style={styles.ayarla}>
      <View>
        <Text style={styles.ayarfont}>{isim}</Text>
      </View>
      <View>
        <TextInput
          style={styles.kutu}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

export default Kutu;
