'use client';

import { useState } from 'react';
import { ShoppingBag, ChevronDown, Candy, Gift, PartyPopper } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const { totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 pointer-events-none mix-blend-difference text-white">
        <div className="w-full px-6 md:px-12 pointer-events-auto">
          <div className="flex items-center justify-between h-[100px]">
            
            {/* Left: Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center group">
                <span className="text-[28px] md:text-[34px] font-black tracking-tighter leading-none uppercase">GOLOZIN</span>
              </Link>
            </div>

            {/* Center/Right: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-12 ml-auto mr-12">
              <Link href="/" className="text-[15px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                Inicio
              </Link>

              {/* Boxes de Regalo Dropdown */}
              <div className="relative group h-[100px] flex items-center">
                <Link href="/boxes-de-regalo" className="text-[15px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-50 transition-opacity">
                  Boxes <ChevronDown className="w-5 h-5" />
                </Link>
                {/* Dropdown brutalista */}
                <div className="absolute top-full left-0 w-64 bg-white text-black p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-2 border-black">
                  <div className="flex flex-col gap-4">
                    <Link href="/producto/antojos-peruanos" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Antojos Peruanos</Link>
                    <Link href="/producto/sabor-americano" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Sabor Americano</Link>
                    <Link href="/producto/chocolates-peruanos" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Chocolates Peruanos</Link>
                  </div>
                </div>
              </div>

              {/* Packs Cumpleaños Dropdown */}
              <div className="relative group h-[100px] flex items-center">
                <Link href="/packs-cumpleanos" className="text-[15px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-50 transition-opacity">
                  Packs <ChevronDown className="w-5 h-5" />
                </Link>
                {/* Dropdown brutalista */}
                <div className="absolute top-full left-0 w-64 bg-white text-black p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-2 border-black">
                  <div className="flex flex-col gap-4">
                    <Link href="/producto/pack-sorpresitas" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Pack Sorpresitas</Link>
                    <Link href="/producto/mesa-cumpleanera" className="font-bold text-lg hover:text-red-600 transition-colors uppercase tracking-tight">Mesa Cumpleañera</Link>
                  </div>
                </div>
              </div>

              <Link href="/corporativo" className="text-[15px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                Corporativo
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center w-12 h-12 rounded-full hover:opacity-50 transition-opacity"
              >
                <ShoppingBag className="h-7 w-7" strokeWidth={2} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[24px] h-[24px] text-[12px] font-black bg-white text-black rounded-full border-2 border-black">
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
