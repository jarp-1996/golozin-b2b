import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Suspense fallback={<div className="h-[90px] bg-transparent border-b border-gray-200"></div>}>
        <Header />
      </Suspense>
      
      <main className="flex-1 w-full bg-white">
        {/* ── Hero Banner ──────────────────────────────── */}
        <section id="inicio" className="relative w-full bg-[#111827] pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.03] mix-blend-overlay z-0"></div>
          
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-12 relative z-10">
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left pt-4 md:pt-10">
              <span className="inline-block self-center md:self-start py-1.5 px-5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm font-bold tracking-widest mb-6 uppercase">
                Edición Limitada
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-10 leading-[1.1]">
                <span className="text-red-500">Antojos peruanos</span><br /> en una caja
              </h1>
              
              {/* Sin texto descriptivo según solicitud del usuario */}
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                <Link 
                  href="/producto/antojos-peruanos"
                  className="group relative flex items-center justify-center gap-2 bg-red-700 text-white font-black py-4 px-10 rounded-xl text-lg transition-all shadow-xl hover:shadow-red-700/20 hover:bg-red-600 hover:-translate-y-1"
                >
                  <span className="relative z-10">¡Quiero mi Box Peruana!</span>
                </Link>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097'}?text=${encodeURIComponent('Hola, me interesan los packs y boxes de golosinas peruanas 📦')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-black/20 backdrop-blur-md text-white border border-white/20 font-bold py-4 px-8 rounded-xl text-lg transition-all hover:bg-black/40 hover:border-white/40"
                >
                  <span className="text-white text-xl font-black">✆</span> WhatsApp
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative flex justify-center mt-8 md:mt-0">
              <div className="relative aspect-square md:aspect-[4/3] w-full max-w-[550px] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(153,27,27,0.15)] border border-white/5 transition-transform duration-700 hover:scale-[1.02]">
                <Image 
                  src="/images/premium_box_hero.png" 
                  alt="Antojos peruanos en una caja" 
                  fill 
                  className="object-cover object-center z-0"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── 3 Pilares ──────────────────────────────── */}
        <section id="experiencias" className="py-24 bg-[#F9FAFB] relative border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Nuestras Experiencias</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">Seleccionamos lo mejor de nuestra tierra en presentaciones únicas, listas para disfrutar.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Pilar 1 */}
              <div className="group rounded-2xl overflow-hidden bg-white hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <div className="absolute w-64 h-64 bg-red-800 rounded-full blur-[80px] opacity-20 -top-10 -right-10"></div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-2xl font-black text-white mb-2">Antojos Peruanos</h3>
                    <span className="inline-block px-3 py-1 bg-red-700 text-white text-[10px] font-bold rounded-sm uppercase tracking-widest">Favorito</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 text-base mb-6 leading-relaxed font-light">
                    Tus clásicos favoritos del Perú en una sola caja. Perfecta para matar el antojo o sorprender a quien está lejos con un pedacito de casa.
                  </p>
                  <Link href="/producto/antojos-peruanos" className="inline-flex items-center text-gray-900 font-bold hover:text-red-700 transition-colors group-hover:underline text-sm uppercase tracking-wider">
                    Ver contenido <span className="ml-2" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Pilar 2 */}
              <div className="group rounded-2xl overflow-hidden bg-white hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <div className="absolute w-64 h-64 bg-gray-600 rounded-full blur-[80px] opacity-20 -bottom-10 -left-10"></div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-2xl font-black text-white mb-2">Sabor Americano</h3>
                    <span className="inline-block px-3 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-sm uppercase tracking-widest">Top Ventas</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 text-base mb-6 leading-relaxed font-light">
                    Una selección de los chocolates y caramelos más virales de USA. Cada caja es una explosión de sabores internacionales de primera.
                  </p>
                  <Link href="/producto/sabor-americano" className="inline-flex items-center text-gray-900 font-bold hover:text-red-700 transition-colors group-hover:underline text-sm uppercase tracking-wider">
                    Quiero probarlos <span className="ml-2" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>

              {/* Pilar 3 */}
              <div className="group rounded-2xl overflow-hidden bg-white hover:bg-gray-50 transition-colors border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 duration-300">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-100 flex items-center justify-center p-8">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                  <div className="absolute w-64 h-64 bg-red-900 rounded-full blur-[80px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-6 left-6 z-20">
                    <h3 className="text-2xl font-black text-white mb-2">Pack Sorpresitas</h3>
                    <span className="inline-block px-3 py-1 bg-red-800 text-white text-[10px] font-bold rounded-sm uppercase tracking-widest">Para fiestas</span>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 text-base mb-6 leading-relaxed font-light">
                    Resuelve las cajitas sorpresa de tus fiestas infantiles con un solo clic. Packs surtidos diseñados para compartir la alegría en los cumpleaños.
                  </p>
                  <Link href="/producto/pack-sorpresitas" className="inline-flex items-center text-gray-900 font-bold hover:text-red-700 transition-colors group-hover:underline text-sm uppercase tracking-wider">
                    Planear fiesta <span className="ml-2" aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── B2B Banner: Regalos Corporativos ──────────────────────────────── */}
        <section id="corporativo" className="relative w-full bg-[#111827] py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0"></div>
          
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
              <span className="inline-block self-center md:self-start py-1.5 px-5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs md:text-sm font-bold tracking-widest mb-6 uppercase">
                Regalos Corporativos para Empresas
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                <span className="text-red-500">Regalos</span> Corporativos
              </h2>
              <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed font-light">
                Nuestra versión premium exclusiva para empresas e instituciones. El detalle perfecto para destacar en eventos culturales o sorprender a tu equipo con aguinaldos llenos de tradición y orgullo peruano.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097'}?text=${encodeURIComponent('Hola, represento a una empresa y me gustaría cotizar regalos corporativos (Perú en una caja) 💼📦')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center gap-2 bg-red-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-xl hover:shadow-red-700/20 hover:bg-red-600 hover:-translate-y-1"
                >
                  <span className="relative z-10">Cotizar para Empresas</span>
                </a>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative flex justify-center">
              <div className="relative aspect-video md:aspect-[4/3] w-full max-w-[550px] rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(153,27,27,0.15)] border border-white/5">
                <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center z-0 p-8 text-center">
                   <span className="text-6xl mb-4 grayscale">🎁</span>
                   <span className="text-white/40 font-black text-xl tracking-widest uppercase">Versión Premium</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
