// si hay una sesión iniciada, cambia el botón "Iniciar sesión" de la navbar
// por los enlaces de administración y el botón "Cerrar sesión"
const listaNavegacion = document.querySelector('.navbar-nav');

function crearItemNavegacion(texto, href) {
    const enlace = document.createElement('a');
    enlace.className = 'nav-link';
    enlace.href = href;
    enlace.appendChild(document.createTextNode(texto));

    const item = document.createElement('li');
    item.className = 'nav-item';
    item.appendChild(enlace);
    return item;
}

if (estaLogueado()) {
    document.getElementById('link-login').remove();

    listaNavegacion.appendChild(crearItemNavegacion('Mascotas', 'mascotas.html'));
    listaNavegacion.appendChild(crearItemNavegacion('Veterinarios', 'veterinarios.html'));
    listaNavegacion.appendChild(crearItemNavegacion('Turnos', 'turnos.html'));
    listaNavegacion.appendChild(crearItemNavegacion('Historia Clínica', 'historia_clinica.html'));
    listaNavegacion.appendChild(crearItemNavegacion('Panel', 'panelAdmin.html'));

    const botonSalir = document.createElement('button');
    botonSalir.className = 'btn btn-secondary';
    botonSalir.appendChild(document.createTextNode('Cerrar sesión'));
    botonSalir.addEventListener('click', cerrarSesion);

    const itemSalir = document.createElement('li');
    itemSalir.className = 'nav-item';
    itemSalir.appendChild(botonSalir);
    listaNavegacion.appendChild(itemSalir);
}
