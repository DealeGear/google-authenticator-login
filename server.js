const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const speakeasy = require('speakeasy');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Chave secreta do Google Authenticator (deve ser armazenada e associada ao usuário)
const secret = speakeasy.generateSecret({ length: 20 }).base32;
console.log('Secret Key:', secret); // Escaneie com o Google Authenticator

// Endpoint para validar o código do Google Authenticator
app.post('/validate', (req, res) => {
    const { code } = req.body;

    const verified = speakeasy.totp.verify({
        secret: secret,
        encoding: 'base32',
        token: code,
        window: 1 // Aceita códigos de 30 segundos antes ou depois
    });

    res.json({ success: verified });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
