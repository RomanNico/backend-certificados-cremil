function formatearNumero(valor) {
    return new Intl.NumberFormat('es-CO').format(valor);
}

module.exports = { formatearNumero };