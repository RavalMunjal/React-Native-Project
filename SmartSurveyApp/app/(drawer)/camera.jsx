import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useSurvey } from '../../context/SurveyContext';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('back');
  const [isCapturing, setIsCapturing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const { setSelectedPhoto } = useSurvey();
  const router = useRouter();

  if (!permission) {
    return (
      <ScreenContainer>
        <AppHeader title="Camera" showBack />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.statusText}>Checking camera permission...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (!permission.granted) {
    return (
      <ScreenContainer>
        <AppHeader title="Camera" showBack />
        <View style={styles.centerContainer}>
          <Ionicons name="camera-outline" size={64} color={COLORS.disabled} style={styles.icon} />
          <Text style={styles.statusText}>We need your permission to show the camera</Text>
          <PrimaryButton title="Grant Permission" onPress={requestPermission} />
        </View>
      </ScreenContainer>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current && !isCapturing) {
      try {
        setIsCapturing(true);
        const options = { quality: 0.7, base64: true };
        const photoData = await cameraRef.current.takePictureAsync(options);
        setPhoto({ ...photoData, capturedAt: new Date().toISOString() });
      } catch (error) {
        Alert.alert('Error', 'Failed to capture photo. Please try again.');
      } finally {
        setIsCapturing(false);
      }
    }
  };

  const savePhoto = () => {
    if (photo) {
      setSelectedPhoto(photo);
      router.back();
    }
  };

  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this captured photo?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => setPhoto(null)
        }
      ]
    );
  };

  if (photo) {
    return (
      <ScreenContainer style={styles.container}>
        <AppHeader title="Preview" showBack />
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo.uri }} style={styles.previewImage} />
          <View style={styles.photoInfo}>
            <Text style={styles.photoInfoText}>
              Captured: {new Date(photo.capturedAt).toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View style={styles.previewActions}>
          <SecondaryButton title="Retake" onPress={() => setPhoto(null)} icon="refresh-outline" />
          <PrimaryButton title="Use Photo" onPress={savePhoto} icon="checkmark-outline" />
          <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
            <Ionicons name="trash-outline" size={24} color={COLORS.danger} />
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader title="Camera" showBack />
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse-outline" size={28} color={COLORS.surface} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.captureButton, isCapturing && styles.captureButtonDisabled]} 
            onPress={takePicture}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <ActivityIndicator color={COLORS.primary} size="large" />
            ) : (
              <View style={styles.captureButtonInner} />
            )}
          </TouchableOpacity>
          <View style={styles.placeholderButton} />
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  icon: {
    marginBottom: SPACING.m,
  },
  statusText: {
    fontSize: SIZES.body,
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: SPACING.l,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderButton: {
    width: 50,
  },
  captureButton: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.surface,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  previewContainer: {
    flex: 1,
    padding: SPACING.m,
  },
  previewImage: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: COLORS.border,
  },
  photoInfo: {
    position: 'absolute',
    bottom: SPACING.xl,
    left: SPACING.xl,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
  },
  photoInfoText: {
    color: COLORS.surface,
    fontSize: SIZES.small,
  },
  previewActions: {
    padding: SPACING.m,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.m,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: SIZES.body,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
});
