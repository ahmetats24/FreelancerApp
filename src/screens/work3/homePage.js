import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StatusTodo from '../../components/StatusTodo/StatusTodo';
import styles from './styles';
import {Swipeable} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const formatDuration = durationInSeconds => {
  const seconds = durationInSeconds % 60;
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const hours = Math.floor(durationInSeconds / 3600);
  return `${hours} : ${minutes} : ${seconds} `;
};

const TaskPage = ({route}) => {
  const {userId, token, name, surname} = route.params;
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDescriptions, setTaskDescriptions] = useState({});

  useEffect(() => {
    fetchTasks(); // Sayfa yüklendiğinde görevleri al
  }, [userId, token]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/users/${userId}/tasks`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const updatedTasks = data.map(task => {
          const isRunning = task.status === 1;
          let intervalId = null;
          if (isRunning) {
            intervalId = setInterval(() => {
              setTasks(prevTasks =>
                prevTasks.map(t =>
                  t.id === task.id ? {...t, duration: t.duration + 1} : t,
                ),
              );
            }, 1000);
          }
          return {
            ...task,
            duration: task.duration || 0,
            isRunning,
            intervalId,
          };
        });
        setTasks(updatedTasks);
        await loadTaskDescriptions(); // Açıklamaları yükle
      } else {
        const data = await response.json();
        console.error('API Hatası:', data.message);
        Alert.alert(
          'Hata',
          data.message || 'Görevler yüklenirken bir hata oluştu.',
        );
      }
    } catch (error) {
      console.error('Görevleri alırken bir hata oluştu:', error);
      Alert.alert('Hata', 'Görevleri alırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadTaskDescriptions = async () => {
    try {
      const storedDescriptions = await AsyncStorage.getItem('taskDescriptions');
      if (storedDescriptions) {
        setTaskDescriptions(JSON.parse(storedDescriptions));
      }
    } catch (error) {
      console.error('Açıklamaları yüklerken bir hata oluştu:', error);
    }
  };

  const saveTaskDescriptions = async descriptions => {
    try {
      await AsyncStorage.setItem(
        'taskDescriptions',
        JSON.stringify(descriptions),
      );
    } catch (error) {
      console.error('Açıklamalar kaydedilirken bir hata oluştu:', error);
    }
  };

  const startTimer = taskId => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && task.status === 1 && !task.isRunning) {
        const id = setInterval(() => {
          setTasks(prevTasks =>
            prevTasks.map(t =>
              t.id === taskId ? {...t, duration: t.duration + 1} : t,
            ),
          );
        }, 1000);

        return {...task, isRunning: true, intervalId: id};
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const stopTimer = taskId => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && task.intervalId) {
        clearInterval(task.intervalId);

        updateTaskDuration(taskId, task.duration);

        return {...task, isRunning: false, intervalId: null};
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const updateTaskDuration = async (taskId, duration) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/task-update/${taskId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({duration}),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        console.error('Görev güncellenemedi:', data.message);
        Alert.alert('Hata', data.message || 'Görev süresi güncellenemedi.');
      }
    } catch (error) {
      console.error('Görev süresi güncellenirken bir hata oluştu:', error);
      Alert.alert('Hata', 'Görev süresi güncellenirken bir hata oluştu.');
    }
  };

  const handleCreateTask = async () => {
    if (!taskName || !taskDescription) {
      Alert.alert('Hata', 'Lütfen görev ismi ve açıklama girin.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8000/api/create-task', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: taskName,
          duration: 0,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Başarılı', 'Görev başarıyla oluşturuldu.');

        const newTask = {
          ...data,
          duration: 0,
          isRunning: false,
          intervalId: null,
        };
        setTasks([...tasks, newTask]);

        const updatedDescriptions = {
          ...taskDescriptions,
          [newTask.id]: taskDescription,
        };
        setTaskDescriptions(updatedDescriptions);
        await saveTaskDescriptions(updatedDescriptions);

        setTaskName('');
        setTaskDescription('');
      } else {
        const data = await response.json();
        console.error(data.message);
        Alert.alert('Hata', data.message || 'Görev oluşturulamadı.');
      }
    } catch (error) {
      console.error('Görev oluşturulurken bir hata oluştu:', error);
      Alert.alert('Hata', 'Görev oluşturulurken bir hata oluştu.');
    }
  };

  const handleStatusUpdate = async () => {
    await fetchTasks(); // Görev durumunu güncelledikten sonra görevleri tekrar yükle
  };

  const handleTimerStart = taskId => {
    startTimer(taskId);
  };

  const handleTimerStop = taskId => {
    stopTimer(taskId);
  };
  const deleteTask = async (taskId, token) => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8000/api/task-delete/${taskId}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        return true; // Silme başarılı
      } else {
        const data = await response.json();
        console.error('Görev silinemedi:', data.message);
        Alert.alert('Hata', data.message || 'Görev silinemedi.');
        return false; // Silme başarısız
      }
    } catch (error) {
      console.error('API çağrısı sırasında bir hata oluştu:', error);
      Alert.alert('Hata', 'Görev silinirken bir hata oluştu.');
      return false; // Silme başarısız
    }
  };
  const handleDeleteTask = async taskId => {
    const success = await deleteTask(taskId, token);
    if (success) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  const renderRightActions = taskId => {
    return (
      <TouchableOpacity
        onPress={() => handleDeleteTask(taskId)}
        style={styles.deleteButton}>
        <Text style={{color: 'white'}}>Sil</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#F0F4F8'}}>
      <View style={styles.hosgelginiz}>
        <Text style={styles.hosgelginiztext}>
          Hoşgeldiniz, {name} {surname}
        </Text>
      </View>
      <View style={styles.kutuortala}>
        <TextInput
          placeholder="Görev İsmi"
          value={taskName}
          onChangeText={setTaskName}
          style={styles.kutu}
        />
        <TextInput
          placeholder="Görev Açıklaması"
          value={taskDescription}
          onChangeText={setTaskDescription}
          style={styles.kutu}
        />
      </View>
      <View style={styles.butonstil}>
        <TouchableOpacity
          style={styles.buton}
          title="Görev Oluştur"
          onPress={handleCreateTask}>
          <Text style={styles.butontext}>Gorev Olustur</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gorevortala}>
        <Text style={styles.ortabaslik}>Görevler</Text>
      </View>
      <GestureHandlerRootView style={styles.taskortala}>
        {tasks.length === 0 ? (
          <Text>Herhangi bir görev bulunamadı.</Text>
        ) : (
          tasks.map(task => (
            <Swipeable
              key={task.id}
              renderRightActions={() => renderRightActions(task.id)} // Sola kaydırıldığında silme butonu
            >
              <View style={styles.taskkutu}>
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.namestil}>{task.name}</Text>
                </View>
                <View style={styles.yazilar}>
                  <View style={styles.descalan}>
                    <Text style={styles.descriptionsstil}>
                      {taskDescriptions[task.id] || 'Açıklama yok'}
                    </Text>
                  </View>
                  <View style={styles.timestil}>
                    <Text>{formatDuration(task.duration)}</Text>
                    {task.isRunning ? (
                      <TouchableOpacity
                        onPress={() => handleTimerStop(task.id)}>
                        <Text style={{color: 'red'}}>Durdur</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => handleTimerStart(task.id)}>
                        <Text style={{color: 'green'}}>Başlat</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                <StatusTodo
                  taskId={task.id}
                  token={token}
                  onStatusUpdated={handleStatusUpdate}
                  onTimerStart={handleTimerStart}
                  onTimerStop={handleTimerStop}
                />
              </View>
            </Swipeable>
          ))
        )}
      </GestureHandlerRootView>
    </ScrollView>
  );
};

export default TaskPage;
