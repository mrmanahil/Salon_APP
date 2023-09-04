import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {StatusBar, TouchableOpacity, Text} from 'react-native';
import {COLORS} from './config/setup';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './navigations/MainNavigation';
import UserContextProvider from './context/UserContext';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import PushNotification, {Importance} from 'react-native-push-notification';

function createChannel(channelID: string) {
  PushNotification.createChannel(
    {
      channelId: channelID,
      channelName: 'This is a channel name',
      channelDescription: 'This is a description',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => {
      console.log('done');
    },
  );
}

function showNotification(channelID: string, data: any) {
  PushNotification.localNotification({
    title: data.title,
    message: data.body,
    channelId: channelID,
    priority: 'high',
    vibrate: true,
    vibration: 300,
    importance: 'high',
  });
}

function App() {
  const unsubscribe = useRef<() => void | undefined>();

  useEffect(() => {
    unsubscribe.current = messaging().onMessage(message => {
      const channelID = Math.random().toString(36).substring(7);
      createChannel(channelID);
      showNotification(channelID, {...message.notification});
    });

    SplashScreen.hide();

    return unsubscribe.current;
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.darkColor}
        translucent
      />
      <UserContextProvider>
        <MainNavigation />
      </UserContextProvider>
    </NavigationContainer>
  );
}

export default App;
