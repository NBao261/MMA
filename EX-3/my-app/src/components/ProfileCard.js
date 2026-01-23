import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";

export const ProfileCard = ({ name, avatar, bio, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.shadowContainer, colors.cardShadow, style]}>
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <View style={styles.imageContainer}>
          <LinearGradient colors={colors.primary} style={styles.imageBorder}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </LinearGradient>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <LinearGradient
          colors={colors.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.roleBadge}
        >
          <Text style={styles.roleText}>Pro Member</Text>
        </LinearGradient>

        <Text style={[styles.bio, { color: colors.textSecondary }]}>{bio}</Text>

        <View style={[styles.statsRow, { borderColor: colors.border }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>128</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Projects
            </Text>
          </View>
          <View
            style={[styles.statDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>4.8</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Rating
            </Text>
          </View>
          <View
            style={[styles.statDivider, { backgroundColor: colors.border }]}
          />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>5y</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Exp
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 24,
  },
  card: {
    alignItems: "center",
    padding: 24,
    borderRadius: 24,
    overflow: "hidden",
  },
  imageContainer: {
    marginBottom: 16,
  },
  imageBorder: {
    padding: 3,
    borderRadius: 75,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 16,
  },
  roleText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingTop: 20,
    borderTopWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
  },
});
