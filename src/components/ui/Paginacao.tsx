'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  onPaginaChange: (pagina: number) => void;
}

export default function Paginacao({
  paginaAtual,
  totalPaginas,
  onPaginaChange,
}: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  const gerarPaginas = () => {
    const paginas: (number | string)[] = [];
    const limiteMarcadores = 2; // Quantidade de páginas vizinhas visíveis

    // Sempre insere a primeira página
    paginas.push(1);

    if (paginaAtual > limiteMarcadores + 2) {
      paginas.push('...');
    }

    // Páginas ao redor da atual
    const inicio = Math.max(2, paginaAtual - limiteMarcadores);
    const fim = Math.min(totalPaginas - 1, paginaAtual + limiteMarcadores);

    for (let i = inicio; i <= fim; i++) {
      paginas.push(i);
    }

    if (paginaAtual < totalPaginas - limiteMarcadores - 1) {
      paginas.push('...');
    }

    // Sempre insere a última página
    if (totalPaginas > 1) {
      paginas.push(totalPaginas);
    }

    return paginas;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-4 select-none">
      {/* Botão Voltar */}
      <button
        onClick={() => onPaginaChange(paginaAtual - 1)}
        disabled={paginaAtual === 1}
        className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors shadow-sm"
        aria-label="Página anterior"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Números e Reticências */}
      <div className="flex items-center gap-1.5">
        {gerarPaginas().map((pag, index) => {
          if (pag === '...') {
            return (
              <span key={`dots-${index}`} className="px-2 text-sm text-gray-400 font-bold">
                ...
              </span>
            );
          }

          const numeroPagina = pag as number;
          const isAtiva = numeroPagina === paginaAtual;

          return (
            <button
              key={`page-${numeroPagina}`}
              onClick={() => onPaginaChange(numeroPagina)}
              className={`w-8 h-8 rounded-xl text-xs font-black transition-all ${
                isAtiva
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                  : 'text-gray-500 hover:bg-gray-50 border border-transparent'
              }`}
            >
              {numeroPagina}
            </button>
          );
        })}
      </div>

      {/* Botão Avançar */}
      <button
        onClick={() => onPaginaChange(paginaAtual + 1)}
        disabled={paginaAtual === totalPaginas}
        className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors shadow-sm"
        aria-label="Próxima página"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}