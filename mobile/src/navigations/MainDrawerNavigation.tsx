import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeStackNavigation from './HomeStackNavigation';
import HomeScreen from '../screens/HomeScreen/Home.screen';
import DrawerContent from '../components/DrawerContent';
import OrderStackNavigation from './OrderStackNavigation';

const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="HomeNavigation" component={HomeStackNavigation} />
      <Drawer.Screen name="OrderNavigation" component={OrderStackNavigation} />
    </Drawer.Navigator>
  );
}

export default MainDrawerNavigation;
