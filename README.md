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

HTML5, CSS3, Bootstrap 5.3 (por CDN), JavaScript, API LocalStorage, Vite.

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
- [x] Modo oscuro (opcional): automático según preferencia del sistema (`prefers-color-scheme`), sin botón manual

### Puntos de quiebre

| Punto de quiebre | Qué cambia |
|---|---|
| `< 576px` (`sm`, con `@media` propio) | Menos padding en navbar y recuadros; carrusel con imagen y texto más compactos |
| `≥ 768px` (`md`) | Cards de profesionales en 2 columnas; Misión/Visión, Higiene/Esterilización y formulario/mapa en 2 columnas; footer en 3 columnas |
| `≥ 992px` (`lg`) | La navbar deja de colapsar y muestra los enlaces en línea; en las páginas de gestión la tabla y el formulario se ubican lado a lado (`col-lg-7` / `col-lg-5`) |
| `≥ 1200px` (`xl`) | Los 4 profesionales se muestran en una sola fila (`row-cols-xl-4`) |

## 3era entrega

Se agregaron las dos páginas de administración, con todo el JavaScript en archivos externos dentro de `js/`.

- [x] Página de gestión de Mascotas (`mascotas.html` + `js/mascotas.js`)
- [x] Página de gestión de Veterinarios (`veterinarios.html` + `js/veterinarios.js`)
- [x] Ambas accesibles desde la barra de navegación, que ahora tiene las cinco páginas del sitio
- [x] Formularios y tablas maquetados con Bootstrap 5 (`form-control`, `form-select`, `input-group`, `table`, `table-striped`, `table-responsive`, `btn-group`, `badge`), manteniendo el diseño responsivo y el modo oscuro de la entrega anterior
- [x] Cada entidad se guarda en LocalStorage bajo su propia clave: `mascotas` y `veterinarios`
- [x] El identificador se genera solo en el alta con `crypto.randomUUID()`; el usuario no lo ingresa (va en un `input type="hidden"`)
- [x] Al cargar cada página se listan los datos ya guardados en LocalStorage
- [x] Los datos del formulario se capturan con `FormData`, se validan con los atributos de HTML5 (`required`, `min`, `max`, `step`, `type`) y se arman como objetos JavaScript antes de guardarlos
- [x] Las filas de las tablas y las cards de la portada se arman con manipulación DOM (`createElement`, `createTextNode`, `appendChild`, `removeChild`) y no con `innerHTML`, como indica la Unidad 5. Los botones de cada fila registran su manejador con `addEventListener`

### Mascotas

- [x] **Registrar**: un campo por cada dato (`nombreMascota`, `nombreDuenio`, `especie`, `color`, `edad`, `peso`), más la imagen
- [x] **Listar**: tabla con todas las mascotas; la tabla y el contador del encabezado se actualizan después de cada alta, edición o eliminación
- [x] **Editar**: botón por fila que carga los datos en el formulario; el formulario cambia de título y de botón, y aparece un botón para cancelar la edición
- [x] **Eliminar**: botón por fila con `confirm()` previo

### Veterinarios

- [x] **Registrar**: un campo por cada dato (`matricula`, `nombre`, `especializacion`, `valorConsulta`), más la imagen
- [x] **Listar**: tabla con el valor de consulta en formato moneda (`Intl.NumberFormat` en `es-AR`)
- [x] **Editar** y **Eliminar**: igual que en Mascotas, con confirmación previa en la baja

### Opcionales resueltos

- [x] Imagen de cada mascota guardada en Base64 y mostrada en la tabla. Antes de convertirla se redimensiona en un `canvas` y se baja la calidad al 60%, porque una foto de celular sin comprimir llena la cuota de LocalStorage
- [x] Lo mismo para la foto de cada veterinario
- [x] El catálogo de profesionales de la portada se genera dinámicamente (`js/portada.js`) a partir de los veterinarios guardados en LocalStorage, con foto, nombre, especialización, matrícula y valor de consulta
- [x] La especialización del veterinario se elige desde una lista de opciones predefinidas (`select`)
- [x] Buscador en las dos tablas: filtra mientras se escribe, sin alterar el contador total

### Datos de ejemplo

`js/semilla.js` carga cuatro veterinarios la primera vez que se abre el sitio, así la portada no aparece vacía. Después se administran como cualquier otro registro desde `veterinarios.html`. Si se borran todos a propósito, no se vuelven a sembrar.
