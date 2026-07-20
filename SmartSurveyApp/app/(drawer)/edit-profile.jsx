import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { AppHeader } from '../../components/AppHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { InputField } from '../../components/InputField';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';
import { useUser } from '../../context/UserContext';
import { SPACING } from '../../constants/spacing';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const { userProfile, updateProfile } = useUser();
  const router = useRouter();

  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [role, setRole] = useState(userProfile.role);
  
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address';
        valid = false;
      }
    }

    if (!role.trim()) {
      newErrors.role = 'Role is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSave = async () => {
    if (!validate()) return;
    
    setIsSaving(true);
    const result = await updateProfile({ name, email, role });
    setIsSaving(false);

    if (result.success) {
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      Alert.alert('Error', result.error || 'Failed to update profile');
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Edit Profile" showBack />
      
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <InputField
          label="Full Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          error={errors.name}
        />
        
        <InputField
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email address"
          keyboardType="email-address"
          error={errors.email}
        />
        
        <InputField
          label="Role / Title"
          value={role}
          onChangeText={setRole}
          placeholder="e.g. Field Inspector"
          error={errors.role}
        />

        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}>
            <SecondaryButton 
              title="Cancel" 
              onPress={() => router.back()} 
              disabled={isSaving} 
            />
          </View>
          <View style={styles.spacer} />
          <View style={{ flex: 1 }}>
            <PrimaryButton 
              title={isSaving ? "Saving..." : "Save Changes"} 
              onPress={handleSave} 
              disabled={isSaving} 
            />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: SPACING.m,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: SPACING.l,
    justifyContent: 'space-between'
  },
  spacer: {
    width: SPACING.m,
  }
});
