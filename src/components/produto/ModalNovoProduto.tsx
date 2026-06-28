'use client';

import React, { useState } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';

interface Categoria {
  id: string;
  nome: string;
}

interface ModalNovoProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categorias: Categoria[];
}

export default function ModalNovoProduto({ isOpen, onClose, onSuccess, categorias }: ModalNovoProdutoProps) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCadastrar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!nome.trim() || !preco || !categoriaId) {
      setErro('Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    setLoading(true);
    try {
      // Simulação de chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
      onClose();
      setNome('');
      setPreco('');
      setCategoriaId('');
    } catch (err) {
      if (err instanceof Error) {
        setErro(err.message);
      } else {
        setErro('Erro inesperado ao salvar o produto.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm text-black">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl border border-gray-100 z-10">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-lg font-extrabold text-blue-950">
            <Plus size={18} className="text-blue-600" />
            <h3>Cadastrar Novo Produto</h3>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleCadastrar} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Nome do Produto *</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Preço *</label>
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Categoria *</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-2.5 border border-gray-200 bg-white rounded-xl text-sm"
            >
              <option value="">Selecione...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          {erro && <p className="text-xs text-red-500 font-bold">⚠️ {erro}</p>}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-xs font-bold text-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : 'Finalizar Cadastro'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}