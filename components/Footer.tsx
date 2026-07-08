'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hola, me gustaría solicitar un pack personalizado o hacer una consulta. 🎁')}`;

export function Footer() {
  return (
    <>
      <footer className="bg-black text-white pt-24 pb-12 overflow-hidden border-t border-white/20">
        <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-16 mb-24">
          
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none">
              ¿Listo para <br/> sorprender?
            </h2>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="button"
              className="inline-flex items-center gap-4 text-2xl font-bold uppercase tracking-widest hover:text-[#EF4444] transition-colors w-fit group"
            >
              Hablemos <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full md:w-auto">
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Navegación</span>
              <Link href="/boxes-de-regalo" className="text-xl font-bold uppercase hover:text-[#EF4444] transition-colors">Boxes</Link>
              <Link href="/packs-cumpleanos" className="text-xl font-bold uppercase hover:text-[#EF4444] transition-colors">Cumpleaños</Link>
              <Link href="/corporativo" className="text-xl font-bold uppercase hover:text-[#EF4444] transition-colors">Corporativo</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Social</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl font-bold uppercase hover:text-[#EF4444] transition-colors">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-xl font-bold uppercase hover:text-[#EF4444] transition-colors">TikTok</a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl font-bold uppercase hover:text-[#EF4444] transition-colors">Facebook</a>
            </div>
          </div>
        </div>

        <div className="w-full px-6 md:px-12 flex flex-col items-center">
          <div className="w-full border-t border-white/20 pt-8 pb-12 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-500">
            <span>© {new Date().getFullYear()} GOLOZIN</span>
            <div className="flex gap-8">
              <Link href="/terminos" className="hover:text-white transition-colors">Términos</Link>
              <Link href="/privacidad" className="hover:text-white transition-colors">Privacidad</Link>
            </div>
          </div>
          
          <h1 className="text-[18vw] font-black leading-[0.75] tracking-tighter uppercase text-center w-full">
            GOLOZIN
          </h1>
        </div>
      </footer>
    </>
  );
}
