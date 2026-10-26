// el catálogo de la portada se arma con los veterinarios guardados en localStorage
const profesionales = JSON.parse(localStorage.getItem('veterinarios')) || [];
const contenedorProfesionales = document.getElementById('contenedor-profesionales');

const formatearMoneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

// crea un elemento con una clase y un nodo de texto adentro
function crearTexto(etiqueta, clases, texto) {
    const elemento = document.createElement(etiqueta);
    elemento.className = clases;
    elemento.appendChild(document.createTextNode(texto));
    return elemento;
}

function renderPortada() {
    // limpiamos antes de recorrer para no duplicar las cards
    borrarHijos(contenedorProfesionales);

    if (profesionales.length === 0) {
        const aviso = document.createElement('div');
        aviso.className = 'col-12 text-center py-4';
        aviso.appendChild(crearTexto('p', 'fs-5 mb-0', 'Próximamente conocerás a nuestro staff médico.'));
        contenedorProfesionales.appendChild(aviso);
        return;
    }

    profesionales.forEach((veterinario) => {
        // si el veterinario no tiene foto cargada mostramos el logo
        const imagen = document.createElement('img');
        imagen.className = 'card-img-top';
        imagen.src = veterinario.imagenVeterinario ? veterinario.imagenVeterinario : './assets/img/logo.png';
        imagen.alt = veterinario.nombre;

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body';
        cuerpo.appendChild(crearTexto('h3', 'card-title', veterinario.nombre));
        cuerpo.appendChild(crearTexto('span', '', veterinario.especializacion));
        cuerpo.appendChild(crearTexto('p', 'card-text mb-0', 'M.P. N° ' + veterinario.matricula));
        cuerpo.appendChild(crearTexto('p', 'card-text fw-bold', 'Consulta: ' + formatearMoneda.format(veterinario.valorConsulta)));

        const card = document.createElement('div');
        card.className = 'card card-profesional h-100';
        card.appendChild(imagen);
        card.appendChild(cuerpo);

        const columna = document.createElement('div');
        columna.className = 'col';
        columna.appendChild(card);

        contenedorProfesionales.appendChild(columna);
    });
}

renderPortada();
