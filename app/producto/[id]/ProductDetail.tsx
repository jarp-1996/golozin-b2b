'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/lib/catalog';
import { useCart } from '@/components/CartContext';
import { useToast } from '@/components/ToastContext';
import { Heart, Maximize2, Minus, Plus, Gift, CheckCircle2, Sparkles, PartyPopper } from 'lucide-react';

export function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast(`¡${quantity}x ${product.name} agregado al carrito!`);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="sticky top-24">
            <div className="relative aspect-square bg-[#F9FAFB] border border-[#111827]/5 rounded-3xl flex items-center justify-center p-8 group overflow-hidden">
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {!product.inStock ? (
                  <div className="bg-gray-800 text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-sm self-start uppercase tracking-wider">
                    Agotado
                  </div>
                ) : (
                  <>
                    {product.originalPrice && (
                      <div className="bg-[#111827] text-white text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Oferta Especial
                      </div>
                    )}
                    <div className="bg-[#991B1B] text-white text-[13px] font-bold px-4 py-1.5 rounded-full shadow-sm self-start flex items-center gap-1">
                      <Gift className="w-3.5 h-3.5" />
                      Premium Box
                    </div>
                  </>
                )}
              </div>
              <button className="absolute bottom-6 left-6 w-12 h-12 bg-white shadow-lg border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-black hover:scale-110 transition-all z-10">
                <Maximize2 className="w-5 h-5" />
              </button>
              
              {/* Decoración de fondo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className={`relative w-full h-full max-w-[500px] max-h-[500px] transition-transform duration-500 group-hover:scale-105 ${!product.inStock ? 'grayscale opacity-75' : ''}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Product Info & Landing Copy */}
        <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8">
          
          {/* Ideal For Badges */}
          {product.idealFor && product.idealFor.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {product.idealFor.map((ideal, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-800 text-[13px] font-bold rounded-full border border-yellow-200">
                  <PartyPopper className="w-3.5 h-3.5" />
                  {ideal}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
            {product.name}
          </h1>

          <div className="flex items-end gap-4 mb-8">
            <p className="text-4xl lg:text-5xl font-black text-[#991B1B]">
              S/ {product.price.toFixed(2)}
            </p>
            {product.originalPrice && (
              <p className="text-xl text-gray-400 line-through mb-1 font-medium">
                S/ {product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-lg text-gray-600 leading-relaxed mb-10 font-medium">
            {product.description}
          </p>

          {/* Qué Incluye Section */}
          {product.contents && product.contents.length > 0 && (
            <div className="mb-10 bg-[#F9FAFB] border border-gray-100 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#991B1B]" />
                ¿Qué incluye esta experiencia?
              </h3>
              <ul className="space-y-3">
                {product.contents.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
            <div className={`flex items-center h-14 bg-[#F9FAFB] rounded-xl px-2 ${!product.inStock ? 'opacity-50' : ''}`}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={!product.inStock}
                className="w-12 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-lg transition-all disabled:cursor-not-allowed"
              >
                <Minus className="w-5 h-5" />
              </button>
              <input 
                type="number"
                value={quantity}
                readOnly
                className="w-12 text-center font-bold text-lg text-gray-900 outline-none bg-transparent"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                disabled={!product.inStock}
                className="w-12 h-10 flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-lg transition-all disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 h-14 font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2 ${
                product.inStock 
                  ? 'bg-[#111827] hover:bg-[#991B1B] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Gift className="w-5 h-5" />
              {product.inStock ? '¡LO QUIERO!' : 'AGOTADO'}
            </button>
          </div>

          <button className="flex items-center justify-center gap-2 text-gray-500 hover:text-[#991B1B] transition-colors font-medium w-full sm:w-auto mb-10">
            <Heart className="w-5 h-5" />
            Guardar para otra ocasión
          </button>

          {/* Social Proof / Shipping Info */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-100">
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-gray-500 font-medium">📦 Envío Seguro</span>
              <span className="text-[14px] font-bold text-gray-900">A todo el Perú</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[13px] text-gray-500 font-medium">✨ Calidad</span>
              <span className="text-[14px] font-bold text-gray-900">100% Originales</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
