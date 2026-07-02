'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Heart, ChevronDown, Candy } from 'lucide-react';
import { useCart } from './CartContext';
import { searchProducts, Product, getCategories, getBrands } from '@/lib/catalog';
import Image from 'next/image';
import Link from 'next/link';
import { CartDrawer } from './CartDrawer';
import { FeaturesStrip } from './FeaturesStrip';
import { useRouter, useSearchParams } from 'next/navigation';

export function Header() {
  const { totalItems, totalPrice } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Data from Supabase
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  // States for dropdowns
  const [isTiendaOpen, setIsTiendaOpen] = useState(false);
  const [isMarcasOpen, setIsMarcasOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const segment = searchParams.get('segment');

  useEffect(() => {
    async function loadGlobals() {
      const cats = await getCategories();
      const brs = await getBrands();
      setCategories(cats);
      setBrands(brs);
    }
    loadGlobals();
  }, []);

  useEffect(() => {
    async function performSearch() {
      if (searchQuery.length >= 2) {
        const results = await searchProducts(searchQuery, segment as any);
        setSearchResults(results.slice(0, 5));
      } else {
        setSearchResults([]);
      }
    }
    performSearch();
  }, [searchQuery, segment]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsTiendaOpen(false);
        setIsMarcasOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      const url = new URLSearchParams(searchParams.toString());
      url.set('q', searchQuery.trim());
      router.push(`/tienda?${url.toString()}`);
    }
  };

  return (
    <>
      <header className="w-full flex flex-col z-50 bg-white">
      {/* Announcement Bar */}
      <FeaturesStrip />

      {/* Top Header Section */}
      <div className="w-full bg-transparent border-b border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 items-center h-[90px] gap-4">
            
            {/* Left: Search Bar (Hidden on Mobile) */}
            <div className="hidden md:flex justify-start">
              <div className="relative w-full max-w-[300px]" ref={searchRef}>
                <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full rounded-full bg-gray-100 border border-transparent focus-within:border-[#E3001B] focus-within:bg-white transition-colors">
                  <input
                    className="w-full outline-none text-[13px] text-gray-700 py-2.5 pl-5 pr-10 bg-transparent rounded-full"
                    type="text"
                    id="search"
                    placeholder="Buscar golosinas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    autoComplete="off"
                  />
                  <button type="submit" className="absolute right-0 grid place-items-center h-full px-4 text-gray-500 hover:text-[#E3001B] transition-colors rounded-r-full">
                    <Search className="h-4 w-4" strokeWidth={2} />
                  </button>
                </form>

                {/* Instant Search Results Dropdown */}
                {isSearchFocused && searchResults.length > 0 && (
                  <div className="absolute mt-2 w-[400px] bg-white shadow-xl border border-gray-100 overflow-hidden z-50 rounded-lg">
                    <div className="p-0">
                      {searchResults.map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/producto/${product.id}?segment=${product.segment}`} 
                          onClick={() => {
                            setIsSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center p-3 hover:bg-gray-50 transition-colors gap-3 border-b border-gray-100 last:border-0"
                        >
                          <div className="relative h-12 w-12 flex-shrink-0 bg-white border border-gray-100 overflow-hidden rounded-md">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] text-gray-800">{product.name}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-[13px] font-bold text-[#E3001B]">S/ {product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-start md:justify-center items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
                    <rect x="23" y="23" width="54" height="54" rx="4" transform="rotate(45 50 50)" fill="#E3001B" />
                    <path 
                      d="M 74 34 L 50 14 L 14 50 L 50 86 L 86 50 L 50 50 L 50 74" 
                      fill="none" 
                      stroke="#0B2545" 
                      strokeWidth="14" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[28px] md:text-[34px] font-black text-[#0B2545] tracking-tight leading-none uppercase">Golozin</span>
                </div>
              </Link>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-4 md:gap-6">
              <Link href="/favoritos" className="relative text-gray-700 hover:text-[#E3001B] transition-colors hidden md:block">
                <Heart className="h-6 w-6" strokeWidth={1.5} />
              </Link>

              <Link href="/cuenta" className="text-gray-700 hover:text-[#E3001B] transition-colors hidden sm:block">
                <User className="h-6 w-6" strokeWidth={1.5} />
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 text-gray-700 hover:text-[#E3001B] transition-colors"
              >
                <div className="relative">
                  <ShoppingBag className="h-6 w-6" strokeWidth={1.5} />
                  <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center min-w-[16px] h-[16px] text-[10px] font-bold text-white bg-[#E3001B] rounded-full px-1">
                    {totalItems}
                  </span>
                </div>
                <div className="hidden lg:block text-left ml-2">
                  <p className="text-[14px] font-bold text-[#0B2545] whitespace-nowrap">S/ {totalPrice.toFixed(2)}</p>
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="w-full bg-[#0B2545] relative z-40 shadow-md" ref={navRef}>
        <div className="max-w-[1400px] mx-auto">
          {/* Nav Links */}
          <nav className="w-full hidden md:block">
            <ul className="flex flex-wrap items-center justify-center text-white text-[14px] font-bold tracking-wider uppercase h-14 gap-10">
              
              <li className="relative group h-full flex items-center">
                <span className="cursor-pointer hover:text-[#E3001B] transition-colors flex items-center gap-1">
                  Regalos por Ocasión <ChevronDown className="w-4 h-4 ml-0.5 opacity-80" strokeWidth={2.5} />
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-56 bg-white text-gray-800 shadow-xl border-t-4 border-[#E3001B] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 rounded-b-md">
                  <div className="flex flex-col py-3">
                    <Link href="/tienda?filter=cumpleanos" className="px-5 py-2.5 hover:bg-gray-50 hover:text-[#E3001B] font-medium transition-colors text-[13px] tracking-normal capitalize">Cumpleaños</Link>
                    <Link href="/tienda?filter=aniversario" className="px-5 py-2.5 hover:bg-gray-50 hover:text-[#E3001B] font-medium transition-colors text-[13px] tracking-normal capitalize">Aniversarios</Link>
                    <Link href="/tienda?filter=agradecimiento" className="px-5 py-2.5 hover:bg-gray-50 hover:text-[#E3001B] font-medium transition-colors text-[13px] tracking-normal capitalize">Agradecimientos</Link>
                    <Link href="/tienda?filter=ninos" className="px-5 py-2.5 hover:bg-gray-50 hover:text-[#E3001B] font-medium transition-colors text-[13px] tracking-normal capitalize">Día del Niño</Link>
                  </div>
                </div>
              </li>

              <li className="relative group h-full flex items-center">
                <span className="cursor-pointer hover:text-[#E3001B] transition-colors flex items-center gap-1">
                  Explorar Boxes <ChevronDown className="w-4 h-4 ml-0.5 opacity-80" strokeWidth={2.5} />
                </span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white text-gray-800 shadow-xl border-t-4 border-[#E3001B] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 rounded-b-md">
                  <div className="flex flex-col py-3">
                    <Link href="/producto/box-1?segment=fiestas" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50">
                      <div className="bg-[#0B2545] p-1.5 rounded-md"><Candy className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-[#0B2545] capitalize tracking-normal">Mystery Box</span>
                        <span className="block text-[11px] text-gray-500 normal-case tracking-normal">Sorpresas dulces garantizadas</span>
                      </div>
                    </Link>
                    <Link href="/producto/box-2?segment=fiestas" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50">
                      <div className="bg-[#E3001B] p-1.5 rounded-md"><Candy className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-[#E3001B] capitalize tracking-normal">Premium Box</span>
                        <span className="block text-[11px] text-gray-500 normal-case tracking-normal">Chocolates americanos y europeos</span>
                      </div>
                    </Link>
                    <Link href="/producto/box-3?segment=fiestas" className="px-5 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                      <div className="bg-orange-500 p-1.5 rounded-md"><Candy className="w-4 h-4 text-white" /></div>
                      <div>
                        <span className="block text-[14px] font-bold text-orange-600 capitalize tracking-normal">Dulces Peruanos</span>
                        <span className="block text-[11px] text-gray-500 normal-case tracking-normal">Tus marcas peruanas favoritas</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>

              <li className="h-full flex items-center">
                <Link href="/tienda" className="hover:text-[#E3001B] transition-colors">Arma tu Pack</Link>
              </li>

              <li className="h-full flex items-center">
                <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097'}?text=${encodeURIComponent('Hola, me gustaría cotizar regalos corporativos para mi empresa.')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#E3001B] transition-colors">Regalos Corporativos</a>
              </li>

            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-white border-b border-gray-100">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full rounded-md bg-white border border-gray-300 focus-within:border-[#E3001B]">
          <input
            className="w-full outline-none text-[14px] text-gray-700 py-2.5 px-4 bg-transparent rounded-l-md"
            placeholder="Buscar ..."
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="px-3 text-gray-400 hover:text-[#E3001B]">
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>

      </header>

      {/* Botón flotante del Carrito */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-[104px] right-6 bg-[#0B2545] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(11,37,69,0.5)] hover:bg-[#E3001B] hover:shadow-[0_8px_30px_rgba(227,0,27,0.5)] transition-all hover:scale-110 z-50 flex items-center justify-center animate-in fade-in slide-in-from-bottom-8"
        aria-label="Ver carrito de compras"
      >
        <ShoppingBag className="w-7 h-7" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#E3001B] text-white min-w-[24px] h-[24px] rounded-full flex items-center justify-center text-[12px] font-black border-2 border-[#0B2545] animate-bounce shadow-sm">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
