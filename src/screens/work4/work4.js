import {View, Text, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const work4 = () => {
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null); // Hata mesajını tutmak için state

  const registerUser = () => {
    fetch('http://10.0.2.2:8000/api/task-delete/80', {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer cyHMOZkK7zIf5ssbjNUx7ZuRCZlkvZB8Fq4KZDWLee3ca583',
      },
    })
      .then(response => {
        if (response.ok) {
          // Eğer yanıt başarılıysa (200–299), yanıtın içerik uzunluğunu kontrol edelim
          return response.text().then(text => {
            return text ? JSON.parse(text) : {}; // Eğer yanıt boşsa boş bir obje döndür
          });
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        console.log('API Response:', data); // Konsola yazdırma
        setResponseData(data); // Ekrana göstermek için
        setErrorMessage(null); // Hata mesajını temizle
      })
      .catch(error => {
        console.log('Error:', error); // Hata objesini yazdır
        setErrorMessage(error.toString()); // Hata mesajını state'e kaydet
      });
  };

  return (
    <View style={{padding: 20}}>
      <Button title="Fetch Data" onPress={registerUser} />
      {responseData && <Text>{JSON.stringify(responseData)}</Text>}
      {errorMessage && <Text style={{color: 'red'}}>{errorMessage}</Text>}
    </View>
  );
};

export default work4;
/*  
  body: JSON.stringify({
        email: 'ahmetates@example.com',
        password: '123456789',
      }),
      body: JSON.stringify({
        name: 'Diyar',
        surname: 'Guzelses',
        email: 'diyar@example.com',
        password: '123456789',
      }),
      body: JSON.stringify({
        name: 'asdgfas',
        duration: 1,
      }),
 */
