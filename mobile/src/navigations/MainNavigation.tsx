import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen/Auth.screen';
import MainDrawerNavigation from './MainDrawerNavigation';
import GeneralScreen from '../screens/General/General.screen';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="General" component={GeneralScreen} />
      <Stack.Screen name="HomeDrawer" component={MainDrawerNavigation} />
    </Stack.Navigator>
  );
}
export default MainNavigation;
