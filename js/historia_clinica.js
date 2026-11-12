if (!estaLogueado()) {
    window.location.href = 'login.html';
}

// los registros de historia clínica se guardan en localStorage bajo la clave "historia_clinica"
let historias = JSON.parse(localStorage.getItem('historia_clinica')) || [];

// mascotas y veterinarios se leen de sus propias claves para armar los select
// y para mostrar los nombres en la tabla (en cada registro solo guardamos sus id)
const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
const veterinarios = JSON.parse(localStorage.getItem('veterinarios')) || [];

const lista = document.getElementById('tabla-historias');
const total = document.getElementById('total-historias');
const formulario = document.getElementById('form-historia');
const buscador = document.getElementById('buscador');

const inputId = document.getElementById('idHistoria');
const selectMascota = document.getElementById('idMascota');
const selectVeterinario = document.getElementById('idVeterinario');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');

function guardarEnLocalStorage() {
    localStorage.setItem('historia_clinica', JSON.stringify(historias));
}

function buscarMascota(id) {
    return mascotas.find((m) => m.idMascota === id);
}

function buscarVeterinario(id) {
    return veterinarios.find((v) => v.idVeterinario === id);
}

// el input type="date" guarda "2026-11-15"; lo mostramos como 15/11/2026
function formatearFecha(fecha) {
    if (!fecha) {
        return '-';
    }
    return fecha.split('-').reverse().join('/');
}

// si la mascota o el veterinario se borraron, se muestra un aviso en lugar del nombre
function nombreMascota(id) {
    const mascota = buscarMascota(id);
    return mascota ? mascota.nombreMascota : '(mascota eliminada)';
}

function nombreTutor(id) {
    const mascota = buscarMascota(id);
    return mascota ? mascota.nombreDuenio : '-';
}

function nombreVeterinario(id) {
    const veterinario = buscarVeterinario(id);
    return veterinario ? veterinario.nombre : '(veterinario eliminado)';
}

function cargarSelects() {
    borrarHijos(selectMascota);
    // si todavía no hay mascotas cargadas, se avisa en el mismo select
    selectMascota.appendChild(crearOpcion('', mascotas.length ? 'Elegí una mascota' : 'Primero cargá una mascota en Mascotas'));
    mascotas.forEach((m) => {
        selectMascota.appendChild(crearOpcion(m.idMascota, m.nombreMascota + ' (tutor: ' + m.nombreDuenio + ')'));
    });

    borrarHijos(selectVeterinario);
    selectVeterinario.appendChild(crearOpcion('', 'Elegí un veterinario'));
    veterinarios.forEach((v) => {
        selectVeterinario.appendChild(crearOpcion(v.idVeterinario, v.nombre + ' - ' + v.especializacion));
    });
}

// filtra por nombre de la mascota, del tutor o del veterinario.
// escribiendo el nombre de una mascota quedan todos sus controles: ese es su historial completo
function filtrarHistorias() {
    const texto = buscador.value.trim().toLowerCase();

    if (!texto) {
        return historias;
    }

    return historias.filter((h) =>
        `${nombreMascota(h.idMascota)} ${nombreTutor(h.idMascota)} ${nombreVeterinario(h.idVeterinario)}`
            .toLowerCase()
            .includes(texto)
    );
}

