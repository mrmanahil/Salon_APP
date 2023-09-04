import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {BOOKING_TYPES, COLORS, CONSTANTS, FONTS} from '../../config/setup';
import {useHeaderHeight} from '@react-navigation/elements';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import {useUserContext} from '../../hook/useUser';
import bookingApi from '../../api/booking.api';
import messaging from '@react-native-firebase/messaging';
import moment from 'moment';

function CustomHeader(props: DrawerHeaderProps) {
  return (
    <View style={styles.customHeaderContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}>
        <Icon name="chevron-left" size={20} color={COLORS.whiteColor} />
      </TouchableOpacity>
      <Text
        style={{
          color: COLORS.whiteColor,
          fontFamily: FONTS.BOLD,
          flex: 1,
          textAlign: 'center',
          includeFontPadding: false,
          lineHeight: 20,
        }}>
        APPOINTMENT LIST
      </Text>
    </View>
  );
}

function OrderHistoryScreen() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const {user} = useUserContext();
  const [bookings, setBookings] = useState([]);

  async function getData() {
    const {responseData} = await bookingApi.get(
      user.customer?.customerID || '',
    );

    setBookings(responseData.data);
  }

  const unsubscribe = useRef<() => void | undefined>();

  useEffect(() => {
    unsubscribe.current = messaging().onMessage(() => {
      getData();
    });

    return unsubscribe.current;
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: CustomHeader,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#fff',
      },
      headerTintColor: '#fff',
      animationEnabled: true,
      headerShown: true,
    });
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewStyles]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive">
        <View style={{height: CONSTANTS.windowHeight - headerHeight}}>
          <View style={{marginTop: 20, display: 'flex', flex: 1}}>
            <View style={{flex: 1}}>
              <FlatList
                data={bookings}
                showsHorizontalScrollIndicator={false}
                style={{}}
                scrollEventThrottle={16}
                snapToAlignment="start"
                decelerationRate="fast"
                renderItem={({item}) => (
                  <View
                    style={{
                      minWidth: CONSTANTS.windowWidth,
                      paddingHorizontal: 20,
                      marginBottom: 20,
                    }}>
                    <View
                      style={{
                        borderRadius: 10,
                        borderLeftColor: COLORS.darkColor,
                        borderLeftWidth: 10,
                        paddingVertical: 20,
                        paddingLeft: 20,
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <View style={{display: 'flex'}}>
                          <Text
                            style={{
                              fontFamily: FONTS.BOLD,
                              fontSize: 12,
                              color: COLORS.darkColor,
                              includeFontPadding: false,
                            }}>
                            {item?.bookingSchedule?.BookingDate}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONTS.BOLD,
                              fontSize: 12,
                              color: COLORS.darkColor,
                              includeFontPadding: false,
                              marginTop: -5,
                            }}>
                            AT{' '}
                            {moment(
                              item.bookingSchedule?.BookingStartTime,
                              'hh:mm:ss A',
                            ).format('hh:mm A')}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONTS.BOLD,
                              fontSize: 12,
                              color: COLORS.darkColor,
                              includeFontPadding: false,
                              marginTop: -5,
                            }}>
                            Service: {item.service?.serviceName}
                          </Text>
                        </View>
                        <View>
                          <View
                            style={{
                              paddingVertical: 6,
                              paddingHorizontal: 30,
                              backgroundColor: COLORS.darkColor,
                              borderRadius: 10,
                            }}>
                            <TouchableOpacity activeOpacity={0}>
                              <Text
                                style={{
                                  color: COLORS.whiteColor,
                                  fontFamily: FONTS.BOLD,
                                  fontSize: 12,
                                  includeFontPadding: false,
                                  lineHeight: 24,
                                }}>
                                {item.statusID === BOOKING_TYPES.PENDING
                                  ? 'PENDING'
                                  : item.statusID === BOOKING_TYPES.APPROVED
                                  ? 'Approved'
                                  : item.statusID === BOOKING_TYPES.COMPLETED
                                  ? 'Completed'
                                  : 'Paid'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          marginTop: 20,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 5,
                            }}>
                            <Image
                              source={{
                                uri: item?.barber?.imageUrl,
                              }}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 100,
                                borderWidth: 2,
                                borderColor: COLORS.darkColor,
                              }}
                            />
                            <View style={{display: 'flex', marginLeft: 10}}>
                              <Text
                                style={{
                                  color: COLORS.darkColor,
                                  fontFamily: FONTS.BOLD,
                                  fontSize: 14,
                                }}>
                                {item?.barber?.barberName}
                              </Text>
                              <Text
                                style={{
                                  color: COLORS.darkColor,
                                  fontFamily: FONTS.BOLD,
                                  fontSize: 12,
                                  marginTop: -5,
                                }}>
                                {item?.barber?.phone}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontFamily: FONTS.EXTRA_BOLD,
                              fontSize: 24,
                              color: COLORS.darkColor,
                            }}>
                            Rs. {item?.bookingTotalAmount}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            </View>
            <View
              style={{marginTop: 20, marginBottom: 20, paddingHorizontal: 10}}>
              <View
                style={{
                  backgroundColor: COLORS.darkColor,
                  padding: 10,
                  borderRadius: 10,
                }}>
                <TouchableOpacity>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.whiteColor,
                      textTransform: 'uppercase',
                      fontFamily: FONTS.BOLD,
                      fontSize: 16,
                      includeFontPadding: false,
                    }}>
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.whiteColor,
  },

  scrollViewStyles: {
    flexGrow: 1,
  },

  customHeaderContainer: {
    marginTop: CONSTANTS.statusBarHeight,
    backgroundColor: COLORS.darkColor,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default OrderHistoryScreen;
