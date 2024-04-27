const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

const UsuariosSequelizeDao = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    papel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

async function listarUsuarios() {
    try {
        const usuarios = await UsuariosSequelizeDao.findAll();
        return usuarios;
    } catch (error) {
        throw new Error('Erro ao listar usuários no banco de dados');
    }
}

async function inserirUsuario(usuario) {
    try {
        const novoUsuario = await UsuariosSequelizeDao.create(usuario);
        return novoUsuario.id;
    } catch (error) {
        throw new Error('Erro ao inserir usuário no banco de dados');
    }
}

async function alterarUsuario(id, novoUsuario) {
    try {
        await UsuariosSequelizeDao.update(novoUsuario, { where: { id } });
    } catch (error) {
        throw new Error('Erro ao alterar usuário no banco de dados');
    }
}

async function apagarUsuario(id) {
    try {
        await UsuariosSequelizeDao.destroy({ where: { id } });
    } catch (error) {
        throw new Error('Erro ao apagar usuário no banco de dados');
    }
}

module.exports = {
    listarUsuarios,
    inserirUsuario,
    alterarUsuario,
    apagarUsuario,
};
