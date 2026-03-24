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
    const partes = nombreCompleto.trim().split(' ');

    return {
        primerNombre: partes[0] || '',
        otrosNombres: partes.length > 3 ? partes.slice(1, -2).join(' ') : '',
        primerApellido: partes.length >= 2 ? partes[1] : '',
        segundoApellido: partes.length >= 3 ? partes[2] : ''
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
                .replace('690')

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
                .replace('690')

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
                .replace('690')

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
                .replace('690')

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
                .replace('690')

                .replace('{{header}}', imagenBase64(path.join(__dirname, '../templates/assets/header.png')))
                .replace('{{firma}}', imagenBase64(path.join(__dirname, '../templates/assets/firma.png')))
                .replace('{{footer}}', imagenBase64(path.join(__dirname, '../templates/assets/footer.png')));
        }

        // 6. INGRESOS Y RETENCIONES
        case 'ingresos': {
            const t = cargarTemplate('ingresos.html');

            const d = data.ingresosRetenciones[0];
            const nombre = separarNombre(d.nombreCompleto);

            const anio = d.anio;
            const devengado = formatearNumero(Number(d.devengado));
            const salud = formatearNumero(Number(d.aporteSalud));

            const fecha = new Date();

            const mapaTipoDocumento = {
                '71': '13',
                '72': '12',
                '73': '22',
                '74': '11',
                '588': '31',
                '286': '41',
                '125': '42'
            };

            const tipoDocDIAN = mapaTipoDocumento[String(d.tipoDocumentoCorto)] || d.tipoDocumentoCorto;

            return t
                .replace('{{tipoDocumento}}', tipoDocDIAN)
                .replace('{{numeroIdentificacion}}', d.numeroDocumento)

                .replace('{{primerApellido}}', nombre.primerApellido)
                .replace('{{segundoApellido}}', nombre.segundoApellido)
                .replace('{{primerNombre}}', nombre.primerNombre)
                .replace('{{otrosNombres}}', nombre.otrosNombres)

                // retenedor (fijo CREMIL)
                .replace('{{nit}}', '899999118')
                .replace('{{dv}}', '1')
                .replace('{{razonSocial}}', 'CAJA DE RETIRO DE LAS FUERZAS MILITARES')

                // año
                .replace(/{{anio}}/g, anio)

                // fecha expedición
                .replace('{{anioExp}}', fecha.getFullYear())
                .replace('{{mesExp}}', String(fecha.getMonth() + 1).padStart(2, '0'))
                .replace('{{diaExp}}', String(fecha.getDate()).padStart(2, '0'))

                // ciudad
                .replace('{{ciudad}}', 'Bogotá, DC')

                // valores
                .replace('{{pension}}', devengado)
                .replace('{{totalIngresos}}', devengado)
                .replace('{{salud}}', salud)
                .replace('{{retencion}}', '0');
        }

        default:
            throw new Error('Tipo no soportado');
    }
}

module.exports = { construirHTML };