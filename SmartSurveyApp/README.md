# Smart Field Survey & Inspection App

<p align="center">
  <strong>A complete React Native and Expo application for creating, managing, and reviewing field surveys.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%20Native-Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="React Native Expo" />
  <img src="https://img.shields.io/badge/Expo%20Router-Navigation-173B57?style=for-the-badge" alt="Expo Router" />
  <img src="https://img.shields.io/badge/AsyncStorage-Local%20Storage-2F80ED?style=for-the-badge" alt="AsyncStorage" />
  <img src="https://img.shields.io/badge/Platform-Android%20%7C%20iOS-198754?style=for-the-badge" alt="Android and iOS" />
</p>

<p align="center">
  <a href="https://github.com/RavalMunjal/React-Native-Projectrepo">
    View GitHub Repository
  </a>
</p>

---

## Project Overview

**Smart Field Survey & Inspection App** is a mobile application built using React Native and Expo.

The app helps field inspectors create surveys, capture site photos, fetch their current location, select contacts, manage clipboard data, preview survey information, and maintain survey history.

The project includes:

- Professional and responsive user interface
- Expo Router navigation
- Bottom tab navigation
- Drawer navigation
- Device permissions
- Form validation
- Reusable components
- Confirmation alerts
- Loading and error states
- Persistent local data storage

---

## Application Screenshots

### Dashboard

<p align="center">
  <img src="assets/readme/dashboard-screen.png" alt="Smart Field Survey Dashboard" width="100%" />
</p>

The dashboard displays student details, today's survey count, total surveys, high-priority surveys, quick actions, and recent survey information.

---

### Drawer Navigation

<p align="center">
  <img src="assets/readme/drawer-navigation.png" alt="Smart Field Survey Drawer Navigation" width="340" />
</p>

The drawer provides quick access to Dashboard, Camera, Contacts, Location, Clipboard, and Settings.

---

### Profile and Survey Statistics

<p align="center">
  <img src="assets/readme/profile-screen.png" alt="Smart Field Survey Profile Screen" width="100%" />
</p>

The profile screen displays user information, survey statistics, preferences, and profile management options.

---

## Main Features

- Modern field survey dashboard
- Create and validate new surveys
- Capture and preview site photos
- Fetch current latitude and longitude
- Display location accuracy
- Read and search device contacts
- Select contacts for surveys
- Copy contact numbers
- Copy and paste survey information
- Preview survey data before submission
- Save survey history using AsyncStorage
- Search surveys by site, client, or survey ID
- Filter survey history by priority
- Edit existing surveys
- Delete surveys with confirmation
- Persistent profile information
- Settings and preference management
- Professional bottom tab navigation
- Custom drawer navigation
- Responsive design for Android and iOS

---

# Project Modules

## Module 1: Dashboard

The Dashboard provides a quick overview of the application and survey activity.

### Dashboard Features

- Custom application header
- Drawer menu button
- Welcome message
- Current date
- Student details
- Today's survey count
- Total survey count
- High-priority survey count
- Quick action cards
- Recent survey summary
- Empty state when no surveys are available

### Quick Actions

- New Survey
- Camera
- Contacts
- Location

Survey statistics are calculated using submitted survey data and are not hardcoded.

---

## Module 2: Create Survey

The Create Survey screen allows the field inspector to enter complete site information.

### Survey Fields

- Site Name
- Client Name
- Description
- Priority
- Survey Date
- Notes

### Priority Options

- Low
- Medium
- High

### Form Features

- Controlled input fields
- Required field validation
- Field-level error messages
- Minimum character validation
- Date validation
- Priority selection
- Add site photo
- Select client contact
- Add current location
- Continue to survey preview
- Draft data preservation

The survey form data remains available when the user temporarily opens Camera, Contacts, or Location screens.

---

## Module 3: Camera

The Camera module uses the `expo-camera` API.

### Camera Features

- Request camera permission
- Handle denied permission
- Open the device camera
- Front and back camera switching
- Capture site photo
- Display loading indicator
- Disable capture button during capture
- Preview captured image
- Display photo capture date and time
- Retake photo
- Delete photo
- Confirmation alert before deleting
- Save photo in active survey
- Camera error handling

The module uses modern Expo Camera APIs such as:

```js
CameraView
useCameraPermissions
```

---

## Module 4: Location

The Location module uses the `expo-location` API.

### Location Features

- Request foreground location permission
- Handle denied permission
- Fetch current device location
- Display latitude
- Display longitude
- Display location accuracy
- Display location capture time
- Refresh location
- Copy location to clipboard
- Save location to survey draft
- Loading and error states

Example location format:

```text
Latitude: 23.215635
Longitude: 72.636941
Accuracy: 12 metres
```

Location is fetched using:

