import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "@handbag_favorites";

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

export const addFavorite = async (handbag) => {
  try {
    const favorites = await getFavorites();
    const exists = favorites.some((item) => item.id === handbag.id);
    if (!exists) {
      const updatedFavorites = [...favorites, handbag];
      await AsyncStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(updatedFavorites),
      );
      return updatedFavorites;
    }
    return favorites;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (id) => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
    return [];
  } catch (error) {
    console.error("Error clearing favorites:", error);
    throw error;
  }
};

export const isFavorite = async (id) => {
  try {
    const favorites = await getFavorites();
    return favorites.some((item) => item.id === id);
  } catch (error) {
    console.error("Error checking favorite:", error);
    return false;
  }
};
