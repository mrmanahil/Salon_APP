import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS} from '../config/setup';
import {useUserContext} from '../hook/useUser';

const ITEMS = [
  {
    id: '1',
    name: 'Dashboard',
    navigate: 'Home',
  },
  {
    id: '2',
    name: 'Booking',
    navigate: 'Booking',
  },
  {
    id: '3',
    name: 'Order',
    navigate: 'OrderNavigation',
  },
];

function DrawerContent() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const {user} = useUserContext();

  function navigate(navigate: string) {
    navigation.navigate(navigate as never);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, {marginTop: headerHeight, paddingTop: 40}]}>
        <View style={styles.headerLeft}>
          <Text
            style={{
              color: COLORS.whiteColor,
              fontFamily: FONTS.BOLD,
              fontSize: 16,
            }}>
            {user?.name}
          </Text>
          <Text
            style={{
              color: COLORS.whiteColor,
              fontFamily: FONTS.MEDIUM,
              fontSize: 12,
              opacity: 0.6,
            }}>
            {user?.email}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        {ITEMS.map(item => (
          <View style={styles.item} key={item.id}>
            <TouchableOpacity
              onPress={() => {
                navigate(item.navigate);
              }}>
              <View style={styles.inner}>
                <Text
                  style={{
                    fontFamily: FONTS.BOLD,
                    color: COLORS.darkColor,
                  }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
  },

  header: {
    backgroundColor: COLORS.darkColor,
    paddingVertical: 20,
    paddingHorizontal: 10,

    display: 'flex',
    flexDirection: 'row',
  },

  headerLeft: {
    flex: 1,
  },

  headerRight: {},

  body: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flex: 1,
  },
  item: {
    borderBottomColor: COLORS.grayColor,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 10,
  },
  inner: {},
});

export default DrawerContent;
