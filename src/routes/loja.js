const express = require('express');
const router = express.Router();
const validarjson = require('../middlewares/validarjson');
const LojaController = require('../controller/LojaController')
const loja_POST = {
    type: "object",
    properties: {
        nome: { type: "string", maxLength: 255 },
        rua: { type: "string", maxLength: 255 },
        numero: { type: "integer" },
        cidade: { type: "string", maxLength: 100 },
        estado: { type: "string", maxLength: 50 },
        cep: { type: "string", maxLength: 10 },
        telefone: { type: "string", maxLength: 20 },
        email: { type: "string", format: "email", maxLength: 255 },
        senha: { type: "string", maxLength: 255 },
        tipo_pessoa: { type: "string", maxLength: 1, enum: ["F", "J"] },
        cnpj: { type: ["string", "null"], maxLength: 14, pattern: "^[0-9]{14}$" },
        cpf: { type: ["string", "null"], maxLength: 11, pattern: "^[0-9]{11}$" }
    },
    required: ["nome", "rua", "numero", "cidade", "estado", "cep", "telefone", "email", "senha", "tipo_pessoa"],
    if: {
        properties: { tipo_pessoa: { const: "F" } },
        required: ["cpf"]
    },
    else: {
        properties: { tipo_pessoa: { const: "J" } },
        required: ["cnpj"]
    }
}

const loja_PUT = {
    type: 'object',
    properties: {
        id_loja: { type: 'integer' }, 
        nome: { type: 'string', maxLength: 255 },
        rua: { type: 'string', maxLength: 255 },
        numero: { type: 'integer' },
        cidade: { type: 'string', maxLength: 100 },
        estado: { type: 'string', maxLength: 50 },
        cep: { type: 'string', maxLength: 10 },
        telefone: { type: 'string', maxLength: 20 },
        email: { type: 'string', format: 'email', maxLength: 255 }
    },
    required: ['id_loja', 'nome', 'rua', 'numero', 'cidade', 'estado', 'cep', 'telefone', 'email'],
};

const loja_GET = {
    type: "object",
    properties: {
        id_loja: { type: 'integer' }, 
        nome: { type: "string", maxLength: 255 },
        rua: { type: "string", maxLength: 255 },
        numero: { type: "integer" },
        cidade: { type: "string", maxLength: 100 },
        estado: { type: "string", maxLength: 50 },
        cep: { type: "string", maxLength: 10 },
        telefone: { type: "string", maxLength: 20 },
        email: { type: "string", format: "email", maxLength: 255 },
        tipo_pessoa: { type: "string", maxLength: 1, enum: ["F", "J"] },
        cnpj: { type: ["string", "null"], maxLength: 14, pattern: "^[0-9]{14}$" },
        cpf: { type: ["string", "null"], maxLength: 11, pattern: "^[0-9]{11}$" }
    }
}


router.post('/', validarjson(loja_POST), async (req, res) => {
    const { nome, rua, numero, cidade, estado, cep, telefone, email, senha, tipo_pessoa, cnpj, cpf } = req.body;
    try {
        if(await LojaController.existe_loja(cpf, cnpj)){
            const result = await LojaController.insert(nome, rua, numero, cidade, estado, cep, telefone, email, senha, tipo_pessoa, cnpj, cpf);
            res.status(201).json(result);
        }else{
            res.status(409).json({ error: 'Conflito de loja. Já existe uma loja com o mesmo cpf/cnpj.' });
        }
    } catch (error) {
        console.error('Erro ao inserir loja:', error);
        res.status(500).json({ error: 'Erro interno ao inserir loja' });
    }
});

router.put('/', validarjson(loja_PUT), async (req, res) => {
    const { id_loja, nome, rua, numero, cidade, estado, cep, telefone, email } = req.body;
    try {
        const result = await LojaController.update( id_loja, nome, rua, numero, cidade, estado, cep, telefone, email);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao atualizar loja:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar loja' });
    }
});

router.get('/', validarjson(loja_GET), async (req, res) => {
    try {
        const result = await LojaController.find_loja( req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao atualizar loja:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar loja' });
    }
});


module.exports = router;