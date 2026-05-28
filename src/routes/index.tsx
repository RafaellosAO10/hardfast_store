import { createFileRoute, Link } from "@tanstack/react-router";
import { PRODUCTS, CATEGORY_LABELS, Category } from "@/data/products";
import { PRE_BUILT_PCS } from "@/data/preBuiltPCs";
import { ProductCard } from "@/components/ProductCard";
import { PreBuiltPCCard } from "@/components/PreBuiltPCCard";
import { Cpu, Wrench, Zap, Truck, ShieldCheck, ArrowRight, Monitor } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HardFast Store - Hardware Gamer com Entrega Rápida" },
      {
        name: "description",
        content:
          "Processadores, placas de vídeo, memórias e mais. Monte seu PC dos sonhos com a HardFast.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = PRODUCTS.slice(0, 4);
  const cats: Category[] = ["cpu", "gpu", "ram", "gabinete", "fonte", "placa-mae", "ssd-nvme", "refrigeracao"];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 hf-grad opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              <Zap className="h-3 w-3" /> Performance sem limites
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight md:text-6xl">
              Hardware que move <span className="text-white/80">seu próximo nível</span>.
            </h1>
            <p className="mt-4 max-w-lg text-white/80">
              Processadores, GPUs e componentes premium com curadoria gamer. Monte seu PC ou escolha
              uma build pronta.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/monte-seu-pc"
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-white/90"
              >
                <Wrench className="h-4 w-4" /> Monte seu PC
              </Link>
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
              >
                Ver Produtos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur"
                >
                  <img src={p.image} alt={p.name} className="h-32 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {[
            { icon: Truck, t: "Entrega rápida", s: "Em todo o Brasil" },
            { icon: ShieldCheck, t: "Garantia", s: "Produtos originais" },
            { icon: Cpu, t: "Curadoria gamer", s: "Selecionados por especialistas" },
            { icon: Zap, t: "12x sem juros", s: "No cartão" },
          ].map(({ icon: Icon, t, s }) => (
            <div key={t} className="flex items-center gap-3 rounded-lg border bg-card p-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{t}</p>
                <p className="text-xs text-muted-foreground">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PCs Montados (PRIORIDADE) ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              <Monitor className="h-3 w-3" /> Pronto para usar
            </span>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">PCs Montados HardFast</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Configurações testadas e aprovadas — é só ligar e jogar
            </p>
          </div>
          <Link
            to="/produtos"
            className="hidden text-sm font-medium text-primary hover:underline md:inline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRE_BUILT_PCS.map((pc) => (
            <PreBuiltPCCard key={pc.id} pc={pc} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-12 border-t">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold md:text-3xl">Categorias</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
          {cats.map((c) => (
            <Link
              key={c}
              to="/produtos"
              search={{ category: c }}
              className="rounded-xl border bg-card p-4 text-center text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              {CATEGORY_LABELS[c]}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Components */}
      <section className="mx-auto max-w-7xl px-4 py-12 border-t">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Componentes em destaque</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Os componentes mais procurados da semana
            </p>
          </div>
          <Link
            to="/produtos"
            className="hidden text-sm font-medium text-primary hover:underline md:inline"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Offers CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="overflow-hidden rounded-2xl border bg-card p-8 md:p-12">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Ofertas da semana
              </span>
              <h3 className="mt-3 text-2xl font-bold md:text-3xl">
                Builds prontas a partir de {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(3579.5)}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Use nosso configurador e monte seu PC com compatibilidade garantida em tempo real.
              </p>
              <Link
                to="/monte-seu-pc"
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Wrench className="h-4 w-4" /> Começar a montar
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PRODUCTS.slice(4, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
