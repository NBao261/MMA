import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../hooks/useTheme";

export const ThemeToggleSwitch = () => {
  const { isDark, colors, toggleTheme } = useTheme();
  const slideAnim = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isDark ? 1 : 0,
      duration: 300,
      useNativeDriver: false, // backgroundColor doesn't support native driver
    }).start();
  }, [isDark]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 26], // adjusted padding
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.title, { color: colors.text }]}>Dark Mode</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {isDark ? "Turn off to see the light" : "Join the dark side"}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={toggleTheme}>
        <LinearGradient
          colors={isDark ? colors.primary : [colors.border, colors.border]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.track}
        >
          <Animated.View
            style={[
              styles.thumb,
              {
                transform: [{ translateX }],
                shadowColor: isDark ? "#000" : "#888",
              },
            ]}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
  },
  track: {
    width: 56,
    height: 32,
    borderRadius: 99,
    justifyContent: "center",
  },
  thumb: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
