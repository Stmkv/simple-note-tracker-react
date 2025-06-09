import { createContext } from 'react';
import { useState } from 'react';

export const UserContext = createContext({
  userId: 1,
});

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(1);

  return <UserContext.Provider>{children}</UserContext.Provider>;
};
