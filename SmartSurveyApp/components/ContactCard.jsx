import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';
import { SIZES } from '../constants/typography';
import { SPACING } from '../constants/spacing';
import { Ionicons } from '@expo/vector-icons';

export const ContactCard = ({ contact, onSelect, onCopy }) => {
  const getInitials = (name) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const getPhoneNumber = () => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      return contact.phoneNumbers[0].number;
    }
    return 'No Number';
  };

  const phoneNumber = getPhoneNumber();
  const contactName = contact.name || 'Unknown Contact';

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials(contact.name)}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>{contactName}</Text>
        <Text style={styles.phone}>{phoneNumber}</Text>
      </View>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.iconButton} 
          onPress={() => onCopy(phoneNumber)}
          disabled={phoneNumber === 'No Number'}
        >
          <Ionicons 
            name="copy-outline" 
            size={20} 
            color={phoneNumber === 'No Number' ? COLORS.disabled : COLORS.primary} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.selectButton, phoneNumber === 'No Number' && styles.selectButtonDisabled]} 
          onPress={() => onSelect({ name: contactName, phone: phoneNumber })}
          disabled={phoneNumber === 'No Number'}
        >
          <Text style={styles.selectText}>Select</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.m,
  },
  avatarText: {
    fontSize: SIZES.heading,
    fontWeight: '700',
    color: COLORS.primary,
  },
  infoContainer: {
    flex: 1,
    marginRight: SPACING.s,
  },
  name: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  phone: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: SPACING.s,
    marginRight: SPACING.xs,
  },
  selectButton: {
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: SPACING.m,
    paddingVertical: SPACING.s,
    borderRadius: 8,
  },
  selectButtonDisabled: {
    backgroundColor: COLORS.disabled + '30',
  },
  selectText: {
    color: COLORS.primary,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
});
