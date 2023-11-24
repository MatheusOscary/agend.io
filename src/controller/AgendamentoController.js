const { DataTypes, Op, Sequelize } = require('sequelize');
const Agendamento = require('../model/Agendamento');
const Cliente = require('../model/Cliente');
const Servico = require('../model/Servico');
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
    
    async insert(id_loja, data, hora, descricao, id_cliente, status, id_servico) {
        try{
            await Agendamento.create({
                id_loja,
                data,
                hora,
                descricao,
                id_cliente,
                status,
                id_servico
            });
            return {message : "Sucesso ao cadastrar agendamento."};
        }
         catch (error) {
            return error;
        }
    }

    async update(id_agendamento, data, hora, descricao, id_cliente) {
        const agendamento = await Agendamento.findByPk(id_agendamento);
        try{
        if (agendamento) {
            await agendamento.update({
                data,
                hora,
                descricao,
                id_cliente
            });

        }
            return {message : "Sucesso ao atualizar agendamento."};
        }
        catch (error) {
            return error;
        }
    }

    async delete(id_agendamento)  {
        try {
      
         await Agendamento.destroy({
            where: {
              id_agendamento: id_agendamento,
            },
          });
          return {message : "Sucesso ao deletar agendamento."};
        } catch (error) {
            return error;
        }
      };
        
    async update_status(id_agendamento, status) {

        try{
        const agendamento = await Agendamento.findByPk(id_agendamento);
        
        if (agendamento) {
        return await agendamento.update({status});
        }
            return {message : "Sucesso ao atualizar agendamento."};
        }
        catch (error) {
            return error;
        }
    }
    
    async find_agendamento(filtros) {
        const agendamentos = await Agendamento.findAll({
          where: filtros,
          include: [
            {
              model: Cliente,
              attributes: ['id_cliente', 'nome', 'cpf', 'cnpj'],
            },
            {
              model: Servico,
              attributes: ['id_servico', 'nome', 'preco'],
            },
          ],
        });
      
        return agendamentos;
      }
      

      async contarAgendamentosPorDia(ano, mes, dia) {
        const whereClause = {};
      
        if (ano) {
          whereClause[Op.and] = [
            Sequelize.literal(`YEAR(data) = ${ano}`),
          ];
        }
      
        if (mes) {
          if (!whereClause[Op.and]) {
            whereClause[Op.and] = [];
          }
          whereClause[Op.and].push(
            Sequelize.literal(`MONTH(data) = ${mes}`)
          );
        }
      
        if (dia) {
          if (!whereClause[Op.and]) {
            whereClause[Op.and] = [];
          }
          whereClause[Op.and].push(
            Sequelize.literal(`DAY(data) = ${dia}`)
          );
        }
      
        const resultado = await Agendamento.findAll({
          attributes: [
            [Sequelize.fn('DATE_FORMAT', Sequelize.col('data'), '%Y-%m-%d'), 'data'],
            [Sequelize.fn('COUNT', Sequelize.col('id_agendamento')), 'quantidade'],
          ],
          where: whereClause,
          group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('data'), '%Y-%m-%d')],
        });
      
        return resultado;
      }
      
    
}

module.exports = new AgendamentoController();
