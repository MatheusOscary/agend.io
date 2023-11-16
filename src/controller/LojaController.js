const { DataTypes, Op, Sequelize } = require('sequelize');
const Loja = require('../model/Loja');

class LojaController{
    async existe_loja(cpf, cnpj) {
        try {
            const lojaExistente = await Loja.findOne({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { cpf: { [Op.not]: null, [Op.eq]: cpf } },
                                { cnpj: { [Op.not]: null, [Op.eq]: cnpj } },
                            ],
                        },
                    ],
                },
                attributes: ['id_loja'],
                raw: true,
            });
            return !lojaExistente; 
        } catch (error) {
            throw error; 
        }
    }

    async insert(nome, rua, numero, cidade, estado, cep, telefone, email,  senha, tipo_pessoa, cnpj, cpf) {
        try {
            await Loja.create({
                nome,
                rua,
                numero,
                cidade,
                estado,
                cep,
                telefone,
                email,
                senha,
                tipo_pessoa,
                cnpj,
                cpf 
            });
            return {message : "Sucesso ao inserir loja."}
        } catch (error) {
            throw error;
        }
    }

    async update(id_loja, nome, rua, numero, cidade, estado, cep, telefone, email, senha, tipo_pessoa, cnpj, cpf) {
        try {
            const loja = await Loja.findByPk(id_loja);
            if (loja) {
                await loja.update({
                    nome,
                    rua,
                    numero,
                    cidade,
                    estado,
                    cep,
                    telefone,
                    email,
                    senha,
                    tipo_pessoa,
                    cnpj,
                    cpf
                });
                return {message : "Sucesso ao atualizar loja."};
            }
        } catch (error) {
            return error;
        }
        
    }
    async find_loja(filtros) {
        try {
            const lojas = await Loja.findAll({
                where: filtros,
                attributes: {
                    exclude: ['senha']
                }
            });
            return lojas;   
        } catch (error) {
            return error;
        }
    }
    
}

module.exports = new LojaController;