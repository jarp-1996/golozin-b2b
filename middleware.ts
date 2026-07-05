import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Proteger todas las rutas /admin
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_session')?.value;
    let isValidSession = false;

    if (adminToken) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { data, error } = await supabase.auth.getUser(adminToken);
      if (data?.user && !error) {
        isValidSession = true;
      }
    }

    // Permitir acceso a la página de login del admin
    if (pathname === '/admin/login') {
      // Si ya está autenticado, redirigir al dashboard
      if (isValidSession) {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
      return NextResponse.next();
    }

    // Si no tiene token, redirigir al login
    if (!isValidSession) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      if (adminToken) {
        response.cookies.delete('admin_session');
      }
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
