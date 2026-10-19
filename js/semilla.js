// veterinarios de ejemplo, se guardan una sola vez la primera vez que se abre el sitio
// así la portada nunca queda vacía y se pueden editar desde veterinarios.html
const VETERINARIOS_INICIALES = [
    {
        idVeterinario: crypto.randomUUID(),
        matricula: 1042,
        nombre: "Dra. Mansilla Luciana",
        especializacion: "Clínica Médica",
        valorConsulta: 25000,
        imagenVeterinario: "./assets/img/veterinaria2.jpg"
    },
    {
        idVeterinario: crypto.randomUUID(),
        matricula: 1187,
        nombre: "Dr. Oviedo Alejandro",
        especializacion: "Cirugía",
        valorConsulta: 32000,
        imagenVeterinario: "./assets/img/veterinaria1.jpg"
    },
    {
        idVeterinario: crypto.randomUUID(),
        matricula: 1265,
        nombre: "Dra. Boock Ayelen",
        especializacion: "Dermatología",
        valorConsulta: 28000,
        imagenVeterinario: "./assets/img/veterinaria3.webp"
    },
    {
        idVeterinario: crypto.randomUUID(),
        matricula: 1309,
        nombre: "Dra. Kogut Aylen",
        especializacion: "Peluquería",
        valorConsulta: 20000,
        imagenVeterinario: "./assets/img/veterinaria4.jpg"
    }
];

// getItem devuelve null solo si la clave nunca se creó, así no volvemos a sembrar
// cuando el usuario borró todos los veterinarios a propósito
if (localStorage.getItem('veterinarios') === null) {
    localStorage.setItem('veterinarios', JSON.stringify(VETERINARIOS_INICIALES));
}
