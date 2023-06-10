import React from "react";
import { auth } from "../utils/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
export const AuthContext = React.createContext();
// console.log(auth);
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
const [currentUser, setCurrentUser] = React.useState(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
