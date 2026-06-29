'use client';

import React, { useState } from 'react';
import { Search, User, ShoppingBag, LayoutDashboard, ChevronLeft, ChevronRight, X, Plus, Minus, Trash2 } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import ProdutoCard from '@/components/produto/ProdutoCard';
import { TODOS_PRODUTOS } from '@/data/produtos';
import { useCarrinho, CarrinhoProvider } from '@/context/CarrinhoContext';

export default function HomePageContainer() {
  return (
    <CarrinhoProvider>
      <HomePage />
    </CarrinhoProvider>
  );
}

function HomePage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);
  const [busca, setBusca] = useState<string>('');
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const itensPorPagina = 6;

  const [modalCategoriaAberto, setModalCategoriaAberto] = useState(false);
  const [modalProdutoAberto, setModalProdutoAberto] = useState(false);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  
  const { alterarQuantidade, removerItem, valorTotal, limparCarrinho, quantidadeTotal } = useCarrinho() as any;
  const quantidadeTotal = itens.reduce((acc: number, item: any) => acc + (item.quantidade || 0), 0);

  const produtosFiltrados = TODOS_PRODUTOS.filter((p: any) => {
    const matchesCategoria = categoriaAtiva ? p.category.toLowerCase() === categoriaAtiva.toLowerCase() : true;
    const matchesBusca = p.name.toLowerCase().includes(busca.toLowerCase()) || p.category.toLowerCase().includes(busca.toLowerCase());
    return matchesCategoria && matchesBusca;
  });

  const totalPaginas = Math.ceil(produtosFiltrados.length / itensPorPagina) || 1;
  const paginaValida = paginaAtual > totalPaginas ? totalPaginas : paginaAtual;
  const produtosPaginados = produtosFiltrados.slice((paginaValida - 1) * itensPorPagina, paginaValida * itensPorPagina);

  // Função executada ao finalizar a compra
  const handleFinalizarCompra = () => {
    alert("Compra finalizada com sucesso!");
    setCarrinhoAberto(false); // Fecha o drawer lateral
    if (limparCarrinho) {
      limparCarrinho(); // Limpa os itens do carrinho se a função estiver disponível no Context
    }
  };

  return (
    <div className="p-4 md:p-8 font-sans bg-slate-100 min-h-screen text-black relative overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-[32px] shadow-xl p-6 md:p-8 space-y-6">
        
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-100 w-full">
          <h1 className="text-2xl font-black text-blue-900 tracking-tight">Projeto de E-Commerce</h1>
          
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              value={busca}
              onChange={(e) => { setBusca(e.target.value); setPaginaAtual(1); }}
              placeholder="Buscar produtos..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="/login" 
              className="p-2 text-slate-500 hover:text-blue-600 flex items-center transition-colors"
              title="Acessar Login"
            >
              <User size={20} /> 
            </a>
            
            <button 
              onClick={() => setCarrinhoAberto(true)} 
              className="p-2 text-slate-500 hover:text-blue-600 relative transition-transform active:scale-95"
            >
              <ShoppingBag size={20} />
              {quantidadeTotal > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce">
                  {quantidadeTotal}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* CORPO */}
        <div className="flex flex-col md:flex-row gap-8">
          <Sidebar categoriaAtiva={categoriaAtiva} onSelect={(cat) => { setCategoriaAtiva(cat); setPaginaAtual(1); }} />
          
          <div className="flex-1 space-y-6">
            <div className="w-full bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-blue-950 font-bold text-sm">
                <LayoutDashboard size={18} className="text-blue-600" />
                <span>Painel Administrativo</span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button onClick={() => setModalCategoriaAberto(true)} className="flex-1 sm:flex-initial text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl">+ Nova Categoria</button>
                <button onClick={() => setModalProdutoAberto(true)} className="flex-1 sm:flex-initial text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm">+ Novo Produto</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtosPaginados.map((produto: any) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>

            {/* PAGINAÇÃO */}
            {totalPaginas > 1 && (
              <div className="flex justify-center items-center gap-1.5 pt-6 border-t border-slate-100">
                <button onClick={() => setPaginaAtual(p => Math.max(p - 1, 1))} disabled={paginaValida === 1} className="p-2 border rounded-xl disabled:opacity-40"><ChevronLeft size={16} /></button>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                  <button key={num} onClick={() => setPaginaAtual(num)} className={`h-9 w-9 text-xs font-bold rounded-xl ${paginaValida === num ? 'bg-blue-600 text-white shadow-sm' : 'border hover:bg-slate-50'}`}>{num}</button>
                ))}
                <button onClick={() => setPaginaAtual(p => Math.min(p + 1, totalPaginas))} disabled={paginaValida === totalPaginas} className="p-2 border rounded-xl disabled:opacity-40"><ChevronRight size={16} /></button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DRAWER LATERAL DO CARRINHO */}
      {carrinhoAberto && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex items-center gap-2 text-slate-900 font-black text-lg">
                  <ShoppingBag className="text-blue-600" />
                  <span>Seu Carrinho</span>
                </div>
                <button onClick={() => setCarrinhoAberto(false)} className="p-1 hover:bg-slate-100 rounded-lg text-slate-500"><X size={20} /></button>
              </div>

              <div className="overflow-y-auto max-h-[60vh] mt-4 space-y-4 pr-1">
                {itens.length === 0 ? (
                  <p className="text-center text-slate-400 py-12 text-sm font-medium">Seu carrinho está vazio.</p>
                ) : (
                  itens.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-3 gap-4">
                      <div className="h-14 w-14 bg-slate-100 rounded-xl flex items-center justify-center text-2xl select-none">{item.image}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{item.name}</h4>
                        <span className="text-xs font-black text-blue-600">R$ {(Number(item.price) || 0).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2 border rounded-xl p-1 bg-slate-50">
                        <button onClick={() => alterarQuantidade(item.id, item.quantidade - 1)} className="p-1 hover:bg-white rounded text-slate-600"><Minus size={12} /></button>
                        <span className="text-xs font-bold px-1 w-4 text-center">
                          {typeof item.quantidade === 'number' && !isNaN(item.quantidade) ? item.quantidade : 0}</span>
                        <button onClick={() => alterarQuantidade(item.id, item.quantidade + 1)} className="p-1 hover:bg-white rounded text-slate-600"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => removerItem(item.id)} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center font-black text-slate-900">
                <span>Total:</span>
                <span className="text-xl text-blue-700">R$ {valorTotal.toFixed(2)}</span>
              </div>
              
              {/* Evento onClick adicionado aqui chamando a nova função */}
              <button 
                onClick={handleFinalizarCompra}
                disabled={itens.length === 0} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm disabled:opacity-50 transition-colors shadow-md"
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAIS */}
      {modalCategoriaAberto && <ModalNovaCategoria fechar={() => setModalCategoriaAberto(false)} />}
      {modalProdutoAberto && <ModalNovoProduto fechar={() => setModalProdutoAberto(false)} />}
    </div>
  );
}

function ModalNovaCategoria({ fechar }: { fechar: () => void }) { return <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4"><h3 className="font-black text-lg">Nova Categoria</h3><input type="text" placeholder="Nome" className="w-full border p-2.5 rounded-xl text-sm" /><div className="flex gap-2 justify-end"><button onClick={fechar} className="px-4 py-2 text-xs font-bold text-slate-500">Cancelar</button><button onClick={fechar} className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg">Salvar</button></div></div></div>; }
function ModalNovoProduto({ fechar }: { fechar: () => void }) { return <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"><div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4"><h3 className="font-black text-lg">Novo Produto</h3><div className="space-y-3"><input type="text" placeholder="Nome" className="w-full border p-2.5 rounded-xl text-sm" /><input type="number" placeholder="Preço" className="w-full border p-2.5 rounded-xl text-sm" /></div><div className="flex gap-2 justify-end pt-2"><button onClick={fechar} className="px-4 py-2 text-xs font-bold text-slate-500">Cancelar</button><button onClick={fechar} className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg">Cadastrar</button></div></div></div>; }