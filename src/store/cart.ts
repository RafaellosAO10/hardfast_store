import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  maxStock: number;
  custom?: boolean;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => { ok: boolean; message?: string };
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clear: () => void;
  mergeItems: (incoming: CartItem[]) => { warning?: string };
  totalQty: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        const max = item.maxStock;
        if (max <= 0) return { ok: false, message: "Produto esgotado" };
        if (existing) {
          const newQty = Math.min(existing.quantity + item.quantity, max);
          set({
            items: get().items.map((i) =>
              i.productId === item.productId ? { ...i, quantity: newQty } : i,
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: Math.min(item.quantity, max) }] });
        }
        return { ok: true };
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      setQuantity: (productId, qty) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.max(1, Math.min(qty, i.maxStock)) }
              : i,
          ),
        }),
      clear: () => set({ items: [] }),
      mergeItems: (incoming) => {
        let warning: string | undefined;
        const map = new Map<string, CartItem>();
        for (const i of get().items) map.set(i.productId, { ...i });
        for (const i of incoming) {
          const existing = map.get(i.productId);
          if (existing) {
            const sum = existing.quantity + i.quantity;
            const limited = Math.min(sum, existing.maxStock);
            if (sum > existing.maxStock) warning = "Algumas quantidades foram ajustadas ao estoque disponível.";
            map.set(i.productId, { ...existing, quantity: limited });
          } else {
            map.set(i.productId, { ...i });
          }
        }
        set({ items: Array.from(map.values()) });
        return { warning };
      },
      totalQty: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
      total: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    {
      name: "hardfast_cart",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as any),
      ),
    },
  ),
);
