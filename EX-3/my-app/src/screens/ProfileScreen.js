import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useProfile } from "../hooks/useProfile";
import { ProfileCard } from "../components/ProfileCard";
import { Button } from "../components/common/Button";

const ProfileScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProfileCard
        name={profile.name}
        avatar={profile.avatar}
        bio={profile.bio}
        style={styles.card}
      />

      <View style={styles.buttons}>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")}
          style={styles.button}
          icon={<View style={styles.iconPlaceholder} />} // Placeholder for consistency
        />
        <Button
          title="Settings"
          onPress={() => navigation.navigate("Settings")}
          variant="outline"
          style={styles.button}
        />
        <Button
          title="Share Profile"
          onPress={() => {}}
          variant="outline"
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 24,
    alignItems: "center",
    paddingTop: 32,
  },
  card: {
    width: "100%",
    marginBottom: 40,
  },
  buttons: {
    width: "100%",
    gap: 16,
  },
  button: {
    width: "100%",
  },
  iconPlaceholder: {
    width: 0,
    height: 0,
  },
});

export default ProfileScreen;
