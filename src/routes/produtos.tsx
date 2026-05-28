import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PRODUCTS, CATEGORY_LABELS, Category } from "@/data/products";
import { PRE_BUILT_PCS } from "@/data/preBuiltPCs";
import { ProductCard } from "@/components/ProductCard";
import { PreBuiltPCCard } from "@/components/PreBuiltPCCard";
import { Search, Monitor } from "lucide-react";

interface ProductsSearch {
  category?: Category | "pc-montado";
  q?: string;
  page?: number;
  min?: number;
  max?: number;
}

export const Route = createFileRoute("/produtos")({
  head: () => ({
    meta: [
      { title: "Produtos - HardFast Store" },
      {
        name: "description",
        content:
          "Catálogo completo de hardware: processadores, GPUs, memórias, fontes, gabinetes e PCs montados.",
      },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): ProductsSearch => ({
    category: (s.category as Category | "pc-montado") || undefined,
    q: (s.q as string) || undefined,
    page: s.page ? Number(s.page) : undefined,
    min: s.min ? Number(s.min) : undefined,
    max: s.max ? Number(s.max) : undefined,
  }),
  component: ProductsPage,
});

const PAGE_SIZE = 8;

function ProductsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(search.q ?? "");
  const [min, setMin] = useState<string>(search.min?.toString() ?? "");
  const [max, setMax] = useState<string>(search.max?.toString() ?? "");
  const category = search.category;
  const page = search.page ?? 1;

  const showPCsMontados = !category || category === "pc-montado";
  const showComponents = !category || category !== "pc-montado";

  // Filtra PCs montados por busca/preço
  const filteredPCs = useMemo(() => {
    if (!showPCsMontados) return [];
    return PRE_BUILT_PCS.filter((pc) => {
      if (search.q && !pc.name.toLowerCase().includes(search.q.toLowerCase())) return false;
      if (search.min != null && pc.price < search.min) return false;
      if (search.max != null && pc.price > search.max) return false;
      return true;
    });
  }, [showPCsMontados, search.q, search.min, search.max]);

  // Filtra componentes
  const filteredComponents = useMemo(() => {
    if (!showComponents) return [];
    return PRODUCTS.filter((p) => {
      if (category && category !== "pc-montado" && p.category !== category) return false;
      if (search.q && !p.name.toLowerCase().includes(search.q.toLowerCase())) return false;
      if (search.min != null && p.price < search.min) return false;
      if (search.max != null && p.price > search.max) return false;
      return true;
    });
  }, [category, showComponents, search.q, search.min, search.max]);

  const totalCount = filteredPCs.length + filteredComponents.length;
  const pages = Math.max(1, Math.ceil(filteredComponents.length / PAGE_SIZE));
  const pagedComponents = filteredComponents.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const applyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      search: {
        ...search,
        q: q || undefined,
        min: min ? Number(min) : undefined,
        max: max ? Number(max) : undefined,
        page: 1,
      },
    });
  };

  const setCategory = (c?: Category | "pc-montado") =>
    navigate({ search: { ...search, category: c, page: 1 } });

  const allCategories: Array<{ key: Category | "pc-montado"; label: string }> = [
    { key: "pc-montado", label: "PCs Montados" },
    ...(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => ({
      key: c,
      label: CATEGORY_LABELS[c],
    })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold">Produtos</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {totalCount} produto{totalCount === 1 ? "" : "s"} encontrado{totalCount === 1 ? "" : "s"}
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Sidebar de filtros */}
        <aside className="space-y-6 rounded-xl border bg-card p-5 lg:sticky lg:top-20 lg:self-start">
          <form onSubmit={applyFilters} className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Buscar
              </label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Nome do produto"
                  className="w-full rounded-md border bg-background py-2 pl-9 pr-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Categoria
              </label>
              <div className="mt-2 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => setCategory(undefined)}
                  className={`rounded-md px-3 py-1.5 text-left text-sm ${
                    !category ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent"
                  }`}
                >
                  Todas
                </button>
                {allCategories.map(({ key, label }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCategory(key)}
                    className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-left text-sm ${
                      category === key
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-accent"
                    }`}
                  >
                    {key === "pc-montado" && <Monitor className="h-3.5 w-3.5" />}
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Preço
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  placeholder="Mín"
                  inputMode="numeric"
                  className="w-full rounded-md border bg-background px-2 py-2 text-sm"
                />
                <input
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  placeholder="Máx"
                  inputMode="numeric"
                  className="w-full rounded-md border bg-background px-2 py-2 text-sm"
                />
              </div>
            </div>

            <button className="w-full rounded-md bg-primary py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Aplicar filtros
            </button>
          </form>
        </aside>

        {/* Listagem */}
        <section className="space-y-10">
          {totalCount === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
              Nenhum produto encontrado com esses filtros.
            </div>
          ) : (
            <>
              {/* PCs Montados — sempre primeiro */}
              {filteredPCs.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">PCs Montados</h2>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {filteredPCs.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPCs.map((pc) => (
                      <PreBuiltPCCard key={pc.id} pc={pc} />
                    ))}
                  </div>
                </div>
              )}

              {/* Componentes avulsos */}
              {pagedComponents.length > 0 && (
                <div>
                  {showPCsMontados && filteredPCs.length > 0 && (
                    <h2 className="mb-4 text-xl font-bold">Componentes</h2>
                  )}
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {pagedComponents.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>

                  {pages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-1">
                      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                        <Link
                          key={p}
                          to="/produtos"
                          search={{ ...search, page: p }}
                          className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm ${
                            p === page
                              ? "bg-primary text-primary-foreground border-primary"
                              : "hover:bg-accent"
                          }`}
                        >
                          {p}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
