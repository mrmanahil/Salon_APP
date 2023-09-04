import {createContext, useMemo, useState} from 'react';

export interface UserContextValues {
  setUser: (user: any) => void;
  user: any;
}

const userContextDefaultValues: UserContextValues = {
  user: undefined,
  setUser: () => {},
};

export const UserContext = createContext<UserContextValues>(
  userContextDefaultValues,
);

const UserContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUserState] = useState();

  const setUser = (newUser: any) => {
    setUserState(newUser);
  };

  const values: UserContextValues = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user],
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
