import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { AppHeader } from '../../../components/AppHeader';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { InputField } from '../../../components/InputField';
import { PrioritySelector } from '../../../components/PrioritySelector';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { SecondaryButton } from '../../../components/SecondaryButton';
import { useSurvey } from '../../../context/SurveyContext';
import { validateSurvey } from '../../../utils/validation';
import { SPACING } from '../../../constants/spacing';
import { useRouter } from 'expo-router';

export default function NewSurveyScreen() {
  const { surveyDraft, updateSurveyDraft } = useSurvey();
  const router = useRouter();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set current date if not set
    if (!surveyDraft.surveyDate) {
      updateSurveyDraft({ surveyDate: new Date().toISOString() });
    }
  }, []);

  const handleChange = (field, value) => {
    updateSurveyDraft({ [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const handleContinue = () => {
    const validation = validateSurvey(surveyDraft);
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert('Validation Error', 'Please check the required fields and try again.');
      return;
    }
    router.push('/survey-preview');
  };

  return (
    <ScreenContainer>
      <AppHeader title="New Survey" />
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <InputField
            label="Site Name *"
            value={surveyDraft.siteName || ''}
            onChangeText={(text) => handleChange('siteName', text)}
            placeholder="Enter site name"
            error={errors.siteName}
          />
          
          <InputField
            label="Client Name *"
            value={surveyDraft.clientName || ''}
            onChangeText={(text) => handleChange('clientName', text)}
            placeholder="Enter client name"
            error={errors.clientName}
          />

          <InputField
            label="Description *"
            value={surveyDraft.description || ''}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Enter project description"
            multiline
            error={errors.description}
          />

          <PrioritySelector
            selected={surveyDraft.priority}
            onSelect={(priority) => handleChange('priority', priority)}
            error={errors.priority}
          />

          <View style={styles.actionsContainer}>
            <SecondaryButton 
              title={surveyDraft.photo ? "Retake Site Photo" : "Capture Site Photo"} 
              icon="camera-outline" 
              onPress={() => router.push('/(drawer)/camera')} 
            />
            <SecondaryButton 
              title={surveyDraft.contact ? "Change Contact" : "Select Contact"} 
              icon="people-outline" 
              onPress={() => router.push('/(drawer)/contacts')} 
            />
            <SecondaryButton 
              title={surveyDraft.location ? "Update Location" : "Add Current Location"} 
              icon="location-outline" 
              onPress={() => router.push('/(drawer)/location')} 
            />
          </View>
          
          <InputField
            label="Notes"
            value={surveyDraft.notes || ''}
            onChangeText={(text) => handleChange('notes', text)}
            placeholder="Any additional notes?"
            multiline
          />

          <PrimaryButton 
            title="Continue to Preview" 
            onPress={handleContinue} 
            icon="arrow-forward"
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
  actionsContainer: {
    marginVertical: SPACING.s,
    marginBottom: SPACING.l,
  },
});
