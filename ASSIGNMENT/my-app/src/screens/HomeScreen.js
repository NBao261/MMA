import React, { useState, useEffect, useCallback, useMemo } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { Searchbar, Text, ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "../components/ProductCard";
import BrandFilter from "../components/BrandFilter";
import { getHandbags } from "../services/api";
import useFavoritesStore from "../store/favoritesStore";
import { colors, spacing } from "../theme";

const HomeScreen = ({ navigation }) => {
  const [handbags, setHandbags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadFavorites = useFavoritesStore((state) => state.loadFavorites);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await getHandbags();
      // Sort by cost descending
      const sortedData = data.sort((a, b) => b.cost - a.cost);
      setHandbags(sortedData);
    } catch (err) {
      setError("Failed to load handbags. Tap to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    loadFavorites();
  }, [fetchData, loadFavorites]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = [...new Set(handbags.map((item) => item.brand))];
    return uniqueBrands.filter(Boolean).sort();
  }, [handbags]);

  // Filter handbags by brand and search query
  const filteredHandbags = useMemo(() => {
    return handbags.filter((item) => {
      const matchesBrand = !selectedBrand || item.brand === selectedBrand;
      const matchesSearch =
        !searchQuery ||
        item.handbagName?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesBrand && matchesSearch;
    });
  }, [handbags, selectedBrand, searchQuery]);

  const handleProductPress = useCallback(
    (item) => {
      navigation.navigate("Detail", { handbagId: item.id, handbag: item });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ProductCard item={item} onPress={() => handleProductPress(item)} />
    ),
    [handleProductPress],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Loading handbags...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.retryText} onPress={fetchData}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Handbags</Text>
      </View>

      <Searchbar
        placeholder="Search handbags..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        iconColor={colors.textSecondary}
        inputStyle={styles.searchInput}
        placeholderTextColor={colors.textMuted}
      />

      <BrandFilter
        brands={brands}
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
      />

      <FlatList
        data={filteredHandbags}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No handbags found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  searchbar: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  searchInput: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    textAlign: "center",
    marginBottom: spacing.sm,
    fontSize: 14,
  },
  retryText: {
    color: colors.accent,
    textDecorationLine: "underline",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});

export default HomeScreen;
