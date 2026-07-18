import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';

export const PrioritySelector = ({ selected, onSelect, error }) => {
  const options = ['Low', 'Medium', 'High'];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Priority</Text>
      <View style={[styles.optionsContainer, error ? styles.optionsError : null]}>
        {options.map((option, index) => {
          const isSelected = selected === option;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                isSelected ? styles.optionSelected : null,
                index === 0 ? styles.optionFirst : null,
                index === options.length - 1 ? styles.optionLast : null,
              ]}
              onPress={() => onSelect(option)}
            >
              <Text style={[styles.optionText, isSelected ? styles.optionTextSelected : null]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.m,
  },
  label: {
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  optionsContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  optionsError: {
    borderColor: COLORS.danger,
  },
  option: {
    flex: 1,
    paddingVertical: SPACING.s,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  optionFirst: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  optionLast: {
    borderRightWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  optionSelected: {
    backgroundColor: COLORS.primary + '20',
  },
  optionText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  errorText: {
    color: COLORS.danger,
    fontSize: SIZES.small,
    marginTop: SPACING.xs,
  },
});
