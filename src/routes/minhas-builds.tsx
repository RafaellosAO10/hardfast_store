import { createFileRoute, Link } from "@tanstack/react-router";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuthStore } from "@/store/auth";
import { useBuildsStore } from "@/store/builds";
import { useCartStore } from "@/store/cart";
import { PRODUCTS, formatBRL } from "@/data/products";
import { toast } from "sonner";
import { Trash2, ShoppingCart, Cpu } from "lucide-react";

export const Route = createFileRoute("/minhas-builds")({
  head: () => ({
    meta: [
      { title: "Minhas Builds - HardFast Store" },
      { name: "description", content: "Builds de PC salvas para edição ou compra futura" },
    ],
  }),
  component: () => (
    <RequireAuth>
      <BuildsPage />
    </RequireAuth>
  ),
});

function BuildsPage() {
  const user = useAuthStore((s) => s.user)!;
  const builds = useBuildsStore((s) => s.builds.filter((b) => b.userId === user.id));
  const removeBuild = useBuildsStore((s) => s.removeBuild);
  const addItem = useCartStore((s) => s.addItem);

  const buildTotal = (compIds: Record<string, string>) =>
    Object.values(compIds).reduce((acc, id) => acc + (PRODUCTS.find((p) => p.id === id)?.price ?? 0), 0);

  const addBuildToCart = (b: typeof builds[number]) => {
    const cpu = PRODUCTS.find((p) => p.id === b.components.cpu);
    const gpu = PRODUCTS.find((p) => p.id === b.components.gpu);
    if (!cpu || !gpu) return toast.error("Componentes indisponíveis");
    const res = addItem({
      productId: `build-${b.id}-${Date.now()}`,
      name: `PC Personalizado - ${cpu.name} + ${gpu.name}`,
      price: buildTotal(b.components),
      quantity: 1,
      image: gpu.image,
      maxStock: 1,
      custom: true,
    });
    if (res.ok) toast.success("Build adicionada ao carrinho");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Minhas builds</h1>
        <Link to="/monte-seu-pc" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          Nova build
        </Link>
      </div>

      {builds.length === 0 ? (
        <div className="mt-8 rounded-2xl border bg-card p-12 text-center">
          <Cpu className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 font-medium">Você ainda não salvou nenhuma build.</p>
          <Link to="/monte-seu-pc" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Montar agora →
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {builds.map((b) => (
            <li key={b.id} className="rounded-2xl border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-3">
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Salva em {new Date(b.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <p className="text-lg font-bold text-primary">{formatBRL(buildTotal(b.components))}</p>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
                {Object.entries(b.components).map(([slot, id]) => {
                  const p = PRODUCTS.find((x) => x.id === id);
                  return (
                    <li key={slot} className="flex justify-between gap-2">
                      <span className="text-muted-foreground capitalize">{slot.replace("-", " ")}</span>
                      <span className="text-right font-medium">{p?.name ?? "—"}</span>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => addBuildToCart(b)}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  <ShoppingCart className="h-4 w-4" /> Comprar
                </button>
                <button
                  onClick={() => removeBuild(b.id)}
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-accent"
                >
                  <Trash2 className="h-4 w-4" /> Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
