// Simulação de upload de arquivo para o servidor/S3
export async function uploadArquivo(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('O arquivo excede o limite de 5MB.'));
      } else {
        // Retorna uma URL fictícia baseada no objeto local para exibição visual
        resolve(URL.createObjectURL(file));
      }
    }, 1000);
  });
}