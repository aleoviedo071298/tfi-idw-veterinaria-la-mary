// veterinarios de ejemplo.
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


// Si no hay veterinarios en el almacenamiento local, se guardan los de ejemplo para que no este vacia la grilla de profesionales.
if (localStorage.getItem('veterinarios') === null) {
    localStorage.setItem('veterinarios', JSON.stringify(VETERINARIOS_INICIALES));
}
