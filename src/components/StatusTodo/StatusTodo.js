import React, {useState, useEffect} from 'react';
import {View, Button, Alert} from 'react-native';

const StatusTodo = ({
  taskId,
  token,
  onStatusUpdated,
  onTimerStart,
  onTimerStop,
}) => {
  const [status, setStatus] = useState(0); // 0: TO DO, 1: IN PROGRESS, 2: DONE

  useEffect(() => {
    // Görev durumunu API'den al ve setStatus ile ayarla
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/tasks/${taskId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setStatus(data.status);
      } else {
        console.error('API Hatası:', data.message);
      }
    } catch (error) {
      console.error('Durum alınırken bir hata oluştu:', error);
    }
  };

  const updateStatus = async newStatus => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/updateStatus/${taskId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({status: newStatus}),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setStatus(newStatus);
        onStatusUpdated(); // Görev listesini güncellemek için callback çağır
      } else {
        console.error('API Hatası:', data.message);
        Alert.alert('Hata', data.message || 'Durum güncellenemedi.');
      }
    } catch (error) {
      console.error('Durum güncellenirken bir hata oluştu:', error);
      Alert.alert('Hata', 'Durum güncellenirken bir hata oluştu.');
    }
  };

  const handleStatusChange = newStatus => {
    if (status === 1 && newStatus === 0) {
      // Eğer görev IN PROGRESS durumundaysa TO DO'ya geri dönemesin
      Alert.alert(
        'Geçersiz İşlem',
        'Görev IN PROGRESS durumundayken geri dönülemez.',
      );
      return;
    }

    if (newStatus === 1) {
      onTimerStart(taskId); // Timer başlasın
    } else {
      onTimerStop(taskId); // Timer dursun
    }

    updateStatus(newStatus);
  };

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <Button
        color="#F39C12"
        title="TO DO"
        onPress={() => handleStatusChange(0)}
        disabled={status !== 0} // Eğer status 0 (TO DO) değilse butonu devre dışı bırak
      />
      <Button
        color="#2980B9"
        title="IN PROGRESS"
        onPress={() => handleStatusChange(1)}
        disabled={status === 2} // Eğer DONE ise IN PROGRESS'e geri dönemesin
      />
      <Button
        color="#27AE60"
        title="DONE"
        onPress={() => handleStatusChange(2)}
      />
    </View>
  );
};

export default StatusTodo;
