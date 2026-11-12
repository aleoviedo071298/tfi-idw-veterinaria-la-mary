// si no hay sesión iniciada, se vuelve al login
if (!estaLogueado()) {
    window.location.href = 'login.html';
}

// se leen las entidades guardadas en localStorage (si no hay nada, queda un array vacío)
const listaMascotas = JSON.parse(localStorage.getItem('mascotas')) || [];
const listaVeterinarios = JSON.parse(localStorage.getItem('veterinarios')) || [];
const listaTurnos = JSON.parse(localStorage.getItem('turnos')) || [];
const listaHistorias = JSON.parse(localStorage.getItem('historia_clinica')) || [];

// el nombre lo guarda login.js en sessionStorage al iniciar sesión
document.getElementById('nombreUsuario').textContent = sessionStorage.getItem('usuario') || '';

// contadores de cada tarjeta
document.getElementById('total-mascotas').textContent = listaMascotas.length;
document.getElementById('total-veterinarios').textContent = listaVeterinarios.length;
document.getElementById('total-turnos').textContent = listaTurnos.length;
document.getElementById('total-historias').textContent = listaHistorias.length;
