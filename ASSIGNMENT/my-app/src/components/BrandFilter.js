import React, { memo, useCallback } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { colors, spacing, borderRadius } from "../theme";

const BrandFilter = memo(({ brands, selectedBrand, onSelectBrand }) => {
  const handlePress = useCallback(
    (brand) => {
      onSelectBrand(selectedBrand === brand ? null : brand);
    },
    [selectedBrand, onSelectBrand],
  );

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <TouchableOpacity
          style={[styles.chip, !selectedBrand && styles.chipActive]}
          onPress={() => onSelectBrand(null)}
          activeOpacity={0.7}
        >
          <Text
            style={[styles.chipText, !selectedBrand && styles.chipTextActive]}
          >
            All
          </Text>
        </TouchableOpacity>

        {brands.map((brand) => (
          <TouchableOpacity
            key={brand}
            style={[styles.chip, selectedBrand === brand && styles.chipActive]}
            onPress={() => handlePress(brand)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.chipText,
                selectedBrand === brand && styles.chipTextActive,
              ]}
            >
              {brand}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    zIndex: 1,
  },
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    height: 40,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: "600",
  },
});

export default BrandFilter;
