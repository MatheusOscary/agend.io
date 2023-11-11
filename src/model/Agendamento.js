const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Agendamento = sequelize.define('Agendamento', {
    id_agendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_loja: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
