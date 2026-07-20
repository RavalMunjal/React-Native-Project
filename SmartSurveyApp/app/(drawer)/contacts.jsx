import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TextInput, Platform } from 'react-native';
import * as Contacts from 'expo-contacts';
import { AppHeader } from '../../components/AppHeader';
import { ContactCard } from '../../components/ContactCard';
import { PrimaryButton } from '../../components/PrimaryButton';
import { ScreenContainer } from '../../components/ScreenContainer';
import { EmptyState } from '../../components/EmptyState';
import { useSurvey } from '../../context/SurveyContext';
import { copyToClipboard } from '../../utils/clipboardUtils';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const { setSelectedContact } = useSurvey();
  const router = useRouter();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setErrorMsg(null);
    
    if (Platform.OS === 'web') {
      const webMockContacts = [
        { id: 'web1', name: 'Alice Johnson (Web)', phoneNumbers: [{ number: '+1 (555) 123-4567' }] },
        { id: 'web2', name: 'Bob Smith (Web)', phoneNumbers: [{ number: '+1 (555) 987-6543' }] },
        { id: 'web3', name: 'Charlie Brown (Web)', phoneNumbers: [{ number: '+1 (555) 555-0123' }] },
      ];
      setContacts(webMockContacts);
      setIsLoading(false);
      setIsRefreshing(false);
      return;
    }

    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access contacts was denied.');
        setIsLoading(false);
        setIsRefreshing(false);
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        // Filter out contacts without a name or phone number
        const validContacts = data.filter(
          contact => contact.name && contact.phoneNumbers && contact.phoneNumbers.length > 0
        );

        // Sort contacts alphabetically
        const sortedData = validContacts.sort((a, b) => {
          const nameA = a.name || '';
          const nameB = b.name || '';
          return nameA.localeCompare(nameB);
        });
        setContacts(sortedData);
      } else {
        setContacts([]);
      }
    } catch (_) {
      setErrorMsg('Unable to fetch contacts. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const filteredContacts = useMemo(() => {
    if (!searchQuery) return contacts;
    
    const query = searchQuery.toLowerCase();
    return contacts.filter(contact => {
      const nameMatch = contact.name && contact.name.toLowerCase().includes(query);
      const phoneMatch = contact.phoneNumbers && contact.phoneNumbers.some(
        phone => phone.number && phone.number.includes(query)
      );
      return nameMatch || phoneMatch;
    });
  }, [contacts, searchQuery]);

  const handleSelectContact = useCallback((contact) => {
    setSelectedContact(contact);
    Alert.alert(
      'Contact Selected',
      `${contact.name} has been added to the survey.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  }, [setSelectedContact, router]);

  const handleCopyNumber = useCallback((number) => {
    if (number && number !== 'No Number') {
      copyToClipboard(number, 'Contact number copied successfully.');
    }
  }, []);

  const renderContact = useCallback(({ item }) => (
    <ContactCard 
      contact={item} 
      onSelect={handleSelectContact} 
      onCopy={handleCopyNumber} 
    />
  ), [handleSelectContact, handleCopyNumber]);

  return (
    <ScreenContainer>
      <AppHeader title="Contacts" showBack />
      
      <View style={styles.content}>
        {isLoading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.statusText}>Loading contacts...</Text>
          </View>
        ) : errorMsg ? (
          <View style={styles.centerContainer}>
            <Ionicons name="people-outline" size={64} color={COLORS.disabled} style={styles.icon} />
            <Text style={styles.errorText}>{errorMsg}</Text>
            <PrimaryButton title="Try Again" onPress={() => fetchContacts(false)} />
          </View>
        ) : (
          <>
            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search by name or number..."
                placeholderTextColor={COLORS.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <Ionicons 
                  name="close-circle" 
                  size={20} 
                  color={COLORS.textSecondary} 
                  onPress={() => setSearchQuery('')}
                  style={styles.clearIcon}
                />
              )}
            </View>
            
            <View style={styles.counterContainer}>
              <Text style={styles.counterText}>
                Showing {filteredContacts.length} of {contacts.length} contacts
              </Text>
            </View>
            
            <FlatList
              data={filteredContacts}
              keyExtractor={(item) => item.id || Math.random().toString()}
              renderItem={renderContact}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
              refreshing={isRefreshing}
              onRefresh={() => fetchContacts(true)}
              ListEmptyComponent={
                <EmptyState 
                  icon="search-outline" 
                  title="No contacts found" 
                  description={searchQuery ? "Try a different search term." : "No contacts are available on this device."} 
                />
              }
              initialNumToRender={15}
              maxToRenderPerBatch={20}
              windowSize={10}
            />
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  icon: {
    marginBottom: SPACING.m,
  },
  statusText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.m,
  },
  errorText: {
    fontSize: SIZES.body,
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: SPACING.l,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    margin: SPACING.m,
    paddingHorizontal: SPACING.m,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 48,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.textPrimary,
    height: '100%',
  },
  clearIcon: {
    padding: SPACING.xs,
  },
  counterContainer: {
    paddingHorizontal: SPACING.m,
    paddingBottom: SPACING.s,
  },
  counterText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: SPACING.xxl,
  },
});
