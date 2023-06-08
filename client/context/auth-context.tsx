import { instance, setInstance } from "@/pages/api/api";
import { AuthUserData } from "@/pages/api/types";
import { auth } from "@/utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useMemo } from "react";
import { createContext, useContext, useState } from "react";
interface AuthContextProviderProps {
  children: React.ReactElement | React.ReactElement[];
}
interface AuthContextType {
  authUserData: AuthUserData;
  setAuthUserData: React.Dispatch<React.SetStateAction<AuthUserData>>;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [authUserData, setAuthUserData] = useState<AuthUserData>(
    {} as AuthUserData
  );
  useEffect(() => {
    setInstance(instance);
  }, [authUserData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("currentUser", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      authUserData,
      setAuthUserData,
    }),
    [authUserData]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = (): AuthContextType => useContext(AuthContext);
