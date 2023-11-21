const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Cliente = require('./Cliente');
const Servico = require('./Servico');
const Loja = require('./Loja');

const Agendamento = sequelize.define('Agendamento', {
    id_agendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Loja,
            key: 'id_loja',
        },
    },
    id_servico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servico,
            key: 'id_servico',
        },
    },
    data: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    hora: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING(120),
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Cliente,
            key: 'id_cliente',
        },
    },
    status: {
        type: DataTypes.STRING(1),
        allowNull: false,
        validate: {
            isIn: [['a', 'c', 'f']],
        },
    }
});

module.exports = Agendamento;