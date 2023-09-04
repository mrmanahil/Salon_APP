import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import EntIcon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, CONSTANTS, FONTS} from '../../config/setup';
import barberApi from '../../api/barber.api';
import serviceApi from '../../api/service.api';
import {useUserContext} from '../../hook/useUser';
import bookingApi from '../../api/booking.api';

function CustomHeader(props: NativeStackHeaderProps) {
  return (
    <View style={styles.customHeaderContainer}>
      <Icon
        name="chevron-left"
        size={20}
        color={COLORS.whiteColor}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={{alignSelf: 'center', flex: 1}}>
        <Text
          style={{
            color: COLORS.whiteColor,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontFamily: FONTS.MEDIUM,
            includeFontPadding: false,
            lineHeight: 23,
          }}>
          Book Appointment
        </Text>
      </View>
    </View>
  );
}

function BookingScreen() {
  const [selectedSlot, setSelectedSlot] = useState('0');
  const [selectedBarber, setSelectedBarber] = useState('0');
  const [selectedService, setSelectedService] = useState('0');
  const [selectedDate, setSelectedDate] = useState('');
  const [currIndex, setCurrIndex] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [dates, setDates] = useState([]);
  const [slots, setSlots] = useState([]);
  const {user} = useUserContext();

  const navigation = useNavigation();

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

  const getData = async () => {
    setLoading(true);

    const {responseData: barbersData} = await barberApi.getAll();
    const {responseData: servicesData} = await serviceApi.getAll();

    setBarbers(barbersData.data || []);
    setServices(servicesData.data || []);

    let dates = [];
    let currDate = moment();
    for (let i = 0; i < 7; i++) {
      dates.push({
        dayName: currDate.format('ddd').toUpperCase(),
        date: currDate.format('DD'),
      });
      currDate = currDate.add(1, 'day');
    }

    let min;
    let hour;
    let startTime;

    let tempSlots = [];

    let lastTime = moment('11:59 PM', 'hh A');
    let openTime = moment('09 AM', 'hh A');

    currDate = moment();
    if (currDate.isBefore(openTime)) {
      currDate = moment('08:45 AM', 'hh:mm A');
    }

    while (currDate.isBefore(lastTime, 'hour')) {
      min = currDate.format('mm');
      hour = currDate.format('hh');

      startTime = `${
        min >= '30' ? moment(hour, 'hh').add(1, 'hour').format('hh') : hour
      }:${min >= '30' ? '00' : '30'} ${currDate.format('A')}`;

      tempSlots.push({
        time: startTime,
      });

      currDate = currDate.add(30, 'minute');
    }

    setSlots(tempSlots);
    setDates(dates as never[]);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  const onBarberSelect = (barber: any) => {
    setSelectedBarber(barber.barberID);
  };

  const onSlotSelect = (slot: any) => {
    setSelectedSlot(slot.time);
  };

  const onDateSelect = (date: any) => {
    setSelectedDate(date.date);
  };

  const onBooking = async () => {
    const booking = {
      customerID: user.customer?.customerID,
      serviceID: selectedService.serviceID,
      barberID: selectedBarber,
      shopID: 2,
      bookingTotalAmount: selectedService.servicePrice,
      bookingDayOfTheWeek: moment(selectedDate, 'DD').format('ddd'),
      bookingDate: moment(selectedDate, 'DD').format('DD-MM-YYYY'),
      bookingStartTime: moment(selectedSlot, 'hh:mm A').format('hh:mm:ss A'),
      bookingEndTime: moment(selectedSlot, 'hh:mm A').format('hh:mm:ss A'),
    };

    setLoading(true);

    const {isDone, errorMessage} = await bookingApi.create(booking);

    setLoading(false);

    if (isDone) {
      navigation.navigate('Thanks');
    } else {
      setError(errorMessage);
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewStyles]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive">
        <View style={{height: '100%', marginBottom: 20}}>
          <View
            style={{
              backgroundColor: COLORS.darkColor2,
              display: 'flex',
              paddingVertical: 20,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 10,
                marginBottom: 20,
              }}>
              <Text
                style={{
                  color: COLORS.whiteColor,
                  fontFamily: FONTS.MEDIUM,
                  includeFontPadding: false,
                  lineHeight: 20,
                }}>
                {moment().format('MMMM, YYYY')}
              </Text>
            </View>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              {dates.map((date, i) => (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    onDateSelect(date);
                  }}>
                  <View
                    style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLORS.whiteColor,
                        fontFamily: FONTS.REGULAR,
                        includeFontPadding: false,
                        lineHeight: 20,
                        fontSize: 12,
                        marginBottom: 7,
                      }}>
                      {date.dayName}
                    </Text>
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor:
                          date.date === selectedDate
                            ? COLORS.darkColor
                            : 'transparent',
                        borderRadius: 100,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: COLORS.whiteColor,
                          fontFamily: FONTS.MEDIUM,
                          includeFontPadding: false,
                          lineHeight: 20,
                          fontSize: 12,
                        }}>
                        {date.date}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Text
              style={{
                fontFamily: FONTS.BOLD,
                color: COLORS.darkColor,
                textTransform: 'uppercase',
                paddingHorizontal: 10,
                marginTop: 10,
                includeFontPadding: false,
                fontSize: 16,
              }}>
              Available Slots
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                paddingHorizontal: 10,
                gap: 10,
                marginTop: 10,
              }}>
              {slots.map((slot, i) => (
                <TouchableOpacity
                  style={{
                    width: '31.5%',
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    onSlotSelect(slot);
                  }}>
                  <View
                    style={{
                      width: '100%',
                      padding: 10,
                      backgroundColor:
                        selectedSlot === slot.time
                          ? COLORS.darkColor
                          : COLORS.grayColor,
                      display: 'flex',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: FONTS.BOLD,
                        includeFontPadding: false,
                        fontSize: 12,
                        color:
                          selectedSlot === slot.time
                            ? COLORS.whiteColor
                            : COLORS.darkColor,
                      }}>
                      {slot.time}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{marginTop: 10, paddingHorizontal: 10}}>
            <Text
              style={{
                fontFamily: FONTS.BOLD,
                color: COLORS.darkColor,
                textTransform: 'uppercase',
                marginTop: 10,
                includeFontPadding: false,
                fontSize: 16,
              }}>
              CHOOSE HAIR SPECIALIST
            </Text>
            <FlatList
              data={barbers}
              showsHorizontalScrollIndicator={false}
              // snapToOffsets={[...Array(7)].map(
              //   (x, i) =>
              //     i * (CONSTANTS.windowWidth * 0.974 - 5) + (i - 1) * 5,
              // )}
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrIndex((x / 150).toFixed(0));
              }}
              style={{
                marginTop: 10,
              }}
              keyExtractor={item => item.barberID}
              horizontal
              scrollEventThrottle={16}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({item: barber, index: i}) => (
                <View
                  style={{
                    minWidth: 150,
                    marginRight: 10,
                    backgroundColor:
                      +selectedBarber === +barber.barberID
                        ? COLORS.darkColor
                        : COLORS.grayColor,
                    padding: 20,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      onBarberSelect(barber);
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{
                          uri: barber.imageUrl,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100,
                        }}
                        resizeMode="cover"
                      />
                      <View style={{marginTop: 3}}>
                        <Text
                          style={{
                            fontFamily: FONTS.EXTRA_BOLD,
                            color:
                              +selectedBarber === barber.barberID
                                ? COLORS.whiteColor
                                : COLORS.darkColor,
                            textTransform: 'uppercase',
                            includeFontPadding: false,
                          }}>
                          {barber.barberName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                gap: 3,
              }}>
              {[...barbers].slice(0, barbers.length - 1).map((_, i) => (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 100,
                    backgroundColor: COLORS.darkColor,
                    opacity: +currIndex === i ? 1 : 0.4,
                  }}
                />
              ))}
            </View>
          </View>

          <View style={{marginTop: 10, paddingHorizontal: 10}}>
            <Text
              style={{
                fontFamily: FONTS.BOLD,
                color: COLORS.darkColor,
                textTransform: 'uppercase',
                marginTop: 10,
                includeFontPadding: false,
                fontSize: 16,
              }}>
              CHOOSE SERVICE
            </Text>
            <FlatList
              data={services}
              showsHorizontalScrollIndicator={false}
              // snapToOffsets={[...Array(7)].map(
              //   (x, i) =>
              //     i * (CONSTANTS.windowWidth * 0.974 - 5) + (i - 1) * 5,
              // )}
              onScroll={e => {
                const x = e.nativeEvent.contentOffset.x;
                setCurrIndex((x / 150).toFixed(0));
              }}
              style={{
                marginTop: 10,
              }}
              keyExtractor={item => item.serviceID}
              horizontal
              scrollEventThrottle={16}
              snapToAlignment="start"
              decelerationRate="fast"
              renderItem={({item: service, index: i}) => (
                <View
                  style={{
                    minWidth: 150,
                    marginRight: 10,
                    backgroundColor:
                      +selectedService.serviceID === service.serviceID
                        ? COLORS.darkColor
                        : COLORS.grayColor,
                    padding: 20,
                    borderRadius: 10,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={() => {
                      onServiceSelect(service);
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{
                          uri: service.serviceImageUrl,
                        }}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 100,
                        }}
                        resizeMode="cover"
                      />
                      <View style={{marginTop: 3}}>
                        <Text
                          style={{
                            fontFamily: FONTS.EXTRA_BOLD,
                            color:
                              +selectedService.serviceID === service.serviceID
                                ? COLORS.whiteColor
                                : COLORS.darkColor,
                            textTransform: 'uppercase',
                            includeFontPadding: false,
                          }}>
                          {service.serviceName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                gap: 3,
              }}>
              {[...services].slice(0, services.length - 1).map((_, i) => (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 100,
                    backgroundColor: COLORS.darkColor,
                    opacity: +currIndex === i ? 1 : 0.4,
                  }}
                />
              ))}
            </View>
          </View>

          <View style={{marginTop: 20, paddingHorizontal: 10}}>
            <View
              style={{
                backgroundColor: COLORS.darkColor,
                padding: 10,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  onBooking();
                }}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      color: COLORS.whiteColor,
                      textTransform: 'uppercase',
                      fontFamily: FONTS.BOLD,
                      fontSize: 16,
                      includeFontPadding: false,
                    }}>
                    Book Appointment
                  </Text>
                )}
              </TouchableOpacity>
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
export default BookingScreen;
