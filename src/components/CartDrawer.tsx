import { Link } from "@tanstack/react-router";
import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatBRL } from "@/data/products";
import { useEffect } from "react";

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.items.reduce((a, i) => a + i.price * i.quantity, 0));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card text-card-foreground shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Seu Carrinho</h2>
          <button onClick={onClose} className="rounded-md p-2 hover:bg-accent" aria-label="Fechar">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <p>Seu carrinho está vazio.</p>
              <Link
                to="/produtos"
                onClick={onClose}
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Explorar produtos
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.productId} className="flex gap-3 rounded-lg border p-3">
                  <img src={i.image} alt={i.name} className="h-16 w-16 rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-tight">{i.name}</p>
                      <button
                        onClick={() => removeItem(i.productId)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remover"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-primary font-semibold">{formatBRL(i.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => setQuantity(i.productId, i.quantity - 1)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded border hover:bg-accent"
                        disabled={i.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{i.quantity}</span>
                      <button
                        onClick={() => setQuantity(i.productId, i.quantity + 1)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded border hover:bg-accent disabled:opacity-50"
                        disabled={i.quantity >= i.maxStock}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex items-center justify-between text-base">
              <span className="text-muted-foreground">Total</span>
              <span className="font-bold text-lg">{formatBRL(total)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="block w-full rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Finalizar Compra
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
