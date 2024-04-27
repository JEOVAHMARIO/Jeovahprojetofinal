const { Sequelize, DataTypes, Model } = require('sequelize');

class Lanche extends Model {
    constructor(nome, valor, quantidade, id) {
        this.nome = nome;
        this.valor = valor;
        this.quantidade = quantidade;
        this.id = id;
    }
}
module.exports = Lanche;
