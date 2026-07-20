import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { AppHeader } from '../../components/AppHeader';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { useSurvey } from '../../context/SurveyContext';
import { copyToClipboard } from '../../utils/clipboardUtils';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

export default function ClipboardScreen() {
  const { surveyDraft, setNotes } = useSurvey();
  const [clipboardContent, setClipboardContent] = useState('');

  const fetchClipboardContent = async () => {
    try {
      const content = await Clipboard.getStringAsync();
      setClipboardContent(content);
    } catch (_) {
      // Failed to read clipboard
    }
  };

  useEffect(() => {
    fetchClipboardContent();
    const interval = setInterval(fetchClipboardContent, 2000); // Check clipboard periodically for updates
    return () => clearInterval(interval);
  }, []);

  const handleCopySurveyId = () => {
    if (surveyDraft.id) {
      copyToClipboard(surveyDraft.id, 'Survey ID copied successfully.');
    } else {
      Alert.alert('Not Available', 'Survey ID is generated upon submission.');
    }
  };

  const handleCopyContactNumber = () => {
    const phone = surveyDraft.contact?.phone;
    if (phone && phone !== 'No Number') {
      copyToClipboard(phone, 'Contact number copied successfully.');
    } else {
      Alert.alert('Not Available', 'No contact number is available in the current draft.');
    }
  };

  const handleCopyLocation = () => {
    const loc = surveyDraft.location;
    if (loc) {
      const text = `Latitude: ${loc.latitude.toFixed(6)}, Longitude: ${loc.longitude.toFixed(6)}`;
      copyToClipboard(text, 'Location copied successfully.');
    } else {
      Alert.alert('Not Available', 'No location data is available in the current draft.');
    }
  };

  const handlePasteNotes = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        const currentNotes = surveyDraft.notes ? surveyDraft.notes + '\n' : '';
        setNotes(currentNotes + text);
        Alert.alert('Success', 'Clipboard content pasted into notes.');
      } else {
        Alert.alert('Empty', 'Clipboard is empty.');
      }
    } catch (_) {
      Alert.alert('Error', 'Failed to paste from clipboard.');
    }
  };

  const handleClearClipboard = async () => {
    try {
      await Clipboard.setStringAsync('');
      setClipboardContent('');
      Alert.alert('Success', 'Clipboard cleared successfully.');
    } catch (_) {
      Alert.alert('Error', 'Failed to clear clipboard.');
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Clipboard Tools" showBack />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Copy to Clipboard</Text>
          <Text style={styles.cardDescription}>Easily copy current survey data to your device clipboard.</Text>
          
          <SecondaryButton 
            title="Copy Survey ID" 
            icon="copy-outline" 
            onPress={handleCopySurveyId} 
          />
          
          <SecondaryButton 
            title="Copy Contact Number" 
            icon="copy-outline" 
            onPress={handleCopyContactNumber} 
            disabled={!surveyDraft.contact?.phone || surveyDraft.contact?.phone === 'No Number'}
          />
          
          <SecondaryButton 
            title="Copy Location" 
            icon="copy-outline" 
            onPress={handleCopyLocation} 
            disabled={!surveyDraft.location}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Paste & Clear</Text>
          <Text style={styles.cardDescription}>Manage clipboard contents.</Text>
          
          <View style={styles.clipboardPreview}>
            <Text style={styles.previewLabel}>Current Clipboard:</Text>
            <Text style={styles.previewText} numberOfLines={2}>
              {clipboardContent ? clipboardContent : 'Clipboard is empty'}
            </Text>
          </View>

          <PrimaryButton 
            title="Paste to Survey Notes" 
            icon="clipboard-outline" 
            onPress={handlePasteNotes} 
            disabled={!clipboardContent}
          />
          
          <SecondaryButton 
            title="Clear Clipboard" 
            icon="trash-outline" 
            onPress={handleClearClipboard} 
            disabled={!clipboardContent}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Current Survey Notes</Text>
          <View style={styles.notesContainer}>
            <Text style={styles.notesText}>
              {surveyDraft.notes ? surveyDraft.notes : 'No notes added yet.'}
            </Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.m,
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
  cardTitle: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.m,
  },
  clipboardPreview: {
    backgroundColor: COLORS.background,
    padding: SPACING.m,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.m,
  },
  previewLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewText: {
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
  },
  notesContainer: {
    backgroundColor: COLORS.background,
    padding: SPACING.m,
    borderRadius: 8,
    minHeight: 100,
  },
  notesText: {
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
});
