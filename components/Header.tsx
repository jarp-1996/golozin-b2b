'use client';

import { useState } from 'react';
import { ShoppingBag, ChevronDown, Candy, Gift, PartyPopper } from 'lucide-react';
import { useCart } from './CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px]">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    <rect x="23" y="23" width="54" height="54" rx="4" transform="rotate(45 50 50)" fill="#1F2937" />
                    <path 
                      d="M 74 34 L 50 14 L 14 50 L 50 86 L 86 50 L 50 50 L 50 74" 
                      fill="none" 
                      stroke="#991B1B" 
                      strokeWidth="14" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[24px] font-black text-[#1F2937] tracking-tight leading-none uppercase">Golozin</span>
                </div>
              </Link>
            </div>

            {/* Center/Right: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 ml-auto mr-8">
              <Link href="/" className="text-[14px] font-bold text-gray-700 hover:text-[#991B1B] uppercase tracking-wider transition-colors">
                Inicio
              </Link>

              {/* Boxes de Regalo Dropdown */}
              <div className="relative group h-[80px] flex items-center">
                <Link href="/boxes-de-regalo" className="text-[14px] font-bold text-gray-700 hover:text-[#991B1B] uppercase tracking-wider cursor-pointer flex items-center gap-1 transition-colors">
                  Boxes de Regalo <ChevronDown className="w-4 h-4" />
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white text-gray-800 shadow-xl border-t-4 border-[#991B1B] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 rounded-b-md">
                  <div className="flex flex-col py-2">
                    <Link href="/producto/antojos-peruanos" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50">
                      <div className="bg-[#991B1B] p-2 rounded-lg"><Candy className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-gray-900 leading-tight">Antojos Peruanos</span>
                        <span className="block text-[12px] text-gray-500">Clásicos del Perú</span>
                      </div>
                    </Link>
                    <Link href="/producto/sabor-americano" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50">
                      <div className="bg-[#1F2937] p-2 rounded-lg"><Gift className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-gray-900 leading-tight">Sabor Americano</span>
                        <span className="block text-[12px] text-gray-500">Top golosinas USA</span>
                      </div>
                    </Link>
                    <Link href="/producto/chocolates-peruanos" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                      <div className="bg-orange-600 p-2 rounded-lg"><Candy className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-gray-900 leading-tight">Chocolates Peruanos</span>
                        <span className="block text-[12px] text-gray-500">Tradición cacaotera</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Packs Cumpleaños Dropdown */}
              <div className="relative group h-[80px] flex items-center">
                <Link href="/packs-cumpleanos" className="text-[14px] font-bold text-gray-700 hover:text-[#991B1B] uppercase tracking-wider cursor-pointer flex items-center gap-1 transition-colors">
                  Packs Cumpleaños <ChevronDown className="w-4 h-4" />
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white text-gray-800 shadow-xl border-t-4 border-[#991B1B] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 rounded-b-md">
                  <div className="flex flex-col py-2">
                    <Link href="/producto/pack-sorpresitas" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50">
                      <div className="bg-pink-600 p-2 rounded-lg"><PartyPopper className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-gray-900 leading-tight">Sorpresitas</span>
                        <span className="block text-[12px] text-gray-500">Para piñatas y niños</span>
                      </div>
                    </Link>
                    <Link href="/producto/mesa-cumpleanera" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                      <div className="bg-purple-600 p-2 rounded-lg"><Gift className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-gray-900 leading-tight">Mesa Cumpleañera</span>
                        <span className="block text-[12px] text-gray-500">El centro de la fiesta</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link href="/corporativo" className="text-[14px] font-bold text-gray-700 hover:text-[#991B1B] uppercase tracking-wider transition-colors">
                Corporativo
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full text-gray-700 hover:text-white hover:bg-[#991B1B] transition-all shadow-sm"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={2} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-[20px] text-[11px] font-bold text-white bg-[#1F2937] rounded-full border border-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
