import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./cart";
import type { Address } from "./auth";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  address: Address;
  paymentMethod: "cartao" | "pix" | "boleto";
  status: "Confirmado";
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (o: Order) => void;
  forUser: (userId: string) => Order[];
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (o) => set({ orders: [o, ...get().orders] }),
      forUser: (userId) => get().orders.filter((o) => o.userId === userId),
    }),
    {
      name: "hardfast_orders",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as any),
      ),
    },
  ),
);
