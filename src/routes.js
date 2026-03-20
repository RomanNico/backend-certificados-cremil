const express = require('express');
const router = express.Router();
const { generarCertificado } = require('./controllers/certificadoController');

router.post('/certificado', generarCertificado);

module.exports = router;