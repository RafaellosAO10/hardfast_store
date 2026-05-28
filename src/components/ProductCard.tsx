import { Link } from "@tanstack/react-router";
import { Product, formatBRL, CATEGORY_LABELS } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const outOfStock = product.quantity <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    const res = addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      maxStock: product.quantity,
    });
    if (res.ok) toast.success("Adicionado ao carrinho");
  };

  return (
    <Link
      to="/produto/$id"
      params={{ id: product.id }}
      className="group flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-md bg-background/90 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-foreground/80 backdrop-blur">
          {CATEGORY_LABELS[product.category]}
        </span>
        {outOfStock && (
          <span className="absolute right-2 top-2 rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">
            Esgotado
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-medium leading-tight">{product.name}</h3>
        <div className="mt-auto">
          <p className="text-lg font-bold text-primary">{formatBRL(product.price)}</p>
          <p className="text-xs text-muted-foreground">em até 12x sem juros</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          {outOfStock ? "Esgotado" : "Adicionar"}
        </button>
      </div>
    </Link>
  );
}
