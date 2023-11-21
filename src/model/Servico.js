const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Loja = require('./Loja');

const Servico = sequelize.define('Servico', {
    id_servico: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Loja,
            key: 'id_loja'
        }

    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }

});

module.exports = Servico;
