import { createContext, useState } from "react";

interface User {
  userID: number;
  userEmail: string;
  userTypeID: number;
  isVerified: boolean;
}

interface UserContext {
  user: User | null;
  setUser: (user: User) => void;
}

interface UserContextState {
  user: User | null;
}

const defaultContextState: UserContext = {
  user: null,
  setUser: () => undefined,
};

export const UserContext = createContext<UserContext>(defaultContextState);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [contextState, setContextState] = useState<UserContextState>(defaultContextState);

  function setUser(user: User) {
    console.log(user);
  }

  return (
    <UserContext.Provider
      value={{
        user: contextState.user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
