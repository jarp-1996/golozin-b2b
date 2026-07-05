'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Product } from '@/lib/catalog';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { Grid, List, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Filter, X } from 'lucide-react';

type StorefrontProps = {
  products: Product[];
  total: number;
  categories: string[];
  brands: string[];
  currentPage: number;
  itemsPerPage: number;
};

export function Storefront({ products, total, categories, brands, currentPage, itemsPerPage }: StorefrontProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const selectedCategory = searchParams.get('category');
  const selectedBrand = searchParams.get('brand');
  const searchQuery = searchParams.get('q');
  const sortBy = searchParams.get('sort') || 'ultimos';

  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');
  
  // Accordion states for filters
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);
  const [isBrandExpanded, setIsBrandExpanded] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const totalPages = Math.ceil(total / itemsPerPage);

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset page to 1 when filters change
    if (key !== 'page') {
      params.delete('page');
    }
    
    router.push(`?${params.toString()}`);
  };

  const setPage = (page: number) => {
    updateParam('page', page.toString());
  };

  return (
    <>
      {/* Mobile Filter Overlay */}
      {isMobileFiltersOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsMobileFiltersOpen(false)} 
        />
      )}

      {/* Sidebar Filters */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:w-[220px] xl:w-[250px] lg:bg-transparent lg:shadow-none lg:p-0 lg:z-auto
        ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
        flex-shrink-0 space-y-8 pr-4
      `}>
        {/* Close Button Mobile */}
        <div className="flex justify-between items-center lg:hidden mb-2">
          <h2 className="font-bold text-xl">Filtros</h2>
          <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 -mr-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="pt-6 border-t border-gray-100">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4" 
            onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
          >
            <h3 className="text-[15px] font-bold text-gray-900">Packs y Boxes fiesteros</h3>
            {isCategoryExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </div>
          
          {isCategoryExpanded && (
            <ul className="space-y-3">
              {categories.map(cat => {
                const isActive = selectedCategory === cat;
                return (
                  <li key={cat} className="flex items-center justify-between group">
                    <button 
                      onClick={() => updateParam('category', isActive ? null : cat)}
                      className={`text-[14px] text-left ${isActive ? 'text-[#1F2937] font-medium' : 'text-[#111827]/70 hover:text-[#1F2937]'} transition-colors`}
                    >
                      {cat}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Brands */}
        <div className="pt-6 border-t border-gray-100">
          <div 
            className="flex items-center justify-between cursor-pointer mb-4" 
            onClick={() => setIsBrandExpanded(!isBrandExpanded)}
          >
            <h3 className="text-[15px] font-bold text-gray-900">Marcas</h3>
            {isBrandExpanded ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
          </div>
          
          {isBrandExpanded && (
            <ul className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {brands.map(brand => {
                const isActive = selectedBrand === brand;
                return (
                  <li key={brand} className="flex items-center justify-between group">
                    <button 
                      onClick={() => updateParam('brand', isActive ? null : brand)}
                      className={`text-[14px] text-left ${isActive ? 'text-[#1F2937] font-medium' : 'text-[#111827]/70 hover:text-[#1F2937]'} transition-colors`}
                    >
                      {brand}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </aside>

      {/* Main Grid */}
      <div className="flex-1">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 pb-4 border-b border-[#111827]/10">
          <div className="text-[13px] text-gray-500 flex items-center gap-2">
            <Link href="/" className="hover:text-black transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {searchQuery 
                ? `Búsqueda: "${searchQuery}"` 
                : (selectedCategory && selectedBrand) 
                  ? `${selectedCategory} - ${selectedBrand}` 
                  : selectedCategory || selectedBrand || 'Tienda'
              }
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 text-gray-700 hover:text-black font-medium text-[14px]"
            >
              <Filter className="w-5 h-5" />
              Filtros
            </button>

            <div className="hidden lg:flex items-center gap-2 text-gray-400">
              <button 
                onClick={() => setViewStyle('grid')}
                className={`${viewStyle === 'grid' ? 'text-black' : 'hover:text-black transition-colors'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewStyle('list')}
                className={`${viewStyle === 'list' ? 'text-black' : 'hover:text-black transition-colors'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <div className="relative border-l border-gray-200 pl-6">
              <select 
                className="appearance-none bg-transparent text-[13px] font-medium pr-6 outline-none cursor-pointer"
                value={sortBy}
                onChange={e => updateParam('sort', e.target.value)}
              >
                <option value="ultimos">Ordenar por los últimos</option>
                <option value="precio_menor">Ordenar por precio: bajo a alto</option>
                <option value="precio_mayor">Ordenar por precio: alto a bajo</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <>
            <div className={viewStyle === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-12" 
              : "flex flex-col gap-4"
            }>
              {products.map(product => (
                <ProductCard key={product.id} product={product} viewStyle={viewStyle} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button 
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#111827]/10 rounded-full text-gray-500 hover:text-[#111827] hover:border-[#111827] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-[14px] font-medium transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-[#111827] text-white shadow-md' 
                        : 'border border-[#111827]/10 text-gray-600 hover:border-[#111827] hover:text-[#111827]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button 
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#111827]/10 rounded-full text-gray-500 hover:text-[#111827] hover:border-[#111827] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24 text-gray-500 bg-white/50 border border-[#111827]/5 rounded-3xl">
            <h3 className="text-xl font-bold text-[#111827] mb-2">No se encontraron productos</h3>
            <p>Intenta con otros filtros o términos de búsqueda.</p>
          </div>
        )}
      </div>
    </>
  );
}
