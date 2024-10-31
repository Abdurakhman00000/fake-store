import { create } from "zustand";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartState>((set, get) => {
  const loadCartFromStorage = (): CartItem[] => {
    if (typeof window !== "undefined") {
      const cart = localStorage.getItem("fake-cart");
      try {
        return cart ? JSON.parse(cart) : [];
      } catch (error) {
        console.error("Error parsing cart from storage", error);
        return []; 
      }
    }
    return [];
  };

  const saveCartToStorage = (cart: CartItem[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fake-cart", JSON.stringify(cart));
    }
  };

  const initialCart = loadCartFromStorage();

  return {
    cart: initialCart,

    addToCart: (item: CartItem) => {
      set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);
        const updatedCart = existingItem
          ? state.cart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          : [...state.cart, { ...item, quantity: 1 }];

        saveCartToStorage(updatedCart);
        return { cart: updatedCart };
      });
    },

    removeFromCart: (id: number) => {
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== id);
        saveCartToStorage(updatedCart);
        return { cart: updatedCart };
      });
    },

    clearCart: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("fake-cart");
      }
      set({ cart: [] });
    },

    increaseQuantity: (id: number) => {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        saveCartToStorage(updatedCart);
        return { cart: updatedCart };
      });
    },

    decreaseQuantity: (id: number) => {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
        saveCartToStorage(updatedCart);
        return { cart: updatedCart };
      });
    },

    getTotalQuantity: () => {
      return get().cart.reduce((total, item) => total + item.quantity, 0);
    },

    getTotalPrice: () => {
      return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  };
});

export default useCartStore;
