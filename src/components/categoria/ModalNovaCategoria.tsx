'use client';

import React, { useState } from 'react';
import { X, FolderPlus, Loader2 } from 'lucide-react';
import { criarCategoria } from '@/api/categorias';

interface ModalNovaCategoriaProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // Função para atualizar a lista na Sidebar
}

export default function ModalNovaCategoria({ isOpen, onClose, onSuccess }: ModalNovaCategoriaProps) {
  const [nomeCategoria, setNomeCategoria] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!nomeCategoria.trim()) {
      setErro('O campo "Nome da Categoria" é obrigatório.');
      return;
    }

    setLoading(true);
    try {
      const response = await criarCategoria(nomeCategoria);
      if (response.success) {
        setNomeCategoria('');
        onSuccess(); // Dispara a atualização da lista/sidebar
        onClose();   // Fecha o modal
      } else {
        setErro(response.message || 'Erro ao criar categoria.');
      }
    } catch (err) {
      setErro('Falha na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
      {/* Backdrop de fechamento */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Caixa do Modal */}
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-gray-100 z-10 text-black transform scale-100 transition-all duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-lg font-extrabold text-blue-950">
            <FolderPlus size={18} className="text-blue-600" />
            <h3>Nova Categoria</h3>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSalvar} className="mt-4 space-y-4">
          <div>
            <label htmlFor="nomeCategoria" className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Nome da Categoria <span className="text-red-500">*</span>
            </label>
            <input
              id="nomeCategoria"
              type="text"
              placeholder="Ex: Eletrodomésticos, Ferramentas..."
              value={nomeCategoria}
              onChange={(e) => setNomeCategoria(e.target.value)}
              disabled={loading}
              className={`w-full px-4 py-3 border rounded-xl text-sm transition-all focus:outline-none focus:ring-2 ${
                erro 
                  ? 'border-red-300 focus:ring-red-100 focus:border-red-500' 
                  : 'border-gray-200 focus:ring-blue-100 focus:border-blue-600'
              }`}
            />
            {erro && (
              <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1 animate-shake">
                ⚠️ {erro}
              </p>
            )}
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 bg-white hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100 flex items-center gap-1.5 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Categoria'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}