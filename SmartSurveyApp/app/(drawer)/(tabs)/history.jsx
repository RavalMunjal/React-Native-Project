import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert, Platform } from 'react-native';
import { AppHeader } from '../../../components/AppHeader';
import { SurveyCard } from '../../../components/SurveyCard';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { EmptyState } from '../../../components/EmptyState';
import { SecondaryButton } from '../../../components/SecondaryButton';
import { useSurvey } from '../../../context/SurveyContext';
import { COLORS } from '../../../constants/colors';
import { SIZES } from '../../../constants/typography';
import { SPACING } from '../../../constants/spacing';
import { useRouter } from 'expo-router';

export default function HistoryScreen() {
  const { surveys, clearAllHistory } = useSurvey();
  const router = useRouter();

  const handleClearHistoryConfirmed = async () => {
    const result = await clearAllHistory();
    if (result.success) {
      Alert.alert('Success', 'Survey history has been cleared.');
    }
  };

  const handleClearHistory = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to delete all survey history? This action cannot be undone.')) {
        handleClearHistoryConfirmed();
      }
    } else {
      Alert.alert(
        'Clear All History',
        'Are you sure you want to delete all survey history? This action cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Clear All', 
            style: 'destructive',
            onPress: handleClearHistoryConfirmed
          }
        ]
      );
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Survey History" />
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.countText}>Total Surveys: {surveys.length}</Text>
          {surveys.length > 0 && (
            <SecondaryButton 
              title="Clear All" 
              icon="trash-outline" 
              onPress={handleClearHistory} 
            />
          )}
        </View>

        <FlatList
          data={surveys}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <SurveyCard 
              survey={item} 
              onPress={() => router.push(`/survey-details/${item.id}`)} 
            />
          )}
          ListEmptyComponent={
            <EmptyState 
              icon="folder-open-outline" 
              title="No History" 
              description="You haven't submitted any surveys yet." 
            />
          }
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: SPACING.m,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
  },
  countText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.xxl,
  },
});
