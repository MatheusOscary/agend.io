const express = require('express');
const router = express.Router();
const validarjson = require('../middlewares/validarjson');
const agendamentoController = require('../controller/AgendamentoController');

const agendamento_POST = {
    type: 'object',
    properties: {
        data: { type: 'string', format: 'date' },
        hora: { type: 'string', pattern: '^[0-9]{2}:[0-9]{2}$' },
        descricao: {type: 'string'},
        id_cliente: { type: 'string' }
    },
    required: ['data', 'hora', 'id_cliente', 'descricao'],
};

router.post('/', validarjson(agendamento_POST), async (req, res) =>{
    const {data, hora, descricao, id_cliente} = req.body;

    try {
        if(await agendamentoController.disponivel(data, hora)){
            const result = await agendamentoController.insert(data, hora, descricao, id_cliente);
            res.status(201).json(result);
        }else{
            res.status(409).json({ error: 'Conflito de agendamento. Já existe um agendamento para o mesmo horário.' });
        }
    } catch (error) {
        console.error('Erro ao inserir agendamento:', error);
        res.status(500).json({ error: 'Erro interno ao inserir agendamento' });
    }
});

module.exports = router;