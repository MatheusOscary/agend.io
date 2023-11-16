const { DataTypes, Op, Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const Loja = require('../model/Loja');


class AuthController{
    async gerartoken(loja) {
        const payload = {
            id_loja: loja.id_loja,
            nome: loja.nome
        };
    
        const options = {
            expiresIn: '1h'
        };
    
        const token = jwt.sign(payload, '492931728282288659980832861449837', options);
        return token;
    }
    async verifica_usuario(cpf_cnpj){
        const loja = await Loja.findOne({
            where: {
                [Op.or]: [{ cpf: cpf_cnpj }, { cnpj: cpf_cnpj }],
            },
        });
        return loja;
    }
}

module.exports = new AuthController;