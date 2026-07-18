import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const AppHeader = ({ title, showBack = false, rightIcon = null, onRightPress = null }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.surface} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.toggleDrawer?.()} style={styles.iconButton}>
            <Ionicons name="menu" size={24} color={COLORS.surface} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.rightContainer}>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
            <Ionicons name={rightIcon} size={24} color={COLORS.surface} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryDark,
    height: 60 + 44,
    paddingBottom: SPACING.s,
    paddingHorizontal: SPACING.s,
  },
  leftContainer: {
    width: 48,
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 48,
    alignItems: 'center',
  },
  title: {
    color: COLORS.surface,
    fontSize: SIZES.heading,
    fontWeight: '600',
  },
  iconButton: {
    padding: SPACING.s,
  },
});
