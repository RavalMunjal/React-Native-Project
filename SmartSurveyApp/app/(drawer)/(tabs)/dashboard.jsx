import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppHeader } from '../../../components/AppHeader';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { StatCard } from '../../../components/StatCard';
import { ActionCard } from '../../../components/ActionCard';
import { SurveyCard } from '../../../components/SurveyCard';
import { EmptyState } from '../../../components/EmptyState';
import { useSurvey } from '../../../context/SurveyContext';
import { COLORS } from '../../../constants/colors';
import { SIZES } from '../../../constants/typography';
import { SPACING } from '../../../constants/spacing';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const { surveys } = useSurvey();
  const router = useRouter();

  const todayStr = new Date().toISOString().split('T')[0];
  
  const stats = useMemo(() => {
    return {
      total: surveys.length,
      today: surveys.filter(s => (s.surveyDate || s.createdAt).startsWith(todayStr)).length,
      highPriority: surveys.filter(s => s.priority?.toLowerCase() === 'high').length
    };
  }, [surveys, todayStr]);

  const recentSurveys = useMemo(() => surveys.slice(0, 3), [surveys]);

  const navigateTo = (route) => {
    router.push(route);
  };

  return (
    <ScreenContainer>
      <AppHeader title="Dashboard" />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.dateText}>{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
        </View>

        <View style={styles.studentCard}>
          <Text style={styles.studentCardTitle}>Student Details</Text>
          <Text style={styles.studentInfo}>Name: Munjal Raval</Text>
          <Text style={styles.studentInfo}>Project: Smart Field Survey & Inspection App</Text>
          <Text style={styles.studentInfo}>Technology: React Native with Expo</Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard title="Today's Surveys" value={stats.today} color={COLORS.accent} />
          <StatCard title="Total Surveys" value={stats.total} color={COLORS.primary} />
          <StatCard title="High Priority" value={stats.highPriority} color={COLORS.danger} />
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <ActionCard 
            title="New Survey" 
            icon="add-circle-outline" 
            color={COLORS.primary} 
            onPress={() => navigateTo('/(drawer)/(tabs)/new-survey')} 
          />
          <ActionCard 
            title="Camera" 
            icon="camera-outline" 
            color={COLORS.accent} 
            onPress={() => navigateTo('/(drawer)/camera')} 
          />
          <ActionCard 
            title="Contacts" 
            icon="people-outline" 
            color={COLORS.success} 
            onPress={() => navigateTo('/(drawer)/contacts')} 
          />
          <ActionCard 
            title="Location" 
            icon="location-outline" 
            color={COLORS.warning} 
            onPress={() => navigateTo('/(drawer)/location')} 
          />
        </View>

        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Surveys</Text>
          {surveys.length > 0 && (
            <Text style={styles.seeAllText} onPress={() => navigateTo('/(drawer)/(tabs)/history')}>
              See All
            </Text>
          )}
        </View>

        {recentSurveys.length > 0 ? (
          recentSurveys.map(survey => (
            <SurveyCard 
              key={survey.id} 
              survey={survey} 
              onPress={() => navigateTo(`/survey-details/${survey.id}`)} 
            />
          ))
        ) : (
          <EmptyState 
            icon="folder-open-outline" 
            title="No surveys yet" 
            description="Create your first field survey to get started." 
          />
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.m,
  },
  welcomeSection: {
    marginBottom: SPACING.m,
  },
  welcomeText: {
    fontSize: SIZES.title,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dateText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  studentCard: {
    backgroundColor: COLORS.primaryDark,
    borderRadius: 16,
    padding: SPACING.m,
    marginBottom: SPACING.l,
    elevation: 3,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  studentCardTitle: {
    color: COLORS.surface,
    fontSize: SIZES.heading,
    fontWeight: '600',
    marginBottom: SPACING.s,
  },
  studentInfo: {
    color: COLORS.surface,
    fontSize: SIZES.body,
    marginBottom: SPACING.xs,
    opacity: 0.9,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.l,
    marginHorizontal: -SPACING.xs,
  },
  sectionTitle: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.m,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.s,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  seeAllText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: SPACING.m,
  },
});
