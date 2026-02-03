import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Button, Divider, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import StarRating from "../components/StarRating";
import { getHandbagById } from "../services/api";
import useFavoritesStore from "../store/favoritesStore";
import { colors, spacing, borderRadius } from "../theme";

const DetailScreen = ({ route, navigation }) => {
  const { handbagId, handbag: initialHandbag } = route.params;
  const [handbag, setHandbag] = useState(initialHandbag || null);
  const [loading, setLoading] = useState(!initialHandbag);
  const [error, setError] = useState(null);

  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoritesStore();
  const favorite = isFavorite(handbagId);

  const fetchDetails = useCallback(async () => {
    if (initialHandbag) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getHandbagById(handbagId);
      setHandbag(data);
    } catch (err) {
      setError("Failed to load details");
    } finally {
      setLoading(false);
    }
  }, [handbagId, initialHandbag]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleFavoritePress = useCallback(() => {
    if (favorite) {
      removeFromFavorites(handbagId);
    } else {
      addToFavorites(handbag);
    }
  }, [favorite, handbag, handbagId]);

  // Calculate average rating
  const averageRating = useMemo(() => {
    if (!handbag?.ratings?.length) return 0;
    const sum = handbag.ratings.reduce((acc, r) => acc + (r.value || 0), 0);
    return sum / handbag.ratings.length;
  }, [handbag?.ratings]);

  // Group ratings by value
  const ratingGroups = useMemo(() => {
    if (!handbag?.ratings?.length) return {};
    const groups = { 5: [], 4: [], 3: [], 2: [], 1: [] };
    handbag.ratings.forEach((rating) => {
      const value = Math.round(rating.value || 0);
      if (value >= 1 && value <= 5) {
        groups[value].push(rating);
      }
    });
    return groups;
  }, [handbag?.ratings]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (error || !handbag) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || "Not found"}</Text>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          textColor={colors.primary}
          style={styles.goBackButton}
        >
          Go Back
        </Button>
      </View>
    );
  }

  const discountPercent = Math.round((handbag.percentOff || 0) * 100);

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: handbag.uri }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <Text style={styles.name}>{handbag.handbagName}</Text>
            <Icon
              name={handbag.gender ? "gender-male" : "gender-female"}
              size={28}
              color={handbag.gender ? colors.male : colors.female}
            />
          </View>

          <Text style={styles.brand}>{handbag.brand}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>${handbag.cost?.toFixed(2)}</Text>
            {discountPercent > 0 && (
              <>
                <Text style={styles.originalPrice}>
                  ${(handbag.cost / (1 - handbag.percentOff)).toFixed(2)}
                </Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>-{discountPercent}%</Text>
                </View>
              </>
            )}
          </View>

          <TouchableOpacity
            style={[
              styles.favoriteButton,
              favorite && styles.favoriteButtonActive,
            ]}
            onPress={handleFavoritePress}
            activeOpacity={0.8}
          >
            <Icon
              name={favorite ? "heart" : "heart-outline"}
              size={22}
              color={favorite ? colors.surface : colors.accent}
            />
            <Text
              style={[
                styles.favoriteButtonText,
                favorite && styles.favoriteButtonTextActive,
              ]}
            >
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </Text>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          {/* Ratings Section */}
          <Text style={styles.sectionTitle}>Ratings & Reviews</Text>

          <View style={styles.ratingOverview}>
            <Text style={styles.avgRating}>{averageRating.toFixed(1)}</Text>
            <View style={styles.ratingDetails}>
              <StarRating rating={averageRating} size={24} showNumber={false} />
              <Text style={styles.reviewCount}>
                {handbag.ratings?.length || 0} reviews
              </Text>
            </View>
          </View>

          {/* Rating Distribution */}
          <View style={styles.distributionCard}>
            {[5, 4, 3, 2, 1].map((star) => (
              <View key={star} style={styles.distributionRow}>
                <Text style={styles.starLabel}>{star}</Text>
                <Icon name="star" size={14} color={colors.accent} />
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.barFill,
                      {
                        width: `${((ratingGroups[star]?.length || 0) / (handbag.ratings?.length || 1)) * 100}%`,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.countText}>
                  {ratingGroups[star]?.length || 0}
                </Text>
              </View>
            ))}
          </View>

          {/* Comments */}
          <Text style={styles.commentsTitle}>Comments</Text>

          {handbag.ratings?.length > 0 ? (
            handbag.ratings.map((rating, index) => (
              <View key={index} style={styles.commentCard}>
                <View style={styles.commentHeader}>
                  <StarRating
                    rating={rating.value || 0}
                    size={14}
                    showNumber={false}
                  />
                  <Text style={styles.commentDate}>User #{index + 1}</Text>
                </View>
                {rating.comment && (
                  <Text style={styles.commentText}>{rating.comment}</Text>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noComments}>No reviews yet</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  image: {
    width: "100%",
    height: 350,
    backgroundColor: colors.surface,
  },
  content: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    flex: 1,
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  brand: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  price: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  originalPrice: {
    fontSize: 16,
    color: colors.textMuted,
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: 12,
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.surface,
  },
  favoriteButtonActive: {
    backgroundColor: colors.accent,
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.accent,
  },
  favoriteButtonTextActive: {
    color: colors.surface,
  },
  divider: {
    marginVertical: spacing.lg,
    backgroundColor: colors.divider,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  ratingOverview: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avgRating: {
    fontSize: 48,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  ratingDetails: {
    flex: 1,
  },
  reviewCount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  distributionCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.xs,
    gap: spacing.sm,
  },
  starLabel: {
    width: 16,
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: colors.divider,
    borderRadius: borderRadius.sm,
  },
  barFill: {
    height: "100%",
    backgroundColor: colors.accent,
    borderRadius: borderRadius.sm,
  },
  countText: {
    width: 28,
    fontSize: 12,
    textAlign: "right",
    color: colors.textSecondary,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  commentCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  commentDate: {
    fontSize: 12,
    color: colors.textMuted,
  },
  commentText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  noComments: {
    fontSize: 14,
    color: colors.textMuted,
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: spacing.lg,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    marginBottom: spacing.md,
  },
  goBackButton: {
    borderColor: colors.border,
  },
});

export default DetailScreen;
