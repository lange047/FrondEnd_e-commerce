'use client';

import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface Categoria {
  id: string;
  nome: string;
}

interface Produto {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
}

interface ModalEditarProdutoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categorias: Categoria[];
  produto: Produto | null;
}

export default function ModalEditarProduto({ isOpen, onClose, onSuccess, categorias, produto }: ModalEditarProdutoProps) {
  // Inicialização direta: Funciona perfeitamente porque o componente será remontado quando a chave mudar
  const [nome, setNome] = useState(produto?.name || '');
  const [preco, setPreco] = useState(produto?.price ? produto.price.toString() : '');
  const [categoria, setCategoria] = useState(produto?.category || '');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  if (!isOpen || !produto) return null;

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    if (!nome.trim() || !preco || !categoria) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      onSuccess();
      onClose();
    } catch {
      setErro('Erro ao atualizar o produto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm text-black">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl z-10 border border-gray-100">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h3 className="text-lg font-extrabold text-blue-950">Editar Produto</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSalvar} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Preço</label>
            <input
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className="w-full px-4 py-2.5 border rounded-xl text-sm"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full px-4 py-2.5 border bg-white rounded-xl text-sm"
              disabled={loading}
            >
              <option value="">Selecione uma categoria...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nome}>{cat.nome}</option>
              ))}
            </select>
          </div>

          {erro && <p className="text-xs text-red-500 font-bold">{erro}</p>}

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 border rounded-xl text-xs font-bold text-gray-500"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2"
              disabled={loading}
            >
              {loading ? <Loader2 size={14} className="animate-spin" /> : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}