```js
Location.requestForegroundPermissionsAsync()
Location.getCurrentPositionAsync()
```

---

## Module 5: Contacts

The Contacts module uses the `expo-contacts` API.

### Contacts Features

- Request contacts permission
- Handle denied permission
- Fetch device contacts
- Display contacts using FlatList
- Search contacts by name
- Search contacts by phone number
- Display total contact counter
- Pull-to-refresh
- Initial-based contact avatars
- Display primary phone number
- Display `No Number` when unavailable
- Copy contact number
- Select contact for active survey
- Loading state
- Empty contacts state
- Empty search result state
- Contact error handling

The contact counter can display information such as:

```text
Showing 25 of 120 contacts
```

---

## Module 6: Clipboard Tools

The Clipboard module uses the `expo-clipboard` API.

### Clipboard Features

- Copy survey ID
- Copy selected contact number
- Copy current location
- Paste clipboard text into survey notes
- Preserve existing notes while pasting
- Clear clipboard data
- Handle empty clipboard
- Disable unavailable actions
- Display success and error alerts

Clipboard operations use:

```js
Clipboard.setStringAsync()
Clipboard.getStringAsync()
```

---

## Module 7: Survey Preview

The Survey Preview screen displays all survey information before final submission.

### Preview Information

- Survey ID
- Site name
- Client name
- Description
- Priority
- Survey date
- Captured photo
- Photo capture time
- Contact name
- Contact number
- Latitude
- Longitude
- Location accuracy
- Survey notes

### Available Actions

- Edit Survey
- Submit Survey

When the survey is submitted:

1. Required fields are validated again.
2. The survey is saved in AsyncStorage.
3. The survey is added to Survey History.
4. A success alert is displayed.
5. The active draft is reset.
6. The user is redirected to Survey History.

The submit button prevents duplicate submissions.

---

## Module 8: Survey History

The Survey History screen manages all submitted surveys.

### History Features

- Display surveys using FlatList
- Search by Survey ID
- Search by site name
- Search by client name
- Filter surveys by priority
- View complete survey details
- Edit submitted surveys
- Delete surveys
- Delete confirmation alert
- Pull-to-refresh
- Survey counter
- Empty history state
- Empty search result state
- Persistent survey data

### Priority Filters

- All
- Low
- Medium
- High

Deleted surveys are removed from both global state and AsyncStorage.

---

# Survey Details

The Survey Details screen displays complete information about a selected survey.

### Available Actions

- View captured photo
- View selected contact
- View current location
- Copy Survey ID
- Copy contact number
- Copy location
- Edit survey
- Delete survey
- Return to Survey History

The screen uses a dynamic Expo Router route:

```text
survey-details/[id].jsx
```

A professional not-found screen is displayed when the survey does not exist.

---

# Edit Survey Functionality

Existing surveys can be edited without creating duplicate records.

When editing a survey:

- Existing survey data is loaded into the form.
- The original Survey ID is preserved.
- The existing record is updated.
- The `updatedAt` value is changed.
- Updated data is saved in AsyncStorage.
- A success message is displayed.

---

# Profile Screen

The Profile screen displays user and project information.

### Profile Information

- Student name
- Email address
- User role
- Survey statistics
- Total surveys
- Completed surveys
- Pending surveys
- Settings
- Notifications
- Privacy and Security
- Help and Support

The Edit Profile feature allows the user to update profile information and save it using AsyncStorage.

---

# Settings

The Settings screen provides application management options.

### Settings Features

- Clear active survey draft
- Clear survey history
- View permission information
- Application information
- Confirmation alerts before deleting data
- Persistent application preferences

---

# Notifications

The Notifications section includes working switches for:

- Survey reminders
- Submission alerts
- Application notifications

Notification preferences are stored using AsyncStorage.

---

# Privacy and Security

The Privacy and Security section displays permission information for:

- Camera
- Contacts
- Location

It also provides options to:

- Request permission again
- Open device settings
- Clear local application data
- Confirm destructive actions

---

# Help and Support

The Help and Support section includes:

- Frequently asked questions
- Project information
- App usage help
- Email support option
- Error handling when no supported email application is available

---

# Navigation

## Bottom Tab Navigation

The application contains four bottom tabs:

1. Dashboard
2. New Survey
3. History
4. Profile

### Tab Icons

- Dashboard: Home icon
- New Survey: Add icon
- History: Time icon
- Profile: Person icon

---

## Drawer Navigation

The application drawer contains:

1. Dashboard
2. Camera
3. Contacts
4. Location
5. Clipboard
6. Settings

The drawer opens using the menu icon available in the custom application header.

---

# Technologies Used

| Technology | Purpose |
|---|---|
| React Native | Mobile application development |
| Expo | Development environment and native APIs |
| Expo Router | File-based application navigation |
| React Context API | Global survey state management |
| AsyncStorage | Persistent local data storage |
| Ionicons | Professional application icons |
| JavaScript | Application functionality |
| React Hooks | State and lifecycle management |
| StyleSheet | Responsive application styling |

