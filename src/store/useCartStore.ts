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
    const cart = localStorage.getItem("fake-cart");
    return cart ? JSON.parse(cart) : [];
  };

  const saveCartToStorage = (cart: CartItem[]) => {
    localStorage.setItem("fake-cart", JSON.stringify(cart));
  };

  const initialCart = loadCartFromStorage();

  return {
    cart: initialCart,

    addToCart: (item: CartItem) => {
      set((state) => {
        const existingItem = state.cart.find((cartItem) => cartItem.id === item.id);

        if (existingItem) {
          const updatedCart = state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          saveCartToStorage(updatedCart);
          return { cart: updatedCart };
        }

        const newItem = { ...item, quantity: 1 };
        const updatedCart = [...state.cart, newItem];
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
      localStorage.removeItem("fake-cart");
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
