const { construirHTML } = require('../services/templateService');
const { generarPDF } = require('../services/pdfService');
const { subirPDF, generarURL } = require('../services/s3Service');

async function generarCertificado(req, res) {
    try {
        let { tipo, data } = req.body;

        if (!tipo) {
            if (req.body.certificadoHaberes) {
                tipo = 'haberes';
                data = req.body;
            } else if (req.body.sueldoBasicoHaberes) {
                tipo = 'sueldo';
                data = req.body;
            } else if (req.body.certificacion) {
                tipo = 'institucionalidad';
                data = req.body;
            } else if (req.body.serviciosMedicosTitular) {
                tipo = 'medicos';
                data = req.body;
            } else if (req.body.certificacionTiempoServicio) {
                tipo = 'tiempo';
                data = req.body;
            } else if (req.body.ingresosRetenciones) {
                tipo = 'ingresos';
                data = req.body;
            }
        }

        if (!tipo || !data) {
            return res.status(400).json({
                error: 'No se pudo identificar el tipo de certificado'
            });
        }

        const html = construirHTML(tipo, data);

        const pdfBuffer = await generarPDF(html);

        const nombreArchivo = `certificado_${tipo}_${Date.now()}.pdf`;

        await subirPDF(pdfBuffer, nombreArchivo);

        const url = await generarURL(nombreArchivo);

        res.json({
            mensaje: 'Certificado generado y subido correctamente',
            url,
            nombreArchivo
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            error: 'Error generando certificado'
        });
    }
}

module.exports = { generarCertificado };