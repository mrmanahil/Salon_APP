import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookingScreen from '../screens/Booking/Booking.screen';
import ThanksOrderScreen from '../screens/ThanksOrder/ThanksOrder.screen';

const Stack = createNativeStackNavigator();

function HomeStackNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Thanks" component={ThanksOrderScreen} />
    </Stack.Navigator>
  );
}

export default HomeStackNavigation;
