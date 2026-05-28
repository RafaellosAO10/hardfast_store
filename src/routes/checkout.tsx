import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { RequireAuth } from "@/components/RequireAuth";
import { useCartStore } from "@/store/cart";
import { useAuthStore, useUsersStore, type Address } from "@/store/auth";
import { useOrdersStore } from "@/store/orders";
import { formatBRL } from "@/data/products";
import { toast } from "sonner";
import { Trash2, Minus, Plus, Check, CreditCard, QrCode, Receipt } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout - HardFast Store" },
      { name: "description", content: "Finalize seu pedido na HardFast" },
    ],
  }),
  component: () => (
    <RequireAuth>
      <CheckoutPage />
    </RequireAuth>
  ),
});

type Step = 1 | 2 | 3;
type Method = "cartao" | "pix" | "boleto";

function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clear);
  const total = useCartStore((s) => s.items.reduce((a, i) => a + i.price * i.quantity, 0));
  const user = useAuthStore((s) => s.user)!;
  const users = useUsersStore((s) => s.users);
  const updateUser = useUsersStore((s) => s.updateUser);
  const addOrder = useOrdersStore((s) => s.addOrder);

  const existingAddress = users.find((u) => u.id === user.id)?.address;

  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState<Address>(
    existingAddress ?? { cep: "", rua: "", numero: "", bairro: "", cidade: "", estado: "" },
  );
  const [method, setMethod] = useState<Method>("cartao");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });

  if (items.length === 0 && step !== 3) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">Adicione produtos para continuar.</p>
        <Link to="/produtos" className="mt-6 inline-block rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          Ver produtos
        </Link>
      </div>
    );
  }

  const goNext = () => {
    if (step === 2) {
      if (!address.cep || !address.rua || !address.numero || !address.bairro || !address.cidade || !address.estado) {
        toast.error("Preencha todos os campos do endereço.");
        return;
      }
      updateUser(user.id, { address });
    }
    setStep((s) => (s === 3 ? 3 : ((s + 1) as Step)));
  };

  const finalize = () => {
    if (method === "cartao") {
      if (card.number.replace(/\s/g, "").length < 13) return toast.error("Número do cartão inválido");
      if (!/^\d{2}\/\d{2}$/.test(card.expiry)) return toast.error("Validade deve ser MM/AA");
      if (card.cvv.length < 3) return toast.error("CVV inválido");
    }
    const orderId = `HF-${Date.now()}`;
    addOrder({
      id: orderId,
      userId: user.id,
      items,
      total,
      address,
      paymentMethod: method,
      status: "Confirmado",
      createdAt: new Date().toISOString(),
    });
    clearCart();
    toast.success("Pedido confirmado!");
    router.navigate({ to: "/pedidos", search: { success: orderId } });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold">Checkout</h1>

      <ol className="mt-6 flex items-center gap-3 text-sm">
        {[
          { n: 1, label: "Revisão" },
          { n: 2, label: "Endereço" },
          { n: 3, label: "Pagamento" },
        ].map((s, i) => (
          <li key={s.n} className="flex items-center gap-3">
            <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${step >= s.n ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground"}`}>
              {step > s.n ? <Check className="h-4 w-4" /> : s.n}
            </span>
            <span className={step >= s.n ? "font-medium" : "text-muted-foreground"}>{s.label}</span>
            {i < 2 && <span className="ml-1 h-px w-8 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border bg-card p-6">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold">Revise seu carrinho</h2>
              <ul className="mt-4 divide-y">
                {items.map((i) => (
                  <li key={i.productId} className="flex gap-4 py-4">
                    <img src={i.image} alt={i.name} className="h-20 w-20 rounded-md object-cover" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm font-medium">{i.name}</p>
                        <button onClick={() => removeItem(i.productId)} className="text-muted-foreground hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm text-primary font-semibold">{formatBRL(i.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button onClick={() => setQuantity(i.productId, i.quantity - 1)} className="h-7 w-7 rounded border hover:bg-accent" disabled={i.quantity <= 1}>
                          <Minus className="mx-auto h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{i.quantity}</span>
                        <button onClick={() => setQuantity(i.productId, i.quantity + 1)} className="h-7 w-7 rounded border hover:bg-accent" disabled={i.quantity >= i.maxStock}>
                          <Plus className="mx-auto h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-semibold">Endereço de entrega</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Field label="CEP" value={address.cep} onChange={(v) => setAddress({ ...address, cep: v })} />
                <Field label="Estado" value={address.estado} onChange={(v) => setAddress({ ...address, estado: v })} />
                <Field label="Rua" value={address.rua} onChange={(v) => setAddress({ ...address, rua: v })} className="sm:col-span-2" />
                <Field label="Número" value={address.numero} onChange={(v) => setAddress({ ...address, numero: v })} />
                <Field label="Bairro" value={address.bairro} onChange={(v) => setAddress({ ...address, bairro: v })} />
                <Field label="Cidade" value={address.cidade} onChange={(v) => setAddress({ ...address, cidade: v })} className="sm:col-span-2" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-semibold">Pagamento</h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {([
                  { v: "cartao", l: "Cartão", I: CreditCard },
                  { v: "pix", l: "PIX", I: QrCode },
                  { v: "boleto", l: "Boleto", I: Receipt },
                ] as const).map(({ v, l, I }) => (
                  <button key={v} onClick={() => setMethod(v)}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-3 text-sm ${method === v ? "border-primary bg-primary/5 text-primary" : "hover:bg-accent"}`}>
                    <I className="h-5 w-5" /> {l}
                  </button>
                ))}
              </div>

              {method === "cartao" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Field label="Nome no cartão" value={card.name} onChange={(v) => setCard({ ...card, name: v })} className="sm:col-span-2" />
                  <Field label="Número do cartão" value={card.number} onChange={(v) => setCard({ ...card, number: v.replace(/[^\d ]/g, "") })} className="sm:col-span-2" />
                  <Field label="Validade (MM/AA)" value={card.expiry} onChange={(v) => setCard({ ...card, expiry: v })} />
                  <Field label="CVV" value={card.cvv} onChange={(v) => setCard({ ...card, cvv: v.replace(/\D/g, "").slice(0, 4) })} />
                </div>
              )}
              {method === "pix" && (
                <div className="mt-4 rounded-md border bg-muted p-4 text-sm text-muted-foreground">
                  Um QR Code será gerado após a confirmação do pedido (simulação).
                </div>
              )}
              {method === "boleto" && (
                <div className="mt-4 rounded-md border bg-muted p-4 text-sm text-muted-foreground">
                  O boleto será disponibilizado após a confirmação (simulação).
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : s))}
              disabled={step === 1}
              className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-40"
            >
              Voltar
            </button>
            {step < 3 ? (
              <button onClick={goNext} className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Continuar
              </button>
            ) : (
              <button onClick={finalize} className="rounded-md bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
                Finalizar pedido
              </button>
            )}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border bg-card p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Resumo</h3>
          <div className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatBRL(total)}</span></div>
            <div className="flex justify-between text-muted-foreground"><span>Frete</span><span>Grátis</span></div>
          </div>
          <div className="mt-3 flex justify-between border-t pt-3 text-base font-bold">
            <span>Total</span><span className="text-primary">{formatBRL(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, className = "" }: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <div className={className}>
      <label className="text-sm font-medium">{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
    </div>
  );
}
