const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');

class InicialController {
    constructor(lanchesStore) {
        this.lanchesStore = lanchesStore;
    }

    getRouter() {
        let rotas = express.Router();
        rotas.get('/index', (req, res) => {
            this.index(req, res);
        });
        rotas.get('/detalhes/:id', (req, res) => {
            this.detalhes(req, res);
        });
        rotas.get('/admin', (req, res) => {
            this.admin(req, res);
        });
        rotas.get('/cadastro', (req, res) => { 
            this.cadastro(req, res);
        });
        rotas.get('/usuarios', (req, res) => { 
            this.usuarios(req, res);
        });
        return rotas;
    }

    async index(req, res) {
        try {
            let lanches = await this.lanchesStore.listar();
            res.render('index', { lanches });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro interno no servidor');
        }
    }

    async detalhes(req, res) {
        let id = req.params.id;
        let lanche = await this.lanchesStore.procurarPorId(id);
        if (lanche) {
            res.render('detalhes', { lanche });
        } else {
            res.status(404).send('Lanche não encontrado');
        }
    }

    async admin(req, res) {
        let lanches = await this.lanchesStore.listar();
        res.render('admin', { lanches });
    }

    async cadastro(req, res) {
        res.render('cadastro'); 
    }

    async usuarios(req, res) {
        try {
            let usuarios = await this.lanchesStore.listar(); 
            res.render('usuarios', { usuarios }); 
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            res.status(500).send('Erro ao listar usuários');
        }
    }
}

module.exports = InicialController;
