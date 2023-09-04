import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import Logo from '../../assets/images/logo.png';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import EntIcon from 'react-native-vector-icons/Entypo';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, CONSTANTS, FONTS} from '../../config/setup';
import {DrawerHeaderProps} from '@react-navigation/drawer';
import categoryApi from '../../api/category.apt';
import barberApi from '../../api/barber.api';

const banners = [
  {
    image:
      'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFyYmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFyYmVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
  },
  {
    image:
      'https://plus.unsplash.com/premium_photo-1658506711778-d56cdeae1b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    image:
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
  },
];

const barbers = [
  {
    name: 'John Doe',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWVufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
  {
    name: 'Tom Hardy',
    image:
      'https://images.unsplash.com/photo-1584043720379-b56cd9199c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
  {
    name: 'Wick Skeleton',
    image:
      'https://images.unsplash.com/photo-1618088129969-bcb0c051985e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
  {
    name: 'Gary From',
    image:
      'https://images.unsplash.com/photo-1588731222899-68315ddd5e8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fG1lbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    phone: '123 123 1231',
  },
];

// const categories = [
//   {
//     id: '1',
//     name: 'Haircut',
//     image:
//       'https://plus.unsplash.com/premium_photo-1661382022096-d652c06cf1be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
//   },
//   {
//     id: '2',
//     name: 'Facial',
//     image:
//       'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjaWFsfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
//   },
//   {
//     id: '3',
//     name: 'Massage',
//     image:
//       'https://images.unsplash.com/photo-1542848284-8afa78a08ccb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fE1hc3NhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//   },
//   {
//     id: '4',
//     name: 'Nail',
//     image:
//       'https://plus.unsplash.com/premium_photo-1680348264631-b1205d81e75c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TmFpbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
//   },
//   {
//     id: '5',
//     name: 'Coloring',
//     image:
//       'https://images.unsplash.com/photo-1587225438173-701d7edc94f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhhaXIlMjBkeWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
//   },
//   {
//     id: '6',
//     name: 'Beard',
//     image:
//       'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJlYXJkfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
//   },
//   {
//     id: '7',
//     name: 'Eye',
//     image:
//       'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXllJTIwbGFzaGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
//   },
//   {
//     id: '7',
//     name: 'Eye',
//     image:
//       'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXllJTIwbGFzaGVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
//   },
// ];

function CustomHeader(props: DrawerHeaderProps) {
  return (
    <View style={styles.customHeaderContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.openDrawer();
        }}>
        <Icon name="menu" size={20} color={COLORS.whiteColor} />
      </TouchableOpacity>
      <Image
        source={Logo}
        style={{
          width: 50,
          height: 50,
        }}
        resizeMode="cover"
      />
      <Icon name="user" size={20} color={COLORS.whiteColor} />
    </View>
  );
}

function HomeScreen() {
  const [currIndex, setCurrIndex] = useState('0');
  const [bannerIndex, setBannerIndex] = useState('0');
  const [categories, setCategories] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const [loading, setLoading] = useState(false);

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

    const {responseData} = await categoryApi.getAll();
    const {responseData: barbersData} = await barberApi.getAll();

    setCategories(responseData.data);
    setBarbers(barbersData.data);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewStyles]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive">
        <View style={{height: CONSTANTS.windowHeight - headerHeight}}>
          <View style={styles.body}>
            <View style={{position: 'relative'}}>
              <FlatList
                data={banners}
                showsHorizontalScrollIndicator={false}
                snapToOffsets={[...Array(7)].map(
                  (x, i) =>
                    i * (CONSTANTS.windowWidth * 0.974 - 5) + (i - 1) * 5,
                )}
                onScroll={e => {
                  const x = e.nativeEvent.contentOffset.x;
                  setBannerIndex((x / (CONSTANTS.windowWidth - 10)).toFixed(0));
                }}
                horizontal
                scrollEventThrottle={16}
                snapToAlignment="start"
                decelerationRate="fast"
                renderItem={({index, item}) => (
                  <View
                    style={[
                      styles.bannerContainer,
                      {
                        paddingLeft: index === 0 ? 10 : 5,
                        paddingRight: index === 2 ? 10 : 5,
                      },
                    ]}>
                    <Image
                      source={{
                        // uri: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
                        uri: item.image,
                      }}
                      style={styles.bannerImage}
                      resizeMode="cover"
                    />
                  </View>
                )}
              />
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: 10,
                  gap: 2,
                }}
                pointerEvents="none">
                {banners.map((_, i) => (
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: 100,
                      backgroundColor: COLORS.whiteColor,
                      opacity: +bannerIndex === i ? 1 : 0.4,
                    }}
                  />
                ))}
              </View>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 10,
                marginTop: 30,
                flexWrap: 'wrap',
                rowGap: 5,
              }}>
              {categories.map((category, i) => (
                <View
                  key={category.categoryID}
                  style={{
                    width: '24.1%',
                    borderRadius: 8,
                    marginLeft: i <= 7 ? 3 : 0,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: 75,
                      borderRadius: 8,
                    }}>
                    <Image
                      source={{
                        uri: category?.categoryImageUrl,
                      }}
                      style={{
                        width: '100%',
                        height: 75,
                        borderRadius: 8,
                      }}
                      resizeMode="cover"
                    />
                    <View
                      style={{
                        width: '100%',
                        height: 75,
                        borderRadius: 8,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        padding: 10,
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}>
                      <Text
                        style={{
                          color: COLORS.whiteColor,
                          fontFamily: FONTS.MEDIUM,
                          fontSize: 10,
                          textTransform: 'uppercase',
                          includeFontPadding: false,
                        }}>
                        {category.categoryName}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={{marginTop: 30, paddingHorizontal: 10}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    color: COLORS.darkColor,
                    fontFamily: FONTS.EXTRA_BOLD,
                    textTransform: 'uppercase',
                    marginLeft: 3,
                    fontSize: CONSTANTS.mediumFontSize,
                    includeFontPadding: false,
                    lineHeight: CONSTANTS.mediumFontLineHeight,
                  }}>
                  Hair Specialist
                </Text>

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: COLORS.darkColor,
                      fontFamily: FONTS.BOLD,
                      textTransform: 'uppercase',
                      marginLeft: 3,
                      fontSize: CONSTANTS.extraSmallFontSize,
                      includeFontPadding: false,
                      lineHeight: CONSTANTS.extraSmallFontLineHeight,
                    }}>
                    View All
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={10}
                    color={COLORS.darkColor}
                  />
                </View>
              </View>

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
                renderItem={({item: barber}) => (
                  <View
                    style={{
                      minWidth: 150,
                      marginRight: 10,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => {
                        navigation.navigate('HomeNavigation' as never);
                      }}>
                      <Image
                        source={{
                          uri: barber.imageUrl,
                        }}
                        style={{
                          width: '100%',
                          height: 180,
                          borderRadius: 10,
                        }}
                        resizeMode="cover"
                      />
                      <View style={{marginTop: 10}}>
                        <Text
                          style={{
                            fontFamily: FONTS.EXTRA_BOLD,
                            color: COLORS.darkColor,
                            textTransform: 'uppercase',
                            includeFontPadding: false,
                          }}>
                          {barber.barberName}
                        </Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                          <Icon
                            name="star"
                            size={12}
                            color={COLORS.darkColor}
                          />
                          <Icon
                            name="star"
                            size={12}
                            color={COLORS.darkColor}
                          />
                          <Icon
                            name="star"
                            size={12}
                            color={COLORS.darkColor}
                          />
                          <Icon
                            name="star"
                            size={12}
                            color={COLORS.darkColor}
                          />
                          <Icon
                            name="star"
                            size={12}
                            color={COLORS.darkColor}
                          />
                        </View>
                        <View
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 2,
                          }}>
                          <EntIcon
                            name="phone"
                            size={12}
                            color={COLORS.darkColor}
                          />

                          <Text
                            style={{
                              fontFamily: FONTS.MEDIUM,
                              fontSize: 12,
                              color: COLORS.darkColor,
                              textTransform: 'uppercase',
                              lineHeight: 20,
                              includeFontPadding: false,
                            }}>
                            {barber.phone}
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

  body: {
    marginTop: 10,
  },

  bannerContainer: {
    width: CONSTANTS.windowWidth - 10,
  },

  bannerImage: {
    width: '100%',
    height: 160,
    borderRadius: 20,
  },
});

export default HomeScreen;
