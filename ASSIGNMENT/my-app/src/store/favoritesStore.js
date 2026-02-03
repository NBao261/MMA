import { create } from "zustand";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
} from "../services/storage";

const useFavoritesStore = create((set, get) => ({
  favorites: [],
  loading: false,

  loadFavorites: async () => {
    set({ loading: true });
    try {
      const favorites = await getFavorites();
      set({ favorites, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  addToFavorites: async (handbag) => {
    try {
      const updatedFavorites = await addFavorite(handbag);
      set({ favorites: updatedFavorites });
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  },

  removeFromFavorites: async (id) => {
    try {
      const updatedFavorites = await removeFavorite(id);
      set({ favorites: updatedFavorites });
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  },

  clearAllFavorites: async () => {
    try {
      await clearFavorites();
      set({ favorites: [] });
    } catch (error) {
      console.error("Error clearing favorites:", error);
    }
  },

  removeMultipleFavorites: async (ids) => {
    try {
      const { favorites } = get();
      const updatedFavorites = favorites.filter(
        (item) => !ids.includes(item.id),
      );
      await clearFavorites();
      for (const item of updatedFavorites) {
        await addFavorite(item);
      }
      set({ favorites: updatedFavorites });
    } catch (error) {
      console.error("Error removing multiple favorites:", error);
    }
  },

  isFavorite: (id) => {
    const { favorites } = get();
    return favorites.some((item) => item.id === id);
  },
}));

export default useFavoritesStore;
