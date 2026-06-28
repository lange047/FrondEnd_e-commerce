// Função para decodificar JWT sem dependência externa
export function decodeJWT(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token JWT inválido');
    }

    // Decodificar a payload (segunda parte)
    const payload = parts[1];
    // Adicionar padding se necessário
    const padded = payload + '=='.substring(0, (4 - (payload.length % 4)) % 4);
    // Converter de base64url para string
    const decoded = atob(padded);
    // Fazer parse do JSON
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error);
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) {
    return true;
  }
  return decoded.exp * 1000 < Date.now();
}
