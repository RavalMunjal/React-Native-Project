import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useSettings } from '../../context/SettingsContext';

export default function NotificationsScreen() {
  const {
    surveyReminders,
    updateSurveyReminders,
    submissionAlerts,
    updateSubmissionAlerts,
    appNotifications,
    updateAppNotifications,
  } = useSettings();

  const SettingRow = ({ title, description, value, onValueChange }) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.border, true: COLORS.primary }}
        thumbColor={COLORS.surface}
      />
    </View>
  );

  return (
    <ScreenContainer>
      <AppHeader title="Notifications" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Alert Preferences</Text>
        
        <View style={styles.card}>
          <SettingRow 
            title="Survey Reminders" 
            description="Get notified about pending surveys"
            value={surveyReminders}
            onValueChange={updateSurveyReminders}
          />
          <View style={styles.divider} />
          <SettingRow 
            title="Submission Alerts" 
            description="Confirmations for successful uploads"
            value={submissionAlerts}
            onValueChange={updateSubmissionAlerts}
          />
          <View style={styles.divider} />
          <SettingRow 
            title="App Notifications" 
            description="General updates and announcements"
            value={appNotifications}
            onValueChange={updateAppNotifications}
          />
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
    marginBottom: SPACING.m,
    marginLeft: SPACING.xs,
    marginTop: SPACING.s,
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
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
  },
  settingInfo: {
    flex: 1,
    paddingRight: SPACING.m,
  },
  settingTitle: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
  }
});
