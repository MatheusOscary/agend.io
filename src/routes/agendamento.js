const express = require('express');
const router = express.Router();
const validarjson = require('../middlewares/validarjson');
const validartoken = require('../middlewares/validartoken');
const agendamentoController = require('../controller/AgendamentoController');

const agendamento_POST = {
    type: 'object',
    properties: {
        data: { type: 'string', format: 'date', maxLength: 10 },
        hora: { type: 'string', pattern: '^[0-9]{2}:[0-9]{2}$', maxLength: 5 },
        descricao: { type: 'string', maxLength: 120 },
        id_cliente: { type: 'string', maxLength: 10 },
        id_loja: { type: 'string', maxLength: 10 },
        status: {type: 'string', maxLength: 1, enum: ['a', 'c', 'f'] }
    },
    required: ['data', 'hora', 'id_cliente', 'descricao', 'id_loja', 'status'],
};
const agendamento_PUT = {
    type: 'object',
    properties: {
        data: { type: 'string', format: 'date', maxLength: 10 },
        hora: { type: 'string', pattern: '^[0-9]{2}:[0-9]{2}$', maxLength: 5 },
        descricao: { type: 'string', maxLength: 120 },
        id_cliente: { type: 'string', maxLength: 10 },
        id_loja: { type: 'string', maxLength: 10 },
        id_agendamento: { type: 'string', maxLength: 10 }
    },
    required: ['data', 'hora', 'id_cliente', 'descricao', 'id_agendamento', 'id_loja'],
};

const agendamento_status_POST = {
    type: 'object',
    properties: {
        id_agendamento: { type: 'string', maxLength: 10 },
        status: {type: 'string', maxLength: 1, enum: ['a', 'c', 'f'] }
    },
    required: ['id_agendamento','status']
};

const agendamento_GET = {
    type: 'object',
    properties: {
        data: { type: 'string', format: 'date', maxLength: 10 },
        hora: { type: 'string', pattern: '^[0-9]{2}:[0-9]{2}$', maxLength: 5 },
        descricao: { type: 'string', maxLength: 120 },
        id_agendamento: { type: 'string', maxLength: 10 },
        id_cliente: { type: 'string', maxLength: 10 },
        id_loja: { type: 'string', maxLength: 10 },
        status: {type: 'string', maxLength: 1, enum: ['a', 'c', 'f'] }
    }
};

router.post('/', validartoken, validarjson(agendamento_POST), async (req, res) =>{
    const {data, hora, descricao, id_cliente, status, id_loja, id_servico} = req.body;

    try {
        if(await agendamentoController.disponivel(data, hora, id_loja)){
            const result = await agendamentoController.insert(id_loja, data, hora, descricao, id_cliente, status, id_servico);
            res.status(201).json(result);
        }else{
            res.status(409).json({ error: 'Conflito de agendamento. Já existe um agendamento para o mesmo horário.' });
        }
    } catch (error) {
        console.error('Erro ao inserir agendamento:', error);
        res.status(500).json({ error: 'Erro interno ao inserir agendamento' });
    }
});

router.put('/', validartoken, validarjson(agendamento_PUT), async (req, res) =>{
    const {data, hora, descricao, id_cliente, id_agendamento, id_loja} = req.body;
    try {
        if(await agendamentoController.disponivel(data, hora, id_loja)){
            const result = await agendamentoController.update(id_agendamento, data, hora, descricao, id_cliente);
            res.status(201).json(result);
        }else{
            res.status(409).json({ error: 'Conflito de agendamento. Já existe um agendamento para o mesmo horário.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar agendamento:', error);
        res.status(500).json({ error: 'Erro interno ao inserir agendamento' });
    }
})

router.post('/status', validartoken,  validarjson(agendamento_status_POST),  async (req, res) =>{
    const {id_agendamento, status} = req.body;
    try {
        const result = await agendamentoController.update_status(id_agendamento, status);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar status agendamento' });
    }
})

router.post('/listar', validartoken,  validarjson(agendamento_GET), async (req, res) => {
    try {
        const result = await agendamentoController.find_agendamento(req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao consultar agendamento:', error);
        res.status(500).json({ error: 'Erro interno ao consultar agendamento' });
    }
})

router.post('/relatorio', validartoken,  async (req, res) =>{
    try {
        const {ano, mes, dia} = req.body;
        const result = await agendamentoController.contarAgendamentosPorDia(ano, mes, dia);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao consultar relatório:', error);
        res.status(500).json({ error: 'Erro interno ao consultar relatório' });
    }
})
router.delete('/:id_agendamento', validartoken,  async (req, res) =>{
    try {
        const {id_agendamento} = req.params;
        const result = await agendamentoController.delete(id_agendamento);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao deletar agendamento:', error);
        res.status(500).json({ error: 'Erro interno ao deletar agendamento' });
    }
})
module.exports = router;