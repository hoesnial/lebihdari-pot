"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  getGuestCart,
  setGuestCart,
  clearGuestCart,
  addToGuestCart,
  removeFromGuestCart,
  updateGuestCartQuantity,
  type CartItemData,
} from "@/lib/cart-store";

interface CartContextValue {
  items: CartItemData[];
  itemCount: number;
  total: number;
  isLoggedIn: boolean;
  addItem: (item: CartItemData) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, qty: number) => void;
  clearItems: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}

export function CartProvider({
  children,
  initialItems,
  loggedIn,
}: {
  children: ReactNode;
  initialItems: CartItemData[];
  loggedIn: boolean;
}) {
  const [items, setItems] = useState<CartItemData[]>(() => {
    if (loggedIn || typeof window === "undefined") return initialItems;
    return getGuestCart().items;
  });

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const persist = useCallback(
    (newItems: CartItemData[]) => {
      setItems(newItems);
      if (!loggedIn) {
        setGuestCart({ items: newItems });
      }
    },
    [loggedIn],
  );

  const addItem = useCallback(
    (item: CartItemData) => {
      if (loggedIn) {
        persist([...items, item]);
      } else {
        const cart = addToGuestCart(item);
        setItems(cart.items);
      }
    },
    [items, loggedIn, persist],
  );

  const removeItem = useCallback(
    (productId: string, variantId: string | null) => {
      if (loggedIn) {
        persist(items.filter((i) => !(i.productId === productId && i.variantId === variantId)));
      } else {
        const cart = removeFromGuestCart(productId, variantId);
        setItems(cart.items);
      }
    },
    [items, loggedIn, persist],
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | null, qty: number) => {
      if (loggedIn) {
        persist(
          items.map((i) =>
            i.productId === productId && i.variantId === variantId
              ? { ...i, quantity: Math.max(1, qty) }
              : i,
          ),
        );
      } else {
        const cart = updateGuestCartQuantity(productId, variantId, qty);
        setItems(cart.items);
      }
    },
    [items, loggedIn, persist],
  );

  const clearItems = useCallback(() => {
    setItems([]);
    if (!loggedIn) clearGuestCart();
  }, [loggedIn]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        isLoggedIn: loggedIn,
        addItem,
        removeItem,
        updateQuantity,
        clearItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
