const fs = require('fs');
const path = require('path');
const { formatearNumero } = require('../utils/format');

function cargarTemplate(nombre) {
    return fs.readFileSync(path.join(__dirname, '../templates', nombre), 'utf-8');
}

function imagenBase64(ruta) {
    const ext = path.extname(ruta).toLowerCase();
    const mime = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';

    const imagen = fs.readFileSync(ruta);
    return `data:${mime};base64,${imagen.toString('base64')}`;
}

function fechaFormal(fecha = new Date()) {
    const diasSemana = [
        'domingo', 'lunes', 'martes', 'miércoles',
        'jueves', 'viernes', 'sábado'
    ];

    const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const anio = fecha.getFullYear();

    return `${diaSemana}, ${dia} de ${mes} de ${anio}.`;
}

function separarNombre(nombreCompleto) {
    const partes = nombreCompleto.split(' ');

    return {
        primerApellido: partes[1] || '',
        segundoApellido: partes[2] || '',
        primerNombre: partes[0] || '',
        otrosNombres: partes.slice(3).join(' ') || ''
    };
}

function construirHTML(tipo, data) {

    switch (tipo) {


        // 1. HABERES
        case 'haberes': {
            const t = cargarTemplate('haberes.html');

            if (!data.certificadoHaberes || !data.certificadoHaberes.length) {
                throw new Error('No hay datos de haberes');
            }

            const d = data.certificadoHaberes[0];

            const limpiarTexto = (texto) => texto.replace(/\s+/g, ' ').trim();

            return t
                .replace('{{nombre}}', d.nombreCompleto.toUpperCase())
                .replace('{{documento}}', d.numeroDocumento)
                .replace('{{tipoDocumento}}', d.tipoDocumentoLargo)
                .replace('{{grado}}', d.grado)
                .replace('{{valorNumero}}', formatearNumero(d.valorAsignacion.replace(/,/g, '')))
                .replace('{{valorTexto}}', limpiarTexto(d.valorAsignacionTexto))
                .replace('{{fechaReconocimiento}}', d.fechaReconocimientoTexto)
                .replace('{{fechaExpedicion}}', fechaFormal())
                .replace('{{numeroCertificado}}', '690')

                .replace('{{header}}', imagenBase64(path.join(__dirname, '../templates/assets/header.png')))
                .replace('{{firma}}', imagenBase64(path.join(__dirname, '../templates/assets/firma.png')))
                .replace('{{footer}}', imagenBase64(path.join(__dirname, '../templates/assets/footer.png')));
        }

        // 2. SUELDO HABERES
        case 'sueldo': {
            const t = cargarTemplate('sueldo.html');
            const d = data.sueldoBasicoHaberes[0];

            const limpiarTexto = (texto) => texto.replace(/\s+/g, ' ').trim();

            return t
                .replace('{{nombre}}', limpiarTexto(d.nombreCompleto).toUpperCase())
                .replace('{{documento}}', d.numeroDocFormato)
                .replace('{{tipoDocumento}}', d.tipoDocumentoLargo)
                .replace('{{apelativo}}', d.apelativoGenero)
                .replace('{{porcentaje}}', d.porcentaje)
                .replace('{{valorNumero}}', formatearNumero(d.valorAsignacion))
                .replace('{{fechaExpedicion}}', fechaFormal())
                .replace('{{numeroCertificado}}', '691')

                .replace('{{header}}', imagenBase64(path.join(__dirname, '../templates/assets/header.png')))
                .replace('{{firma}}', imagenBase64(path.join(__dirname, '../templates/assets/firma.png')))
                .replace('{{footer}}', imagenBase64(path.join(__dirname, '../templates/assets/footer.png')));
        }

        // 3. INSTITUCIONALIDAD
        case 'institucionalidad': {
            const t = cargarTemplate('institucionalidad.html');
            const d = data.certificacion[0];

            const limpiarTexto = (texto) => texto.replace(/\s+/g, ' ').trim();

            return t
                .replace('{{nombre}}', limpiarTexto(d.nombreCompleto).toUpperCase())
                .replace('{{documento}}', d.numeroDocumentoFormato)
                .replace('{{tipoDocumento}}', d.tipoDocumentoLargo)
                .replace('{{resolucion}}', d.numeroResolucion)
                .replace('{{fechaResolucion}}', d.fechaResolucionLetras)
                .replace('{{fechaReconocimiento}}', d.fechaReconocimientoLetras)
                .replace('{{fechaExpedicion}}', fechaFormal())
                .replace('{{numeroCertificado}}', '692')

                .replace('{{header}}', imagenBase64(path.join(__dirname, '../templates/assets/header.png')))
                .replace('{{firma}}', imagenBase64(path.join(__dirname, '../templates/assets/firma.png')))
                .replace('{{footer}}', imagenBase64(path.join(__dirname, '../templates/assets/footer.png')));
        }

        // 4. MÉDICO
        case 'medicos': {
            const t = cargarTemplate('medicos.html');
            const d = data.serviciosMedicosTitular[0];

            const limpiarTexto = (texto) => texto.replace(/\s+/g, ' ').trim();

            return t
                .replace('{{nombre}}', limpiarTexto(d.nombreCompleto).toUpperCase())
                .replace('{{documento}}', d.numeroDocFormato)
                .replace('{{tipoDocumento}}', d.tipoDocumentoLargo)
                .replace('{{resolucion}}', d.numeroResolucion)
                .replace('{{fechaResolucion}}', d.fechaResolucionLetras)
                .replace('{{fechaReconocimiento}}', d.fechaReconocimientoLetras)
                .replace('{{fechaExpedicion}}', fechaFormal())
                .replace('{{numeroCertificado}}', '693')

                .replace('{{header}}', imagenBase64(path.join(__dirname, '../templates/assets/header.png')))
                .replace('{{firma}}', imagenBase64(path.join(__dirname, '../templates/assets/firma.png')))
                .replace('{{footer}}', imagenBase64(path.join(__dirname, '../templates/assets/footer.png')));
        }

        // 5. TIEMPO SERVICIO
        case 'tiempo': {
            const t = cargarTemplate('tiempoServicio.html');
            const d = data.certificacionTiempoServicio[0];

            const limpiarTexto = (texto) => texto.replace(/\s+/g, ' ').trim();

            return t
                .replace('{{nombre}}', limpiarTexto(d.nombreCompleto).toUpperCase())
                .replace('{{documento}}', d.numeroDocumentoFormato)
                .replace('{{tipoDocumento}}', d.tipoDocumentoLargo)
                .replace('{{resolucion}}', d.numeroResolucion)
                .replace('{{fechaResolucion}}', d.fechaResolucionLetras)
                .replace('{{fechaReconocimiento}}', d.fechaReconocimientoLetras)
                .replace('{{tiempo}}', d.tiempoServicio)
                .replace('{{fechaExpedicion}}', fechaFormal())
                .replace('{{numeroCertificado}}', '694')

                .replace('{{header}}', imagenBase64(path.join(__dirname, '../templates/assets/header.png')))
                .replace('{{firma}}', imagenBase64(path.join(__dirname, '../templates/assets/firma.png')))
                .replace('{{footer}}', imagenBase64(path.join(__dirname, '../templates/assets/footer.png')));
        }

        // 6. INGRESOS Y RETENCIONES
        case 'ingresos': {

            const d = data.ingresosRetenciones[0];
            const nombre = separarNombre(d.nombreCompleto);

            return t
                .replace('{{tipoDocumento}}', d.tipoDocumentoCorto)
                .replace('{{documento}}', d.numeroDocumento)

                .replace('{{primerApellido}}', nombre.primerApellido)
                .replace('{{segundoApellido}}', nombre.segundoApellido)
                .replace('{{primerNombre}}', nombre.primerNombre)
                .replace('{{otrosNombres}}', nombre.otrosNombres)

                .replace('{{anio}}', d.anio)

                .replace('{{devengado}}', formatearNumero(d.devengado))
                .replace('{{salud}}', formatearNumero(d.aporteSalud))

                // si no tienes retención real aún
                .replace('{{retencion}}', formatearNumero(d.aporteSalud));
        }

        default:
            throw new Error('Tipo no soportado');
    }
}

module.exports = { construirHTML };