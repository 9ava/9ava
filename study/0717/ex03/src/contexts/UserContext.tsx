import { createContext, useState, ReactNode } from "react";

interface User {
  name: string;
  age: string | number;
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  loadUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({
    name: "익명",
    age: "미상",
  });

  const loadUserData = () => {
    setUser({
      name: "홍길동",
      age: 30,
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, loadUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
