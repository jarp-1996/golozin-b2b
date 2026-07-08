import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';
import { Briefcase, Gift, Users, HeartHandshake, Sparkles } from 'lucide-react';

export default function CorporativoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '51967171097';
  
  const getWhatsAppLink = (text: string) => 
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

  const solutions = [
    {
      title: "Regalos para Colaboradores",
      description: "Reconoce el esfuerzo de tu equipo con boxes premium llenas de orgullo peruano.",
      icon: Users,
      msg: "Hola, me interesa cotizar Regalos para Colaboradores."
    },
    {
      title: "Aguinaldos Navideños",
      description: "La alternativa moderna y elegante a la clásica canasta navideña.",
      icon: Gift,
      msg: "Hola, me interesa cotizar Aguinaldos Navideños para mi empresa."
    },
    {
      title: "Regalos para Clientes",
      description: "Fideliza a tus mejores clientes con un detalle inolvidable y corporativo.",
      icon: HeartHandshake,
      msg: "Hola, me gustaría cotizar regalos corporativos para mis clientes."
    },
    {
      title: "Kits de Bienvenida (Onboarding)",
      description: "Recibe al nuevo talento con un dulce inicio. Kits personalizados con tu marca.",
      icon: Briefcase,
      msg: "Hola, quiero información sobre Kits de Bienvenida (Onboarding)."
    },
    {
      title: "Soluciones a Medida",
      description: "Creamos la box perfecta según tu presupuesto y necesidades específicas.",
      icon: Sparkles,
      msg: "Hola, necesito una solución de regalos corporativos a medida."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFCFB]">
      <Suspense fallback={<div className="h-[80px] bg-white border-b border-gray-100"></div>}>
        <Header />
      </Suspense>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative w-full bg-[#111827] py-24 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black z-0"></div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-[0.03] mix-blend-overlay z-0"></div>
          <div className="max-w-[1000px] mx-auto px-6 relative z-10 text-center">
            <span className="inline-block py-1.5 px-5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-bold tracking-widest mb-6 uppercase">
              B2B Premium
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
              Regalos <span className="text-red-500">Corporativos</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Fortalece tus relaciones comerciales y sorprende a tu equipo con nuestra selección premium de antojos peruanos en empaques de lujo.
            </p>
            <a
              href={getWhatsAppLink('Hola, me gustaría recibir asesoría general sobre Regalos Corporativos.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-red-700 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all shadow-[0_0_40px_rgba(153,27,27,0.4)] hover:shadow-[0_0_60px_rgba(153,27,27,0.6)] hover:bg-red-600 hover:-translate-y-1"
            >
              Contactar a un Asesor B2B
            </a>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-24 bg-[#F9FAFB]">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Nuestras Soluciones</h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">Diseñadas para cada momento clave de tu empresa.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((sol, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-[#111827] group-hover:text-white transition-colors text-gray-700 border border-gray-100">
                    <sol.icon strokeWidth={1.5} size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{sol.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8 flex-1">{sol.description}</p>
                  <a
                    href={getWhatsAppLink(sol.msg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#111827] font-bold hover:text-red-700 transition-colors group-hover:underline uppercase tracking-wider text-sm"
                  >
                    Cotizar ahora <span className="ml-2">→</span>
                  </a>
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
