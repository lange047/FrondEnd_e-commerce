'use client';

import { useParams } from 'next/navigation';
import ProdutoGrid from '@/components/produto/ProdutoGrid';
// 1. Importamos a lista oficial e atualizada e a interface do arquivo correto
import { TODOS_PRODUTOS } from '@/data/produtos';

export default function PaginaCategoria() {
  const params = useParams();
  
  // Garante que o slug da categoria seja tratado como string
  const categoriaSlug = (params.categoria as string) || '';

  // 2. Filtra os produtos usando a nossa lista oficial do arquivo centralizado
  const produtosFiltrados = TODOS_PRODUTOS.filter(
    (p) => p.category === categoriaSlug
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold uppercase text-blue-900 mb-6">
        {categoriaSlug.replace('-', ' ')}
      </h1>
      
      {produtosFiltrados.length > 0 ? (
        <ProdutoGrid produtos={produtosFiltrados} />
      ) : (
        <p className="text-slate-500">Nenhum produto nesta categoria.</p>
      )}
    </div>
  );
}