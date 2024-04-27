const jwt = require('jsonwebtoken');
const express = require('express');
const utils = require("../lib/utils");

class AuthController {
    constructor(store) {
        this.store = store;
        this.SEGREDO_JWT = process.env.SEGREDO_JWT;
    }

    getRouter() {
        let rotas = express.Router();

        rotas.get('/', (req, res) => {
            this.index(req, res);
        });

        rotas.post('/', (req, res) => {
            this.logar(req, res);
        });

        return rotas;
    }

    index(req, res) {
        res.render('login');
    }

    async logar(req, res) {
        let corpo = req.body;
        let usuario = await this.store.autenticar(corpo.nome, corpo.senha);
        if (usuario) {
            console.log({ usuario });
            let token = jwt.sign({ ...usuario }, this.SEGREDO_JWT);
            res.json({
                token,
                mensagem: 'Usuário logado com sucesso!'
            });
        } else {
            utils.renderizarJSON(res, {
                mensagem: 'Usuário ou senha inválidos!'
            }, 401);
        }
    }

    autorizar(req, res, proximoControlador, papeisPermitidos) {
        console.log('autorizando', req.headers);
        try {
            let token = req.headers.authorization.split(' ')[1];
            let usuario = jwt.verify(token, this.SEGREDO_JWT);
            req.usuario = usuario;
            console.log({ usuario }, papeisPermitidos);

            if (papeisPermitidos.includes(usuario.papel) || papeisPermitidos.length === 0) {
                proximoControlador();
            } else {
                res.status(403).json({
                    mensagem: 'Não autorizado!'
                });
            }
        } catch (e) {
            res.status(401).json({
                mensagem: 'Não autenticado!',
                error: e.message
            });
        }
    }
}

module.exports = AuthController;
