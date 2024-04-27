const { Sequelize, DataTypes, Model } = require('sequelize');

class Usuario extends Model {
    constructor(nome, senha, papel) {
        this.nome = nome;
        this.senha = senha;
        this.papel = papel;
    }
}
module.exports = Usuario