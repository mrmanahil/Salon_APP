import React from 'react';
import AuthContextProvider from './Auth.context';
import Auth from './components/AuthScreen';

function AuthScreen() {
  return (
    <AuthContextProvider>
      <Auth />
    </AuthContextProvider>
  );
}

export default AuthScreen;