// ordena de la fecha más nueva a la más vieja (las fechas "aaaa-mm-dd" se pueden comparar como texto)
function ordenarPorFecha(registros) {
    return [...registros].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

function render() {
    const historiasAMostrar = ordenarPorFecha(filtrarHistorias());

    // limpiamos antes de recorrer para no duplicar filas
    borrarHijos(lista);

    if (historiasAMostrar.length === 0) {
        const fila = document.createElement('tr');
        const celda = crearCelda('No hay registros para mostrar.');
        celda.className = 'text-center py-4';
        celda.colSpan = 9;
        fila.appendChild(celda);
        lista.appendChild(fila);
    }

    historiasAMostrar.forEach((h) => {
        const fila = document.createElement('tr');

        fila.appendChild(crearCelda(formatearFecha(h.fecha)));
        fila.appendChild(crearCelda(nombreMascota(h.idMascota)));
        fila.appendChild(crearCelda(nombreTutor(h.idMascota)));
        fila.appendChild(crearCelda(nombreVeterinario(h.idVeterinario)));
        fila.appendChild(crearCelda(h.peso + ' kg'));
        fila.appendChild(crearCelda(h.temperatura + ' °C'));
        fila.appendChild(crearCelda(h.observaciones));
        fila.appendChild(crearCelda(formatearFecha(h.proximoControl)));

        const grupo = document.createElement('div');
        grupo.className = 'btn-group btn-group-sm';
        grupo.appendChild(crearBoton('✏️ Editar', 'btn btn-warning', () => prepararEdicion(h.idHistoria)));
        grupo.appendChild(crearBoton('🗑️ Borrar', 'btn btn-danger', () => eliminarHistoria(h.idHistoria)));

        const celdaAcciones = document.createElement('td');
        celdaAcciones.className = 'text-center';
        celdaAcciones.appendChild(grupo);
        fila.appendChild(celdaAcciones);

        lista.appendChild(fila);
    });

    total.textContent = historias.length;
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = new FormData(formulario);
    const idExistente = datos.get('idHistoria');

    const datosHistoria = {
        idMascota: datos.get('idMascota'),
        idVeterinario: datos.get('idVeterinario'),
        fecha: datos.get('fecha'),
        peso: parseFloat(datos.get('peso')),
        temperatura: parseFloat(datos.get('temperatura')),
        observaciones: datos.get('observaciones').trim(),
        proximoControl: datos.get('proximoControl')
    };

    // el próximo control no puede ser antes del control que se está cargando
    if (datosHistoria.proximoControl && datosHistoria.proximoControl < datosHistoria.fecha) {
        alert('La fecha del próximo control tiene que ser posterior a la del control.');
        return;
    }

    if (!idExistente) {
        // alta: el id se genera solo
        datosHistoria.idHistoria = crypto.randomUUID();
        historias.push(datosHistoria);
    } else {
        // edición: se reemplaza el registro que tiene ese id
        const indice = historias.findIndex((h) => h.idHistoria === idExistente);
        if (indice !== -1) {
            datosHistoria.idHistoria = idExistente;
            historias[indice] = datosHistoria;
        }
    }

    guardarEnLocalStorage();
    render();
    resetearFormulario();
});

// carga los datos del registro en el formulario para modificarlos
function prepararEdicion(id) {
    const h = historias.find((registro) => registro.idHistoria === id);
    if (!h) return;

    inputId.value = h.idHistoria;
    selectMascota.value = h.idMascota;
    selectVeterinario.value = h.idVeterinario;
    document.getElementById('fecha').value = h.fecha;
    document.getElementById('peso').value = h.peso;
    document.getElementById('temperatura').value = h.temperatura;
    document.getElementById('observaciones').value = h.observaciones;
    document.getElementById('proximoControl').value = h.proximoControl;

    formTitulo.textContent = 'Modificar el control';
    btnGuardar.textContent = 'Guardar cambios';
    btnCancelar.classList.remove('d-none');
    formulario.scrollIntoView();
}

function eliminarHistoria(id) {
    if (!confirm('¿Está seguro de que desea eliminar este registro de la historia clínica?')) return;

    historias = historias.filter((h) => h.idHistoria !== id);
    guardarEnLocalStorage();
    render();

    // si se estaba editando el registro que se borró, se limpia el formulario
    if (inputId.value === id) resetearFormulario();
}

function resetearFormulario() {
    formulario.reset();
    inputId.value = '';
    formTitulo.textContent = 'Registrar un control';
    btnGuardar.textContent = 'Registrar control';
    btnCancelar.classList.add('d-none');
}

buscador.addEventListener('input', render);
btnCancelar.addEventListener('click', resetearFormulario);

// al abrir la página se cargan los select y se muestran los registros guardados
cargarSelects();
render();
