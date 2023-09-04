import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {COLORS, CONSTANTS, FONTS} from '../../../config/setup';
import {useForm, Controller} from 'react-hook-form';
import {LoginFormValidation} from './constant';
import {authApi} from '../../../api';
import {useUserContext} from '../../../hook/useUser';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

function Login() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const getToken = async () => {
    messaging()
      .getToken({senderId: firebase.app().options.messagingSenderId})
      .then(resToken => {
        setToken(resToken);
      });

    return '';
  };

  const {setUser} = useUserContext();

  const formMethods = useForm({
    resolver: yupResolver(LoginFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignIn = useCallback(() => {
    navigation.navigate('HomeDrawer' as never);
  }, [navigation]);

  const login = async (values: any) => {
    setLoading(true);

    values.token = token;

    const {responseData, errorMessage, isDone} = await authApi.login(values);

    setLoading(false);

    if (!isDone) {
      setError(errorMessage);
      return;
    }

    setUser(responseData.data);
    onSignIn();
  };

  const onSubmitHandler = () => {
    formMethods.handleSubmit(login)();
  };

  useEffect(() => {
    getToken();
  }, []);

  // {"data": {"customer": {"customerID": 12, "customerName": "maazi", "userID": 26}, "email": "maaz@maaz.com", "isVerified": true, "name": "maazi", "salt": "$2b$14$LTmtfsig/Mbo9nvYoZSdWO", "userID": 26, "userTypeID": 1}, "message": "User Logged in Successfully", "status": 200}

  return (
    <>
      <View style={styles.authInputs}>
        <View style={[styles.authInputMarginBottom]}>
          <Controller
            control={formMethods.control}
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
        <Controller
          control={formMethods.control}
          name="password"
          render={({field}) => (
            <TextInput
              {...field}
              style={styles.authInput}
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

      <TouchableOpacity
        onPress={onSubmitHandler}
        disabled={loading}
        style={styles.authButtonContainer}>
        <Text style={styles.authButtonText}>
          {loading ? <ActivityIndicator color={COLORS.darkColor} /> : 'SIGN IN'}
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
          Don`t have an account ?{'  '}
          <Text style={styles.bottomLineText2}>SIGN UP</Text>
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
  bottomLineContainer: {display: 'flex', alignItems: 'center', marginTop: 0},
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

export default Login;
