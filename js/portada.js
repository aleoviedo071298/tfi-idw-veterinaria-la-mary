// el catálogo de la portada se arma con los veterinarios guardados en localStorage
const profesionales = JSON.parse(localStorage.getItem('veterinarios')) || [];
const contenedorProfesionales = document.getElementById('contenedor-profesionales');

const formatearMoneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

function renderPortada() {
    if (profesionales.length === 0) {
        contenedorProfesionales.innerHTML = `
            <div class="col-12 text-center py-4">
                <p class="fs-5 mb-0">Próximamente conocerás a nuestro staff médico.</p>
            </div>
        `;
        return;
    }

    // limpiamos antes de recorrer para no duplicar las cards
    contenedorProfesionales.innerHTML = '';

    profesionales.forEach((veterinario) => {
        // si el veterinario no tiene foto cargada mostramos el logo
        const imagen = veterinario.imagenVeterinario ? veterinario.imagenVeterinario : './assets/img/logo.png';

        contenedorProfesionales.innerHTML += `
            <div class="col">
                <div class="card card-profesional h-100">
                    <img src="${imagen}" class="card-img-top" alt="${veterinario.nombre}">
                    <div class="card-body">
                        <h3 class="card-title">${veterinario.nombre}</h3>
                        <span>${veterinario.especializacion}</span>
                        <p class="card-text mb-0">M.P. N° ${veterinario.matricula}</p>
                        <p class="card-text fw-bold">Consulta: ${formatearMoneda.format(veterinario.valorConsulta)}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

renderPortada();
