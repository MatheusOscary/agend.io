const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validarjson = require('../middlewares/validarjson');
const AuthController = require('../controller/AuthController');

router.post('/', async (req, res)=>{
    const {cpf_cnpj, senha} = req.body;
    try {
        const loja = await AuthController.verifica_usuario(cpf_cnpj);
        console.log(loja);
        if(loja && await bcrypt.compare(senha, loja.senha)){
            const token = await AuthController.gerartoken(loja);
            res.json({ token });
        }else{
            res.status(401).json({ error: 'Credenciais inválidas' })
        }
    } catch (error) {
        console.error('Erro durante a autenticação:', error);
        res.status(500).json({ error: 'Erro interno durante a autenticação' });
    }
})

module.exports = router;