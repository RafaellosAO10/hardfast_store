import { Link, useRouter } from "@tanstack/react-router";
import { Moon, Sun, ShoppingCart, User, Menu, X, Cpu, LogOut } from "lucide-react";
import { useState } from "react";
import { useThemeStore } from "@/store/theme";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useMounted } from "./ThemeManager";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const { theme, toggle } = useThemeStore();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const totalQty = useCartStore((s) => s.items.reduce((a, i) => a + i.quantity, 0));
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const mounted = useMounted();
  const router = useRouter();

  const nav = [
    { to: "/", label: "Início" },
    { to: "/produtos", label: "Produtos" },
    { to: "/monte-seu-pc", label: "Monte seu PC" },
    { to: "/pedidos", label: "Pedidos" },
  ];

  const handleLogout = () => {
    logout();
    router.navigate({ to: "/" });
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
            <span className="hf-grad inline-flex h-9 w-9 items-center justify-center rounded-lg text-white">
              <Cpu className="h-5 w-5" />
            </span>
            <span>
              Hard<span className="text-primary">Fast</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "bg-primary/10 text-primary" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              onClick={toggle}
              aria-label="Alternar tema"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
            >
              {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrinho"
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
            >
              <ShoppingCart className="h-4 w-4" />
              {mounted && totalQty > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {totalQty}
                </span>
              )}
            </button>

            {mounted && user ? (
              <div className="hidden items-center gap-2 md:flex">
                <span className="text-sm text-muted-foreground">Olá, {user.name.split(" ")[0]}</span>
                <button
                  onClick={handleLogout}
                  className="inline-flex h-9 items-center gap-1 rounded-md px-3 text-sm hover:bg-accent"
                >
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden h-9 items-center gap-1 rounded-md px-3 text-sm hover:bg-accent md:inline-flex"
              >
                <User className="h-4 w-4" /> Entrar
              </Link>
            )}

            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent md:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t bg-background md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  {n.label}
                </Link>
              ))}
              {mounted && user ? (
                <button
                  onClick={handleLogout}
                  className="mt-1 rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
                >
                  Sair ({user.name.split(" ")[0]})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="mt-1 rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  Entrar
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
