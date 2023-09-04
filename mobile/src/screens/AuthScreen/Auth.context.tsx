import React, {createContext, useCallback, useMemo, useState} from 'react';

export const AUTH_OPTIONS = {
  SIGN_IN: '1',
  SIGN_UP: '2',
};

interface AuthContextProps {
  authOption: string;
  onAuthOptionChange: (newOption: string) => () => void;
}

const defaultAuthContextProps: AuthContextProps = {
  authOption: AUTH_OPTIONS.SIGN_IN,
  onAuthOptionChange: () => () => {},
};

export const AuthContext = createContext<AuthContextProps>(
  defaultAuthContextProps,
);

const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
  const [selectedAuthOption, setSelectedAuthOption] = useState(
    AUTH_OPTIONS.SIGN_IN,
  );

  const onAuthOptionChange = useCallback(
    (newOption: string) => () => {
      if (selectedAuthOption !== newOption) {
        setSelectedAuthOption(newOption);
      }
    },
    [selectedAuthOption],
  );

  const contextValues: AuthContextProps = useMemo(
    () => ({
      authOption: selectedAuthOption,
      onAuthOptionChange,
    }),
    [selectedAuthOption, onAuthOptionChange],
  );

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
