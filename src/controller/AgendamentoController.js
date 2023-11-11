const { DataTypes, Op, Sequelize } = require('sequelize');
const Agendamento = require('../model/Agendamento');

class AgendamentoController {
    async disponivel(data, hora, id_loja) {
        const agendamento = await Agendamento.findOne({
            where: {
                data,
                hora,
                id_loja,
                status: {
                    [Op.not]: ['c', 'f'], 
                },
            },
        });
        console.log(agendamento)
        return !agendamento; 
    }
    
    async insert(id_loja, data, hora, descricao, id_cliente, status) {
        return await Agendamento.create({id_loja, data, hora, descricao, id_cliente, status});
    }

    async update(id_agendamento, data, hora, descricao, id_cliente) {
        const agendamento = await Agendamento.findByPk(id_agendamento);
        
        if (agendamento) {
        return await agendamento.update({ data, hora, descricao, id_cliente});
        }
    }

    async update_status(id_agendamento, status) {
        const agendamento = await Agendamento.findByPk(id_agendamento);
        
        if (agendamento) {
        return await agendamento.update({status});
        }
    }
    
    async find_agendamento(filtros) {
        const agendamentos = await Agendamento.findAll({
            where: filtros, 
        });

        return agendamentos;
    }

    async contarAgendamentosPorDia() {
        const resultado = await Agendamento.findAll({
            attributes: [
                [Sequelize.fn('DATE', Sequelize.col('data')), 'dia'], 
                [Sequelize.fn('COUNT', Sequelize.col('id_agendamento')), 'quantidade'],
            ],
            group: [Sequelize.fn('DATE', Sequelize.col('data'))]
        });

        return resultado;
    }
    
}

module.exports = new AgendamentoController();
