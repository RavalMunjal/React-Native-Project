import { Slot } from 'expo-router';
import { SurveyProvider } from '../context/SurveyContext';
import { SettingsProvider, useSettings } from '../context/SettingsContext';
import { UserProvider } from '../context/UserContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function AppContent() {
  const { darkModeEnabled } = useSettings();
  return (
    <>
      <StatusBar style={darkModeEnabled ? 'light' : 'dark'} />
      <UserProvider>
        <SurveyProvider>
          <Slot />
        </SurveyProvider>
      </UserProvider>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
