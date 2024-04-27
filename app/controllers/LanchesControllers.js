const express = require('express');
const passport = require('passport');
const { Sequelize, DataTypes, Model } = require('sequelize');

class LanchesController {
    constructor(lanchesStore) {
        this.lanchesStore = lanchesStore;
    }

    getRouter() {
        let router = express.Router();

        router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
            try {
                let lanches = await this.lanchesStore.listar();
                if (req.headers.accept && req.headers.accept.includes('application/json')) {
                    res.json(lanches);
                } else {
                    res.render('admin', { lanches });
                }
            } catch (error) {
                console.error('Erro ao listar lanches:', error);
                res.status(500).send('Erro ao listar lanches');
            }
        });

        router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
            try {
                let id = req.params.id;
                let lanche = await this.lanchesStore.procurarPorId(id);
                if (lanche) {
                    if (req.headers.accept && req.headers.accept.includes('application/json')) {
                        res.json(lanche);
                    } else {
                        res.render('index', { lanche });
                    }
                } else {
                    res.status(404).send('Lanche não encontrado');
                }
            } catch (error) {
                console.error('Erro ao obter detalhes do lanche:', error);
                res.status(500).send('Erro ao obter detalhes do lanche');
            }
        });

        router.delete('/:id', (req, res) => {
            this.apagar(req, res);
        });

        router.post('/cadastro', async (req, res) => {
            await this.inserir(req, res);
        });

        router.put('/cadastro/:id', (req, res) => {
            this.alterar(req, res);
        });

        return router;
    }

    async listar(req, res) {
        try {
            let lanches = await this.lanchesStore.listar();
            let dados = lanches.map(lanche => {
                return { ...lanche.dataValues };
            });
            res.render('lanches', { lanches: dados });
        } catch (error) {
            console.error('Erro ao listar lanches:', error);
            res.status(500).send('Erro ao listar lanches');
        }
    }

    async inserir(req, res) {
        try {
            let lanche = await this.getLancheDaRequisicao(req);
            lanche.id = await this.lanchesStore.inserir(lanche);
            let lanches = await this.listar(req, res);
            if (req.headers.accept === 'application/json') {
                res.json(lanche.id);
            } else {
                res.render('lanches', { lanches });
            }
        } catch (e) {
            console.log("erro inserir", e);
            res.status(400).json({
                mensagem: e.message
            });
        }
    }

    async alterar(req, res) {
        let lanche = await this.getLancheDaRequisicao(req);
        let id = req.params.id;
        try {
            await this.lanchesStore.alterar(id, lanche);
            res.send('Ok');
        } catch (e) {
            res.status(400).json({
                mensagem: e.message
            });
        }
    }

    async apagar(req, res) {
        let id = req.params.id;
        await this.lanchesStore.apagar(id);
        res.json({
            mensagem: 'mensagem_lanche_apagado',
            id: id
        });
    }

    async getLancheDaRequisicao(req) {
        let corpo = req.body;
        return {
            nome: corpo.nome,
            valor: corpo.valor,
            quantidade: corpo.quantidade
        };
    }
}

module.exports = LanchesController;
