import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "../hooks/useTheme";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { colors } = useTheme();

  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.background,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0, // Removed border for cleaner look
    },
    headerTintColor: colors.text,
    headerTitleStyle: {
      fontWeight: "700",
      fontSize: 18,
    },
    headerTitleAlign: "center", // Center title
    cardStyle: {
      backgroundColor: colors.background,
    },
    headerBackTitleVisible: false, // Cleaner back button on iOS
  };

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Custom header in Home
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings" }}
      />
    </Stack.Navigator>
  );
};
