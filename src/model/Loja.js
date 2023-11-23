const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/sequelize');

const Loja = sequelize.define('Loja', {
    id_loja: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        type: DataTypes.STRING(10),
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
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
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

Loja.beforeSave(async (loja) => {
    if (loja.changed('senha')) {
        const hashedPassword = await bcrypt.hash(loja.senha, 10);
        loja.senha = hashedPassword;
    }
});

module.exports = Loja;
