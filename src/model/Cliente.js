const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/sequelize');
const Loja = require('./Loja');
const Cliente = sequelize.define('Cliente', {
    id_cliente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_loja:{
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
    rua: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate:{
            isIn: [['M', 'F', 'O']]
        },
    },
    tipo_pessoa: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        validate: {
            isIn: [['F', 'J']],
        },
    },
    cnpj: {
        type: DataTypes.STRING(14),
        validate: {
            is: /^\d{14}$/i,
        },
        allowNull: true, 
        unique: true,   
    },
    cpf: {
        type: DataTypes.STRING(11),
        validate: {
            is: /^\d{11}$/i,
        },
        allowNull: true, 
        unique: true,   
    },
});

module.exports = Cliente;
