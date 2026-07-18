import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { Ionicons } from '@expo/vector-icons';

export const SecondaryButton = ({ title, onPress, disabled = false, loading = false, icon = null }) => {
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
        <ActivityIndicator color={COLORS.primary} size="small" />
      ) : (
        <>
          {icon && <Ionicons name={icon} size={20} color={disabled ? COLORS.disabled : COLORS.primary} style={styles.icon} />}
          <Text style={[styles.title, disabled ? styles.titleDisabled : null]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    paddingHorizontal: SPACING.l,
    marginVertical: SPACING.s,
  },
  disabled: {
    borderColor: COLORS.disabled,
  },
  title: {
    color: COLORS.primary,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
  titleDisabled: {
    color: COLORS.disabled,
  },
  icon: {
    marginRight: SPACING.s,
  },
});
