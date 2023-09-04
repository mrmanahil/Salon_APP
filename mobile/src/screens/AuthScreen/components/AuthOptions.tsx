import React, {useContext, useMemo} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AUTH_OPTIONS, AuthContext} from '../Auth.context';
import {COLORS, CONSTANTS, FONTS} from '../../../config/setup';

const generalIndicatorStyles = {
  borderRadius: 6,
  backgroundColor: COLORS.whiteColor,
  width: '50%',
};

function AuthOptions() {
  const {authOption, onAuthOptionChange} = useContext(AuthContext);

  const signInOptionIndicatorStyles = useMemo(
    () => ({
      ...generalIndicatorStyles,
      height: authOption === AUTH_OPTIONS.SIGN_IN ? 5 : 1,
    }),
    [authOption],
  );
  const signOutOptionIndicatorStyles = useMemo(
    () => ({
      ...generalIndicatorStyles,
      height: authOption === AUTH_OPTIONS.SIGN_UP ? 5 : 1,
    }),
    [authOption],
  );

  return (
    <>
      <View style={styles.authOptions}>
        <View style={styles.authOption}>
          <TouchableOpacity
            style={styles.authOptionInner}
            onPress={onAuthOptionChange(AUTH_OPTIONS.SIGN_IN)}>
            <Text style={styles.authOptionText}>SIGN IN</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.authOption}>
          <TouchableOpacity
            style={styles.authOptionInner}
            onPress={onAuthOptionChange(AUTH_OPTIONS.SIGN_UP)}>
            <Text style={styles.authOptionText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.authOptionsIndicator}>
        <View style={signInOptionIndicatorStyles} />
        <View style={signOutOptionIndicatorStyles} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  authOptions: {
    display: 'flex',
    flexDirection: 'row',
  },
  authOption: {
    flex: 1,
  },
  authOptionInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  authOptionText: {
    color: COLORS.whiteColor,
    fontSize: CONSTANTS.mediumFontSize,
    lineHeight: CONSTANTS.mediumFontLineHeight,
    fontFamily: FONTS.MEDIUM,
    includeFontPadding: false,
  },

  authOptionsIndicator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthOptions;
