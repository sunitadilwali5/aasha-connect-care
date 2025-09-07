import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  fullName: string;
  email: string;
  phone?: string;
  setupFor: 'myself' | 'loved-one';
}

interface LovedOneData {
  fullName: string;
  phoneNumber: string;
  birthDate: string;
  relationship: string;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  lovedOneData: LovedOneData | null;
  setLovedOneData: (data: LovedOneData) => void;
  phoneNumber: string;
  setPhoneNumber: (phone: string) => void;
  profileId: string | null;
  setProfileId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [lovedOneData, setLovedOneData] = useState<LovedOneData | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [profileId, setProfileId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        lovedOneData,
        setLovedOneData,
        phoneNumber,
        setPhoneNumber,
        profileId,
        setProfileId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};