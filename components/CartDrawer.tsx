'use client';

import { Fragment } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from './CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const router = useRouter();

  return (
    <Fragment>
      {/* Full Screen Drawer (Brutalist Style Dropdown) */}
      <div className={`fixed inset-0 z-[101] bg-white flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b-4 border-black w-full max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-black" strokeWidth={2.5} />
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter">Mi Carrito ({totalItems})</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-black hover:bg-black hover:text-white rounded-full transition-colors"
          >
            <X className="h-8 w-8" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 w-full max-w-4xl mx-auto">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-gray-300" />
              </div>
              <div>
                <p className="text-gray-900 font-medium">Tu carrito está vacío</p>
                <p className="text-gray-500 text-sm mt-1">¡Agrega algunas golosinas para empezar!</p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-[#EF4444] transition-colors uppercase tracking-wider"
              >
                Seguir comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl border-2 border-transparent hover:border-black transition-colors shadow-sm">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0 justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm font-black text-black leading-tight uppercase truncate">{item.name}</h3>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-[#EF4444] transition-colors flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 uppercase font-bold">{item.brand}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 bg-gray-100 rounded-full border border-transparent px-2 py-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors font-black"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-black text-xs w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors font-black"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm font-black text-black">
                        S/ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t-4 border-black p-6 md:p-8 bg-white w-full mt-auto">
            <div className="max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Subtotal</span>
              <span className="text-2xl font-black text-black">S/ {totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6 text-center">
              Envío calculado en checkout
            </p>
            <button 
              onClick={() => {
                onClose();
                router.push('/checkout');
              }}
              className="w-full py-6 px-6 bg-black hover:bg-[#EF4444] text-white rounded-full font-black text-xl transition-all flex justify-center items-center gap-2 uppercase tracking-widest"
            >
              Finalizar Compra
            </button>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}
