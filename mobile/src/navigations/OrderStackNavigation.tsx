import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrderHistoryScreen from '../screens/OrderHistory/OrderHistory.screen';

const Stack = createNativeStackNavigator();

function OrderStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="orders" component={OrderHistoryScreen} />
    </Stack.Navigator>
  );
}

export default OrderStackNavigation;
