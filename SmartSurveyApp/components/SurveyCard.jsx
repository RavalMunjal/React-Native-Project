import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../utils/dateUtils';

export const SurveyCard = ({ survey, onPress }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return COLORS.danger;
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.idText}>{survey.id}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(survey.priority) + '20' }]}>
          <Text style={[styles.priorityText, { color: getPriorityColor(survey.priority) }]}>
            {survey.priority}
          </Text>
        </View>
      </View>
      
      <Text style={styles.siteName} numberOfLines={1}>{survey.siteName}</Text>
      
      <View style={styles.row}>
        <Ionicons name="person-outline" size={16} color={COLORS.textSecondary} />
        <Text style={styles.detailText} numberOfLines={1}>{survey.clientName}</Text>
      </View>
      
      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
        <Text style={styles.detailText}>{formatDate(survey.surveyDate)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.m,
    marginBottom: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  idText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: SPACING.s,
    paddingVertical: 2,
    borderRadius: 4,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  siteName: {
    fontSize: SIZES.subheading,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.s,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  detailText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginLeft: SPACING.s,
    flex: 1,
  },
});
