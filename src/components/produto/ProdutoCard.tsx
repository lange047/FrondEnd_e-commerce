'use client';

import React from 'react';
import { useCarrinho } from '@/context/CarrinhoContext';
import { Produto } from '@/data/produtos';
import Image from 'next/image';

interface ProdutoCardProps {
  produto: Produto;
}

export default function ProdutoCard({ produto }: ProdutoCardProps) {
  // Puxamos a função adicionarItem do seu contexto para enviar o produto diretamente
  const { adicionarItem } = useCarrinho();

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition duration-200">
      <div>
        {/* Container da Imagem - Mantido exatamente igual */}
        <div className="relative w-full h-48 bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-50">
          <Image 
            src={produto.image || '/images/placeholder.jpg'} 
            alt={produto.name} 
            fill 
            className="object-contain"
            sizes="(max-w-7xl) 25vw"
          />
        </div>

        {/* Informações do Produto - Mantido exatamente igual */}
        <h3 className="text-gray-800 font-semibold text-base line-clamp-2 min-h-[3rem]">
          {produto.name}
        </h3>
        
        {produto.category && (
          <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md mt-1 font-medium">
            {produto.category}
          </span>
        )}
      </div>

      <div>
        <p className="text-blue-600 font-bold text-xl mt-4">
          R$ {produto.price.toFixed(2)}
        </p>
        
        {/* Botão de Compra Ajustado com Texto Fixo e Ação Direta */}
        <button 
          onClick={() => adicionarItem(produto)}
          className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-xl mt-3 hover:bg-blue-700 active:scale-[0.98] transition-all"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}