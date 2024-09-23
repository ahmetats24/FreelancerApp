import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ScrollView,
  Touchable,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import Kutu from '../../components/Kutu/Kutu';
import {show, hidden} from '../../assets/icons';

const loginPage = ({navigation}) => {
  const [selectedRole, setSelectedRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const maxBioLength = 3096;
  const [errorMessage, setErrorMessage] = useState(null);
  const handleRegister = async () => {
    if (
      !username ||
      !email ||
      !password ||
      !phoneNumber ||
      !selectedRole ||
      !surname
    ) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8000/api/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 4Jjz8nqGNzmyGIewK2VHk4GNhjaawA5aWcDPSUN2fd1f312e',
        },
        body: JSON.stringify({
          name: username,
          surname: surname,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log('API Response:', data); // API yanıtını incelemek için

      if (response.ok) {
        // Kayıt başarılı
        navigation.navigate('login'); // Giriş sayfasına yönlendir
      } else {
        // Hata durumunda e-posta kontrolü yap
        if (
          data &&
          data.message &&
          data.message.includes('email already exists')
        ) {
          Alert.alert('Hata', 'Bu e-posta adresi zaten kullanılıyor.');
        } else {
          Alert.alert(
            'Hata',
            data.message || 'Kayıt yapılamadı.Email kullaniliyor',
          );
        }
      }
    } catch (error) {
      console.log('Error:', error); // Hata detaylarını incelemek için
      Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.kayit}>
        <Text style={styles.kayittext}>Kayit Ol</Text>
      </View>
      <View style={styles.cizgi}></View>
      <Kutu
        isim="Isim*"
        value={username}
        onChangeText={setUsername}
        placeholder="Isminizi girin"
      />
      <Kutu
        isim="Soyisim*"
        value={surname}
        onChangeText={setSurname}
        placeholder="Soyisminizi girin"
      />
      <View style={styles.kutuAyar}>
        <View>
          <Text style={styles.roltext}>Rol*</Text>
        </View>
        <View style={styles.pickercerceve}>
          <Picker
            style={styles.picker}
            selectedValue={selectedRole}
            onValueChange={itemValue => setSelectedRole(itemValue)}>
            <Picker.Item label="Rol seçiniz..." value="" />
            <Picker.Item label="iOS Developer" value="iOS Developer" />
            <Picker.Item
              label="Full-stack Engineer"
              value="Full-stack Engineer"
            />
            <Picker.Item
              label="Frontend Developer"
              value="Frontend Developer"
            />
            <Picker.Item label="Backend Developer" value="Backend Developer" />
            <Picker.Item label="DevOps Engineer" value="DevOps Engineer" />
          </Picker>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Kutu
          isim="Sifre*"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          placeholder="Şifrenizi girin"
        />
        <TouchableOpacity
          style={styles.buttonpasswordshow}
          onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Image style={styles.resim} source={show} />
          ) : (
            <Image style={styles.resim} source={hidden} />
          )}
        </TouchableOpacity>
      </View>
      <Kutu
        isim="Telefon Numarasi*"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Telefon numaranızı girin"
        keyboardType="phone-pad"
      />
      <Kutu
        isim="E-mail*"
        value={email}
        onChangeText={setEmail}
        placeholder="Email adresinizi girin"
        keyboardType="email-address"
      />
      <View style={styles.bioContainer}>
        <Text style={styles.label}>Kendinizi Tanıtın (Opsiyonel)</Text>
        <TextInput
          style={styles.bioInput}
          multiline={true}
          maxLength={maxBioLength}
          placeholder="Kendiniz hakkında bir şeyler yazın..."
          value={bio}
          onChangeText={setBio}
        />
        <Text style={styles.charCount}>
          {bio.length}/{maxBioLength}
        </Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity style={styles.buton} onPress={handleRegister}>
          <Text style={styles.kayitbutton}>Kayit Ol</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.girisbutton}>
        <Text style={styles.kayitlitext}>Zaten kayitli misin? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={styles.giristext}>Giris yap</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default loginPage;
