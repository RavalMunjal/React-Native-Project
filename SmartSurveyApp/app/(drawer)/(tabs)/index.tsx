import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import QuickActionCard from '@/components/Dashboard/QuickActionCard';
import SurveySummaryItem from '@/components/Dashboard/SurveySummaryItem';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      {/* Custom App Header - with SafeArea paddingTop to prevent overlap */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 16) }]}>
        <TouchableOpacity onPress={openDrawer} style={styles.iconButton}>
          <Ionicons name="menu-outline" size={26} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Survey</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person" size={24} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Screen & Student Details */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeTextContent}>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.studentName}>Brownie</Text>
            <View style={styles.idBadge}>
              <Text style={styles.studentId}>STU-2026-042</Text>
            </View>
          </View>
          <View style={styles.welcomeIconContainer}>
            <Ionicons name="school" size={32} color="#FFFFFF" />
          </View>
        </View>

        {/* Today's Survey Count */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="document-text" size={20} color="#3B82F6" />
            </View>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Total Today</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="time" size={20} color="#EF4444" />
            </View>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Pending</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIconWrapper, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
            </View>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Quick Action Cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>
        <View style={styles.quickActionsGrid}>
          <View style={styles.row}>
            <QuickActionCard 
              title="New Survey" 
              icon="add-circle" 
              iconColor="#10B981"
              iconBgColor="#D1FAE5"
              onPress={() => console.log('New Survey')} 
            />
            <QuickActionCard 
              title="View Clients" 
              icon="people" 
              iconColor="#3B82F6"
              iconBgColor="#DBEAFE"
              onPress={() => console.log('Clients')} 
            />
          </View>
          <View style={styles.row}>
            <QuickActionCard 
              title="Reports" 
              icon="bar-chart" 
              iconColor="#8B5CF6"
              iconBgColor="#EDE9FE"
              onPress={() => console.log('Reports')} 
            />
            <QuickActionCard 
              title="Settings" 
              icon="settings" 
              iconColor="#F59E0B"
              iconBgColor="#FEF3C7"
              onPress={() => console.log('Settings')} 
            />
          </View>
        </View>

        {/* Recent Survey Summary */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Surveys</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.listContainer}>
          <SurveySummaryItem 
            title="Building Inspection - North Wing"
            client="Acme Corp"
            date="Today, 10:30 AM"
            status="Completed"
          />
          <SurveySummaryItem 
            title="Site Assessment - Lot 42"
            client="Stark Industries"
            date="Today, 09:00 AM"
            status="In Progress"
          />
          <SurveySummaryItem 
            title="Safety Audit - Warehouse B"
            client="Wayne Enterprises"
            date="Yesterday"
            status="Pending"
          />
        </View>
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  welcomeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#1E3A8A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  welcomeTextContent: {
    flex: 1,
  },
  greeting: {
    color: '#93C5FD',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  studentName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  idBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  studentId: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  welcomeIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  seeAll: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  quickActionsGrid: {
    marginBottom: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listContainer: {
    marginBottom: 20,
  },
});
