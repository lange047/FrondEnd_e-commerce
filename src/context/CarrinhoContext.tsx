'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantidade: number;
  category?: string;
  code?: string;
}

export interface Produto {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  code?: string;
}

export interface CarrinhoContextType {
  itens: any[]; 
  alterarQuantidade: (id: number, quantidade: number) => void;
  removerItem: (id: number) => void;
  valorTotal: number;
  limparCarrinho?: () => void; // <--- ADICIONE EXATAMENTE ESTA LINHA
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [montado, setMontado] = useState(false);
  const [itens, setItens] = useState<CartItem[]>([]);

  // Carrega do localStorage após montar no cliente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const carrinhoSalvo = localStorage.getItem('carrinho');
      if (carrinhoSalvo) {
        try {
          setItens(JSON.parse(carrinhoSalvo));
        } catch (error) {
          console.error('Erro ao ler carrinho do localStorage:', error);
        }
      }
    }
    setMontado(true);
  }, []);

  // Salva no localStorage sempre que o carrinho mudar
  useEffect(() => {
    if (montado) {
      localStorage.setItem('carrinho', JSON.stringify(itens));
    }
  }, [itens, montado]);

  // FUNÇÃO RE-ADICIONADA: Adiciona item de forma segura
  const adicionarItem = (produto: Produto) => {
    setItens((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.id === produto.id);

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...itensAtuais, { ...produto, quantidade: 1 } as CartItem];
    });
  };

  // FUNÇÃO RE-ADICIONADA: Altera a quantidade ou remove se for menor que 1
  const alterarQuantidade = (id: number, quantidade: number) => {
    setItens((itensAtuais) => {
      if (quantidade < 1) {
        return itensAtuais.filter((item) => item.id !== id);
      }
      return itensAtuais.map((item) =>
        item.id === id ? { ...item, quantidade } : item
      );
    });
  };

  // FUNÇÃO RE-ADICIONADA: Remove o item
  const removerItem = (id: number) => {
    setItens((itensAtuais) => itensAtuais.filter((item) => item.id !== id));
  };

  const valorTotal = itens.reduce(
    (acumulador, item) => acumulador + item.price * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens: montado ? itens : [],
        adicionarItem, // Agora está perfeitamente definido acima!
        alterarQuantidade,
        removerItem,
        valorTotal: montado ? valorTotal : 0,
        quantidadeTotal: montado ? itens.reduce((acc, i) => acc + i.quantidade, 0) : 0,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (context === undefined) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
}