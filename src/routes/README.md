# 🚀 HardFast Store

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)]()
[![React](https://img.shields.io/badge/React-18-blue)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

> Uma loja virtual de hardware e eletrônicos inspirada em plataformas como Kabum e Pichau, desenvolvida como projeto da disciplina de Quality Assurance (QA).
> A plataforma permite compra de computadores montados ou componentes avulsos, contando com autenticação, carrinho, checkout e sistema de montagem de PC com validação de compatibilidade.

---

# 📋 Índice

* [📖 Sobre o Projeto](#-sobre-o-projeto)
* [⚙️ Funcionalidades](#️-funcionalidades)
* [🛠️ Tecnologias](#️-tecnologias)
* [📁 Estrutura do Projeto](#-estrutura-do-projeto)
* [🗂️ Convenções de Rotas](#️-convenções-de-rotas-tanstack-start)
* [🚀 Como Executar](#-como-executar)
* [🔑 Credenciais de Acesso](#-credenciais-de-acesso)
* [📚 Documentação](#-documentação)
* [👥 Equipe](#-equipe)
* [📊 Status do Projeto](#-status-do-projeto)
* [📝 Licença](#-licença)
* [🙏 Agradecimentos](#-agradecimentos)

---

# 📖 Sobre o Projeto

A **HardFast Store** foi desenvolvida como parte do projeto final da disciplina de **Quality Assurance (QA)**, com o objetivo de criar uma plataforma capaz de gerar cenários reais para testes de software.

O sistema simula um e-commerce completo de hardware gamer, permitindo validar:

* ✅ Testes funcionais
* ✅ Testes de usabilidade
* ✅ Testes de interface
* ✅ Testes de regras de negócio
* ✅ Persistência de dados via localStorage
* ✅ Compatibilidade de hardware
* ✅ Fluxos de autenticação e checkout

---

# ⚙️ Funcionalidades

## ✅ Já Implementadas

| Funcionalidade          | Descrição                                             |
| ----------------------- | ----------------------------------------------------- |
| 🎨 Tema Escuro/Claro    | Alternância de temas com persistência no localStorage |
| 🔐 Autenticação         | Cadastro, login e logout com persistência local       |
| 🛒 Carrinho de Compras  | CRUD completo com persistência                        |
| 📦 Checkout             | Fluxo em 3 etapas                                     |
| 📜 Histórico de Pedidos | Lista pedidos do usuário autenticado                  |
| 🖥️ Monte seu PC        | Compatibilidade de socket AM4/LGA1700                 |
| 💾 Persistência Local   | Sistema funcional offline                             |
| 📱 Responsividade       | Layout adaptado para mobile/tablet/desktop            |

---

## 🟡 Em Desenvolvimento

| Funcionalidade           | Prioridade |
| ------------------------ | ---------- |
| Computadores montados    | Alta       |
| Avaliações de produtos   | Média      |
| SSDs, HDs e refrigeração | Média      |
| Categoria “Refrigeração” | Média      |
| Builds salvas            | Baixa      |

---

# 🛠️ Tecnologias

## Frontend

| Tecnologia     | Versão      | Finalidade                       |
| -------------- | ----------- | -------------------------------- |
| React          | 18.x        | Biblioteca principal             |
| TanStack Start | Latest      | Framework com file-based routing |
| TailwindCSS    | 3.x         | Estilização                      |
| Context API    | Native      | Gerenciamento de estado          |
| localStorage   | Browser API | Persistência de dados            |

---

## Ferramentas de Desenvolvimento

| Ferramenta | Finalidade             |
| ---------- | ---------------------- |
| Vite       | Dev server e build     |
| ESLint     | Padronização de código |
| Prettier   | Formatação             |
| Git        | Controle de versão     |

---

## ❌ NÃO Utilizado (Propositalmente)

* Backend real
* Node.js/Express
* Supabase
* Firebase
* Banco de dados
* APIs externas

---

# 📁 Estrutura do Projeto

```txt
hardfast-store/
├── src/
│
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── CartSidebar.jsx
│   ├── ThemeToggle.jsx
│   ├── ProductReviews.jsx
│   ├── PreBuiltPCCard.jsx
│   └── ProtectedRoute.jsx
│
├── routes/
│   ├── __root.tsx
│   ├── index.tsx
│   ├── produtos.tsx
│   ├── produto.$id.tsx
│   ├── checkout.tsx
│   ├── pedidos.tsx
│   ├── monte-seu-pc.tsx
│   ├── login.tsx
│   └── cadastro.tsx
│
├── contexts/
│   ├── ThemeContext.jsx
│   ├── AuthContext.jsx
│   └── CartContext.jsx
│
├── data/
│   ├── products.js
│   ├── preBuiltPCs.js
│   └── reviews.js
│
├── utils/
│   ├── localStorage.js
│   ├── cartMerge.js
│   └── compatibility.js
│
├── styles/
│   └── globals.css
│
├── public/
│   └── images/
│
├── docs/
│   ├── requirements.md
│   ├── design.md
│   └── tasks.md
│
├── .gitignore
├── package.json
├── README.md
└── tailwind.config.js
```

---

# 🗂️ Convenções de Rotas (TanStack Start)

| Arquivo            | Rota            | Descrição            |
| ------------------ | --------------- | -------------------- |
| `index.tsx`        | `/`             | Página inicial       |
| `produtos.tsx`     | `/produtos`     | Catálogo de produtos |
| `produto.$id.tsx`  | `/produto/:id`  | Produto individual   |
| `checkout.tsx`     | `/checkout`     | Checkout protegido   |
| `pedidos.tsx`      | `/pedidos`      | Histórico protegido  |
| `monte-seu-pc.tsx` | `/monte-seu-pc` | Montador de PC       |
| `login.tsx`        | `/login`        | Login                |
| `cadastro.tsx`     | `/cadastro`     | Cadastro             |
| `__root.tsx`       | Layout global   | App shell            |

---

> ⚠️ O arquivo `routeTree.gen.ts` é gerado automaticamente pelo TanStack Start.
> Não editar manualmente.

---

# 🚀 Como Executar

## Pré-requisitos

* Node.js v18+
* npm ou yarn

---

## Passo a Passo

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/hardfast-store.git

# 2. Entrar na pasta
cd hardfast-store

# 3. Instalar dependências
npm install

# 4. Executar ambiente de desenvolvimento
npm run dev
```

---

## Acesso Local

```txt
http://localhost:5173
```

---

# 📦 Scripts Disponíveis

| Comando           | Descrição                   |
| ----------------- | --------------------------- |
| `npm run dev`     | Ambiente de desenvolvimento |
| `npm run build`   | Build de produção           |
| `npm run preview` | Preview da build            |
| `npm run lint`    | Executa ESLint              |

---

# 🔑 Credenciais de Acesso

Para facilitar os testes do sistema, existe um usuário pré-cadastrado automaticamente.

| Campo | Valor                        |
| ----- | ---------------------------- |
| Email | `rafa_alves0901@hotmail.com` |
| Senha | `rafa_0901`                  |

---

## Observação

O usuário é criado automaticamente no `localStorage` caso ainda não exista.

---

# 📚 Documentação

A pasta `/docs` contém:

| Arquivo           | Conteúdo                               |
| ----------------- | -------------------------------------- |
| `requirements.md` | Requisitos funcionais e não funcionais |
| `design.md`       | Arquitetura e decisões técnicas        |
| `tasks.md`        | Lista de tarefas e progresso           |

---

# 👥 Equipe

| Nome         | Papel              |
| ------------ | ------------------ |
| Rafael Alves | Desenvolvedor / QA |

---

# 📊 Status do Projeto

| Fase                 | Status          |
| -------------------- | --------------- |
| Planejamento         | ✅ Concluído     |
| Desenvolvimento Base | ✅ Concluído     |
| Ajustes e Features   | 🟡 Em andamento |
| Testes de QA         | 🟡 Em andamento |
| Documentação         | ✅ Concluído     |
| Apresentação Final   | ⏳ Pendente      |

---

# 📝 Licença

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de **Quality Assurance (QA)**.

Licença:

```txt
MIT
```

---

# 🙏 Agradecimentos

* Professor da disciplina de QA
* Colegas de equipe
* Comunidade open source
* Criadores do React, TailwindCSS e TanStack

---

# 🎯 Objetivo do Projeto

A HardFast Store foi criada para servir como:

* plataforma de aprendizado
* ambiente de testes de QA
* simulação de e-commerce real
* estudo de arquitetura frontend
* prática de regras de negócio

Tudo isso utilizando apenas frontend e persistência local via `localStorage`.
