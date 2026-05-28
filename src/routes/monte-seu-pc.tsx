import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PRODUCTS, formatBRL, type Category, type Product } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { useAuthStore } from "@/store/auth";
import { useBuildsStore } from "@/store/builds";
import { toast } from "sonner";
import { Cpu, AlertTriangle, CheckCircle2, Save, ShoppingCart } from "lucide-react";

export const Route = createFileRoute("/monte-seu-pc")({
  head: () => ({
    meta: [
      { title: "Monte seu PC - HardFast Store" },
      { name: "description", content: "Monte seu PC gamer escolhendo cada componente com compatibilidade garantida." },
    ],
  }),
  component: BuildPage,
});

type SlotKey = "cpu" | "placa-mae" | "gpu" | "ram" | "fonte" | "gabinete";
const SLOTS: { key: SlotKey; label: string }[] = [
  { key: "cpu", label: "Processador" },
  { key: "placa-mae", label: "Placa-Mãe" },
  { key: "gpu", label: "Placa de Vídeo" },
  { key: "ram", label: "Memória RAM" },
  { key: "fonte", label: "Fonte" },
  { key: "gabinete", label: "Gabinete" },
];

function BuildPage() {
  const user = useAuthStore((s) => s.user);
  const addItem = useCartStore((s) => s.addItem);
  const addBuild = useBuildsStore((s) => s.addBuild);

  const [selected, setSelected] = useState<Record<SlotKey, string | null>>({
    cpu: null, "placa-mae": null, gpu: null, ram: null, fonte: null, gabinete: null,
  });

  const byCategory = (c: Category) => PRODUCTS.filter((p) => p.category === c);

  const cpu = useMemo(() => PRODUCTS.find((p) => p.id === selected.cpu), [selected.cpu]);
  const mb = useMemo(() => PRODUCTS.find((p) => p.id === selected["placa-mae"]), [selected]);

  const socketError = useMemo(() => {
    if (!cpu || !mb) return null;
    if (cpu.socket && mb.socket && cpu.socket !== mb.socket) {
      return `Incompatibilidade de socket: ${cpu.name} requer socket ${cpu.socket}, mas a placa mãe selecionada é ${mb.socket}. Por favor, troque o processador ou a placa mãe.`;
    }
    return null;
  }, [cpu, mb]);

  const total = useMemo(() => {
    return Object.values(selected).reduce((acc, id) => {
      if (!id) return acc;
      const p = PRODUCTS.find((x) => x.id === id);
      return acc + (p?.price ?? 0);
    }, 0);
  }, [selected]);

  const allSelected = Object.values(selected).every(Boolean);
  const canFinalize = allSelected && !socketError;

  const handleAddToCart = () => {
    if (!canFinalize) return;
    const gpu = PRODUCTS.find((p) => p.id === selected.gpu)!;
    const cpuP = cpu!;
    const id = `build-${Date.now()}`;
    const res = addItem({
      productId: id,
      name: `PC Personalizado - ${cpuP.name} + ${gpu.name}`,
      price: total,
      quantity: 1,
      image: gpu.image,
      maxStock: 1,
      custom: true,
    });
    if (res.ok) toast.success("PC adicionado ao carrinho");
  };

  const handleSaveBuild = () => {
    if (!user) {
      toast.error("Faça login para salvar builds");
      return;
    }
    if (!allSelected || socketError) return;
    addBuild({
      id: `b-${Date.now()}`,
      userId: user.id,
      name: `Build ${new Date().toLocaleDateString("pt-BR")}`,
      components: selected as Record<SlotKey, string>,
      createdAt: new Date().toISOString(),
    });
    toast.success("Build salva!");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Cpu className="h-7 w-7 text-primary" /> Monte seu PC
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Selecione cada componente. A compatibilidade é validada em tempo real.</p>
        </div>
        {user && (
          <Link to="/minhas-builds" className="text-sm font-medium text-primary hover:underline">
            Minhas builds salvas →
          </Link>
        )}
      </div>

      {socketError && (
        <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-destructive">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="text-sm">{socketError}</p>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          {SLOTS.map(({ key, label }) => {
            const opts = byCategory(key);
            const sel = selected[key];
            return (
              <section key={key} className="rounded-2xl border bg-card p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{label}</h2>
                  {sel && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {opts.map((p) => (
                    <SlotOption
                      key={p.id}
                      product={p}
                      selected={sel === p.id}
                      onClick={() => setSelected((s) => ({ ...s, [key]: s[key] === p.id ? null : p.id }))}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <aside className="h-fit space-y-4 rounded-2xl border bg-card p-6 lg:sticky lg:top-20">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Resumo da Build</h3>
          <ul className="space-y-2 text-sm">
            {SLOTS.map(({ key, label }) => {
              const id = selected[key];
              const p = id ? PRODUCTS.find((x) => x.id === id) : null;
              return (
                <li key={key} className="flex justify-between gap-2 border-b pb-2 last:border-0">
                  <span className="text-muted-foreground">{label}</span>
                  <span className={`text-right text-sm ${p ? "font-medium" : "italic text-muted-foreground"}`}>
                    {p ? p.name : "—"}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-between border-t pt-3 text-base">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold text-primary">{formatBRL(total)}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!canFinalize}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" /> Adicionar PC Montado ao Carrinho
          </button>
          <button
            onClick={handleSaveBuild}
            disabled={!canFinalize}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border py-3 text-sm font-semibold hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> Salvar esta configuração
          </button>
          {!allSelected && (
            <p className="text-center text-xs text-muted-foreground">Selecione todos os 6 componentes para finalizar.</p>
          )}
        </aside>
      </div>
    </div>
  );
}

function SlotOption({ product, selected, onClick }: { product: Product; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${
        selected ? "border-primary bg-primary/5" : "hover:border-primary/50"
      }`}
    >
      <img src={product.image} alt={product.name} className="h-14 w-14 rounded object-cover" />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium">{product.name}</p>
        {product.socket && <p className="text-xs text-muted-foreground">Socket {product.socket}</p>}
        <p className="text-sm font-semibold text-primary">{formatBRL(product.price)}</p>
      </div>
    </button>
  );
}
