const Lanche = require('../lib/projeto/Lanche');
const utils = require('../lib/utils');

class LanchesController {
    constructor(lanchesDao) {
        this.lanchesDao = lanchesDao;
    }
    async index(req, res) {
        let lanches = await this.lanchesDao.listar();
        utils.renderizarEjs(res, './views/index.ejs', {lanches});  
    }

    async detalhes(req, res) {
        let lanches = await this.lanchesDao.listar();
        utils.renderizarEjs(res, './views/detalhes.ejs', {lanches});  
    }

    async autor(req, res) {
        let lanches = await this.lanchesDao.listar();
        utils.renderizarEjs(res, './views/autor.ejs', {lanches});  
    }

    async cadastro(req, res) {
        let lanches = await this.lanchesDao.listar();
        utils.renderizarEjs(res, './views/cadastro.ejs', {lanches});  
    }

    async login(req, res) {
        let lanches = await this.lanchesDao.listar();
        utils.renderizarEjs(res, './views/login.ejs', {lanches});  
    }

    async listar(req, res) {
        let lanches = await this.lanchesDao.listar();
        utils.renderizarJSON(res, lanches);
    }
    
    async inserir(req, res) {
        let lanche = await this.getLancheDaRequisicao(req);
        try {
            this.lanchesDao.inserir(lanche);
            utils.renderizarJSON(res, {
                lanche,
                mensagem: 'mensagem_lanche_cadastrado'
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }

    async visualizar(req, res) {
        let [ url, queryString ] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];      
        let lanche = await this.lanchesDao.visualizar(id);
        utils.renderizarJSON(res, lanche);
    }

    async alterar(req, res) {
        let lanche = await this.getLancheDaRequisicao(req);
        console.log(lanche);
        let [ url, queryString ] = req.url.split('?');
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        console.log(id);
        try {
            this.lanchesDao.alterar(id, lanche);
            utils.renderizarJSON(res, {
                mensagem: 'mensagem_lanche_alterado'
            });
        } catch (e) {
            utils.renderizarJSON(res, {
                mensagem: e.message
            }, 400);
        }
    }
    
    apagar(req, res) {
        console.log('teste');
        let [ url, queryString ] = req.url.split('?');
        console.log(url);
        let urlList = url.split('/');
        url = urlList[1];
        let id = urlList[2];
        console.log(id);
        this.lanchesDao.apagar(id);
        utils.renderizarJSON(res, {
            mensagem: 'mensagem_lanche_apagado',
            id: id
        });
    }

    async getLancheDaRequisicao(req) {
        let corpo = await utils.getCorpo(req);
        console.log(corpo);
        let lanche = new Lanche(
            corpo.nome,
            corpo.valor,
            corpo.quantidade
        );
        return lanche;
    }
}

module.exports = LanchesController;