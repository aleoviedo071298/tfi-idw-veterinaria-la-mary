// las mascotas se guardan en localStorage bajo la clave "mascotas"
let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];

const lista = document.getElementById('tabla-mascotas');
const total = document.getElementById('total');
const formulario = document.getElementById('form-mascota');
const buscador = document.getElementById('buscador');

const inputId = document.getElementById('idMascota');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');

// guarda la imagen elegida hasta que se envía el formulario
let imagenBase64 = "";

function guardarEnLocalStorage() {
    localStorage.setItem('mascotas', JSON.stringify(mascotas));
}

// filtra por cualquiera de los datos de texto de la mascota
function filtrarMascotas() {
    const texto = buscador.value.trim().toLowerCase();

    if (!texto) {
        return mascotas;
    }

    return mascotas.filter((mascota) =>
        `${mascota.nombreMascota} ${mascota.nombreDuenio} ${mascota.especie} ${mascota.color}`
            .toLowerCase()
            .includes(texto)
    );
}

function render() {
    const mascotasAMostrar = filtrarMascotas();

    // limpiamos antes de recorrer para no duplicar filas
    lista.innerHTML = '';

    if (mascotasAMostrar.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="8" class="text-center py-4">No hay mascotas para mostrar.</td>
            </tr>
        `;
    }

    mascotasAMostrar.forEach((mascota) => {
        // si la mascota no tiene foto cargada mostramos el logo
        const imagen = mascota.imagenMascota ? mascota.imagenMascota : './assets/img/logo.png';

        lista.innerHTML += `
            <tr>
                <td><img class="img-tabla" src="${imagen}" alt="${mascota.nombreMascota}"></td>
                <td>${mascota.nombreMascota}</td>
                <td>${mascota.nombreDuenio}</td>
                <td>${mascota.especie}</td>
                <td>${mascota.color}</td>
                <td>${mascota.edad} años</td>
                <td>${mascota.peso} kg</td>
                <td class="text-center">
                    <div class="btn-group btn-group-sm" role="group">
                        <button class="btn btn-warning" onclick="prepararEdicion('${mascota.idMascota}')">✏️ Editar</button>
                        <button class="btn btn-danger" onclick="eliminarMascota('${mascota.idMascota}')">🗑️ Borrar</button>
                    </div>
                </td>
            </tr>
        `;
    });

    // el total siempre cuenta todas las mascotas, no las filtradas
    total.textContent = mascotas.length;
}

// redimensionamos la foto en un canvas antes de pasarla a Base64,
// sino una foto de celular sola llena la cuota de localStorage
document.getElementById('imagenMascota').addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    if (!archivo) {
        return;
    }

    const lector = new FileReader();
    lector.onload = (evento) => {
        const img = new Image();
        img.onload = () => {
            const MAX_LADO = 200;
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

            // calidad al 60%, suficiente para el avatar de la tabla
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
    const idExistente = datos.get('idMascota');

    // si se está editando y no se eligió otra foto, se mantiene la que ya tenía
    let imagenFinal = imagenBase64;
    if (!imagenFinal && idExistente) {
        const mascotaActual = mascotas.find((m) => m.idMascota === idExistente);
        if (mascotaActual) {
            imagenFinal = mascotaActual.imagenMascota;
        }
    }

    const datosMascota = {
        nombreMascota: datos.get('nombreMascota').trim(),
        nombreDuenio: datos.get('nombreDuenio').trim(),
        especie: datos.get('especie'),
        color: datos.get('color').trim(),
        edad: Number(datos.get('edad')),
        peso: parseFloat(datos.get('peso')),
        imagenMascota: imagenFinal
    };

    if (!idExistente) {
        // el id se genera acá, el usuario no lo ingresa
        datosMascota.idMascota = crypto.randomUUID();
        mascotas.push(datosMascota);
    } else {
        const indice = mascotas.findIndex((m) => m.idMascota === idExistente);
        if (indice !== -1) {
            datosMascota.idMascota = idExistente;
            mascotas[indice] = datosMascota;
        }
    }

    guardarEnLocalStorage();
    render();
    resetearFormulario();
});

// carga los datos de la fila en el formulario
function prepararEdicion(id) {
    const mascota = mascotas.find((m) => m.idMascota === id);
    if (!mascota) {
        return;
    }

    inputId.value = mascota.idMascota;
    document.getElementById('nombreMascota').value = mascota.nombreMascota;
    document.getElementById('nombreDuenio').value = mascota.nombreDuenio;
    document.getElementById('especie').value = mascota.especie;
    document.getElementById('color').value = mascota.color;
    document.getElementById('edad').value = mascota.edad;
    document.getElementById('peso').value = mascota.peso;

    imagenBase64 = mascota.imagenMascota;

    formTitulo.textContent = "Modificar datos de la mascota";
    btnGuardar.textContent = "Guardar cambios";
    btnCancelar.classList.remove('d-none');

    formulario.scrollIntoView({ behavior: 'smooth' });
}

function eliminarMascota(id) {
    if (!confirm("¿Está seguro de que desea eliminar a esta mascota?")) {
        return;
    }

    mascotas = mascotas.filter((m) => m.idMascota !== id);
    guardarEnLocalStorage();
    render();

    // si se borró justo la que se estaba editando, salimos del modo edición
    if (inputId.value === id) {
        resetearFormulario();
    }
}

function resetearFormulario() {
    formulario.reset();
    inputId.value = "";
    imagenBase64 = "";

    formTitulo.textContent = "Dar de alta a la mascota";
    btnGuardar.textContent = "Agregar mascota";
    btnCancelar.classList.add('d-none');
}

buscador.addEventListener('input', render);
btnCancelar.addEventListener('click', resetearFormulario);

// al cargar la página mostramos lo que ya está guardado
render();
