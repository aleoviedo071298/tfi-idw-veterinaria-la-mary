// funciones compartidas por las páginas que arman HTML con template literals

const CARACTERES_HTML = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
};

// sin esto un dato con comillas o con < rompe la fila que se está armando,
// por ejemplo una mascota llamada Don "Pepe"
function escaparHtml(valor) {
    return String(valor).replace(/[&<>"']/g, (caracter) => CARACTERES_HTML[caracter]);
}

// solo dejamos pasar las fotos que genera el canvas y las imágenes del propio sitio
function imagenSegura(valor) {
    const esValida = typeof valor === 'string'
        && (valor.startsWith('data:image/') || valor.startsWith('./assets/'));

    return esValida ? escaparHtml(valor) : './assets/img/logo.png';
}
