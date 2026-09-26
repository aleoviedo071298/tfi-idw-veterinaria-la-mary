# Trabajo Final Integrador — Introducción al Desarrollo Web

**Tecnicatura Universitaria en Desarrollo Web — Facultad de Ciencias de la Administración (UNER)**
Ciclo 2026 — 2do cuatrimestre

Pagina web para la clínica veterinaria **Veterinaria La Mary**

## Integrantes.

- Oviedo, Alejandro
- Mansilla, Luciana
- Boock, Ayelen 
- Kogut, Aylen

## Tecnologias utilizadas.

HTML5, CSS3, Bootstrap 5.3 (por CDN), Vite.

## Como ejecutarlo "Comandelis".

```bash
npm install
npx vite
```

## 1era entrega 8-9-2026

- [x] Página de Inicio  (`index.html`)
- [x] Página de Información Institucional (`nosotros.html`)
- [x] Página de Contacto (`contacto.html`)

## 2da entrega

- [x] Bootstrap 5.3 integrado en las tres páginas (CSS y JS por CDN), combinado con diseño propio en `estilos.css`
- [x] Barra de navegación responsiva (`navbar-expand-lg`): menú hamburguesa en móvil y acceso a todas las páginas
- [x] Catálogo de profesionales en la portada con el sistema de grillas (`row`/`col`) y `card` (foto, nombre y especialidad)
- [x] Componentes de Bootstrap: `navbar`, `card`, `carousel`, `list-group`, `badge`, formularios (`form-control`, `form-label`) y botones (`btn`)
- [x] Utilidades de Bootstrap: espaciados, flex, texto, tamaños y visibilidad
- [x] Estructura semántica: `header`, `nav`, `main`, `section` y `footer`
- [x] Diseño responsivo con cuatro puntos de quiebre de Bootstrap: `sm` (576px), `md` (768px), `lg` (992px) y `xl` (1200px)
- [ ] Modo oscuro (opcional, no implementado)

### Puntos de quiebre

| Punto de quiebre | Qué cambia |
|---|---|
| `< 576px` (`sm`, con `@media` propio) | Menos padding en navbar y recuadros; carrusel con imagen y texto más compactos |
| `≥ 768px` (`md`) | Cards de profesionales en 2 columnas; Misión/Visión, Higiene/Esterilización y formulario/mapa en 2 columnas; footer en 3 columnas |
| `≥ 992px` (`lg`) | La navbar deja de colapsar y muestra los enlaces en línea |
| `≥ 1200px` (`xl`) | Los 4 profesionales se muestran en una sola fila (`row-cols-xl-4`) |
