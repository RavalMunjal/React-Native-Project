import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as Contacts from 'expo-contacts';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppHeader } from '../../components/AppHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SecondaryButton } from '../../components/SecondaryButton';
import { useSurvey } from '../../context/SurveyContext';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useRouter } from 'expo-router';

export default function PrivacyScreen() {
  const [cameraStatus, setCameraStatus] = useState('Undetermined');
  const [locationStatus, setLocationStatus] = useState('Undetermined');
  const [contactsStatus, setContactsStatus] = useState('Undetermined');
  
  const { clearAllHistory, resetSurveyDraft } = useSurvey();
  const router = useRouter();

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const camera = await Camera.getCameraPermissionsAsync();
      setCameraStatus(camera.status);
      
      const location = await Location.getForegroundPermissionsAsync();
      setLocationStatus(location.status);
      
      const contacts = await Contacts.getPermissionsAsync();
      setContactsStatus(contacts.status);
    } catch (_) {
      console.log('Permission checking failed');
    }
  };

  const requestCamera = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setCameraStatus(status);
    } catch (e) {
      console.error(e);
    }
  };

  const requestLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationStatus(status);
    } catch (e) {
      console.error(e);
    }
  };

  const requestContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      setContactsStatus(status);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClearLocalData = () => {
    Alert.alert(
      "Clear Local Data",
      "This will reset all your settings, clear your survey drafts, and delete your survey history. You will be logged out. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear Data", 
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              await clearAllHistory();
              await resetSurveyDraft();
              Alert.alert(
                "Data Cleared", 
                "All local data has been wiped.",
                [{ text: "OK", onPress: () => router.replace('/') }]
              );
            } catch (_) {
              Alert.alert("Error", "Failed to clear all data.");
            }
          }
        }
      ]
    );
  };

  const PermissionRow = ({ title, description, status, icon, onRequest }) => {
    const isGranted = status === 'granted';
    return (
      <View style={styles.permissionRow}>
        <View style={styles.permissionInfo}>
          <View style={styles.titleRow}>
            <Ionicons name={icon} size={22} color={COLORS.primary} style={styles.icon} />
            <Text style={styles.permissionTitle}>{title}</Text>
          </View>
          <Text style={styles.permissionDescription}>{description}</Text>
          <View style={[styles.statusBadge, isGranted ? styles.statusGranted : styles.statusDenied]}>
            <Text style={[styles.statusText, isGranted ? styles.textGranted : styles.textDenied]}>
              {status ? status.toUpperCase() : 'UNKNOWN'}
            </Text>
          </View>
        </View>
        {!isGranted && (
          <SecondaryButton title="Allow" onPress={onRequest} />
        )}
      </View>
    );
  };

  return (
    <ScreenContainer>
      <AppHeader title="Privacy & Security" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>App Permissions</Text>
        <Text style={styles.sectionDescription}>
          Manage the access this app has to your device&apos;s hardware and data.
        </Text>
        
        <View style={styles.card}>
          <PermissionRow 
            title="Camera"
            description="Required to attach photos to surveys"
            status={cameraStatus}
            icon="camera-outline"
            onRequest={requestCamera}
          />
          <View style={styles.divider} />
          <PermissionRow 
            title="Location"
            description="Required to tag surveys with GPS coordinates"
            status={locationStatus}
            icon="location-outline"
            onRequest={requestLocation}
          />
          <View style={styles.divider} />
          <PermissionRow 
            title="Contacts"
            description="Required to easily pick client contacts"
            status={contactsStatus}
            icon="people-outline"
            onRequest={requestContacts}
          />
        </View>

        <Text style={[styles.sectionTitle, { marginTop: SPACING.m }]}>Data Privacy</Text>
        <View style={styles.card}>
          <View style={styles.dataRow}>
            <View style={styles.dataInfo}>
              <Text style={styles.dataTitle}>Clear Local Data</Text>
              <Text style={styles.dataDescription}>
                Remove all saved settings and surveys from this device
              </Text>
            </View>
            <SecondaryButton title="Clear Data" onPress={handleClearLocalData} />
          </View>
        </View>
        
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.m,
  },
  sectionTitle: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
    marginLeft: SPACING.xs,
    marginTop: SPACING.s,
  },
  sectionDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
    marginLeft: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    paddingHorizontal: SPACING.m,
    marginBottom: SPACING.l,
    elevation: 2,
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  permissionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
  },
  permissionInfo: {
    flex: 1,
    paddingRight: SPACING.m,
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: SPACING.s,
  },
  permissionTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  permissionDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.s,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  statusGranted: {
    backgroundColor: COLORS.success + '20',
  },
  statusDenied: {
    backgroundColor: COLORS.warning + '20',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  textGranted: {
    color: COLORS.success,
  },
  textDenied: {
    color: COLORS.warning,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  },
  dataRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: SPACING.m,
  },
  dataInfo: {
    marginBottom: SPACING.m,
  },
  dataTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.danger,
    marginBottom: 4,
  },
  dataDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
});
