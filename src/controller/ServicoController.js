const { DataTypes, Op, Sequelize } = require('sequelize');
const Servico = require('../model/Servico')
class ServicoController{
    async insert(id_loja, nome, preco) {
        try {
          await Servico.create({
            id_loja,
            nome,
            preco
          });
          return {message : "Sucesso ao inserir servico."}
        } catch (error) {
          throw error; 
        }
      };
      async update (id_servico,id_loja, nome, preco) {
        try {
            const servico = await Servico.findByPk(id_servico);
            if (servico) {
                await servico.update({
                    id_servico,id_loja, nome, preco
                });
                return {message : "Sucesso ao atualizar servico."};
            }
        } catch (error) {
            return error;
        }
      };
      async delete(id_servico)  {
        try {
      
         await Servico.destroy({
            where: {
              id_servico: id_servico,
            },
          });
          return {message : "Sucesso ao deletar servico."};
        } catch (error) {
            return error;
        }
      };
      async find_servico(filtros) {
        try {
            const servicos = await Servico.findAll({
                where: filtros
            });
            return servicos;   
        } catch (error) {
            return error;
        }
    }
}
module.exports = new ServicoController;