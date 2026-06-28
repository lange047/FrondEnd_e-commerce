'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar'; 
import ProdutoGrid from '../produto/ProdutoGrid'; 
import { TODOS_PRODUTOS } from '@/data/produtos'; // Importação do arquivo de dados

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);

  const produtosFiltrados = categoriaAtiva 
    ? TODOS_PRODUTOS.filter(p => p.category === categoriaAtiva)
    : TODOS_PRODUTOS;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 text-black font-sans">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-[32px] shadow-xl p-6 md:p-8 space-y-6">
        <h1 className="text-2xl font-black text-blue-900 pb-4 border-b border-slate-100">
          Projeto de E-Commerce
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar categoriaAtiva={categoriaAtiva} onSelect={setCategoriaAtiva} />
          <div className="flex-1">
            {/* Renderiza a grade de produtos filtrada por estado */}
            <ProdutoGrid produtos={produtosFiltrados} />
            
            {/* Renderiza o children abaixo da vitrine para que as páginas internas 
              ou modais/drawers (como o CarrinhoDrawer) funcionem perfeitamente.
            */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}