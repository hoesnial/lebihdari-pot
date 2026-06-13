export interface CartItemData {
  productId: string;
  variantId: string | null;
  name: string;
  variantLabel: string | null;
  image: string | null;
  price: number;
  quantity: number;
  slug: string;
  inStock: boolean;
}

export interface GuestCart {
  items: CartItemData[];
}

const STORAGE_KEY = "lebihdari_pot_cart";

export function getGuestCart(): GuestCart {
  if (typeof window === "undefined") return { items: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { items: [] };
  } catch {
    return { items: [] };
  }
}

export function setGuestCart(cart: GuestCart): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function clearGuestCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function addToGuestCart(item: CartItemData): GuestCart {
  const cart = getGuestCart();
  const existing = cart.items.findIndex(
    (i) => i.productId === item.productId && i.variantId === item.variantId,
  );
  if (existing >= 0) {
    cart.items[existing].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }
  setGuestCart(cart);
  return cart;
}

export function removeFromGuestCart(productId: string, variantId: string | null): GuestCart {
  const cart = getGuestCart();
  cart.items = cart.items.filter(
    (i) => !(i.productId === productId && i.variantId === variantId),
  );
  setGuestCart(cart);
  return cart;
}

export function updateGuestCartQuantity(
  productId: string,
  variantId: string | null,
  quantity: number,
): GuestCart {
  const cart = getGuestCart();
  const item = cart.items.find(
    (i) => i.productId === productId && i.variantId === variantId,
  );
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  setGuestCart(cart);
  return cart;
}
