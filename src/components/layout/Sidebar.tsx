'use client';

import React from 'react';
import { Layers, Shirt, Home, Smartphone, ShieldAlert, Sparkles } from 'lucide-react';

interface SidebarProps {
  categoriaAtiva: string | null;
  onSelect: (cat: string | null) => void;
}

export default function Sidebar({ categoriaAtiva, onSelect }: SidebarProps) {
  const categorias = [
    { nome: 'Eletrodomésticos', slug: 'eletrodomesticos', icone: <Layers size={16} /> },
    { nome: 'Moda', slug: 'moda', icone: <Shirt size={16} /> },
    { nome: 'Casa e Decoração', slug: 'casa-decoracao', icone: <Home size={16} /> },
    { nome: 'Eletrônicos', slug: 'eletronicos', icone: <Smartphone size={16} /> },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-50/60 p-5 rounded-[24px] border border-slate-200/60 h-fit flex flex-col gap-4 text-black">
      <div>
        <h2 className="text-xl font-black text-blue-950">Categorias</h2>
        <p className="text-[11px] font-medium text-slate-400 mt-0.5">Navegue por departamento</p>
      </div>

      <nav className="flex flex-col gap-1.5 mt-2">
        <button
          onClick={() => onSelect(null)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
            categoriaAtiva === null
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-800'
          }`}
        >
          <Sparkles size={16} />
          <span>Todos os Produtos</span>
        </button>

        {categorias.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              categoriaAtiva === cat.slug
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-800'
            }`}
          >
            {cat.icone}
            <span>{cat.nome}</span>
          </button>
        ))}

        <div className="border-t border-slate-200/80 my-2 pt-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-400 cursor-not-allowed">
            <ShieldAlert size={16} />
            <span>Administração</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}