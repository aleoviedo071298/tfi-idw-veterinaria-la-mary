// funciones de manipulación DOM que se repiten en las páginas de administración

// deja un elemento sin hijos, como la función borrarHijos de los ejemplos de clase
function borrarHijos(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

// crea un <td> con un nodo de texto adentro
function crearCelda(texto) {
    const celda = document.createElement('td');
    celda.appendChild(document.createTextNode(texto));
    return celda;
}

// crea un botón de la columna Acciones y le registra el manejador del click
function crearBoton(texto, clases, manejador) {
    const boton = document.createElement('button');
    boton.className = clases;
    boton.appendChild(document.createTextNode(texto));
    boton.addEventListener('click', manejador);
    return boton;
}
