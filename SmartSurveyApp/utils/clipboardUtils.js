import * as Clipboard from 'expo-clipboard';
import { Alert } from 'react-native';

export const copyToClipboard = async (text, successMessage = 'Copied to clipboard successfully.') => {
  if (!text) return;
  try {
    await Clipboard.setStringAsync(text);
    Alert.alert('Success', successMessage);
  } catch (error) {
    Alert.alert('Error', 'Failed to copy to clipboard.');
  }
};

export const getFromClipboard = async () => {
  try {
    const text = await Clipboard.getStringAsync();
    return text;
  } catch (error) {
    Alert.alert('Error', 'Failed to read from clipboard.');
    return '';
  }
};
