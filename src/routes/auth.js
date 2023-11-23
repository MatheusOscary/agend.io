const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validarjson = require('../middlewares/validarjson');
const AuthController = require('../controller/AuthController');

const auth_POST = {
    type: 'object',
    properties: {
        cpf_cnpj: { type: 'string',  minLength: 11,  maxLength: 14, pattern: "^[0-9]+$" },
        senha: { type: "string", maxLength: 255 }
    },
    required: ['cpf_cnpj', 'senha'],
}


router.post('/', validarjson(auth_POST), async (req, res)=>{
    console.log("chegou aqui")
    const {cpf_cnpj, senha} = req.body;
    try {
        const loja = await AuthController.verifica_usuario(cpf_cnpj);
        console.log(loja);
        if(loja && await bcrypt.compare(senha, loja.senha)){
            const token = await AuthController.gerartoken(loja);
            const id_loja = loja.id_loja
            res.json({ token, id_loja });
        }else{
            res.status(401).json({ error: 'Credenciais inválidas' })
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).json({ error: 'Erro interno durante a autenticação' });
    }
})

module.exports = router;