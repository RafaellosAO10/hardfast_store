import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProductById, formatBRL, PRODUCTS, CATEGORY_LABELS, type Product } from "@/data/products";
import { useCartStore } from "@/store/cart";
import { ProductCard } from "@/components/ProductCard";
import { ProductReviews } from "@/components/ProductReviews";
import { Minus, Plus, ShoppingCart, Check, Package } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/produto/$id")({
  loader: ({ params }) => {
    const product = getProductById(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product?.name ?? "Produto"} - HardFast Store` },
      { name: "description", content: loaderData?.product?.description ?? "Produto HardFast" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-20 text-center">
      <h1 className="text-2xl font-bold">Produto não encontrado</h1>
      <Link to="/produtos" className="mt-4 inline-block text-primary hover:underline">Ver todos os produtos</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);
  const outOfStock = product.quantity <= 0;

  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    const res = addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.image,
      maxStock: product.quantity,
    });
    if (res.ok) toast.success(`${qty}x ${product.name} adicionado ao carrinho`);
    else toast.error(res.message || "Erro ao adicionar");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Início</Link>
        <span className="mx-2">/</span>
        <Link to="/produtos" className="hover:text-foreground">Produtos</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-card">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>

        <div>
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {CATEGORY_LABELS[product.category]}
          </span>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">{product.name}</h1>
          {product.socket && (
            <p className="mt-1 text-sm text-muted-foreground">Socket: <span className="font-medium text-foreground">{product.socket}</span></p>
          )}

          <div className="mt-6">
            <p className="text-4xl font-bold text-primary">{formatBRL(product.price)}</p>
            <p className="text-sm text-muted-foreground">ou 12x de {formatBRL(product.price / 12)} sem juros</p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <Package className="h-4 w-4 text-muted-foreground" />
            {outOfStock ? (
              <span className="font-medium text-destructive">Esgotado</span>
            ) : (
              <span className="text-muted-foreground">
                <span className="font-medium text-foreground">{product.quantity}</span> em estoque
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center gap-1 rounded-md border p-1">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-accent disabled:opacity-50"
                disabled={qty <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.quantity, q + 1))}
                className="inline-flex h-9 w-9 items-center justify-center rounded hover:bg-accent disabled:opacity-50"
                disabled={qty >= product.quantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingCart className="h-4 w-4" />
              {outOfStock ? "Esgotado" : "Adicionar ao carrinho"}
            </button>
          </div>

          <ul className="mt-8 space-y-2 border-t pt-6 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Produto original com garantia</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Entrega rápida em todo Brasil</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 12x sem juros no cartão</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Produtos relacionados</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <ProductReviews productId={product.id} />
    </div>
  );
}
