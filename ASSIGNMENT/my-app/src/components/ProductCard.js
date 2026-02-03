import React, { memo, useCallback } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Text, IconButton, Badge } from "react-native-paper";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import useFavoritesStore from "../store/favoritesStore";
import { colors, spacing, borderRadius } from "../theme";

const ProductCard = memo(({ item, onPress }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoritesStore();
  const favorite = isFavorite(item.id);

  const handleFavoritePress = useCallback(() => {
    if (favorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  }, [favorite, item]);

  const discountPercent = Math.round(item.percentOff * 100);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.touchable}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.uri }}
            style={styles.image}
            resizeMode="cover"
          />
          {discountPercent > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{discountPercent}%</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon
              name={favorite ? "heart" : "heart-outline"}
              size={22}
              color={favorite ? colors.accent : colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.name} numberOfLines={1}>
              {item.handbagName}
            </Text>
            <Icon
              name={item.gender ? "gender-male" : "gender-female"}
              size={16}
              color={item.gender ? colors.male : colors.female}
            />
          </View>

          <Text style={styles.brand} numberOfLines={1}>
            {item.brand}
          </Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.cost?.toFixed(2)}</Text>
            {discountPercent > 0 && (
              <Text style={styles.originalPrice}>
                ${(item.cost / (1 - item.percentOff)).toFixed(2)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    maxWidth: "50%",
  },
  card: {
    margin: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 160,
    backgroundColor: colors.background,
  },
  discountBadge: {
    position: "absolute",
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    color: colors.surface,
    fontSize: 11,
    fontWeight: "700",
  },
  favoriteButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    backgroundColor: colors.surface,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.xs,
  },
  name: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  brand: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
});

export default ProductCard;
