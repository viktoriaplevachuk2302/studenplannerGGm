import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, provider } from "../firebase/config";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  const logout = () => signOut(auth);
  const loginWithGoogle = () => signInWithPopup(auth, provider);

  return (
    <AuthContext.Provider value={{ currentUser, logout, loginWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
