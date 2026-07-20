import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    name: 'Munjal Raval',
    email: 'munjal.raval@example.com',
    role: 'Field Inspector'
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem('@user_profile');
      if (storedProfile !== null) {
        setUserProfile(JSON.parse(storedProfile));
      }
    } catch (e) {
      console.error('Failed to load user profile', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const updateProfile = async (newProfile) => {
    try {
      const updatedProfile = { ...userProfile, ...newProfile };
      setUserProfile(updatedProfile);
      await AsyncStorage.setItem('@user_profile', JSON.stringify(updatedProfile));
      return { success: true };
    } catch (e) {
      console.error('Failed to save user profile', e);
      return { success: false, error: 'Failed to save profile' };
    }
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        updateProfile,
        isLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
