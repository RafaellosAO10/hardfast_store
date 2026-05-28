import { ShoppingCart, Zap, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatBRL, type PreBuiltPC } from "@/data/preBuiltPCs";
import { toast } from "sonner";

interface PreBuiltPCCardProps {
  pc: PreBuiltPC;
}

export function PreBuiltPCCard({ pc }: PreBuiltPCCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = pc.quantity <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    const res = addItem({
      productId: pc.id,
      name: pc.name,
      price: pc.price,
      quantity: 1,
      image: pc.image,
      maxStock: pc.quantity,
    });
    if (res.ok) toast.success(`${pc.name} adicionado ao carrinho!`);
    else toast.error(res.message || "Erro ao adicionar");
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
      {/* Badge */}
      {pc.badge && (
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white ${pc.badgeColor ?? "bg-primary"}`}
        >
          {pc.badge}
        </span>
      )}

      {/* Imagem */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={pc.image}
          alt={pc.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {pc.highlights.map((h) => (
            <span
              key={h}
              className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur"
            >
              <Zap className="h-2.5 w-2.5" />
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-bold leading-tight">{pc.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{pc.tagline}</p>
        </div>

        {/* Componentes */}
        <ul className="space-y-1">
          {pc.components.slice(0, 5).map((c) => (
            <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="h-3 w-3 shrink-0 text-primary" />
              {c}
            </li>
          ))}
          {pc.components.length > 5 && (
            <li className="text-xs text-muted-foreground pl-5">
              +{pc.components.length - 5} componente{pc.components.length - 5 > 1 ? "s" : ""}
            </li>
          )}
        </ul>

        {/* Preço e botão */}
        <div className="mt-auto pt-2 border-t">
          <p className="text-2xl font-bold text-primary">{formatBRL(pc.price)}</p>
          <p className="text-xs text-muted-foreground">
            ou 12x de {formatBRL(pc.price / 12)} sem juros
          </p>
          <button
            onClick={handleAdd}
            disabled={outOfStock}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart className="h-4 w-4" />
            {outOfStock ? "Esgotado" : "Adicionar ao Carrinho"}
          </button>
        </div>
      </div>
    </div>
  );
}
