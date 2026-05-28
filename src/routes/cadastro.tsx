import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useUsersStore, useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { Cpu } from "lucide-react";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Criar conta - HardFast Store" },
      { name: "description", content: "Crie sua conta gratuita na HardFast" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const router = useRouter();
  const addUser = useUsersStore((s) => s.addUser);
  const findByEmail = useUsersStore((s) => s.findByEmail);
  const login = useAuthStore((s) => s.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (name.trim().length < 2) return setErr("Informe seu nome completo.");
    if (!/^\S+@\S+\.\S+$/.test(email)) return setErr("E-mail inválido.");
    if (password.length < 6) return setErr("A senha deve ter no mínimo 6 caracteres.");
    if (findByEmail(email)) return setErr("Já existe uma conta com esse e-mail.");

    const id = crypto.randomUUID();
    addUser({
      id, name: name.trim(), email: email.trim(), password,
      createdAt: new Date().toISOString(),
    });
    login({ id, name: name.trim(), email: email.trim() });
    toast.success("Conta criada!");
    router.navigate({ to: "/" });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16">
      <span className="hf-grad mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
        <Cpu className="h-6 w-6" />
      </span>
      <h1 className="text-3xl font-bold">Criar conta</h1>
      <p className="mt-1 text-sm text-muted-foreground">É rápido e gratuito</p>

      <form onSubmit={submit} className="mt-8 w-full space-y-4 rounded-2xl border bg-card p-6">
        {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</p>}
        <div>
          <label className="text-sm font-medium">Nome completo</label>
          <input required value={name} onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">E-mail</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium">Senha</label>
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" />
          <p className="mt-1 text-xs text-muted-foreground">Mínimo de 6 caracteres</p>
        </div>
        <button className="w-full rounded-md bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90">
          Criar conta
        </button>
        <p className="text-center text-sm text-muted-foreground">
          Já tem conta? <Link to="/login" className="font-medium text-primary hover:underline">Entrar</Link>
        </p>
      </form>
    </div>
  );
}
