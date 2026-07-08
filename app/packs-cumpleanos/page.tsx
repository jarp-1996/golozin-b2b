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
    <div className="min-h-screen flex flex-col font-sans bg-black text-white selection:bg-red-500 selection:text-white">
      <Suspense fallback={<div className="h-[100px] bg-black"></div>}>
        <Header />
      </Suspense>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full pt-48 pb-24 overflow-hidden border-b border-white/20">
          <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 text-center">
            <h1 className="text-[12vw] font-black leading-[0.85] tracking-tighter uppercase break-words">
              PACKS <br/> <span className="text-[#EF4444]">CUMPLEAÑOS</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mt-12 uppercase tracking-widest">
              Organizar la fiesta nunca fue tan fácil y épico.
            </p>
          </div>
        </section>

        {/* Product Grid (Asymmetric) */}
        <section className="py-24 md:py-48">
          <div className="w-full px-6 md:px-12 max-w-[1600px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-x-12 md:gap-y-32">
              {packs.map((pack, index) => {
                const colSpan = index === 0 ? "md:col-span-8" : "md:col-start-6 md:col-span-7 mt-24";
                
                return (
                  <div key={pack.id} className={`${colSpan} group`}>
                    <Link href={`/producto/${pack.id}`} data-cursor="product" className="block relative aspect-video bg-gray-900 overflow-hidden rounded-[2rem] mb-8">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                      <Image 
                        src={pack.image} 
                        alt={pack.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      />
                    </Link>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">{pack.name}</h3>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <p className="text-xl text-gray-400 max-w-xl">{pack.description}</p>
                      <span className="text-4xl font-black text-[#EF4444]">S/ {pack.price.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
