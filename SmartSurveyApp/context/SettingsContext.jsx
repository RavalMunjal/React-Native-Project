import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  
  // Notification Toggles
  const [surveyReminders, setSurveyReminders] = useState(true);
  const [submissionAlerts, setSubmissionAlerts] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('@app_settings');
      if (storedSettings !== null) {
        const parsedSettings = JSON.parse(storedSettings);
        if (parsedSettings.notificationsEnabled !== undefined) setNotificationsEnabled(parsedSettings.notificationsEnabled);
        if (parsedSettings.locationEnabled !== undefined) setLocationEnabled(parsedSettings.locationEnabled);
        if (parsedSettings.darkModeEnabled !== undefined) setDarkModeEnabled(parsedSettings.darkModeEnabled);
        if (parsedSettings.autoSyncEnabled !== undefined) setAutoSyncEnabled(parsedSettings.autoSyncEnabled);
        if (parsedSettings.surveyReminders !== undefined) setSurveyReminders(parsedSettings.surveyReminders);
        if (parsedSettings.submissionAlerts !== undefined) setSubmissionAlerts(parsedSettings.submissionAlerts);
        if (parsedSettings.appNotifications !== undefined) setAppNotifications(parsedSettings.appNotifications);
      }
    } catch (e) {
      console.error('Failed to load settings', e);
    } finally {
      setIsLoaded(true);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      const currentSettings = {
        notificationsEnabled,
        locationEnabled,
        darkModeEnabled,
        autoSyncEnabled,
        surveyReminders,
        submissionAlerts,
        appNotifications,
        ...newSettings,
      };
      await AsyncStorage.setItem('@app_settings', JSON.stringify(currentSettings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  };

  const updateNotifications = (value) => {
    setNotificationsEnabled(value);
    saveSettings({ notificationsEnabled: value });
  };

  const updateLocation = (value) => {
    setLocationEnabled(value);
    saveSettings({ locationEnabled: value });
  };

  const updateDarkMode = (value) => {
    setDarkModeEnabled(value);
    saveSettings({ darkModeEnabled: value });
  };

  const updateAutoSync = (value) => {
    setAutoSyncEnabled(value);
    saveSettings({ autoSyncEnabled: value });
  };

  const updateSurveyReminders = (value) => {
    setSurveyReminders(value);
    saveSettings({ surveyReminders: value });
  };

  const updateSubmissionAlerts = (value) => {
    setSubmissionAlerts(value);
    saveSettings({ submissionAlerts: value });
  };

  const updateAppNotifications = (value) => {
    setAppNotifications(value);
    saveSettings({ appNotifications: value });
  };

  return (
    <SettingsContext.Provider
      value={{
        notificationsEnabled,
        updateNotifications,
        locationEnabled,
        updateLocation,
        darkModeEnabled,
        updateDarkMode,
        autoSyncEnabled,
        updateAutoSync,
        surveyReminders,
        updateSurveyReminders,
        submissionAlerts,
        updateSubmissionAlerts,
        appNotifications,
        updateAppNotifications,
        isLoaded,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
