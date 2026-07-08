import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from '@/lib/catalog';
import { Suspense } from 'react';

export default async function PacksCumpleanosPage() {
  const allProducts = await getProducts('fiestas');
  const packs = allProducts.filter(p => ['pack-sorpresitas', 'mesa-cumpleanera'].includes(p.id));

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFCFB]">
      <Suspense fallback={<div className="h-[80px] bg-white border-b border-gray-100"></div>}>
        <Header />
      </Suspense>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full bg-[#111827] py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-black to-[#111827] z-0"></div>
          <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">
              Packs <span className="text-pink-500">Cumpleaños</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              Organizar la fiesta nunca fue tan fácil. Surtidos perfectos para piñatas, sorpresitas y mesas espectaculares.
            </p>
          </div>
        </section>

        {/* Product Grid */}
        <section className="py-24">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {packs.map(pack => (
                <div key={pack.id} className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <Link href={`/producto/${pack.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
                    <Image 
                      src={pack.image} 
                      alt={pack.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </Link>
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-3xl font-black text-gray-900 mb-3">{pack.name}</h3>
                    <p className="text-gray-500 mb-8 flex-1 text-base leading-relaxed">{pack.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100">
                      <span className="text-3xl font-black text-pink-600">S/ {pack.price.toFixed(2)}</span>
                      <Link 
                        href={`/producto/${pack.id}`}
                        className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-pink-600 transition-colors"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
