// los veterinarios se guardan en localStorage bajo la clave "veterinarios"
let veterinarios = JSON.parse(localStorage.getItem('veterinarios')) || [];

const lista = document.getElementById('tabla-veterinarios');
const total = document.getElementById('total');
const formulario = document.getElementById('form-veterinario');
const buscador = document.getElementById('buscador');

const inputId = document.getElementById('idVeterinario');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');

// guarda la imagen elegida hasta que se envía el formulario
let imagenBase64 = "";

const formatearMoneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

function guardarEnLocalStorage() {
    localStorage.setItem('veterinarios', JSON.stringify(veterinarios));
}

// filtra por nombre, especialización o matrícula
function filtrarVeterinarios() {
    const texto = buscador.value.trim().toLowerCase();

    if (!texto) {
        return veterinarios;
    }

    return veterinarios.filter((veterinario) =>
        `${veterinario.nombre} ${veterinario.especializacion} ${veterinario.matricula}`
            .toLowerCase()
            .includes(texto)
    );
}

function render() {
    const veterinariosAMostrar = filtrarVeterinarios();

    // limpiamos antes de recorrer para no duplicar filas
    lista.innerHTML = '';

    if (veterinariosAMostrar.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4">No hay veterinarios para mostrar.</td>
            </tr>
        `;
    }

    veterinariosAMostrar.forEach((veterinario) => {
        // si el veterinario no tiene foto cargada mostramos el logo
        const imagen = veterinario.imagenVeterinario ? veterinario.imagenVeterinario : './assets/img/logo.png';

        lista.innerHTML += `
            <tr>
                <td><img class="img-tabla" src="${imagen}" alt="${veterinario.nombre}"></td>
                <td>${veterinario.matricula}</td>
                <td>${veterinario.nombre}</td>
                <td>${veterinario.especializacion}</td>
                <td class="fw-bold">${formatearMoneda.format(veterinario.valorConsulta)}</td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-warning" onclick="prepararEdicion('${veterinario.idVeterinario}')">✏️ Editar</button>
                        <button class="btn btn-danger" onclick="eliminarVeterinario('${veterinario.idVeterinario}')">🗑️ Borrar</button>
                    </div>
                </td>
            </tr>
        `;
    });

    // el total siempre cuenta todos los veterinarios, no los filtrados
    total.textContent = veterinarios.length;
}

// redimensionamos la foto en un canvas antes de pasarla a Base64,
// sino una foto de celular sola llena la cuota de localStorage
document.getElementById('imagenVeterinario').addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }

    const lector = new FileReader();
    lector.onload = (evento) => {
        const img = new Image();
        img.onload = () => {
            const MAX_LADO = 250;
            let { width, height } = img;

            if (width > height && width > MAX_LADO) {
                height *= MAX_LADO / width;
                width = MAX_LADO;
            } else if (height > MAX_LADO) {
                width *= MAX_LADO / height;
                height = MAX_LADO;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);

            // calidad al 60%, suficiente para la card de la portada
            imagenBase64 = canvas.toDataURL('image/jpeg', 0.6);
        };
        img.src = evento.target.result;
    };
    lector.readAsDataURL(archivo);
});

// el mismo submit sirve para el alta y para la edición
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = new FormData(formulario);
    const idExistente = datos.get('idVeterinario');

    // si se está editando y no se eligió otra foto, se mantiene la que ya tenía
    let imagenFinal = imagenBase64;
    if (!imagenFinal && idExistente) {
        const veterinarioActual = veterinarios.find((v) => v.idVeterinario === idExistente);
        if (veterinarioActual) {
            imagenFinal = veterinarioActual.imagenVeterinario;
        }
    }

    const datosVeterinario = {
        matricula: parseInt(datos.get('matricula')),
        nombre: datos.get('nombre').trim(),
        especializacion: datos.get('especializacion'),
        valorConsulta: parseFloat(datos.get('valorConsulta')),
        imagenVeterinario: imagenFinal
    };

    if (!idExistente) {
        // el id se genera acá, el usuario no lo ingresa
        datosVeterinario.idVeterinario = crypto.randomUUID();
        veterinarios.push(datosVeterinario);
    } else {
        const indice = veterinarios.findIndex((v) => v.idVeterinario === idExistente);
        if (indice !== -1) {
            datosVeterinario.idVeterinario = idExistente;
            veterinarios[indice] = datosVeterinario;
        }
    }

    guardarEnLocalStorage();
    render();
    resetearFormulario();
});

// carga los datos de la fila en el formulario
function prepararEdicion(id) {
    const veterinario = veterinarios.find((v) => v.idVeterinario === id);
    if (!veterinario) {
        return;
    }

    inputId.value = veterinario.idVeterinario;
    document.getElementById('matricula').value = veterinario.matricula;
    document.getElementById('nombre').value = veterinario.nombre;
    document.getElementById('especializacion').value = veterinario.especializacion;
    document.getElementById('valorConsulta').value = veterinario.valorConsulta;

    imagenBase64 = veterinario.imagenVeterinario;

    formTitulo.textContent = "Modificar datos del profesional";
    btnGuardar.textContent = "Guardar cambios";
    btnCancelar.classList.remove('d-none');

    formulario.scrollIntoView({ behavior: 'smooth' });
}

function eliminarVeterinario(id) {
    if (!confirm("¿Desea dar de baja a este profesional del sistema?")) {
        return;
    }

    veterinarios = veterinarios.filter((v) => v.idVeterinario !== id);
    guardarEnLocalStorage();
    render();

    // si se borró justo el que se estaba editando, salimos del modo edición
    if (inputId.value === id) {
        resetearFormulario();
    }
}

function resetearFormulario() {
    formulario.reset();
    inputId.value = "";
    imagenBase64 = "";

    formTitulo.textContent = "Dar de alta a un profesional";
    btnGuardar.textContent = "Agregar veterinario/a";
    btnCancelar.classList.add('d-none');
}

buscador.addEventListener('input', render);
btnCancelar.addEventListener('click', resetearFormulario);

// al cargar la página mostramos lo que ya está guardado
render();
