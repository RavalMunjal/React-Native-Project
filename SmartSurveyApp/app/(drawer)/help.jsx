import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../../components/AppHeader';
import { ScreenContainer } from '../../components/ScreenContainer';
import { PrimaryButton } from '../../components/PrimaryButton';
import { COLORS } from '../../constants/colors';
import { SIZES } from '../../constants/typography';
import { SPACING } from '../../constants/spacing';

export default function HelpScreen() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I sync my surveys?",
      answer: "Surveys are automatically synced when you submit them if 'Auto Sync' is enabled in Settings. You can also manually submit them from the Drafts section."
    },
    {
      id: 2,
      question: "How can I edit a submitted survey?",
      answer: "Currently, submitted surveys cannot be edited to maintain data integrity. If you made a mistake, please contact your administrator."
    },
    {
      id: 3,
      question: "Why can't I attach a photo?",
      answer: "Please ensure you have granted camera permissions to the app. You can check your permission status in the Privacy & Security settings."
    }
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSupport = async () => {
    const email = 'support@smartsurveyapp.com';
    const subject = 'Support Request - Smart Survey App';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Email Not Configured",
          "Your device doesn't have an email app configured. Please contact us directly at " + email
        );
      }
    } catch (_) {
      Alert.alert('Error', 'Could not open the email client. Please ensure you have an email app installed.');
    }
  };

  return (
    <ScreenContainer>
      <AppHeader title="Help & Support" showBack={true} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        
        <View style={styles.faqContainer}>
          {faqs.map((faq) => (
            <View key={faq.id} style={styles.faqCard}>
              <TouchableOpacity 
                style={styles.faqQuestionRow} 
                onPress={() => toggleFaq(faq.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color={COLORS.textSecondary} 
                />
              </TouchableOpacity>
              
              {expandedFaq === faq.id && (
                <View style={styles.faqAnswerContainer}>
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Need More Help?</Text>
        <View style={styles.contactCard}>
          <Ionicons name="chatbubbles-outline" size={40} color={COLORS.primary} style={styles.contactIcon} />
          <Text style={styles.contactTitle}>Contact Support</Text>
          <Text style={styles.contactDescription}>
            Can&apos;t find what you&apos;re looking for? Our support team is here to help.
          </Text>
          <PrimaryButton title="Email Support" onPress={handleContactSupport} />
        </View>

        <View style={styles.aboutContainer}>
          <Text style={styles.aboutTitle}>Smart Survey App</Text>
          <Text style={styles.aboutText}>Version 1.0.0</Text>
          <Text style={styles.aboutText}>© 2026 Smart Solutions Inc.</Text>
        </View>

      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: SPACING.m,
  },
  sectionTitle: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.m,
    marginLeft: SPACING.xs,
    marginTop: SPACING.s,
  },
  faqContainer: {
    marginBottom: SPACING.l,
  },
  faqCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: SPACING.s,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.m,
  },
  faqQuestion: {
    flex: 1,
    fontSize: SIZES.body,
    fontWeight: '500',
    color: COLORS.textPrimary,
    paddingRight: SPACING.m,
  },
  faqAnswerContainer: {
    padding: SPACING.m,
    paddingTop: 0,
    backgroundColor: COLORS.surface,
  },
  faqAnswer: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
  contactCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: SPACING.l,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: COLORS.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactIcon: {
    marginBottom: SPACING.s,
  },
  contactTitle: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  contactDescription: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.l,
  },
  aboutContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  aboutTitle: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  aboutText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
});
