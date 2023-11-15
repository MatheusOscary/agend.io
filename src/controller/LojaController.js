const { DataTypes, Op, Sequelize } = require('sequelize');
const Loja = require('../model/Loja');

class LojaController{
    async insert(nome, rua, numero, cidade, estado, cep, telefone, email, login, senha, tipo_pessoa, cnpj, cpf) {
        return await Loja.create({
            nome,
            rua,
            numero,
            cidade,
            estado,
            cep,
            telefone,
            email,
            login,
            senha,
            tipo_pessoa,
            cnpj,
            cpf 
        });
    }

    async update(id_loja, nome, rua, numero, cidade, estado, cep, telefone, email, login, senha, tipo_pessoa, cnpj, cpf) {
        const loja = await Loja.findByPk(id_loja);
    
        if (loja) {
            return await loja.update({
                nome,
                rua,
                numero,
                cidade,
                estado,
                cep,
                telefone,
                email,
                login,
                senha,
                tipo_pessoa,
                cnpj,
                cpf
            });
        }
    }
    
    
}

module.exports = new LojaController;