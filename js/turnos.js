if (!estaLogueado()) {
    window.location.href = 'login.html';
}

// los turnos se guardan en localStorage bajo la clave "turnos"
let turnos = JSON.parse(localStorage.getItem('turnos')) || [];

// mascotas y veterinarios se leen de sus propias claves para armar los select
// y para mostrar los nombres en la tabla (en cada turno solo guardamos sus id)
const mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
const veterinarios = JSON.parse(localStorage.getItem('veterinarios')) || [];

const lista = document.getElementById('tabla-turnos');
const total = document.getElementById('total-turnos');
const formulario = document.getElementById('form-turnos');
const buscador = document.getElementById('buscador');

const inputId = document.getElementById('idTurno');
const selectMascota = document.getElementById('idMascota');
const selectVeterinario = document.getElementById('idVeterinario');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');

function guardarEnLocalStorage() {
    localStorage.setItem('turnos', JSON.stringify(turnos));
}

function buscarMascota(id) {
    return mascotas.find((m) => m.idMascota === id);
}

function buscarVeterinario(id) {
    return veterinarios.find((v) => v.idVeterinario === id);
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

// fecha y hora con el formato de Argentina, por ejemplo 15/11/26, 10:30
function formatearFechaHora(fecha) {
    return new Date(fecha).toLocaleString('es-AR', {
        dateStyle: 'short',
        timeStyle: 'short'
    });
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

// filtra por mascota, tutor, veterinario o motivo
function filtrarTurnos() {
    const texto = buscador.value.trim().toLowerCase();

    if (!texto) {
        return turnos;
    }

    return turnos.filter((t) =>
        `${nombreMascota(t.idMascota)} ${nombreTutor(t.idMascota)} ${nombreVeterinario(t.idVeterinario)} ${t.motivo}`
            .toLowerCase()
            .includes(texto)
    );
}

// ordena del turno más próximo al más lejano
// (las fechas "aaaa-mm-ddThh:mm" se pueden comparar como texto)
function ordenarPorFecha(registros) {
    return [...registros].sort((a, b) => a.fecha.localeCompare(b.fecha));
}

function render() {
    const turnosAMostrar = ordenarPorFecha(filtrarTurnos());

    // limpiamos antes de recorrer para no duplicar filas
    borrarHijos(lista);

    if (turnosAMostrar.length === 0) {
        const fila = document.createElement('tr');
        const celda = crearCelda('No hay turnos para mostrar.');
        celda.className = 'text-center py-4';
        celda.colSpan = 6;
        fila.appendChild(celda);
        lista.appendChild(fila);
    }

    turnosAMostrar.forEach((t) => {
        const fila = document.createElement('tr');

        fila.appendChild(crearCelda(formatearFechaHora(t.fecha)));
        fila.appendChild(crearCelda(nombreMascota(t.idMascota)));
        fila.appendChild(crearCelda(nombreTutor(t.idMascota)));
        fila.appendChild(crearCelda(nombreVeterinario(t.idVeterinario)));
        fila.appendChild(crearCelda(t.motivo));

        const grupo = document.createElement('div');
        grupo.className = 'btn-group btn-group-sm';
        grupo.appendChild(crearBoton('✏️ Editar', 'btn btn-warning', () => prepararEdicion(t.idTurno)));
        grupo.appendChild(crearBoton('🗑️ Borrar', 'btn btn-danger', () => eliminarTurno(t.idTurno)));

        const celdaAcciones = document.createElement('td');
        celdaAcciones.className = 'text-center';
        celdaAcciones.appendChild(grupo);
        fila.appendChild(celdaAcciones);

        lista.appendChild(fila);
    });

    total.textContent = turnos.length;
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = new FormData(formulario);
    const idExistente = datos.get('idTurno');

    const datosTurno = {
        idMascota: datos.get('idMascota'),
        idVeterinario: datos.get('idVeterinario'),
        fecha: datos.get('fecha'),
        motivo: datos.get('motivo').trim()
    };

    // un veterinario no puede tener dos turnos el mismo día a la misma hora
    const ocupado = turnos.some((t) =>
        t.idVeterinario === datosTurno.idVeterinario &&
        t.fecha === datosTurno.fecha &&
        t.idTurno !== idExistente
    );
    if (ocupado) {
        alert('Ese veterinario ya tiene un turno en ese día y horario.');
        return;
    }

    if (!idExistente) {
        // alta: no se pueden dar turnos en el pasado
        if (new Date(datosTurno.fecha) < new Date()) {
            alert('La fecha y hora del turno no puede ser anterior a ahora.');
            return;
        }
        // el id se genera solo
        datosTurno.idTurno = crypto.randomUUID();
        turnos.push(datosTurno);
    } else {
        // edición: se reemplaza el turno que tiene ese id
        const indice = turnos.findIndex((t) => t.idTurno === idExistente);
        if (indice !== -1) {
            datosTurno.idTurno = idExistente;
            turnos[indice] = datosTurno;
        }
    }

    guardarEnLocalStorage();
    render();
    resetearFormulario();
});

// carga los datos del turno en el formulario para modificarlos
function prepararEdicion(id) {
    const turno = turnos.find((t) => t.idTurno === id);
    if (!turno) return;

    inputId.value = turno.idTurno;
    selectMascota.value = turno.idMascota;
    selectVeterinario.value = turno.idVeterinario;
    document.getElementById('fecha').value = turno.fecha;
    document.getElementById('motivo').value = turno.motivo;

    formTitulo.textContent = 'Modificar datos del turno';
    btnGuardar.textContent = 'Guardar cambios';
    btnCancelar.classList.remove('d-none');
    formulario.scrollIntoView();
}

function eliminarTurno(id) {
    if (!confirm('¿Está seguro de que desea eliminar este turno?')) return;

    turnos = turnos.filter((t) => t.idTurno !== id);
    guardarEnLocalStorage();
    render();

    // si se estaba editando el turno que se borró, se limpia el formulario
    if (inputId.value === id) resetearFormulario();
}

function resetearFormulario() {
    formulario.reset();
    inputId.value = '';
    formTitulo.textContent = 'Dar de alta un nuevo turno';
    btnGuardar.textContent = 'Agregar turno';
    btnCancelar.classList.add('d-none');
}

buscador.addEventListener('input', render);
btnCancelar.addEventListener('click', resetearFormulario);

// al abrir la página se cargan los select y se muestran los turnos guardados
cargarSelects();
render();
