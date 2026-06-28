'use client';
import React from 'react';

export interface Produto {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
  code: string; // Obrigatório
}

interface ProdutoCardProps {
  produto: Produto;
  onEditClick?: (produto: Produto) => void;
}

export default function ProdutoCard({ produto, onEditClick }: ProdutoCardProps) {
  return (
    <div 
      onClick={() => onEditClick?.(produto)}
      className="bg-white border border-slate-200 p-4 rounded-2xl cursor-pointer hover:shadow-lg transition-all"
    >
      <div className="text-4xl mb-4">{produto.image}</div>
      <h3 className="font-bold text-sm">{produto.name}</h3>
      <p className="text-[10px] text-slate-400">COD: {produto.code}</p>
      <p className="text-blue-600 font-black mt-2">R$ {produto.price.toFixed(2)}</p>
    </div>
  );
}