'use client';

import React from 'react';
import { useCarrinho } from '@/context/CarrinhoContext'; // Ajuste o caminho do import do seu context se necessário
import Image from 'next/image';

interface CarrinhoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CarrinhoDrawer({ isOpen, onClose }: CarrinhoDrawerProps) {
  const { itens, alterarQuantidade, removerItem, valorTotal } = useCarrinho();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop (Fundo escuro) */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Meu Carrinho</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 text-xl font-bold">
              &times;
            </button>
          </div>

          {/* Lista de Itens */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {itens.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">Seu carrinho está vazio.</p>
            ) : (
              itens.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                  <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                    <p className="text-sm font-bold text-emerald-600 mt-1">
                      R$ {item.price.toFixed(2)}
                    </p>
                    {/* Controles de Quantidade */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => alterarQuantidade(item.id, item.quantidade - 1)}
                        className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="text-sm font-mono w-6 text-center">{item.quantidade}</span>
                      <button
                        onClick={() => alterarQuantidade(item.id, item.quantidade + 1)}
                        className="px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded text-xs font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removerItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-xs font-medium"
                  >
                    Remover
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer do Carrinho */}
          {itens.length > 0 && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <span>Total:</span>
                <span className="text-xl font-bold text-emerald-600">
                  R$ {valorTotal.toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
                Finalizar Compra
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}