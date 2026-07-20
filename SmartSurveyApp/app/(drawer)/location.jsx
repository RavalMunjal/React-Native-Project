import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { AppHeader } from '../../components/AppHeader';
import MapComponent from '../../components/MapComponent';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useSurvey } from '../../context/SurveyContext';
import { copyToClipboard } from '../../utils/clipboardUtils';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSettings } from '../../context/SettingsContext';

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setCurrentLocation } = useSurvey();
  const { locationEnabled } = useSettings();
  const router = useRouter();

  const fetchLocation = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      if (!locationEnabled) {
        setErrorMsg('Location services are disabled in settings.');
        setIsLoading(false);
        return;
      }

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.');
        setIsLoading(false);
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
        accuracy: locationData.coords.accuracy,
        timestamp: locationData.timestamp || Date.now()
      });
    } catch (_) {
      setErrorMsg('Failed to fetch location. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [locationEnabled]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  const handleCopy = () => {
    if (location) {
      const text = `Latitude: ${location.latitude.toFixed(6)}, Longitude: ${location.longitude.toFixed(6)}`;
      copyToClipboard(text, 'Location copied successfully.');
    }
  };

  const handleUseLocation = () => {
    if (location) {
      setCurrentLocation(location);
      router.back();
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Location" showBack />
      <View style={styles.content}>
        
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.statusText}>Fetching current location...</Text>
          </View>
        ) : errorMsg ? (
          <View style={styles.centerContainer}>
            <Ionicons name="location-outline" size={64} color={COLORS.disabled} style={styles.icon} />
            <Text style={styles.errorText}>{errorMsg}</Text>
            <PrimaryButton title="Try Again" onPress={fetchLocation} />
          </View>
        ) : location ? (
          <View style={styles.locationContainer}>
            <View style={styles.mapContainer}>
              <MapComponent location={location} />
            </View>

            <View style={styles.card}>
              
              <View style={styles.dataRow}>
                <Text style={styles.label}>Latitude:</Text>
                <Text style={styles.value}>{location.latitude.toFixed(6)}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.label}>Longitude:</Text>
                <Text style={styles.value}>{location.longitude.toFixed(6)}</Text>
              </View>
              
              <View style={styles.dataRow}>
                <Text style={styles.label}>Accuracy:</Text>
                <Text style={styles.value}>{Math.round(location.accuracy)} metres</Text>
              </View>

              <View style={styles.dataRow}>
                <Text style={styles.label}>Captured At:</Text>
                <Text style={styles.value}>{new Date(location.timestamp).toLocaleTimeString()}</Text>
              </View>
            </View>

            <View style={styles.actions}>
              <SecondaryButton title="Refresh Location" icon="refresh-outline" onPress={fetchLocation} />
              <SecondaryButton title="Copy Location" icon="copy-outline" onPress={handleCopy} />
              <PrimaryButton title="Use This Location" icon="checkmark-outline" onPress={handleUseLocation} />
            </View>
          </View>
        ) : null}

      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SPACING.m,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: SPACING.m,
  },
  statusText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.m,
  },
  errorText: {
    fontSize: SIZES.body,
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: SPACING.l,
    paddingHorizontal: SPACING.xl,
  },
  locationContainer: {
    flex: 1,
  },
  mapContainer: {
    height: 250,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: SPACING.l,
    backgroundColor: COLORS.border,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.l,
    marginBottom: SPACING.l,
    elevation: 2,
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: SPACING.l,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  label: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  value: {
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  actions: {
    marginTop: 'auto',
    marginBottom: SPACING.l,
  },
});
