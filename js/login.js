// si ya hay una sesión iniciada no tiene sentido mostrar el login
if (estaLogueado()) {
    window.location.href = 'panelAdmin.html';
}

// endpoint de la API de prueba DummyJSON que valida usuario y contraseña
const AUTH_URL = "https://dummyjson.com/auth/login";

const formulario = document.getElementById('form-sesion');
const mensajeError = document.getElementById('mensajeError');
const botonForm = document.getElementById('botonIniciarSesion');


formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    mensajeError.textContent = '';
    botonForm.disabled = true;
    botonForm.textContent = 'Cargando...'

    // procesar datos del formulario
    try {
        const datosForm = new FormData(formulario);
     
        const usuario = {
            username: datosForm.get('nombreUsuario').trim(),
            password: datosForm.get('contrasenia').trim()
        }

        const respuesta = await fetch(AUTH_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });

        if (!respuesta.ok) {
            // mensaje general: no decimos si falló el usuario o la contraseña
            mensajeError.textContent = 'Usuario y/o contraseña incorrectos.';
            return
        }

        const datos = await respuesta.json();

        // sessionStorage se borra al cerrar la pestaña, así la sesión no queda abierta

        sessionStorage.setItem('accessToken', datos.accessToken)
        sessionStorage.setItem('usuario', datos.firstName)
        
        window.location.href = './panelAdmin.html';


    } catch (error) {
        mensajeError.textContent = 'Ocurrió un error al iniciar sesión, intente mas tarde , por favor.'
        console.error(error);
    } finally {
        botonForm.disabled = false;
        botonForm.textContent = 'Iniciar sesión'
    }

})