---

# Expo APIs Used

| Package | Purpose |
|---|---|
| `expo-camera` | Capture survey site photos |
| `expo-contacts` | Read and select device contacts |
| `expo-location` | Fetch the current device location |
| `expo-clipboard` | Copy and paste survey information |
| `expo-router` | File-based navigation |

---

# React Native Concepts Used

- `View`
- `Text`
- `Image`
- `Button`
- `Pressable`
- `FlatList`
- `ScrollView`
- `TextInput`
- `Alert`
- `ActivityIndicator`
- `RefreshControl`
- `Switch`
- `SafeAreaView`
- `KeyboardAvoidingView`
- `useState`
- `useEffect`
- `useMemo`
- `useCallback`
- `StyleSheet`

---

# Installation

## 1. Clone the Repository

```bash
git clone https://github.com/RavalMunjal/React-Native-Projectrepo.git
```

## 2. Open the Project Folder

```bash
cd React-Native-Projectrepo
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Start the Expo Development Server

```bash
npx expo start
```

## 5. Run the Application

- Scan the QR code using Expo Go on Android.
- Press `a` to open the Android emulator.
- Press `i` to open the iOS simulator on macOS.
- Press `w` to open the web version where supported.

> Camera, contacts, and location features work best on a real Android or iOS device.

---

# Required Packages

Install all required packages using Expo-compatible commands:

```bash
npx expo install expo-camera
npx expo install expo-contacts
npx expo install expo-location
npx expo install expo-clipboard
npx expo install expo-router
npx expo install @react-native-async-storage/async-storage
npx expo install react-native-safe-area-context
npx expo install react-native-screens
npx expo install react-native-gesture-handler
npx expo install react-native-reanimated
npx expo install @expo/vector-icons
```

---

# Suggested Project Structure

```text
React-Native-Projectrepo/
├── app/
│   ├── _layout.jsx
│   ├── index.jsx
│   │
│   ├── (drawer)/
│   │   ├── _layout.jsx
│   │   │
│   │   ├── (tabs)/
│   │   │   ├── _layout.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── new-survey.jsx
│   │   │   ├── history.jsx
│   │   │   └── profile.jsx
│   │   │
│   │   ├── camera.jsx
│   │   ├── contacts.jsx
│   │   ├── location.jsx
│   │   ├── clipboard.jsx
│   │   └── settings.jsx
│   │
│   ├── survey-preview.jsx
│   │
│   └── survey-details/
│       └── [id].jsx
│
├── components/
│   ├── AppHeader.jsx
│   ├── ScreenContainer.jsx
│   ├── PrimaryButton.jsx
│   ├── SecondaryButton.jsx
│   ├── InputField.jsx
│   ├── ActionCard.jsx
│   ├── StatCard.jsx
│   ├── SurveyCard.jsx
│   ├── ContactCard.jsx
│   ├── PrioritySelector.jsx
│   ├── EmptyState.jsx
│   ├── LoadingState.jsx
│   ├── SectionHeader.jsx
│   └── InfoRow.jsx
│
├── constants/
│   ├── colors.js
│   ├── spacing.js
│   └── typography.js
│
├── context/
│   └── SurveyContext.jsx
│
├── utils/
│   ├── dateUtils.js
│   ├── validation.js
│   ├── surveyUtils.js
│   └── clipboardUtils.js
│
├── assets/
│   └── readme/
│       ├── dashboard-screen.png
│       ├── drawer-navigation.png
│       └── profile-screen.png
│
├── app.json
├── babel.config.js
├── package.json
└── README.md
```

> The exact folder structure may be slightly different depending on the final project setup.

---

# Device Permissions

The application requires the following permissions.

## Camera Permission

Camera permission is required to capture survey site photos.

## Contacts Permission

Contacts permission is required to select a client or site contact from the device.

## Location Permission

Location permission is required to attach the current inspection location to the survey.

When a permission is denied, the application displays a user-friendly message and allows the user to request permission again.

---

# Local Data Storage

The project uses:

```text
@react-native-async-storage/async-storage
```

AsyncStorage is used to store:

- Survey history
- Current survey draft
- Profile information
- Notification preferences
- Application settings

Example storage keys:

```text
smart_field_surveys
smart_field_survey_draft
smart_field_profile
smart_field_notification_settings
```

Stored data remains available after closing and reopening the application.

---

# Survey Data Structure

Each submitted survey can contain the following information:

```js
{
  id,
  siteName,
  clientName,
  description,
  priority,
  surveyDate,
  photo,
  photoCapturedAt,
  contact,
  location,
  notes,
  createdAt,
  updatedAt,
  status
}
```

Example Survey ID:

```text
SUR-20260718-4821
```

---

# How to Use the App

1. Open the Dashboard.
2. Press **New Survey**.
3. Enter the site name and client information.
4. Add a survey description.
5. Select the survey priority.
6. Select the survey date.
7. Capture a site photo.
8. Select a contact from the device.
9. Fetch the current location.
10. Add survey notes.
11. Open the Survey Preview screen.
12. Review all entered information.
13. Submit the survey.
14. Open Survey History.
15. View, search, filter, edit, or delete submitted surveys.

---

# Validation and Error Handling

The application includes handling for:

- Empty required fields
- Invalid form values
- Short site or client names
- Missing survey priority
- Invalid survey date
- Camera permission denied
- Contacts permission denied
- Location permission denied
- Camera capture failure
- Location fetch failure
- Contacts loading failure
- Empty contact list
- Contact without a phone number
- Empty clipboard
- Missing survey record
- AsyncStorage read errors
- AsyncStorage write errors
- Delete confirmation
- Duplicate survey submission
- Unsupported email applications
- Navigation errors

Technical stack traces are not shown inside the application UI.

---

# UI Design

The application uses a professional and consistent colour system.

```js
const COLORS = {
  primary: '#173B57',
  primaryDark: '#102A3E',
  accent: '#2F80ED',
  background: '#F4F6F8',
  surface: '#FFFFFF',
  textPrimary: '#17202A',
  textSecondary: '#667085',
  border: '#DDE2E7',
  success: '#198754',
  warning: '#D97706',
  danger: '#DC3545',
  disabled: '#AAB2BD',
};
```

The interface includes:

- Professional navy colour theme
- Clean typography
- Consistent spacing
- Rounded cards
- Light borders
- Soft shadows
- Professional Ionicons
- Responsive layouts
- Accessible buttons
- Clear loading indicators
- Error messages
- Empty-state screens
- Success alerts
- Confirmation alerts

The application does not use random colours, neon colours, unnecessary gradients, emojis, or unprofessional icons.

---

# Performance

The application follows React Native performance practices:

- Uses FlatList for long lists
- Uses stable keys for list items
- Avoids using array index as a key
- Uses `useMemo` for filtered lists
- Uses `useCallback` for list actions
- Avoids unnecessary state duplication
- Avoids nesting FlatList inside vertical ScrollView
- Loads contact information efficiently
- Uses reusable components
- Avoids unnecessary rerenders

---

# Testing Checklist

- [x] Application starts successfully
- [x] Root route redirects correctly
- [x] Dashboard loads properly
- [x] Drawer navigation works
- [x] Bottom tabs work
- [x] Dashboard quick actions work
- [x] Survey form validation works
- [x] Survey draft remains saved
- [x] Camera permission works
- [x] Photo capture works
- [x] Photo preview works
- [x] Retake photo works
- [x] Delete photo confirmation works
- [x] Location permission works
- [x] Location refresh works
- [x] Copy location works
- [x] Contacts permission works
- [x] Contact list loads correctly
- [x] Contact search works
- [x] Pull-to-refresh works
- [x] Contact selection works
- [x] Copy contact number works
- [x] Clipboard copy works
- [x] Clipboard paste works
- [x] Clipboard clear works
- [x] Survey Preview displays complete data
- [x] Survey submission works
- [x] Survey History saves data
- [x] Survey data remains after app restart
- [x] Survey search works
- [x] Priority filter works
- [x] Survey details screen works
- [x] Edit survey works
- [x] Delete survey confirmation works
- [x] Profile screen works
- [x] Edit Profile works
- [x] Settings screen works
- [x] Notification preferences work
- [x] Privacy and Security options work
- [x] Help and Support screen works

---

# Future Improvements

- Cloud database integration
- Secure user authentication
- PDF survey report generation
- Map preview for survey locations
- Digital signature support
- Online and offline synchronization
- Admin web dashboard
- Push notifications
- Survey report sharing
- Multiple inspector accounts
- Cloud photo storage
- Real-time survey status updates

---

# Developer

**Munjal Raval**

React Native Student Project

GitHub Profile:

[github.com/RavalMunjal](https://github.com/RavalMunjal)

---

# GitHub Repository

Project source code is available at:

[https://github.com/RavalMunjal/React-Native-Projectrepo](https://github.com/RavalMunjal/React-Native-Projectrepo)

---

# Contributing

This project was created for learning and academic purposes.

Suggestions and improvements are welcome through GitHub issues or pull requests.

---

# License

This project is created for learning, academic submission, and demonstration purposes.

---

<p align="center">
  <strong>Built with React Native, Expo, Expo Router, and JavaScript.</strong>
</p>

<p align="center">
  Smart Field Survey & Inspection App
</p>
