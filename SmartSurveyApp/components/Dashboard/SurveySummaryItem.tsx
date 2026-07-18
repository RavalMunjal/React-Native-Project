import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type SurveySummaryItemProps = {
  title: string;
  client: string;
  date: string;
  status: 'Completed' | 'Pending' | 'In Progress';
};

export default function SurveySummaryItem({ title, client, date, status }: SurveySummaryItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'Completed': return '#10B981'; // Emerald 500
      case 'Pending': return '#F59E0B'; // Amber 500
      case 'In Progress': return '#3B82F6'; // Blue 500
      default: return '#64748B'; // Slate 500
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'Completed': return '#D1FAE5'; // Emerald 100
      case 'Pending': return '#FEF3C7'; // Amber 100
      case 'In Progress': return '#DBEAFE'; // Blue 100
      default: return '#F1F5F9'; // Slate 100
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={22} color="#475569" />
      </View>
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.client}>{client}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor() }]}>
        <Text style={[styles.statusText, { color: getStatusColor() }]}>{status}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  client: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 2,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#94A3B8',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
