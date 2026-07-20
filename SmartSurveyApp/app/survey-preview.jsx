import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { AppHeader } from '../components/AppHeader';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import { useSurvey } from '../context/SurveyContext';
import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SurveyPreviewScreen() {
  const { surveyDraft, submitSurvey, resetSurveyDraft } = useSurvey();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSaveDraft = () => {
    Alert.alert(
      'Draft Saved',
      'Your survey progress has been saved as a draft. You can continue later.',
      [{ text: 'OK', onPress: () => router.navigate('/(drawer)/(tabs)/dashboard') }]
    );
  };

  const handleDiscard = () => {
    Alert.alert(
      'Discard Survey',
      'Are you sure you want to discard this survey? All progress will be lost.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Discard', 
          style: 'destructive',
          onPress: async () => {
            await resetSurveyDraft();
            router.navigate('/(drawer)/(tabs)/dashboard');
          }
        }
      ]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const result = await submitSurvey();
    setIsSubmitting(false);
    
    if (result.success) {
      Alert.alert(
        'Survey Submitted',
        'Your field survey has been submitted successfully!',
        [{ text: 'Great', onPress: () => router.navigate('/(drawer)/(tabs)/dashboard') }]
      );
    } else {
      Alert.alert('Submission Failed', result.error || 'An error occurred during submission.');
    }
  };

  const renderSection = (title, content, icon) => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Ionicons name={icon} size={20} color={COLORS.primary} style={styles.sectionIcon} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionContent}>
        {content}
      </View>
    </View>
  );

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return COLORS.danger;
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Review Survey" showBack />
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.summaryCard}>
          <Text style={styles.siteName}>{surveyDraft.siteName || 'Unnamed Site'}</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.clientName}>{surveyDraft.clientName || 'No Client Specified'}</Text>
            {surveyDraft.priority && (
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(surveyDraft.priority) + '20' }]}>
                <Text style={[styles.priorityText, { color: getPriorityColor(surveyDraft.priority) }]}>
                  {surveyDraft.priority}
                </Text>
              </View>
            )}
          </View>
        </View>

        {renderSection(
          'Project Description',
          <Text style={styles.bodyText}>
            {surveyDraft.description || 'No description provided.'}
          </Text>,
          'document-text-outline'
        )}

        {renderSection(
          'Site Photo',
          surveyDraft.photo ? (
            <Image source={{ uri: surveyDraft.photo }} style={styles.previewImage} />
          ) : (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No photo captured</Text>
            </View>
          ),
          'camera-outline'
        )}

        {renderSection(
          'Contact Person',
          surveyDraft.contact ? (
            <View>
              <Text style={styles.bodyTextBold}>{surveyDraft.contact.name}</Text>
              <Text style={styles.bodyText}>{surveyDraft.contact.phone}</Text>
            </View>
          ) : (
            <Text style={styles.bodyText}>No contact selected.</Text>
          ),
          'person-outline'
        )}

        {renderSection(
          'Location Data',
          surveyDraft.location ? (
            <View>
              <Text style={styles.bodyText}>Lat: {surveyDraft.location.latitude.toFixed(6)}</Text>
              <Text style={styles.bodyText}>Lng: {surveyDraft.location.longitude.toFixed(6)}</Text>
            </View>
          ) : (
            <Text style={styles.bodyText}>Location not recorded.</Text>
          ),
          'location-outline'
        )}

        {renderSection(
          'Additional Notes',
          <Text style={styles.bodyText}>
            {surveyDraft.notes || 'No additional notes.'}
          </Text>,
          'clipboard-outline'
        )}

        <View style={styles.actionsContainer}>
          <PrimaryButton 
            title="Submit Survey" 
            icon="cloud-upload-outline" 
            onPress={handleSubmit} 
            loading={isSubmitting}
          />
          <SecondaryButton 
            title="Save as Draft" 
            icon="save-outline" 
            onPress={handleSaveDraft}
            disabled={isSubmitting}
          />
          <TouchableOpacity 
            style={styles.discardButton} 
            onPress={handleDiscard}
            disabled={isSubmitting}
          >
            <Text style={styles.discardText}>Discard Survey</Text>
          </TouchableOpacity>
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
  summaryCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 16,
    padding: SPACING.l,
    marginBottom: SPACING.l,
    elevation: 3,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  siteName: {
    color: COLORS.surface,
    fontSize: SIZES.title,
    fontWeight: '700',
    marginBottom: SPACING.s,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clientName: {
    color: COLORS.surface,
    fontSize: SIZES.body,
    opacity: 0.9,
  },
  priorityBadge: {
    paddingHorizontal: SPACING.m,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: SIZES.small,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.s,
  },
  sectionIcon: {
    marginRight: SPACING.s,
  },
  sectionTitle: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  sectionContent: {
    paddingLeft: SPACING.xs,
  },
  bodyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  bodyTextBold: {
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: COLORS.border,
  },
  emptyBox: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.disabled,
  },
  emptyText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body,
  },
  actionsContainer: {
    marginTop: SPACING.m,
    gap: SPACING.xs,
  },
  discardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.m,
    marginTop: SPACING.s,
  },
  discardText: {
    color: COLORS.danger,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
});
