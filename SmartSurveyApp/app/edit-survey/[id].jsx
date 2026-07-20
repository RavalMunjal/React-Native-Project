import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, Alert, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/AppHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { InputField } from '../../components/InputField';
import { PrioritySelector } from '../../components/PrioritySelector';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useSurvey } from '../../context/SurveyContext';
import { validateSurvey } from '../../utils/validation';
import { SPACING } from '../../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SecondaryButton } from '../../components/SecondaryButton';

export default function EditSurveyScreen() {
  const { id } = useLocalSearchParams();
  const { getSurveyById, updateSurvey } = useSurvey();
  const router = useRouter();

  const [surveyData, setSurveyData] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const existingSurvey = getSurveyById(id);
    if (existingSurvey) {
      setSurveyData(existingSurvey);
    }
  }, [id, getSurveyById]);

  if (!surveyData) {
    return (
      <ScreenContainer>
        <AppHeader title="Edit Survey" showBack />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={COLORS.disabled} />
          <Text style={styles.errorText}>Survey not found</Text>
          <SecondaryButton title="Go Back" onPress={() => router.back()} />
        </View>
      </ScreenContainer>
    );
  }

  const handleChange = (field, value) => {
    setSurveyData({ ...surveyData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleSave = async () => {
    const validation = validateSurvey(surveyData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert('Validation Error', 'Please check the required fields and try again.');
      return;
    }
    
    setIsSaving(true);
    const result = await updateSurvey(id, surveyData);
    setIsSaving(false);

    if (result.success) {
      Alert.alert(
        'Success',
        'Survey updated successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } else {
      Alert.alert('Error', result.error || 'Failed to update survey.');
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Edit Survey" showBack />
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <InputField
            label="Site Name *"
            value={surveyData.siteName || ''}
            onChangeText={(text) => handleChange('siteName', text)}
            placeholder="Enter site name"
            error={errors.siteName}
          />
          
          <InputField
            label="Client Name *"
            value={surveyData.clientName || ''}
            onChangeText={(text) => handleChange('clientName', text)}
            placeholder="Enter client name"
            error={errors.clientName}
          />

          <InputField
            label="Description *"
            value={surveyData.description || ''}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Enter project description"
            multiline
            error={errors.description}
          />

          <PrioritySelector
            selected={surveyData.priority}
            onSelect={(priority) => handleChange('priority', priority)}
            error={errors.priority}
          />

          {/* Location, Contact, and Photo are currently disabled in Edit mode to preserve integrity, but notes can be edited */}
          <InputField
            label="Notes"
            value={surveyData.notes || ''}
            onChangeText={(text) => handleChange('notes', text)}
            placeholder="Any additional notes?"
            multiline
          />

          <PrimaryButton 
            title={isSaving ? "Saving..." : "Save Changes"} 
            onPress={handleSave} 
            icon="save-outline"
            disabled={isSaving}
          />

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.m,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: 20,
    color: COLORS.textSecondary,
    marginVertical: SPACING.l,
  },
});
