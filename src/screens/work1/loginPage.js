import {View, Text, Alert, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import Kutu from '../../components/Kutu/Kutu';
import {hidden, show} from '../../assets/icons';
import styles from './styles';

const LoginPage = ({navigation}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Hata', 'Lütfen email ve şifrenizi girin.');
      return;
    }

    setIsLoading(true);

    try {
      const loginResponse = await fetch('http://10.0.2.2:8000/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: identifier,
          password: password,
        }),
      });
      console.log(loginResponse);
      const loginData = await loginResponse.json();

      if (loginResponse.ok) {
        // Kullanıcı login olduktan sonra tüm kullanıcı bilgilerini getir
        const usersResponse = await fetch('http://10.0.2.2:8000/api/users', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${loginData.token}`,
          },
        });

        const usersData = await usersResponse.json();

        if (usersResponse.ok) {
          // Giriş yapan kullanıcının durumunu bul
          const user = usersData.find(user => user.email === identifier);

          if (user && user.status === 1) {
            // Kullanıcı onaylıysa home sayfasına yönlendir
            navigation.navigate('home', {
              userId: user.id, // Kullanıcının ID'si
              token: loginData.token, // Token
              name: user.name,
              surname: user.surname,
            });
          } else {
            Alert.alert('Hata', 'Hesabınız henüz onaylanmamış.');
          }
        } else {
          Alert.alert(
            'Hata',
            usersData.message || 'Kullanıcı bilgileri alınamadı.',
          );
        }
      } else {
        Alert.alert('Hata', loginData.message || 'Giriş yapılamadı.');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Hata', 'Giriş işlemi sırasında bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      <View style={styles.kayit}>
        <Text style={styles.kayittext}>Giriş Yap</Text>
      </View>
      <View style={styles.cizgi}></View>
      <Kutu
        isim="E-mail"
        value={identifier}
        onChangeText={setIdentifier}
        placeholder="Email adresinizi girin"
      />
      <View>
        <Kutu
          isim="Şifre"
          value={password}
          onChangeText={setPassword}
          placeholder="Şifrenizi girin"
          secureTextEntry={!showPassword}
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
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={styles.buton}
          onPress={handleLogin}
          disabled={isLoading}>
          <Text style={styles.kayitbutton}>
            {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.girisbutton}>
        <Text style={styles.kayitlitext}>Hesabin yok mu? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.giristext}>Kayit ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginPage;
