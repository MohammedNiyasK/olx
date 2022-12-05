import { createContext, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  
} from "firebase/auth";

import { auth } from "../Components/firebase/firebaseConfig";

export const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const [user, setUser] = useState("");
  const [userCreatedData, setUserCreatedData] = useState();
 

  return (
    <UserContext.Provider
      value={{
        createUser,
        signInUser,
        user,
        setUser,
        userCreatedData,
        setUserCreatedData,
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
