const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3 = require("../config/s3");

const BUCKET = process.env.AWS_BUCKET_NAME;

// Subir PDF
async function subirPDF(buffer, nombreArchivo) {
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: `certificados/${nombreArchivo}`,
        Body: buffer,
        ContentType: "application/pdf"
    });

    await s3.send(command);

    return nombreArchivo;
}

// Generar URL temporal
async function generarURL(nombreArchivo) {
    const command = new GetObjectCommand({
        Bucket: BUCKET,
        Key: `certificados/${nombreArchivo}`
    });

    const url = await getSignedUrl(s3, command, {
        expiresIn: 60 * 60 * 24 * 2 // 2 días
    });

    return url;
}

module.exports = {
    subirPDF,
    generarURL
};