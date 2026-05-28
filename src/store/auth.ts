import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  address?: Address;
}

export interface Address {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

interface UsersState {
  users: StoredUser[];
  addUser: (u: StoredUser) => void;
  updateUser: (id: string, patch: Partial<StoredUser>) => void;
  findByEmail: (email: string) => StoredUser | undefined;
}

/** Usuário pré-cadastrado para demonstração */
const DEFAULT_USER: StoredUser = {
  id: "user_001",
  name: "Rafael Alves",
  email: "rafa_alves0901@hotmail.com",
  password: "rafa_0901",
  createdAt: "2025-01-01T00:00:00.000Z",
};

function seedDefaultUser(users: StoredUser[]): StoredUser[] {
  const exists = users.some(
    (u) => u.email.toLowerCase() === DEFAULT_USER.email.toLowerCase(),
  );
  if (exists) return users;
  return [DEFAULT_USER, ...users];
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      users: seedDefaultUser([]),
      addUser: (u) => set((s) => ({ users: [...s.users, u] })),
      updateUser: (id, patch) =>
        set((s) => ({
          users: s.users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
        })),
      findByEmail: (email) =>
        get().users.find((u) => u.email.toLowerCase() === email.toLowerCase()),
    }),
    {
      name: "hardfast_users",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as any),
      ),
      // Garante que o usuário padrão sempre existe após reidratação
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.users = seedDefaultUser(state.users);
        }
      },
    },
  ),
);

interface AuthState {
  user: SessionUser | null;
  login: (u: SessionUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "loggedInUser",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : (undefined as any),
      ),
    },
  ),
);
