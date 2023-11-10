const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Agendamento = sequelize.define('Agendamento', {
    id_agendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    data: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hora: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Agendamento;
