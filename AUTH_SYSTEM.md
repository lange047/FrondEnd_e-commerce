# Sistema de Autenticação com JWT

## 📋 Resumo da Implementação

Este documento descreve o sistema de autenticação implementado no frontend Next.js.

## 🗂️ Estrutura de Arquivos Criados

### 1. **src/app/login/page.tsx** - Página de Login
- Formulário com campos de email e senha
- Validação de entrada
- Chamada à API `/login`
- Salva token no localStorage
- Redireciona para home após sucesso
- Exibe mensagens de erro

### 2. **src/context/AuthContext.tsx** - Contexto de Autenticação
- Lê o token do localStorage ao carregar
- Decodifica o JWT para extrair dados do usuário
- Verifica se o token expirou
- Fornece `useAuth()` hook para componentes
- Gerencia logout e limpeza de sessão

### 3. **src/lib/jwt.ts** - Utilitários JWT
- `decodeJWT()` - Decodifica um token JWT
- `isTokenExpired()` - Verifica se o token expirou
- Não requer dependências externas

### 4. **src/middleware.ts** - Middleware de Proteção
- Redireciona usuários não autenticados para /login
- Define rotas públicas (login, signup, etc.)
- Protege todas as outras rotas automaticamente

### 5. **src/components/UserInfo.tsx** - Componente de Informações do Usuário
- Exibe email e tipo de usuário
- Botão para logout
- Mostra se é ADMIN ou CLIENTE

### 6. **src/app/layout.tsx** - Layout Principal (Atualizado)
- Envolve a aplicação com `AuthProvider`
- Disponibiliza contexto para toda a app

## 🚀 Como Usar

### No Componente (exemplo):

```typescript
'use client';

import { useAuth } from '@/context/AuthContext';

export function MyComponent() {
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>Tipo: {isAdmin ? 'Admin' : 'Cliente'}</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

## 🔐 Como Funciona

### Fluxo de Autenticação:

1. Usuário acessa a página
2. Middleware verifica se há token
3. Se não tiver token → Redireciona para /login
4. Usuário faz login na página `/login`
5. Token é salvo em localStorage
6. AuthContext decodifica o token
7. App redireciona para home (/)
8. Componentes acessam dados via `useAuth()`

### Estrutura do Token JWT (esperada):

```json
{
  "sub": "usuario-id",
  "email": "usuario@email.com",
  "tipo": "ADMIN",
  "exp": 1234567890
}
```

O campo `tipo` determina se é "ADMIN" ou "CLIENTE".

## 🛡️ Rotas Públicas

As seguintes rotas são acessíveis sem autenticação:

- `/login` - Página de login
- `/signup` - Página de registro (futura)
- `/forgot-password` - Recuperação de senha (futura)
- `/health` - Health check da API

## 📝 Próximos Passos

1. **Criar página de cadastro** (`/signup`)
2. **Implementar recuperação de senha**
3. **Adicionar refresh token**
4. **Criar páginas protegidas por tipo de usuário**
5. **Implementar 2FA (autenticação de dois fatores)**
6. **Adicionar testes automatizados**

## ⚙️ Configuração do Backend Esperada

O backend deve:

1. **Endpoint POST /login**:
   - Input: `{ email: string, senha: string }`
   - Output: `{ token: string }`
   - Token deve ser um JWT válido

2. **JWT Token deve incluir**:
   - `email` - Email do usuário
   - `tipo` - "ADMIN" ou "CLIENTE"
   - `exp` - Timestamp de expiração

## 🐛 Troubleshooting

### Erro: "useAuth deve ser usado dentro de um AuthProvider"
- Verifique se `AuthProvider` está envolvendo o componente no layout.tsx

### Erro: "Token não localizado"
- Verifique se o localStorage está habilitado
- Verifique se a API está retornando corretamente

### Usuário é redirecionado para login continuamente
- Token pode estar expirado
- Verifique se o campo `tipo` está presente no JWT

## 📚 Referências

- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [React Context API](https://react.dev/reference/react/useContext)
- [JWT.io](https://jwt.io/)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
