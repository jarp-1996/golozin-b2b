# Roadmap de Lanzamiento - Golozin E-commerce

Este documento es la hoja de ruta oficial para el lanzamiento del proyecto Golozin E-commerce. Está diseñado para organizar el flujo de trabajo del equipo, asegurando que las prioridades críticas se aborden antes de salir al mercado.

## Fase 1: Seguridad y Pagos (PRIORIDAD ALTA - CRÍTICA)
* **Auditoría de Seguridad MercadoPago**: Revisión exhaustiva de seguridad en los webhooks y validación de pagos de MercadoPago. Evitar vulnerabilidades o manipulación de precios desde el lado del cliente.
* **Autenticación y Autorización**: Asegurar que las rutas privadas estén protegidas y la gestión de sesiones sea segura.
* **Validación de Datos (Sanitización)**: Validar los inputs de los usuarios en el backend para evitar inyecciones y vulnerabilidades.

## Fase 2: Catálogo, Productos y Contenido (Prioridad Media)
* **Actualización del Catálogo y Packs**: Se definieron e integraron en el código los 3 SKUs oficiales finales del proyecto (Box Mini "De Ida", Box Mediano "Sabores de mi Tierra" y Box Premium "Perú Completo").
* **Sincronización de Base de Datos**: Migrar completamente el catálogo a las tablas en la base de datos (Supabase) dejando atrás los archivos mock como `lib/catalog.ts`.
* **Manejo de Stock**: Reflejar el inventario real en tiempo real en la tienda.

## Fase 3: Experiencia de Usuario y UI (Prioridad Media)
* **Flujo de Checkout**: Pruebas end-to-end del flujo del carrito de compras y la pasarela de pago.
* **Móvil Primero**: Pruebas exhaustivas en dispositivos móviles.
* **Performance**: Optimización de imágenes y carga de la aplicación.

## Fase 4: Preparación para Lanzamiento
* **Despliegue a Producción (Deploy)**: Configurar el entorno de producción en Vercel.
* **Dominio Personalizado y SSL**: Apuntar los DNS correctamente.
* **Monitoreo y Métricas**: Integración de métricas para entender a los primeros usuarios tras el lanzamiento.

---
**Mensaje del Product Manager para el equipo:** 
Nuestro objetivo primordial antes del lanzamiento es estabilizar el flujo de pagos. Ningún feature nuevo de UI será prioritario hasta que las integraciones de MercadoPago y las medidas de seguridad del carrito estén completas y probadas. Cualquier duda, la discutiremos en el daily.
