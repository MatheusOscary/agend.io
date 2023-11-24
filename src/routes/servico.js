const express = require('express');
const router = express.Router();
const validarjson = require('../middlewares/validarjson');
const validartoken = require('../middlewares/validartoken');
const ServicoController = require('../controller/ServicoController');
const servico_POST = {
    type: 'object',
    properties: {
      id_loja: { type: 'string', maxLength: 10  },
      nome: { type: 'string', maxLength: 255 },
      preco: { type: 'number', minimum: 0, maximum: 999999.99 }
    },
    required: ['id_loja', 'nome', 'preco'],
  };


  const servico_PUT = {
    type: 'object',
    properties: {
      id_loja: { type: 'string', maxLength: 10  },
      id_servico: { type: 'string', maxLength: 10  },
      nome: { type: 'string', maxLength: 255 },
      preco: { type: 'number', minimum: 0, maximum: 999999.99 }
    },
    required: ['id_loja', 'id_servico', 'nome', 'preco'],
    
  };

  const servico_GET = {
    type: 'object',
    properties: {
      id_loja: { type: 'string', maxLength: 10  },
      id_servico: { type: 'string', maxLength: 10  },
      nome: { type: 'string', maxLength: 255 },
      preco: { type: 'number', minimum: 0, maximum: 999999.99 }
    }
  };


router.post('/', validartoken, validarjson(servico_POST), async (req, res) => {
    const { id_loja, nome, preco } = req.body;
    try {
        const result = await ServicoController.insert( id_loja, nome, preco );
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao inserir servico:', error);
        res.status(500).json({ error: 'Erro interno ao inserir servico' });
    }
});

router.put('/', validartoken, validarjson(servico_PUT), async (req, res) => {
    const { id_loja, id_servico, nome, preco } = req.body;
    try {
        const result = await ServicoController.update( id_servico, id_loja, nome, preco);
        res.status(201).json(result);
        
    } catch (error) {
        console.error('Erro ao atualizar servico:', error);
        res.status(500).json({ error: 'Erro interno ao atualizar servico' });
    }
});

router.post('/listar', validartoken, validarjson(servico_GET), async (req, res) => {
    try {
        const result = await ServicoController.find_servico( req.body);
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro ao consultar servico:', error);
        res.status(500).json({ error: 'Erro interno ao consultar servico' });
    }
});

router.delete('/:id_servico', validartoken,  async (req, res) =>{
  try {
      const {id_servico} = req.params;
      const result = await ServicoController.delete(id_servico);
      res.status(201).json(result);
  } catch (error) {
      console.error('Erro ao deletar servico:', error);
      res.status(500).json({ error: 'Erro interno ao deletar servico' });
  }
})
module.exports = router