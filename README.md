# Frontend — Next.js

Interface web para o sistema de gestão, consumindo a [API backend em Go](http://localhost:8080/swagger/index.html) via JWT.

## Layout de Referência

Exemplo de layout utilizado como base para o design do projeto:
[Ver no Google Stitch](https://stitch.withgoogle.com/preview/3200391106191840612?node-id=5949e31ee2284ef2b8e890dd71643ddf)

## Stack

| Camada      | Tecnologia                 |
| ----------- | -------------------------- |
| Framework   | Next.js 16 (App Router)    |
| Linguagem   | TypeScript 5               |
| Estilização | Tailwind CSS v4            |
| Componentes | shadcn/ui + @base-ui/react |
| Testes      | Vitest + Testing Library   |
| CI          | GitHub Actions             |

## Pré-requisitos

- Node.js 20+
- Backend Go rodando em `http://localhost:8080`

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts disponíveis

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm run start      # inicia o build de produção
npm run lint       # ESLint
npm run test       # Vitest (watch mode)
npm run test:run   # Vitest (execução única)
```

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz com:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Estrutura do projeto

```
src/
├── api/               # Camada de chamadas ao backend
│   ├── client.ts      # fetch base com Bearer token automático
│   ├── auth.ts        # login
│   ├── usuarios.ts    # CRUD de usuários
│   ├── categorias.ts  # CRUD de categorias
│   ├── upload.ts      # upload de arquivos (multipart)
│   └── health.ts      # health check
├── app/               # Rotas (App Router)
├── components/
│   └── ui/            # Componentes shadcn/ui
└── lib/
    └── utils.ts       # cn() — clsx + tailwind-merge
```

## Autenticação

O token JWT retornado pelo `/login` é salvo no `localStorage` e anexado automaticamente em todas as requisições pelo `api/client.ts`. Não há rota de refresh — ao expirar, o usuário deve fazer login novamente.

## API — endpoints disponíveis

| Método | Rota              | Descrição                   | Auth |
| ------ | ----------------- | --------------------------- | ---- |
| POST   | `/login`          | Autenticação                | Não  |
| POST   | `/usuarios`       | Criar usuário (CLIENTE)     | Não  |
| GET    | `/usuarios`       | Listar usuários             | Sim  |
| GET    | `/usuarios/:id`   | Buscar usuário              | Sim  |
| GET    | `/categorias`     | Listar categorias           | Sim  |
| GET    | `/categorias/:id` | Buscar categoria            | Sim  |
| POST   | `/categorias`     | Criar categoria             | Sim  |
| PUT    | `/categorias/:id` | Atualizar categoria         | Sim  |
| DELETE | `/categorias/:id` | Deletar categoria           | Sim  |
| POST   | `/upload`         | Upload de imagem (max 5 MB) | Sim  |
| GET    | `/health`         | Status da API               | Não  |

Documentação interativa: [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html)

## Testes

```bash
npm run test:run
```

Os testes cobrem o cliente HTTP (`api/client.ts`) e os componentes de UI (`Button`).

## CI

O workflow `.github/workflows/ci.yml` executa automaticamente em push e pull requests para `main` e `develop`:

1. Lint
2. Type-check
3. Testes
4. Build

---

## Git

### Branches

```bash
# Criar branch
git checkout -b "nomeDaBranch"

# Voltar para a branch principal
git checkout main

# Renomear branch atual
git branch -M "novoNome"

# Remover branch local
git branch -D "nomeDaBranch"
```

### Inspecionar mudanças

```bash
# Ver arquivos alterados
git status

# Ver diferenças
git diff
```

### Commit

```bash
# Adicionar arquivo ao staging
git add "pasta/arquivo"

# Fazer o commit
git commit -m "Mensagem de commit"
```

### Sincronizar com o remoto

```bash
# Enviar branch para o remoto
git push origin "nomeDaBranchLocal"

# Atualizar repositório local com dados do remoto
git pull origin "nomeDaBranchLocal"

# Ou apenas baixar sem aplicar
git fetch origin "nomeDaBranchLocal"
```
"# FrondEnd_e-commerce"  
