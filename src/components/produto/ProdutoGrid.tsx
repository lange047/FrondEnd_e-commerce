'use client';

import React from 'react';
import ProdutoCard from './ProdutoCard';
import { Produto } from '@/data/produtos';

interface ProdutoGridProps {
  produtos: Produto[];
}

export default function ProdutoGrid({ produtos }: ProdutoGridProps) {
  if (!produtos || produtos.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Nenhum produto encontrado.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {produtos.map((produto) => (
        // Importante: Garanta que esta tag abaixo seja estritamente ProdutoCard
        <ProdutoCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
}