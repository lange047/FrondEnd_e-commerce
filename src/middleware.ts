import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Permite a navegação livre em qualquer rota por enquanto
  return NextResponse.next();
}

// Corrigido: adicionado o sinal de '=' antes das chaves
export const config = {
  matcher: ['/checkout/:path*', '/admin/:path*'],
};