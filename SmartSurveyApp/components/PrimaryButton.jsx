import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { Ionicons } from '@expo/vector-icons';

export const PrimaryButton = ({ title, onPress, disabled = false, loading = false, icon = null }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled || loading ? styles.disabled : null
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.surface} size="small" />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={20} color={COLORS.surface} style={styles.icon} />}
          <Text style={styles.title}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    paddingHorizontal: SPACING.l,
    marginVertical: SPACING.s,
    elevation: 2,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabled: {
    backgroundColor: COLORS.disabled,
    elevation: 0,
    shadowOpacity: 0,
  },
  title: {
    color: COLORS.surface,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  icon: {
    marginRight: SPACING.s,
  },
});
