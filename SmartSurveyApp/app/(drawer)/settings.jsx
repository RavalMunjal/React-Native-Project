import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { useSettings } from '../../context/SettingsContext';
import { useSurvey } from '../../context/SurveyContext';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const {
    notificationsEnabled,
    updateNotifications,
    locationEnabled,
    updateLocation,
    darkModeEnabled,
    updateDarkMode,
    autoSyncEnabled,
    updateAutoSync,
  } = useSettings();
  
  const { resetSurveyDraft, clearAllHistory } = useSurvey();

  const handleClearDraft = () => {
    Alert.alert(
      "Clear Draft",
      "Are you sure you want to clear your current survey draft?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Clear", 
          style: "destructive",
          onPress: () => {
            resetSurveyDraft();
            Alert.alert("Success", "Survey draft cleared.");
          }
        }
      ]
    );
  };

  const handleClearHistory = () => {
    Alert.alert(
      "Clear History",
      "Are you sure you want to delete all survey history? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete All", 
          style: "destructive",
          onPress: async () => {
            const result = await clearAllHistory();
            if (result.success) {
              Alert.alert("Success", "Survey history cleared.");
            } else {
              Alert.alert("Error", "Failed to clear survey history.");
            }
          }
        }
      ]
    );
  };

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

  const ActionRow = ({ title, description, icon, onPress, color = COLORS.textPrimary }) => (
    <TouchableOpacity style={styles.actionRow} onPress={onPress}>
      <View style={styles.actionInfo}>
        <View style={styles.actionTitleRow}>
          <Ionicons name={icon} size={20} color={color} style={styles.actionIcon} />
          <Text style={[styles.settingTitle, { color }]}>{title}</Text>
        </View>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <AppHeader title="Settings" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>General</Text>
        <View style={styles.card}>
          <SettingRow 
            title="Push Notifications" 
            description="Receive alerts for new assignments"
            value={notificationsEnabled}
            onValueChange={updateNotifications}
          />
          <View style={styles.divider} />
          <SettingRow 
            title="Dark Mode" 
            description="Toggle app visual theme"
            value={darkModeEnabled}
            onValueChange={updateDarkMode}
          />
        </View>

        <Text style={styles.sectionTitle}>Survey & Data</Text>
        <View style={styles.card}>
          <SettingRow 
            title="Location Services" 
            description="Tag surveys with GPS coordinates"
            value={locationEnabled}
            onValueChange={updateLocation}
          />
          <View style={styles.divider} />
          <SettingRow 
            title="Auto Sync" 
            description="Sync data when connected to Wi-Fi"
            value={autoSyncEnabled}
            onValueChange={updateAutoSync}
          />
        </View>

        <Text style={styles.sectionTitle}>Data Management</Text>
        <View style={styles.card}>
          <ActionRow 
            title="Clear Survey Draft" 
            description="Discard your current unsubmitted survey"
            icon="document-text-outline"
            onPress={handleClearDraft}
          />
          <View style={styles.divider} />
          <ActionRow 
            title="Clear Survey History" 
            description="Permanently delete all submitted surveys"
            icon="trash-outline"
            color={COLORS.danger}
            onPress={handleClearHistory}
          />
        </View>

        <View style={styles.footerInfo}>
          <Text style={styles.versionText}>Smart Survey App</Text>
          <Text style={styles.versionNumber}>Version 1.0.0</Text>
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
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.m,
  },
  actionInfo: {
    flex: 1,
    paddingRight: SPACING.m,
  },
  actionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionIcon: {
    marginRight: SPACING.s,
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
  },
  footerInfo: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
  },
  versionText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  versionNumber: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
