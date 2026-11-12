# Trabajo Final Integrador — Introducción al Desarrollo Web

**Tecnicatura Universitaria en Desarrollo Web — Facultad de Ciencias de la Administración (UNER)**
Ciclo 2026 — 2do cuatrimestre

Pagina web para la clínica veterinaria **Veterinaria La Mary**

## Integrantes.

- Oviedo, Alejandro
- Mansilla, Luciana
- Boock, Ayelen

## Tecnologias utilizadas.

HTML5, CSS3, Bootstrap 5.3 (por CDN), JavaScript, API DOM, API LocalStorage, API SessionStorage, `fetch`, Vite.

Sin librerías de JavaScript: todo se resuelve con JavaScript y la API DOM del navegador. Para el inicio de sesión se usa la API de prueba [DummyJSON](https://dummyjson.com/docs/auth).

## Cómo ejecutarlo

```bash
npm install
npx vite
```

Después abrir la dirección que muestra Vite (por defecto `http://localhost:5173`).

## Usuario de prueba

Las páginas de administración piden iniciar sesión. El login usa la API pública de prueba DummyJSON, así que **hace falta conexión a internet**. Usuario que se puede usar:

| Usuario | Contraseña |
|---|---|
| `emilys` | `emilyspass` |

## Estructura del proyecto.

```
index.html          portada con el catálogo de profesionales
nosotros.html       información institucional
contacto.html       formulario de contacto y mapa
login.html          inicio de sesión del personal
panelAdmin.html     panel con acceso a cada módulo de gestión
mascotas.html       gestión de Mascotas
veterinarios.html   gestión de Veterinarios
turnos.html         gestión de Turnos
historia_clinica.html  historia clínica de cada mascota
estilos.css         diseño propio y variables de color
js/
  utilidades.js     funciones de manipulación DOM compartidas (borrarHijos, crearCelda, crearBoton, crearOpcion)
  semilla.js        veterinarios de ejemplo para la primera carga
  portada.js        catálogo de profesionales de index.html
  sesion.js         funciones de sesión (estaLogueado, cerrarSesion)
  header.js         cambia la navbar según haya sesión o no
  login.js          inicio de sesión contra DummyJSON
  panelAdmin.js     contadores del panel
  mascotas.js       ABML de Mascotas
  veterinarios.js   ABML de Veterinarios
  turnos.js         ABML de Turnos
  historia_clinica.js  registros de historia clínica e historial por mascota
assets/
  fonts/            tipografía Nunito Sans
  img/              logo, fotos e iconos
```

## 1era entrega 8-9-2026

- [x] Página de Inicio  (`index.html`)
- [x] Página de Información Institucional (`nosotros.html`)
- [x] Página de Contacto (`contacto.html`)

## 2da entrega 29-9-2026

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

## 3era entrega 23-10-2026

Se agregaron las dos páginas de administración, con todo el JavaScript en archivos externos dentro de `js/`. Las funciones de manipulación DOM que se repiten en las dos páginas están en `js/utilidades.js` (`borrarHijos`, `crearCelda` y `crearBoton`).

- [x] Página de gestión de Mascotas (`mascotas.html` + `js/mascotas.js`)
- [x] Página de gestión de Veterinarios (`veterinarios.html` + `js/veterinarios.js`)
- [x] Ambas accesibles desde la barra de navegación (una vez iniciada la sesión aparecen los enlaces Mascotas, Veterinarios y Panel)
- [x] Formularios y tablas maquetados con Bootstrap 5 (`form-control`, `form-select`, `input-group`, `table`, `table-striped`, `table-responsive`, `btn-group`, `badge`), manteniendo el diseño responsivo y el modo oscuro de la entrega anterior
- [x] Cada entidad se guarda en LocalStorage bajo su propia clave: `mascotas` y `veterinarios`
- [x] El identificador se genera solo en el alta con `crypto.randomUUID()`.
- [x] Al cargar cada página se listan los datos ya guardados en LocalStorage
- [x] Los datos del formulario se capturan con `FormData`.
- [x] Las filas de las tablas y las cards de la portada se arman con manipulación DOM (`createElement`, `createTextNode`, `appendChild`, `removeChild`) y no con `innerHTML`. 

### Mascotas

- [x] **Registrar**: un campo por cada dato (`nombreMascota`, `nombreDuenio`, `color`, `edad`, `peso`), más `especie` y la imagen, que agregamos nosotros
- [x] **Listar**: tabla con todas las mascotas; la tabla y el contador del encabezado se actualizan después de cada alta, edición o eliminación
- [x] **Editar**: botón por fila que carga los datos en el formulario; el formulario cambia de título y de botón, y aparece un botón para cancelar la edición
- [x] **Eliminar**: botón por fila con `confirm()` previo

### Veterinarios

- [x] **Registrar**: un campo por cada dato (`matricula`, `nombre`, `especializacion`, `valorConsulta`), más la imagen
- [x] **Listar**: tabla con el valor de consulta en formato moneda (`Intl.NumberFormat` en `es-AR`)
- [x] **Editar** y **Eliminar**: igual que en Mascotas, con confirmación previa en la baja

### Opcionales resueltos

- [x] Imagen de cada mascota guardada en Base64 y mostrada en la tabla. Antes de convertirla se redimensiona en un `canvas` y se baja la calidad, porque una foto de celular sin comprimir llena la memoria de LocalStorage.
- [x] Lo mismo para la foto de cada veterinario
- [x] El catálogo de profesionales de la portada se genera dinámicamente (`js/portada.js`) a partir de los veterinarios guardados en LocalStorage, con foto, nombre, especialización, matrícula y valor de consulta
- [x] La especialización del veterinario se elige desde una lista de opciones (`select`)
- [x] Buscador en las dos tablas: filtra mientras se escribe

### Datos de ejemplo

`js/semilla.js` carga cuatro veterinarios la primera vez que se abre el sitio, así la portada no aparece vacía. Después se administran desde `veterinarios.html`. Si se borran todos a propósito, no se vuelven a mostrar devuelta los 4.

### Validación de los formularios

Se valida con los atributos de HTML: `required` en todos los campos, `type="number"` con `min` y `step="1"` para los enteros (`edad`, `matricula`) y `step="0.01"` para los decimales (`peso`, `valorConsulta`). Si algo no cumple, el navegador no deja enviar el formulario. Después en JavaScript se convierten con `Number`, `parseInt` y `parseFloat` antes de guardar el objeto.

## 4ta entrega

### Inicio de sesión con DummyJSON

- [x] **Login** (`login.html` + `js/login.js`): el formulario manda usuario y contraseña con `fetch` (método `POST`) a `https://dummyjson.com/auth/login`. Si los datos son incorrectos se muestra "Usuario y/o contraseña incorrectos".
- [x] El `accessToken` que devuelve la API se guarda en `sessionStorage`, junto con el nombre del usuario para saludarlo en el panel
- [x] **Barra de navegación** (`js/header.js`): sin sesión solo se ven Inicio, Nosotros, Contacto e Iniciar sesión. Con sesión se agregan Mascotas, Veterinarios, Turnos, Historia Clínica, Panel y el botón Cerrar sesión, creados con `createElement`
- [x] **Protección de páginas** (`js/sesion.js`): las páginas de administración empiezan preguntando `estaLogueado()`; si alguien escribe la URL sin haber iniciado sesión, se lo redirige a `login.html`
- [x] **Cerrar sesión**: borra el token de `sessionStorage` y vuelve al login
- [x] **Panel de administración** (`panelAdmin.html` + `js/panelAdmin.js`): saluda al usuario y muestra cuántas mascotas, veterinarios, turnos y registros de historia clínica hay guardados

### Turnos

Como en Historia Clínica, el turno guarda solo el id de la mascota y del veterinario (`idMascota`, `idVeterinario`), más la fecha y hora y el motivo. Lo administra un usuario con sesión iniciada.

- [x] **Registrar** (`turnos.html` + `js/turnos.js`): la mascota y el veterinario se eligen de un `select` con los que ya están cargados; la fecha y hora con `datetime-local`. Se guarda bajo la clave `turnos`
- [x] **Listar**: tabla ordenada del turno más próximo al más lejano, con mascota, tutor, veterinario y motivo, y buscador
- [x] **Eliminar**: botón por fila con `confirm()` previo
- [x] También se puede editar un turno
- [x] Validaciones con `alert()`: no se puede dar un turno en una fecha ya pasada, y un veterinario no puede tener dos turnos el mismo día a la misma hora

### Historia Clínica

Cada registro es un control de una mascota. No se copian los datos de la mascota ni del veterinario: se guarda solo su id (`idMascota`, `idVeterinario`) y los nombres se buscan en sus propias claves de LocalStorage al mostrar la tabla. Si la mascota o el veterinario se borran, aparece "(mascota eliminada)" o "(veterinario eliminado)".

- [x] **Registrar** (`historia_clinica.html` + `js/historia_clinica.js`): la mascota y el veterinario se eligen de un `select` armado con los que ya están cargados; además fecha, peso, temperatura, diagnóstico y tratamiento. Se guarda bajo la clave `historia_clinica`
- [x] **Listar**: tabla ordenada de la fecha más nueva a la más vieja, con peso, temperatura, diagnóstico y tratamiento y próximo control
- [x] **Visualizar el historial completo de una mascota**: con el buscador, que filtra mientras se escribe. Al escribir el nombre de la mascota (o de su tutor) la tabla queda solo con sus controles, del más nuevo al más viejo
- [x] También se puede editar y eliminar un registro, igual que en las otras páginas
- [x] Validación: si la fecha del próximo control es anterior a la del control, se avisa con `alert()` y no se guarda

### Opcionales resueltos (4ta entrega)

- [x] En la historia clínica se registran el peso, la temperatura y la fecha del próximo control
- [x] Filtrar los turnos por veterinario: el buscador de `turnos.html` también busca por el nombre del veterinario

### Video de exposición

- Enlace: https://youtu.be/R6yx2XYhhfE
