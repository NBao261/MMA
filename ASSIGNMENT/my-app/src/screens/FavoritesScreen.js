import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  Searchbar,
  Text,
  Button,
  Dialog,
  Portal,
  Checkbox,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import useFavoritesStore from "../store/favoritesStore";
import { colors, spacing, borderRadius } from "../theme";

const FavoritesScreen = ({ navigation }) => {
  const {
    favorites,
    removeFromFavorites,
    clearAllFavorites,
    removeMultipleFavorites,
  } = useFavoritesStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const swipeableRefs = useRef({});

  const filteredFavorites = useMemo(() => {
    if (!searchQuery) return favorites;
    return favorites.filter((item) =>
      item.handbagName?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [favorites, searchQuery]);

  const handleRemove = useCallback(
    (id) => {
      removeFromFavorites(id);
    },
    [removeFromFavorites],
  );

  const handleClearAll = useCallback(() => {
    clearAllFavorites();
    setDeleteDialogVisible(false);
    setSelectionMode(false);
    setSelectedItems([]);
  }, [clearAllFavorites]);

  const handleDeleteSelected = useCallback(() => {
    if (selectedItems.length > 0) {
      removeMultipleFavorites(selectedItems);
      setSelectedItems([]);
      setSelectionMode(false);
    }
  }, [selectedItems, removeMultipleFavorites]);

  const toggleSelection = useCallback((id) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    });
  }, []);

  const exitSelectionMode = useCallback(() => {
    setSelectionMode(false);
    setSelectedItems([]);
  }, []);

  const selectAll = useCallback(() => {
    if (selectedItems.length === filteredFavorites.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFavorites.map((item) => item.id));
    }
  }, [selectedItems.length, filteredFavorites]);

  const handleProductPress = useCallback(
    (item) => {
      if (selectionMode) {
        toggleSelection(item.id);
      } else {
        navigation.navigate("HomeTab", {
          screen: "Detail",
          params: { handbagId: item.id, handbag: item },
        });
      }
    },
    [navigation, selectionMode, toggleSelection],
  );

  const renderRightActions = useCallback(
    (progress, dragX, id) => {
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0.5],
        extrapolate: "clamp",
      });

      const opacity = dragX.interpolate({
        inputRange: [-80, -40, 0],
        outputRange: [1, 0.8, 0],
        extrapolate: "clamp",
      });

      return (
        <TouchableOpacity
          style={styles.deleteAction}
          onPress={() => handleRemove(id)}
          activeOpacity={0.8}
        >
          <Animated.View
            style={[
              styles.deleteActionContent,
              { opacity, transform: [{ scale }] },
            ]}
          >
            <Icon name="trash-can-outline" size={24} color={colors.surface} />
          </Animated.View>
        </TouchableOpacity>
      );
    },
    [handleRemove],
  );

  const renderItem = useCallback(
    ({ item }) => (
      <Swipeable
        ref={(ref) => (swipeableRefs.current[item.id] = ref)}
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item.id)
        }
        rightThreshold={40}
        overshootRight={false}
        enabled={!selectionMode}
        friction={2}
      >
        <TouchableOpacity
          onPress={() => handleProductPress(item)}
          onLongPress={() => {
            if (!selectionMode) {
              setSelectionMode(true);
              setSelectedItems([item.id]);
            }
          }}
          activeOpacity={0.7}
          delayLongPress={300}
        >
          <View
            style={[
              styles.card,
              selectionMode &&
                selectedItems.includes(item.id) &&
                styles.cardSelected,
            ]}
          >
            {selectionMode && (
              <TouchableOpacity
                style={styles.checkboxArea}
                onPress={() => toggleSelection(item.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedItems.includes(item.id) && styles.checkboxChecked,
                  ]}
                >
                  {selectedItems.includes(item.id) && (
                    <Icon name="check" size={14} color={colors.surface} />
                  )}
                </View>
              </TouchableOpacity>
            )}
            <Image
              source={{ uri: item.uri }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>
                {item.handbagName}
              </Text>
              <Text style={styles.brand} numberOfLines={1}>
                {item.brand}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>${item.cost?.toFixed(2)}</Text>
                <Icon
                  name={item.gender ? "gender-male" : "gender-female"}
                  size={16}
                  color={item.gender ? colors.male : colors.female}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    ),
    [
      handleProductPress,
      selectionMode,
      selectedItems,
      toggleSelection,
      renderRightActions,
    ],
  );

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        {/* Normal Header */}
        {!selectionMode && (
          <View style={styles.header}>
            <Text style={styles.title}>Favorites</Text>
            {favorites.length > 0 && (
              <TouchableOpacity
                onPress={() => setDeleteDialogVisible(true)}
                style={styles.headerIconButton}
              >
                <Icon
                  name="delete-sweep-outline"
                  size={24}
                  color={colors.error}
                />
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Selection Mode Header */}
        {selectionMode && (
          <View style={styles.selectionHeader}>
            <TouchableOpacity
              onPress={exitSelectionMode}
              style={styles.closeButton}
            >
              <Icon name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.selectionCount}>{selectedItems.length}</Text>
            <View style={styles.selectionActions}>
              <TouchableOpacity
                onPress={selectAll}
                style={styles.selectTextButton}
              >
                <Text style={styles.selectText}>
                  {selectedItems.length === filteredFavorites.length
                    ? "Select all"
                    : "Select all"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeleteSelected}
                style={[
                  styles.actionButton,
                  selectedItems.length === 0 && styles.actionButtonDisabled,
                ]}
                disabled={selectedItems.length === 0}
              >
                <Icon
                  name="delete-outline"
                  size={24}
                  color={
                    selectedItems.length > 0 ? colors.error : colors.textMuted
                  }
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <Searchbar
          placeholder="Search..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          iconColor={colors.textSecondary}
          inputStyle={styles.searchInput}
          placeholderTextColor={colors.textMuted}
        />

        <FlatList
          data={filteredFavorites}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="heart-outline" size={64} color={colors.border} />
              <Text style={styles.emptyTitle}>No favorites yet</Text>
              <Text style={styles.emptyText}>
                Tap the heart icon on any handbag to add it here
              </Text>
            </View>
          }
        />

        <Portal>
          <Dialog
            visible={deleteDialogVisible}
            onDismiss={() => setDeleteDialogVisible(false)}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogTitle}>Clear All?</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.dialogContent}>
                This will remove all {favorites.length} favorites. This cannot
                be undone.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => setDeleteDialogVisible(false)}
                textColor={colors.textSecondary}
              >
                Cancel
              </Button>
              <Button textColor={colors.error} onPress={handleClearAll}>
                Clear All
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerIconButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  selectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  selectionCount: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: colors.textPrimary,
    marginLeft: spacing.sm,
  },
  selectionActions: {
    flexDirection: "row",
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  selectTextButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  selectText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.accent,
  },
  searchbar: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 0,
    shadowOpacity: 0,
    height: 44,
  },
  searchInput: {
    fontSize: 14,
    color: colors.textPrimary,
    minHeight: 0,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    flexGrow: 1,
  },
  card: {
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    alignItems: "center",
  },
  cardSelected: {
    borderColor: colors.accent,
    backgroundColor: `${colors.accent}08`,
  },
  checkboxArea: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.sm,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  name: {
    fontSize: 15,
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
  deleteAction: {
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    marginLeft: spacing.sm,
  },
  deleteActionContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
  },
  dialogTitle: {
    color: colors.textPrimary,
    fontSize: 18,
  },
  dialogContent: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default FavoritesScreen;
