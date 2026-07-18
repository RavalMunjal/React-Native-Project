import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SIZES } from '../../constants/typography';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.drawerHeader}>
        <View style={styles.appIconPlaceholder}>
          <Ionicons name="map-outline" size={32} color={COLORS.surface} />
        </View>
        <Text style={styles.appName}>Smart Field Survey</Text>
        <Text style={styles.appSubtitle}>Field Inspection System</Text>
      </View>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLORS.primary + '15',
        drawerActiveTintColor: COLORS.primary,
        drawerInactiveTintColor: COLORS.textSecondary,
        drawerLabelStyle: {
          marginLeft: -16,
          fontSize: SIZES.body,
          fontWeight: '500',
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Dashboard',
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="survey-preview"
        options={{
          drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="camera"
        options={{
          drawerLabel: 'Camera',
          drawerIcon: ({ color }) => <Ionicons name="camera-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="contacts"
        options={{
          drawerLabel: 'Contacts',
          drawerIcon: ({ color }) => <Ionicons name="people-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="location"
        options={{
          drawerLabel: 'Location',
          drawerIcon: ({ color }) => <Ionicons name="location-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="clipboard"
        options={{
          drawerLabel: 'Clipboard',
          drawerIcon: ({ color }) => <Ionicons name="clipboard-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: 'Settings',
          drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    backgroundColor: COLORS.primaryDark,
    marginTop: -4,
    paddingTop: 40,
    marginBottom: 10,
  },
  appIconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  appName: {
    color: COLORS.surface,
    fontSize: SIZES.heading,
    fontWeight: '700',
  },
  appSubtitle: {
    color: COLORS.surface,
    opacity: 0.8,
    fontSize: SIZES.small,
    marginTop: 4,
  },
});
