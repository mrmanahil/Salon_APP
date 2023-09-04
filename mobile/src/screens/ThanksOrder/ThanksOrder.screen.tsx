import React from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {COLORS, CONSTANTS, FONTS, NAVIGATION_OPTIONS} from '../../config/setup';
import {useNavigation} from '@react-navigation/native';

function ThanksOrderScreen() {
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[styles.scrollViewStyles]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="interactive">
        <View style={{height: CONSTANTS.windowHeight - headerHeight}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}>
            <Text
              style={{
                fontFamily: FONTS.BOLD,
                fontSize: 20,
                color: COLORS.darkColor,
                textAlign: 'center',
              }}>
              Thanks for booking
            </Text>
            <Text
              style={{
                fontFamily: FONTS.BOLD,
                fontSize: 12,
                color: COLORS.darkColor,
                textAlign: 'center',
              }}>
              You will receive an approved notification shortly
            </Text>
          </View>
          <View
            style={{marginTop: 20, paddingHorizontal: 10, marginBottom: 20}}>
            <View
              style={{
                backgroundColor: COLORS.darkColor,
                padding: 10,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('OrderNavigation');
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: COLORS.whiteColor,
                    textTransform: 'uppercase',
                    fontFamily: FONTS.BOLD,
                    fontSize: 16,
                    includeFontPadding: false,
                  }}>
                  Track Order
                </Text>
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
});

export default ThanksOrderScreen;
