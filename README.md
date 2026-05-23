# HardFast Store - Projeto de Quality Assurance

> 🎯 Central de Operações QA - Plataforma de E-commerce de Ferramentas e Componentes de Hardware

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Identificação da Squad](#identificação-da-squad)
- [Visão do Projeto](#visão-do-projeto)
- [Arquitetura e Fluxo do Sistema](#arquitetura-e-fluxo-do-sistema)
- [Planejamento de QA](#planejamento-de-qa)
- [Estratégia de Automação](#estratégia-de-automação)
- [Gestão do Projeto](#gestão-do-projeto)
- [Tecnologias e Ferramentas](#tecnologias-e-ferramentas)
- [Repositório GitHub](#repositório-github)
- [Contribuindo](#contribuindo)

---

## 🎯 Sobre o Projeto

**HardFast Store** é uma plataforma de e-commerce especializada na venda de ferramentas e componentes de hardware, desenvolvida como atividade prática de **Quality Assurance** com foco em testes funcionais, validação de fluxos críticos e automação de testes.

### Objetivo Principal

Criar um ambiente profissional de QA simulando um painel de controle colaborativo, onde toda a equipe possa acompanhar em tempo real:
- ✅ Planejamento e execução de testes
- ✅ Automação de validações críticas
- ✅ Gestão de bugs e evidências
- ✅ Fluxos de desenvolvimento e integração

---

## 👥 Identificação da Squad

### Nome da Equipe
**Squad HardFast QA**

### Integrantes e Funções

| Membro | RA | Função | Responsabilidades |
|--------|-----|--------|-------------------|
| Paolo Cesar Bezerra | 76348 | **QA Lead / Tester** | Coordenação de testes, planejamento de casos de teste, validação de fluxos críticos |
| George Lucas Caminha | 166030 | **QA Automation** | Desenvolvimento de scripts de automação, manutenção de suítes de testes |
| Rafael Alves Oliveira | 76601 | **QA Functional** | Testes manuais, testes exploratórios, validação de requisitos |

---

## 💡 Visão do Projeto

### Sistema
**HardFast Store** - Plataforma de E-commerce

### Objetivo Principal
Fornecer uma solução escalável e confiável para compra online de ferramentas e componentes de hardware, com garantia de qualidade em todas as transações.

### Público-Alvo
- 🔧 Profissionais de construção e reforma
- 🏭 Pequenas e médias indústrias
- 👨‍💼 Empreendedores e autônomos
- 🏠 Consumidores domésticos

### Problema que o Sistema Resolve
- ❌ Dificuldade em encontrar ferramentas específicas em lojas físicas
- ❌ Preços variáveis sem transparência
- ❌ Falta de disponibilidade em estoque
- ❌ Processos de compra complexos e demorados

✅ **Solução:** Plataforma integrada com catálogo completo, verificação de estoque real, cálculo automático de frete e processamento seguro de pagamentos.

---

## 🏗️ Arquitetura e Fluxo do Sistema

### Fluxo Visual do Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENTE                                 │
│                    (Acesso à Plataforma)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
    ┌─────────┐                            ┌──────────────┐
    │  Login  │                            │  Cadastro    │
    │ Validado│                            │ Validado (V) │
    └────┬────┘                            └──────┬───────┘
         │                                         │
         └─────────────────┬─────────────────────┘
                          │
                          ▼
            ┌──────────────────────────┐
            │  Busca e Filtro de       │
            │  Produtos por Categorias │
            └──────────┬───────────────┘
                       │
                       ▼
            ┌──────────────────────────┐
            │  Visualiza Detalhes do   │
            │  Produto                 │
            │  - Preço                 │
            │  - Disponibilidade       │
            │  - Descrição             │
            └──────────┬───────────────┘
                       │
            ┌──────────▼───────────┐
            │  Produto             │
            │  Disponível?         │
            │  Sim / Não           │
            └──────────┬───────────┘
                       │
         ┌─────────────┴─────────────┐
         │ Não                       │ Sim
         ▼                           ▼
    ┌─────────┐            ┌─────────────────┐
    │ Exibir  │            │ Adicionar ao    │
    │ Indispo- │            │ Carrinho        │
    │ nibilidade           │                 │
    └─────────┘            └────────┬────────┘
                                    │
                                    ▼
                        ┌─────────────────────┐
                        │ Revisar Carrinho    │
                        │ - Validar Itens     │
                        │ - Confirmar Estoque │
                        └────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │ Carrinho Válido?       │
                    │ (Sim / Não)            │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┴─────────────────┐
                │ Não                              │ Sim
                ▼                                  ▼
            ┌─────────┐                  ┌─────────────────┐
            │ Exibir  │                  │ Informar CEP     │
            │ Falha   │                  │ para Frete       │
            │ Carrinho│                  │                 │
            └─────────┘                  └────────┬────────┘
                                                  │
                                    ┌─────────────▼────────┐
                                    │ CEP Válido?          │
                                    │ (Sim / Não)          │
                                    └──────────┬───────────┘
                                               │
                                ┌──────────────┴──────────────┐
                                │ Não                        │ Sim
                                ▼                            ▼
                            ┌─────────┐        ┌──────────────────────┐
                            │ Exibir  │        │ Calcular Frete       │
                            │ CEP     │        │ - Tabela de Preços   │
                            │ Inválido│        │ - Integração com API │
                            └─────────┘        └──────────┬───────────┘
                                                          │
                                                ┌─────────▼─────────┐
                                                │ Validar CEP em    │
                                                │ Base de Dados (V) │
                                                └────────┬──────────┘
                                                         │
                                            ┌────────────▼────────────┐
                                            │ Frete Calculado (V)     │
                                            │ - Valor                 │
                                            │ - Prazo de Entrega      │
                                            └────────┬────────────────┘
                                                     │
                                                     ▼
                                        ┌──────────────────────┐
                                        │ Revisar Pedido       │
                                        │ - Itens              │
                                        │ - Endereço           │
                                        │ - Frete              │
                                        │ - Total              │
                                        └──────────┬───────────┘
                                                   │
                                            ┌──────▼──────┐
                                            │ Pagamento   │
                                            │ (Processado)│
                                            └──────┬──────┘
                                                   │
                                    ┌──────────────▼──────────────┐
                                    │ Pagamento Aprovado?         │
                                    │ (Sim / Não)                 │
                                    └──────────┬───────────────────┘
                                               │
                            ┌──────────────────┴───────────────────┐
                            │ Não                                  │ Sim
                            ▼                                      ▼
                    ┌─────────────────┐                ┌──────────────────────┐
                    │ Tentar Novamente│                │ Confirmar Pedido (V) │
                    │ ou Cancelar     │                │ - Gerar ID do Pedido │
                    │                 │                │ - Atualizar Estoque  │
                    └─────────────────┘                │ - Enviar Confirmação │
                                                       └──────────┬───────────┘
                                                                  │
                                                        ┌─────────▼────────┐
                                                        │ Gerar Nomero do  │
                                                        │ Pedido (Unico)   │
                                                        └────────┬─────────┘
                                                                 │
                                                        ┌────────▼────────┐
                                                        │ Enviar E-mail   │
                                                        │ de Confirmação  │
                                                        │ (Status Pedido) │
                                                        └────────┬────────┘
                                                                 │
                                                                 ▼
                                                        ┌──────────────────┐
                                                        │ Fim do Fluxo     │
                                                        │ Pedido Confirmado│
                                                        └──────────────────┘
```

### Estrutura e Navegação

| Seção | Descrição |
|-------|-----------|
| **Home** | Página inicial com banners promocionais e categorias principais |
| **Categorias** | Navegação por tipo de produto (Ferramentas, Componentes, Acessórios) |
| **Busca** | Busca avançada com filtros (preço, disponibilidade, marca) |
| **Detalhes do Produto** | Visualização completa com imagens, descrição, avaliações |
| **Carrinho** | Gerenciamento de itens, revisão de valores |
| **Checkout** | Processo de compra com múltiplas etapas (endereço, frete, pagamento) |
| **Minha Conta** | Perfil do usuário, histórico de pedidos, endereços salvos |
| **Rastreamento** | Acompanhamento de entrega em tempo real |

### Integrações Críticas

- 🔗 **Sistema CRP** - Gestão de Relacionamento com Cliente
- 💳 **Gateway de Pagamento** - Processamento seguro de transações
- 📦 **Gerenciamento de Estoque** - Sincronização de disponibilidade em tempo real
- 📍 **API de Frete** - Cálculo automático de fretes por CEP
- 📧 **Sistema de Email** - Notificações e confirmações

---

## 🧪 Planejamento de QA

### Casos de Teste Críticos

#### 1️⃣ **Autenticação e Cadastro**
- [x] Login com credenciais válidas
- [x] Login com credenciais inválidas
- [x] Cadastro de novo usuário
- [x] Validação de email duplicado
- [x] Recuperação de senha
- [x] Validação de campos obrigatórios

#### 2️⃣ **Busca e Filtro de Produtos**
- [x] Busca por nome de produto
- [x] Filtro por categoria
- [x] Filtro por faixa de preço
- [x] Filtro por disponibilidade
- [x] Combinação de múltiplos filtros
- [x] Busca com termos inválidos

#### 3️⃣ **Validação de Estoque**
- [x] Produto disponível no estoque
- [x] Produto fora de estoque
- [x] Quantidade insuficiente no carrinho
- [x] Atualização de estoque em tempo real
- [x] Bloqueio de compra com estoque zerado

#### 4️⃣ **Cálculo de Frete**
- [x] Cálculo de frete com CEP válido
- [x] Validação de CEP inválido
- [x] Múltiplas opções de entrega
- [x] Prazos de entrega corretos
- [x] Valor do frete conforme tabela

#### 5️⃣ **Processamento de Pagamento**
- [x] Pagamento aprovado
- [x] Pagamento recusado
- [x] Dados de cartão inválidos
- [x] Validação de CVV
- [x] Validação de data de validade
- [x] Transações duplicadas

#### 6️⃣ **Confirmação de Pedido**
- [x] Geração correta de ID do pedido
- [x] Atualização de estoque após compra
- [x] Envio de email de confirmação
- [x] Exibição de número de rastreamento
- [x] Histórico de pedido no perfil do usuário

### Cenários de Teste

| Cenário | Entrada | Saída Esperada | Tipo |
|---------|---------|----------------|------|
| CT-001 | Buscar produto existente | Produto exibido com detalhes | Positivo |
| CT-002 | Buscar produto inexistente | Mensagem "Nenhum resultado encontrado" | Positivo |
| CT-003 | CEP com formato inválido | Erro de validação | Negativo |
| CT-004 | Carrinho vazio checkout | Mensagem de erro | Negativo |
| CT-005 | Pagamento sem conexão | Tentativa de reconexão automática | Negativo |
| CT-006 | Múltiplos produtos no carrinho | Total calculado corretamente | Positivo |

### Testes Funcionais

✅ Fluxo completo de compra (ponta a ponta)  
✅ Validação de regras de negócio  
✅ Consistência de dados entre sistemas  
✅ Integrações com APIs externas  
✅ Tratamento de exceções e erros  

### Testes Negativos

❌ Valores inválidos em campos de formulário  
❌ Tentativas de manipulação de URLs  
❌ Acesso a funcionalidades sem permissão  
❌ Envio de requisições malformadas  
❌ Simulação de falhas de conectividade  

### Possíveis Falhas Esperadas

| Falha | Severity | Status |
|-------|----------|--------|
| Cálculo de frete incorreto após mudança de CEP | Alta | 🔴 Bloqueante |
| Mensagens de erro genéricas em formulários | Média | 🟡 Importante |
| Lag ao carregar lista de produtos | Média | 🟡 Importante |
| Email de confirmação atrasado | Baixa | 🟢 Cosmético |
| Cache de estoque desatualizado | Alta | 🔴 Bloqueante |

---

## 🤖 Estratégia de Automação

### Ferramentas Utilizadas

```
┌──────────────────────────────────────────┐
│        Stack de Automação QA             │
├──────────────────────────────────────────┤
│ 🧪 Teste Funcional       → Selenium/RC   │
│ 🔄 Framework             → Cypress       │
│ 📊 Testes Unitários      → Jest          │
│ 🐛 BDD                   → Cucumber      │
│ 📈 CI/CD                 → GitHub Actions│
│ 📝 Relatórios            → Allure Report │
│ 🗄️ Banco de Dados        → Test Data Mgmt│
└──────────────────────────────────────────┘
```

### Estratégia de Automação

1. **Smoke Tests** - Validação de funcionalidades críticas
   - Login e logout
   - Busca de produto
   - Adição ao carrinho
   - Checkout básico

2. **Testes de Regressão** - Validação de fluxos completos
   - Fluxo completo de compra
   - Integrações com sistemas externos
   - Cálculos de preço e frete

3. **Testes de Integração** - Validação entre sistemas
   - Integração com API de frete
   - Integração com gateway de pagamento
   - Sincronização de estoque

### Scripts Desenvolvidos

```bash
# Execução de suite de testes
npm test

# Testes com relatório detalhado
npm run test:report

# Testes em modo CI/CD
npm run test:ci

# Teste específico por tag
npm test -- --tags @smoke

# Teste com parallelização
npm run test:parallel
```

### Fluxo Automatizado

```
┌─────────────────────────────────────────┐
│  Push para Branch de Desenvolvimento    │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  GitHub Actions: Trigger Automação      │
└────────────┬────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────┐
│  Smoke Tests (5-10 min)                 │
│  ✓ Login                                │
│  ✓ Busca                                │
│  ✓ Carrinho                             │
└────────────┬────────────────────────────┘
             │
       ┌─────┴─────┐
       │ Passou?   │
       └─┬────────┬─┘
         │ Não    │ Sim
         ▼        ▼
      [Falhar] ┌──────────────────┐
              │ Testes Completos  │
              │ (30-45 min)       │
              │ ✓ Funcionalidade  │
              │ ✓ Integração      │
              │ ✓ Performance     │
              └──────┬────────────┘
                     │
                     ▼
            ┌────────────────────┐
            │ Gerar Relatório    │
            │ (Allure Report)    │
            └────────┬───────────┘
                     │
            ┌────────▼─────────────┐
            │ Notificar Squad      │
            │ (Slack/Email)        │
            └──────────────────────┘
```

---

## 📊 Gestão do Projeto

### Organização de Tarefas

| Sprint | Tarefas | Status |
|--------|---------|--------|
| **Sprint 1** | Planejamento QA, Mapeamento de casos de teste | ✅ Concluído |
| **Sprint 2** | Automação básica (Login, Busca), Documentação | ✅ Concluído |
| **Sprint 3** | Automação de fluxo completo, Integração CI/CD | 🔄 Em Progresso |
| **Sprint 4** | Testes de regressão, Otimizações | 🟡 Planejado |

### Responsabilidades por Função

| Função | Responsabilidades |
|--------|-------------------|
| **QA Lead** | Coordenação geral, validação de plano de testes, priorização de bugs |
| **QA Automation** | Desenvolvimento de scripts, manutenção de automação, análise de falhas |
| **QA Functional** | Execução manual de testes, testes exploratórios, documentação de bugs |
| **QA Documentation** | Manutenção de documentação, gestão de evidências, relatórios |

### Etapas Concluídas

- ✅ Análise de requisitos e mapeamento de fluxos
- ✅ Criação de plano de testes abrangente
- ✅ Documentação de casos de teste
- ✅ Setup inicial de automação
- ✅ Configuração de CI/CD

### Pendências

- 🔄 Finalizar automação de fluxo de pagamento
- 🔄 Implementar testes de carga e performance
- 🔄 Validação completa com dados reais
- 🔄 Documentação final e treinamento da equipe

---

## 📸 Evidências

### Documentação e Resultados

```
📁 Evidências/
├── 📊 Relatórios de Teste/
│   ├── smoke_tests_v1.pdf
│   ├── regression_tests_v2.pdf
│   └── integration_tests_v1.pdf
├── 📸 Screenshots/
│   ├── login_success.png
│   ├── checkout_error.png
│   └── payment_validation.png
├── 🐛 Bugs Encontrados/
│   ├── BUG-001_frete_incorreto.md
│   ├── BUG-002_cep_invalido.md
│   └── BUG-003_cache_estoque.md
├── ✨ Melhorias Realizadas/
│   ├── IMPL-001_validacao_campos.md
│   └── IMPL-002_msg_erro.md
└── 📹 Vídeos de Teste/
    ├── fluxo_compra_completo.mp4
    └── erro_pagamento.mp4
```

### Bugs Encontrados

| ID | Título | Severity | Status |
|---|----------|----------|--------|
| BUG-001 | Cálculo de frete incorreto para CEP de São Paulo | 🔴 Alta | 🔧 Em correção |
| BUG-002 | Mensagem de erro genérica no formulário de cadastro | 🟡 Média | 🟢 Resolvido |
| BUG-003 | Estoque desatualizado após compra | 🔴 Alta | 🔄 Em investigação |
| BUG-004 | Email de confirmação enviado sem itens do pedido | 🟡 Média | 🟢 Resolvido |

---

## 🔗 Repositório GitHub

### Link do Repositório
```
https://github.com/RafaellosAO10/hardfast_store
```

### Estrutura do Projeto

```
hardfast-store-qa/
├── 📁 tests/
│   ├── functional/
│   │   ├── auth.test.js
│   │   ├── search.test.js
│   │   ├── cart.test.js
│   │   └── checkout.test.js
│   ├── integration/
│   │   ├── payment.test.js
│   │   ├── shipping.test.js
│   │   └── stock.test.js
│   └── e2e/
│       └── complete_flow.test.js
├── 📁 fixtures/
│   ├── users.json
│   ├── products.json
│   └── addresses.json
├── 📁 pages/
│   ├── LoginPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── 📁 utils/
│   ├── helpers.js
│   ├── api.js
│   └── config.js
├── 📁 reports/
│   └── allure-report/
├── .github/
│   └── workflows/
│       ├── smoke-tests.yml
│       ├── regression-tests.yml
│       └── deploy.yml
├── 📄 README.md
├── 📄 cypress.config.js
├── 📄 jest.config.js
├── 📄 package.json
└── 📄 .env.example
```

### Como Executar os Testes

```bash
# Clonar repositório
git clone https://github.com/squad-hardfast/hardfast-store-qa.git
cd hardfast-store-qa

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar testes smoke
npm run test:smoke

# Executar todos os testes
npm test

# Executar testes com modo watch
npm run test:watch

# Gerar relatório Allure
npm run test:report
```

---

## 📌 Padrões e Melhores Práticas

### Nomeação de Testes

```javascript
// ✅ Bom
test('should display product details when user clicks on product card', () => {
  // test code
});

// ❌ Ruim
test('product test', () => {
  // test code
});
```

### Estrutura de Teste (AAA Pattern)

```javascript
test('should calculate correct shipping fee', () => {
  // ARRANGE - Preparar dados
  const testAddress = { cep: '01310100' };
  
  // ACT - Executar ação
  const fee = calculateShippingFee(testAddress);
  
  // ASSERT - Validar resultado
  expect(fee).toBe(25.00);
});
```

### Tagging de Testes

```javascript
// @smoke - Testes críticos executados em todo commit
// @regression - Testes de regressão executados diariamente
// @integration - Testes de integração entre sistemas
// @performance - Testes de performance e carga
// @slow - Testes que demoram mais de 30 segundos
```

---

## 🎓 Diferencial

### O que nos Destaca

✨ **Organização Profissional**
- Documentação completa e estruturada
- Gestão visual via FigJam
- Rastreabilidade de testes e bugs

✨ **Automação Inteligente**
- CI/CD integrado com GitHub Actions
- Testes paralelos para reduzir tempo de execução
- Relatórios automatizados e visuais

✨ **Colaboração em Equipe**
- Divisão clara de responsabilidades
- Evidências organizadas e acessíveis
- Comunicação estruturada via GitHub Issues

✨ **Foco em Qualidade**
- Cobertura ampla de casos de teste
- Testes negativos e de borda inclusos
- Abordagem preventiva de bugs

---

## 🚀 Como Contribuir

### Fluxo de Contribuição

1. **Criar branch** a partir de `develop`
   ```bash
   git checkout -b feature/QA-XXX-descricao
   ```

2. **Desenvolver testes**
   - Seguir padrões de nomeação
   - Incluir comentários explicativos
   - Validar localmente

3. **Commit com mensagem clara**
   ```bash
   git commit -m "QA-XXX: Adicionar testes para fluxo de pagamento"
   ```

4. **Abrir Pull Request**
   - Descrever mudanças
   - Referenciar issue relacionada
   - Aguardar review

5. **Merge e Deploy**
   - Após aprovação
   - Testes devem passar em CI/CD
   - Atualizar documentação

---

## 📞 Contato e Suporte

- 📧 **Email Squad**: squad-hardfast@example.com
- 💬 **Slack**: #squad-hardfast-qa
- 📋 **FigJam**: https://www.figma.com/board/1cYdtV73GrracBGEeLxfPg/HardFast_Store?node-id=4-542&t=gvk8slSbKiOeU9Fp-0
- 🐛 **Issues**: GitHub Issues do repositório

---

## 📄 Licença

Este projeto é desenvolvido para fins educacionais como parte da atividade contínua de Quality Assurance.

---

## 🙏 Agradecimentos

Agradecemos ao professor e toda a equipe da disciplina pelo apoio e orientação durante o desenvolvimento deste projeto.

---

**Última atualização:** 22 de maio de 2026  
**Status do Projeto:** 🔄 Em Desenvolvimento Ativo  
**Próxima Revisão:** Sprint 4 - Junho/2026

