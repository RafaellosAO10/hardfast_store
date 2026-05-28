import { createFileRoute, Link } from "@tanstack/react-router";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuthStore } from "@/store/auth";
import { useOrdersStore } from "@/store/orders";
import { formatBRL } from "@/data/products";
import { Package, CheckCircle2 } from "lucide-react";

interface OrdersSearch { success?: string }

export const Route = createFileRoute("/pedidos")({
  head: () => ({
    meta: [
      { title: "Meus Pedidos - HardFast Store" },
      { name: "description", content: "Histórico de pedidos da HardFast" },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): OrdersSearch => ({
    success: (s.success as string) || undefined,
  }),
  component: () => (
    <RequireAuth>
      <OrdersPage />
    </RequireAuth>
  ),
});

function OrdersPage() {
  const user = useAuthStore((s) => s.user)!;
  const orders = useOrdersStore((s) => s.orders.filter((o) => o.userId === user.id));
  const { success } = Route.useSearch();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">Meus pedidos</h1>

      {success && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <p className="font-semibold text-primary">Pedido confirmado!</p>
            <p className="text-sm text-muted-foreground">Número: {success}</p>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border bg-card p-12 text-center">
          <Package className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-medium">Você ainda não fez nenhum pedido.</p>
          <Link to="/produtos" className="mt-4 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((o) => (
            <li key={o.id} className="rounded-2xl border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">Pedido</p>
                  <p className="text-lg font-semibold">{o.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(o.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {o.status}
                  </span>
                  <p className="mt-1 text-lg font-bold text-primary">{formatBRL(o.total)}</p>
                </div>
              </div>
              <ul className="mt-4 space-y-3">
                {o.items.map((i) => (
                  <li key={i.productId} className="flex items-center gap-3">
                    <img src={i.image} alt={i.name} className="h-12 w-12 rounded object-cover" />
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{i.name}</p>
                      <p className="text-muted-foreground">Qtd: {i.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">{formatBRL(i.price * i.quantity)}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                Pagamento: <span className="font-medium text-foreground capitalize">{o.paymentMethod}</span>
                {" · "}
                Entrega: {o.address.rua}, {o.address.numero} — {o.address.cidade}/{o.address.estado}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
