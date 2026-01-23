import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { ThemeToggleSwitch } from "../components/ThemeToggleSwitch";

const SettingsScreen = () => {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionHeader, { color: colors.primary[0] }]}>
          APPEARANCE
        </Text>
        <ThemeToggleSwitch />
      </View>

      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionHeader, { color: colors.primary[0] }]}>
          THEME PREVIEW
        </Text>
        <View style={styles.previewContainer}>
          <View style={styles.previewItem}>
            <View
              style={[
                styles.colorBubble,
                { backgroundColor: colors.primary[0] },
              ]}
            />
            <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
              Primary
            </Text>
          </View>
          <View style={styles.previewItem}>
            <View
              style={[
                styles.colorBubble,
                {
                  backgroundColor: colors.background,
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
            />
            <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
              Bg
            </Text>
          </View>
          <View style={styles.previewItem}>
            <View
              style={[
                styles.colorBubble,
                {
                  backgroundColor: colors.surface,
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
            />
            <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
              Surface
            </Text>
          </View>
          <View style={styles.previewItem}>
            <View
              style={[styles.colorBubble, { backgroundColor: colors.text }]}
            />
            <Text style={[styles.colorLabel, { color: colors.textSecondary }]}>
              Text
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          App Version 1.0.0 (Pro Max UI)
        </Text>
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
    gap: 24,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 8,
  },
  section: {
    padding: 24,
    borderRadius: 24,
    // Add shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  previewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewItem: {
    alignItems: "center",
    gap: 8,
  },
  colorBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
});

export default SettingsScreen;
