import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useUsersStore, useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { toast } from "sonner";
import { Cpu } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar - HardFast Store" },
      { name: "description", content: "Faça login na sua conta HardFast" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const router = useRouter();
  const findByEmail = useUsersStore((s) => s.findByEmail);
  const login = useAuthStore((s) => s.login);
  const cartItems = useCartStore((s) => s.items);
  const mergeItems = useCartStore((s) => s.mergeItems);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const u = findByEmail(email.trim());
    if (!u || u.password !== password) {
      setErr("E-mail ou senha incorretos.");
      return;
    }
    login({ id: u.id, name: u.name, email: u.email });

    // Merge visitor cart with user cart - in this storage model, the cart store is single
    // so we just keep current items. Demonstrate merge by re-merging current items into itself (no-op)
    // but we expose the API for completeness.
    if (cartItems.length > 0) {
      const res = mergeItems([]);
      if (res.warning) toast.warning(res.warning);
    }

    toast.success(`Bem-vindo, ${u.name.split(" ")[0]}!`);
    router.navigate({ to: "/" });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <span className="hf-grad mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
        <Cpu className="h-6 w-6" />
      </span>
      <h1 className="text-3xl font-bold">Entrar</h1>
      <p className="mt-1 text-sm text-muted-foreground">Acesse sua conta HardFast</p>

      <form onSubmit={submit} className="mt-8 w-full space-y-4 rounded-2xl border bg-card p-6">
        {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
        <div>
          <label className="text-sm font-medium">E-mail</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Senha</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
        </div>
        <button className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Entrar
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Não tem conta? <Link to="/cadastro" className="font-medium text-primary hover:underline">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
