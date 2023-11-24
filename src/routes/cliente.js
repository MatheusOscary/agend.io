const express = require('express');
const router = express.Router();
const validarjson = require('../middlewares/validarjson');
const validartoken = require('../middlewares/validartoken');
const ClienteController = require('../controller/ClienteController');
const cliente_POST = {
    type: 'object',
    properties: {
      id_loja: { type: 'string', maxLength: 10  },
      nome: { type: 'string', maxLength: 255 },
      rua: { type: 'string', maxLength: 255 },
      numero: { type: 'string', maxLength: 10  },
      cidade: { type: 'string', maxLength: 100 },
      estado: { type: 'string', maxLength: 50 },
      cep: { type: 'string', maxLength: 10 },
      telefone: { type: 'string', maxLength: 20 },
      email: { type: 'string', maxLength: 255 },
      sexo: { type: 'string', maxLength: 1, enum: ['M', 'F', 'O'] },
      tipo_pessoa: { type: 'string', maxLength: 1, enum: ['F', 'J'] },
      cnpj: { type: ["string", "null"], maxLength: 14, pattern: '^[0-9]{14}$' },
      cpf: { type: ["string", "null"], maxLength: 11, pattern: '^[0-9]{11}$' },
    },
    required: ['id_loja', 'nome', 'rua', 'numero', 'cidade', 'estado', 'cep', 'telefone', 'email', 'sexo', 'tipo_pessoa'],
    if: {
        properties: { tipo_pessoa: { const: "F" } },
        required: ["cpf"]
    },
    else: {
        properties: { tipo_pessoa: { const: "J" } },
        required: ["cnpj"]
    }
  };


  const cliente_PUT = {
    type: 'object',
    properties: {
      id_cliente: { type: 'string', maxLength: 10  },
      id_loja: { type: 'string', maxLength: 10  },
      nome: { type: 'string', maxLength: 255 },
      rua: { type: 'string', maxLength: 255 },
      numero: { type: 'string', maxLength: 10 },
      cidade: { type: 'string', maxLength: 100 },
      estado: { type: 'string', maxLength: 50 },
      cep: { type: 'string', maxLength: 10 },
      telefone: { type: 'string', maxLength: 20 },
      email: { type: 'string', maxLength: 255 },
      sexo: { type: 'string', maxLength: 1, enum: ['M', 'F', 'O'] },
      tipo_pessoa: { type: 'string', maxLength: 1, enum: ['F', 'J'] }
    },
    required: ['id_cliente', 'nome', 'rua', 'numero', 'cidade', 'estado', 'cep', 'telefone', 'email', 'sexo', 'tipo_pessoa'],
    
  };

  const cliente_GET = {
    type: 'object',
    properties: {
      id_cliente: { type: 'string', maxLength: 10  },
      id_loja: { type: 'string', maxLength: 10  },
      nome: { type: 'string', maxLength: 255 },
      rua: { type: 'string', maxLength: 255 },
      numero: { type: 'string', maxLength: 10  },
      cidade: { type: 'string', maxLength: 100 },
      estado: { type: 'string', maxLength: 50 },
      cep: { type: 'string', maxLength: 10 },
      telefone: { type: 'string', maxLength: 20 },
      email: { type: 'string', maxLength: 255 },
      sexo: { type: 'string', maxLength: 1, enum: ['M', 'F', 'O'] },
      tipo_pessoa: { type: 'string', maxLength: 1, enum: ['F', 'J'] },
      cnpj: { type: ["string", "null"], maxLength: 14, pattern: '^[0-9]{14}$' },
      cpf: { type: ["string", "null"], maxLength: 11, pattern: '^[0-9]{11}$' },
    }
  };


router.post('/', validartoken, validarjson(cliente_POST), async (req, res) => {
    const { id_loja, nome, rua, numero, cidade, estado, cep, telefone, email, sexo, tipo_pessoa, cnpj, cpf } = req.body;
    try {
        if(await ClienteController.existe_cliente(cpf, cnpj, id_loja)) {
            const result = await ClienteController.insert(id_loja, nome, rua, numero, cidade, estado, cep, telefone, email, sexo, tipo_pessoa, cnpj, cpf);
            res.status(201).json(result);
        }else{
            res.status(409).json({ error: 'Conflito de cliente. Já existe uma cliente com o mesmo cpf/cnpj.' });
        }
    } catch (error) {
        console.error('Erro ao inserir cliente:', error);
        res.status(500).json({ error: 'Erro interno ao inserir cliente' });
    }
});

router.put('/', validartoken, validarjson(cliente_PUT), async (req, res) => {
    const {id_cliente, id_loja, nome, rua, numero, cidade, estado, cep, telefone, email, sexo, tipo_pessoa} = req.body;
    try {
        const result = await ClienteController.update( id_cliente, nome, rua, numero, cidade, estado, cep, telefone, email, sexo, tipo_pessoa);
        res.status(201).json(result);
        
    } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar cliente' });
    }
});

router.post('/listar', validartoken, validarjson(cliente_GET), async (req, res) => {
    try {
        const result = await ClienteController.find_cliente( req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao consultar cliente:', error);
        res.status(500).json({ error: 'Erro interno ao consultar cliente' });
    }
});
router.delete('/:id_cliente', validartoken,  async (req, res) =>{
    try {
        const {id_cliente} = req.params;
        const result = await ClienteController.delete(id_cliente);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao deletar cliente:', error);
        res.status(500).json({ error: 'Erro interno ao deletar cliente' });
    }
  })
module.exports = router