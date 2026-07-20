import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../../../components/AppHeader';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { StatCard } from '../../../components/StatCard';
import { useSurvey } from '../../../context/SurveyContext';
import { useUser } from '../../../context/UserContext';
import { COLORS } from '../../../constants/colors';
import { SIZES } from '../../../constants/typography';
import { SPACING } from '../../../constants/spacing';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { surveys } = useSurvey();
  const { userProfile } = useUser();
  const router = useRouter();

  const stats = useMemo(() => {
    const total = surveys.length;
    const completed = surveys.filter(s => s.status === 'Completed' || s.status === 'completed').length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [surveys]);

  const MenuItem = ({ icon, title, onPress, color = COLORS.textPrimary }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuIconContainer}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <Text style={[styles.menuItemTitle, { color }]}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  const handleEditProfile = () => {
    router.push('/(drawer)/edit-profile');
  };

  const handleNotifications = () => {
    router.push('/(drawer)/notifications');
  };

  const handlePrivacy = () => {
    router.push('/(drawer)/privacy');
  };

  const handleHelp = () => {
    router.push('/(drawer)/help');
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: () => router.replace('/')
        }
      ]
    );
  };

  return (
    <ScreenContainer>
      <AppHeader title="Profile" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={100} color={COLORS.primary} />
          </View>
          <Text style={styles.nameText}>{userProfile.name}</Text>
          <Text style={styles.emailText}>{userProfile.email}</Text>
          <Text style={styles.roleText}>{userProfile.role}</Text>
          
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Survey Statistics</Text>
          <View style={styles.statsRow}>
            <StatCard title="Total" value={stats.total} color={COLORS.primary} />
            <StatCard title="Completed" value={stats.completed} color={COLORS.success} />
            <StatCard title="Pending" value={stats.pending} color={COLORS.warning} />
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.menuCard}>
            <MenuItem icon="settings-outline" title="Settings" onPress={() => router.push('/(drawer)/settings')} />
            <View style={styles.divider} />
            <MenuItem icon="notifications-outline" title="Notifications" onPress={handleNotifications} />
            <View style={styles.divider} />
            <MenuItem icon="shield-checkmark-outline" title="Privacy & Security" onPress={handlePrivacy} />
            <View style={styles.divider} />
            <MenuItem icon="help-buoy-outline" title="Help & Support" onPress={handleHelp} />
          </View>
        </View>

        <View style={[styles.menuSection, styles.logoutSection]}>
          <View style={styles.menuCard}>
            <MenuItem icon="log-out-outline" title="Log Out" color={COLORS.danger} onPress={handleLogout} />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.m,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: SPACING.l,
    backgroundColor: COLORS.surface,
    padding: SPACING.l,
    borderRadius: 16,
    elevation: 2,
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    marginBottom: SPACING.s,
  },
  nameText: {
    fontSize: SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  emailText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  roleText: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.primary,
    marginBottom: SPACING.m,
  },
  editButton: {
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.s,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
  },
  editButtonText: {
    color: COLORS.surface,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  statsContainer: {
    marginBottom: SPACING.l,
  },
  sectionTitle: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.m,
    marginLeft: SPACING.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -SPACING.xs,
  },
  menuSection: {
    marginBottom: SPACING.l,
  },
  menuCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.m,
    backgroundColor: COLORS.surface,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.m,
  },
  menuItemTitle: {
    fontSize: SIZES.body,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginLeft: 68,
  },
  logoutSection: {
    marginTop: -SPACING.s,
  }
});
