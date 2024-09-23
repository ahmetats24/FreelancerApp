import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {loginPage, registerPage, homePage} from '../../screens';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="register"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={loginPage} />
      <Stack.Screen name="register" component={registerPage} />
      <Stack.Screen name="home" component={homePage} />
    </Stack.Navigator>
  );
};
export default MyStack;
