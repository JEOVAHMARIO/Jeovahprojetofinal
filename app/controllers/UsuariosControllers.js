const express = require('express');
const Usuario = require('../lib/projeto/Usuario');
const utils = require('../lib/utils');
const { Sequelize, DataTypes, Model } = require('sequelize');

class UsuariosController {
    constructor(lanchesStore) {
        this.lanchesStore = lanchesStore;
    }

    async listar(req, res) {
        try {
            const usuarios = await this.lanchesStore.listarUsuarios();

            res.render('usuarios', { usuarios });
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).send('Erro ao listar usuários');
        }
    }
    
    async inserir(req, res) {
        let usuario = await this.getUsuarioDaRequisicao(req);
        try {
            usuario.id = await this.lanchesStore.inserirUsuario(usuario);

            utils.renderizarJSON(res, {
                usuario,
                mensagem: 'mensagem_usuario_cadastrado'
            });
        } catch(e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }
    
    async alterar(req, res) {
        let usuario = await this.getUsuarioDaRequisicao(req);
        let id = req.params.id;
        try {
            await this.lanchesStore.alterarUsuario(id, usuario);

            utils.renderizarJSON(res, {
                mensagem: 'mensagem_usuario_alterado'
            });
        } catch(e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }
    
    async apagar(req, res) {
        let id = req.params.id;
        try {
            await this.lanchesStore.apagarUsuario(id);

            utils.renderizarJSON(res, {
                mensagem: 'mensagem_usuario_apagado',
                id: id
            });
        } catch(e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }
    
    async getUsuarioDaRequisicao(req) {
        let corpo = await utils.getCorpo(req);
        let usuario = new Usuario(
            corpo.nome,
            corpo.senha,
            corpo.papel
        );
        return usuario;
    }

    async getUser(id){
        let usuario = await Usuario.findOne({
            raw: true,
            where: {
            id: (id),
            },   
        });
        return usuario;
    }

    getRouter() {
        let rotas = express.Router();
        rotas.get('/', (req, res) => {
            this.listar(req, res);
        });
        rotas.post('/', (req, res) => {
            this.inserir(req, res);
        });
        rotas.put('/:id', (req, res) => {
            this.alterar(req, res);
        });
        rotas.delete('/:id', (req, res) => {
            this.apagar(req, res);
        });
        return rotas;
    }
}

module.exports = UsuariosController;
