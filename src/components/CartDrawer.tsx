"use client";

import { useEffect, useMemo } from "react";

import { Button } from "@/components/ui";
import { Minus, Plus, ShoppingBasket, Trash2, X } from "lucide-react";

export type CartItem = {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
  imageAlt: string;
};

type CartDrawerProps = {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncreaseQuantity: (itemId: string) => void;
  onDecreaseQuantity: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export function CartDrawer({
  isOpen,
  items,
  onClose,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [items],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        aria-label="Seu carrinho"
        className={`fixed top-0 right-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-5 sm:px-5">
          <div className="flex items-center gap-2">
            <ShoppingBasket className="size-4 text-blue-700" />
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Seu Carrinho
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Fechar carrinho"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        </header>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5">
          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              Seu carrinho esta vazio.
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="grid grid-cols-[68px_1fr_auto] gap-3"
              >
                <div
                  className="h-17 rounded-lg bg-linear-to-br from-slate-100 to-slate-200"
                  aria-label={item.imageAlt}
                />

                <div className="min-w-0 space-y-1">
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {formatCurrency(item.unitPrice)} / un
                  </p>

                  <div className="inline-flex items-center rounded-lg border border-slate-300 bg-white">
                    <button
                      type="button"
                      className="grid size-7 place-items-center text-slate-700 hover:bg-slate-100"
                      onClick={() => onDecreaseQuantity(item.id)}
                      aria-label={`Diminuir quantidade de ${item.name}`}
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="min-w-8 text-center text-sm text-slate-700">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="grid size-7 place-items-center text-slate-700 hover:bg-slate-100"
                      onClick={() => onIncreaseQuantity(item.id)}
                      aria-label={`Aumentar quantidade de ${item.name}`}
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between gap-2">
                  <button
                    type="button"
                    className="text-slate-400 transition-colors hover:text-red-500"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remover ${item.name}`}
                  >
                    <Trash2 className="size-4" />
                  </button>
                  <p className="text-lg font-bold text-blue-800">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className="space-y-3 border-t border-slate-200 px-4 py-4 sm:px-5">
          <div className="flex items-center justify-between text-xl font-bold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <Button className="h-11 w-full bg-blue-700 text-base font-semibold hover:bg-blue-800">
            Finalizar Compra
          </Button>
        </footer>
      </aside>
    </>
  );
}
