import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/AppHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { SecondaryButton } from '../../components/SecondaryButton';
import { PrimaryButton } from '../../components/PrimaryButton';
import { useSurvey } from '../../context/SurveyContext';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../../utils/dateUtils';

export default function SurveyDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getSurveyById, deleteSurvey } = useSurvey();
  const router = useRouter();
  
  const survey = getSurveyById(id);

  if (!survey) {
    return (
      <ScreenContainer>
        <AppHeader title="Survey Details" showBack />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color={COLORS.disabled} />
          <Text style={styles.errorText}>Survey not found</Text>
          <SecondaryButton title="Go Back" onPress={() => router.back()} />
        </View>
      </ScreenContainer>
    );
  }

  const handleDeleteConfirmed = async () => {
    const surveyId = Array.isArray(id) ? id[0] : id;
    const result = await deleteSurvey(surveyId);
    if (result.success) {
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace('/(drawer)/(tabs)/dashboard');
      }
    } else {
      Alert.alert('Error', 'Failed to delete survey.');
    }
  };

  const handleDelete = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete this survey?')) {
        handleDeleteConfirmed();
      }
    } else {
      Alert.alert(
        'Delete Survey',
        'Are you sure you want to delete this survey?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Delete', 
            style: 'destructive',
            onPress: handleDeleteConfirmed
          }
        ]
      );
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
      <AppHeader 
        title="Survey Details" 
        showBack 
      />
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.summaryCard}>
          <Text style={styles.idText}>ID: {survey.id}</Text>
          <Text style={styles.siteName}>{survey.siteName}</Text>
          
          <View style={styles.summaryRow}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={16} color={COLORS.surface} style={{ marginRight: 4 }} />
              <Text style={styles.dateText}>{formatDate(survey.surveyDate)}</Text>
            </View>
            
            {survey.priority && (
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(survey.priority) + '30' }]}>
                <Text style={[styles.priorityText, { color: getPriorityColor(survey.priority) }]}>
                  {survey.priority}
                </Text>
              </View>
            )}
          </View>
        </View>

        {renderSection(
          'Client Info',
          <View>
            <Text style={styles.bodyTextBold}>{survey.clientName}</Text>
            {survey.contact ? (
              <Text style={styles.bodyText}>Contact: {survey.contact.name} ({survey.contact.phone})</Text>
            ) : null}
          </View>,
          'briefcase-outline'
        )}

        {renderSection(
          'Project Description',
          <Text style={styles.bodyText}>{survey.description || 'N/A'}</Text>,
          'document-text-outline'
        )}

        {survey.photo && renderSection(
          'Site Photo',
          <Image source={{ uri: survey.photo }} style={styles.previewImage} />,
          'camera-outline'
        )}

        {survey.location && renderSection(
          'Location',
          <View>
            <Text style={styles.bodyText}>Latitude: {survey.location.latitude.toFixed(6)}</Text>
            <Text style={styles.bodyText}>Longitude: {survey.location.longitude.toFixed(6)}</Text>
          </View>,
          'location-outline'
        )}

        {survey.notes && renderSection(
          'Additional Notes',
          <Text style={styles.bodyText}>{survey.notes}</Text>,
          'clipboard-outline'
        )}

        <View style={styles.actionContainer}>
          <PrimaryButton 
            title="Edit Survey" 
            icon="create-outline" 
            onPress={() => router.push(`/edit-survey/${survey.id}`)} 
          />
          <SecondaryButton 
            title="Delete Survey" 
            icon="trash-outline" 
            onPress={handleDelete} 
          />
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
  actionContainer: {
    marginTop: SPACING.m,
    gap: SPACING.m,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  errorText: {
    fontSize: SIZES.heading,
    color: COLORS.textSecondary,
    marginVertical: SPACING.l,
  },
  summaryCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 16,
    padding: SPACING.l,
    marginBottom: SPACING.l,
    elevation: 3,
  },
  idText: {
    color: COLORS.surface,
    opacity: 0.8,
    fontSize: SIZES.small,
    marginBottom: SPACING.xs,
  },
  siteName: {
    color: COLORS.surface,
    fontSize: SIZES.title,
    fontWeight: '700',
    marginBottom: SPACING.m,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: COLORS.surface,
    fontSize: SIZES.body,
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
});
