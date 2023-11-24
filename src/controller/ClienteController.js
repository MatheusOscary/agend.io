const { DataTypes, Op, Sequelize } = require('sequelize');
const Cliente = require('../model/Cliente')
class ClienteController{
    async existe_cliente(cpf, cnpj, id_loja) {
        try {
            const clienteExistente = await Cliente.findOne({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { cpf: { [Op.not]: null, [Op.eq]: cpf } },
                                { cnpj: { [Op.not]: null, [Op.eq]: cnpj } },
                            ],
                        },
                        {
                            id_loja: id_loja
                        }
                    ],
                },
                attributes: ['id_cliente'],
                raw: true,
            });
            return !clienteExistente; 
        } catch (error) {
            throw error; 
        }
    }
    async insert(id_loja, nome, rua, numero, cidade, estado, cep, telefone, email, sexo, tipo_pessoa, cnpj, cpf) {
        try {
          await Cliente.create({
            id_loja,
            nome,
            rua,
            numero,
            cidade,
            estado,
            cep,
            telefone,
            email,
            sexo,
            tipo_pessoa,
            cnpj,
            cpf
          });
          return {message : "Sucesso ao inserir cliente."}
        } catch (error) {
          throw error; 
        }
      };
      async update (id_cliente, nome, rua, numero, cidade, estado, cep, telefone, email, sexo, tipo_pessoa) {
        try {
            const cliente = await Cliente.findByPk(id_cliente);
            if (cliente) {
                await cliente.update({
                    id_cliente,
                    nome,
                    rua,
                    numero,
                    cidade,
                    estado,
                    cep,
                    telefone,
                    email,
                    sexo,
                    tipo_pessoa,
                });
                return {message : "Sucesso ao atualizar cliente."};
            }
        } catch (error) {
            return error;
        }
      };
      async delete(id_cliente)  {
        try {
      
         await Cliente.destroy({
            where: {
              id_cliente: id_cliente,
            },
          });
          return {message : "Sucesso ao deletar cliente."};
        } catch (error) {
            return error;
        }
      };
      async find_cliente(filtros) {
        try {
            const clientes = await Cliente.findAll({
                where: filtros
            });
            return clientes;   
        } catch (error) {
            return error;
        }
    }
}
module.exports = new ClienteController;