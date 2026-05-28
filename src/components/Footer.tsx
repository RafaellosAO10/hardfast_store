import { Link } from "@tanstack/react-router";
import { Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t bg-card/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="hf-grad inline-flex h-8 w-8 items-center justify-center rounded-lg text-white">
              <Cpu className="h-4 w-4" />
            </span>
            HardFast
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Hardware gamer e componentes de PC com entrega rápida.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Loja</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/produtos" className="hover:text-foreground">Produtos</Link></li>
            <li><Link to="/monte-seu-pc" className="hover:text-foreground">Monte seu PC</Link></li>
            <li><Link to="/pedidos" className="hover:text-foreground">Pedidos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Institucional</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#">Sobre</a></li>
            <li><a className="hover:text-foreground" href="#">Contato</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#">Termos</a></li>
            <li><a className="hover:text-foreground" href="#">Política de Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HardFast Store. Todos os direitos reservados.
      </div>
    </footer>
  );
}
