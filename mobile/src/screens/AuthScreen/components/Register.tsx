import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {COLORS, CONSTANTS, FONTS} from '../../../config/setup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {RegisterFormValidation} from './constant';
import {authApi} from '../../../api';
import {AUTH_OPTIONS, AuthContext} from '../Auth.context';

function Register() {
  const {onAuthOptionChange} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const formMethods = useForm({
    resolver: yupResolver(RegisterFormValidation),
    defaultValues: {
      name: '',
      email: '',
      confirmPassword: '',
      password: '',
    },
  });

  const registerUser = async (values: any) => {
    setLoading(true);

    const {errorMessage, isDone} = await authApi.register(values);
    setLoading(false);

    if (!isDone) {
      setError(errorMessage);
      return;
    }

    onAuthOptionChange(AUTH_OPTIONS.SIGN_IN)();
  };

  const onSubmitHandler = async () => {
    formMethods.handleSubmit(registerUser)();
  };

  return (
    <>
      <View style={styles.authInputs}>
        <View style={[styles.authInputMarginBottom]}>
          <Controller
            control={formMethods?.control}
            name="name"
            render={({field}) => (
              <TextInput
                {...field}
                style={[styles.authInput]}
                placeholder="Full Name"
                onChange={e => {
                  field.onChange(e.nativeEvent.text);
                }}
              />
            )}
          />
          <Text style={[styles.error]}>
            {formMethods.formState.errors.name
              ? formMethods.formState.errors.name.message
              : ' '}
          </Text>
        </View>
        <View style={[styles.authInputMarginBottom]}>
          <Controller
            control={formMethods?.control}
            name="email"
            render={({field}) => (
              <TextInput
                {...field}
                style={[styles.authInput]}
                placeholder="Email Address"
                onChange={e => {
                  field.onChange(e.nativeEvent.text);
                }}
              />
            )}
          />
          <Text style={[styles.error]}>
            {formMethods.formState.errors.email
              ? formMethods.formState.errors.email.message
              : ' '}
          </Text>
        </View>
        <View style={[styles.authInputMarginBottom]}>
          <Controller
            control={formMethods?.control}
            name="password"
            render={({field}) => (
              <TextInput
                {...field}
                style={[styles.authInput]}
                placeholder="Password"
                secureTextEntry
                onChange={e => {
                  field.onChange(e.nativeEvent.text);
                }}
              />
            )}
          />
          <Text style={[styles.error]}>
            {formMethods.formState.errors.password
              ? formMethods.formState.errors.password.message
              : ' '}
          </Text>
        </View>
        <View style={[styles.authInputMarginBottom]}>
          <Controller
            control={formMethods?.control}
            name="confirmPassword"
            render={({field}) => (
              <TextInput
                {...field}
                style={styles.authInput}
                placeholder="Confirm Password"
                secureTextEntry
                onChange={e => {
                  field.onChange(e.nativeEvent.text);
                }}
              />
            )}
          />
          <Text style={[styles.error]}>
            {formMethods.formState.errors.confirmPassword
              ? formMethods.formState.errors.confirmPassword.message
              : ' '}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.authButtonContainer}
        disabled={loading}
        onPress={onSubmitHandler}>
        <Text style={styles.authButtonText}>
          {loading ? <ActivityIndicator /> : 'SIGN UP'}
        </Text>
      </TouchableOpacity>
      <Text
        style={[
          styles.error,
          {textAlign: 'center', marginTop: 4, marginLeft: 0},
        ]}>
        {error ? error : ' '}
      </Text>

      <View style={styles.bottomLineContainer}>
        <Text style={styles.bottomLineText1}>
          Already have an account ?{'  '}
          <Text style={styles.bottomLineText2}>SIGN IN</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  authInputs: {
    marginTop: 40,
  },

  authInput: {
    backgroundColor: COLORS.whiteColorLight,
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: CONSTANTS.smallFontSize,
    lineHeight: CONSTANTS.smallFontLineHeight,
    includeFontPadding: false,
  },

  authInputMarginBottom: {
    marginBottom: 10,
  },

  authButtonContainer: {display: 'flex', alignItems: 'center', marginTop: 20},
  authButtonText: {
    padding: 14,
    paddingHorizontal: 60,
    backgroundColor: COLORS.whiteColor,
    borderRadius: 30,
    color: COLORS.darkColor,
    fontSize: CONSTANTS.mediumFontSize,
    lineHeight: CONSTANTS.mediumFontLineHeight,
    includeFontPadding: false,
    fontFamily: FONTS.BOLD,
  },
  bottomLineContainer: {display: 'flex', alignItems: 'center', marginTop: 10},
  bottomLineText1: {color: COLORS.whiteColor, fontFamily: FONTS.MEDIUM},
  bottomLineText2: {
    fontFamily: FONTS.EXTRA_BOLD,
    textDecorationLine: 'underline',
    textDecorationColor: COLORS.whiteColor,
    textDecorationStyle: 'solid',
  },

  error: {
    color: COLORS.errorColor,
    fontFamily: FONTS.MEDIUM,
    fontSize: 10,
    marginLeft: 20,
  },
});

export default Register;
