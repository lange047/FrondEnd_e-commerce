// Simulação da chamada de API para o Backend
export async function criarCategoria(nome: string): Promise<{ success: boolean; message?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!nome.trim()) {
        resolve({ success: false, message: 'O nome da categoria não pode estar vazio.' });
      } else if (nome.toLowerCase() === 'erro') {
        resolve({ success: false, message: 'Erro interno do servidor ao salvar categoria.' });
      } else {
        resolve({ success: true });
      }
    }, 800);
  });
}