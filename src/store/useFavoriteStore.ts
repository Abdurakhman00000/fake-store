import { create } from "zustand";

interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity: number;
}

interface FavoriteStore {
  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  toggleFavorite: (item: FavoriteItem) => void; 
}

const loadFavoritesFromLocalStorage = (): FavoriteItem[] => {
  if (typeof window !== "undefined") {
    const storedFavorites = localStorage.getItem("favorites");
    try {
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Error parsing favorites from localStorage", error);
      return []; 
    }
  }
  return [];
};

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: loadFavoritesFromLocalStorage(),

  addFavorite: (item) => set((state) => {
    const existingItem = state.favorites.find((favItem) => favItem.id === item.id);
    if (existingItem) return state; 

    const updatedFavorites = [...state.favorites, item];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),

  removeFavorite: (id) => set((state) => {
    const updatedFavorites = state.favorites.filter((item) => item.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),

  toggleFavorite: (item) => set((state) => {
    const isFavorite = state.favorites.some((favItem) => favItem.id === item.id);
    const updatedFavorites = isFavorite
      ? state.favorites.filter((favItem) => favItem.id !== item.id)
      : [...state.favorites, item];
    
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),
}));
