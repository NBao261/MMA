import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { useProfile } from "../hooks/useProfile";
import { Button } from "../components/common/Button";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { profile } = useProfile();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={[styles.greeting, { color: colors.textSecondary }]}>
            Hello,
          </Text>
          <Text style={[styles.name, { color: colors.text }]}>
            {profile.name}
          </Text>
        </View>
        <View
          style={[
            styles.avatarPlaceholder,
            { backgroundColor: colors.primary[0] },
          ]}
        >
          <Text style={styles.avatarInitial}>{profile.name.charAt(0)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <LinearGradient
          colors={colors.primary}
          style={styles.heroCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.heroEmoji}>👋</Text>
          <Text style={styles.heroTitle}>Welcome to Profile</Text>
          <Text style={styles.heroSubtitle}>
            Manage your digital identity with style.
          </Text>
        </LinearGradient>

        <View style={styles.actions}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Quick Actions
          </Text>
          <Button
            title="Go to Profile"
            onPress={() => navigation.navigate("Profile")}
            style={styles.button}
            icon={<Text style={{ fontSize: 18, marginRight: 8 }}>👤</Text>}
          />
          <Button
            title="App Settings"
            onPress={() => navigation.navigate("Settings")}
            variant="outline"
            style={styles.button}
            icon={<Text style={{ fontSize: 18, marginRight: 8 }}>⚙️</Text>}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60, // Safe area roughly
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "500",
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    flex: 1,
  },
  heroCard: {
    padding: 32,
    borderRadius: 32,
    marginBottom: 40,
    alignItems: "flex-start",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  actions: {
    gap: 16,
  },
});

export default HomeScreen;
