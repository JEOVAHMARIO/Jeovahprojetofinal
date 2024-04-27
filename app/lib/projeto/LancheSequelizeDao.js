const { DataTypes } = require('sequelize');
const { Sequelize, DataTypes, Model } = require('sequelize');

const Lanche = sequelize.define('Lanche', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

async function listarLanches() {
    try {
        const lanches = await Lanche.findAll();
        return lanches;
    } catch (error) {
        throw new Error('Erro ao listar lanches: ' + error.message);
    }
}

async function criarLanche(nome, preco, descricao) {
    try {
        const novoLanche = await Lanche.create({ nome, preco, descricao });
        return novoLanche;
    } catch (error) {
        throw new Error('Erro ao criar lanche: ' + error.message);
    }
}

async function buscarLanchePorId(id) {
    try {
        const lanche = await Lanche.findByPk(id);
        if (!lanche) {
            throw new Error('Lanche não encontrado');
        }
        return lanche;
    } catch (error) {
        throw new Error('Erro ao buscar lanche por ID: ' + error.message);
    }
}

async function atualizarLanche(id, nome, preco, descricao) {
    try {
        const lanche = await Lanche.findByPk(id);
        if (!lanche) {
            throw new Error('Lanche não encontrado');
        }
        await lanche.update({ nome, preco, descricao });
        return lanche;
    } catch (error) {
        throw new Error('Erro ao atualizar lanche: ' + error.message);
    }
}

async function excluirLanche(id) {
    try {
        const lanche = await Lanche.findByPk(id);
        if (!lanche) {
            throw new Error('Lanche não encontrado');
        }
        await lanche.destroy();
    } catch (error) {
        throw new Error('Erro ao excluir lanche: ' + error.message);
    }
}

module.exports = {
    listarLanches,
    criarLanche,
    buscarLanchePorId,
    atualizarLanche,
    excluirLanche
};
