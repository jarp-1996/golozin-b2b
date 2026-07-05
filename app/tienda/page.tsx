import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Storefront } from './Storefront';
import { Suspense } from 'react';
import type { Metadata } from 'next';

import { getProductsPaginated, getCategories, getBrands } from '@/lib/catalog';

export const metadata: Metadata = {
  title: 'Tienda de Golosinas, Chocolates y Snacks Importados',
  description: 'Explora nuestro catálogo completo de golosinas, chocolates premium, caramelos, galletas y snacks importados. Compra online con envíos a todo el Perú.',
  openGraph: {
    title: 'Tienda Golozin | Golosinas y Chocolates Premium',
    description: 'Explora nuestro catálogo completo de golosinas, chocolates premium y snacks importados.',
    url: 'https://golozin-ecommerce.vercel.app/tienda',
  },
  alternates: {
    canonical: 'https://golozin-ecommerce.vercel.app/tienda',
  },
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TiendaPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  
  const page = typeof resolvedParams.page === 'string' ? parseInt(resolvedParams.page, 10) : 1;
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const brand = typeof resolvedParams.brand === 'string' ? resolvedParams.brand : undefined;
  const segment = typeof resolvedParams.segment === 'string' ? resolvedParams.segment as any : undefined;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  const sortBy = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'ultimos';
  
  const itemsPerPage = 20;

  const [{ products, total }, categories, brands] = await Promise.all([
    getProductsPaginated({
      page,
      limit: itemsPerPage,
      segment,
      category,
      brand,
      q,
      sortBy
    }),
    getCategories(),
    getBrands()
  ]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
      <Suspense fallback={<div className="h-[90px] bg-white border-b border-gray-100"></div>}>
        <Header />
      </Suspense>
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-row gap-4 lg:gap-8">
        <Storefront 
          products={products}
          total={total}
          categories={categories}
          brands={brands}
          currentPage={page}
          itemsPerPage={itemsPerPage}
        />
      </main>

      <Footer />
    </div>
  );
}
