const http = require('http');
const LanchesController = require('./controllers/LanchesControllers');
const EstaticoController = require('./controllers/EstaticoController');
const AutorController = require('./controllers/AutorController');
const AuthController = require('./controllers/AuthController');
const UsuariosController = require('./controllers/UsuariosControllers');
const LanchesMysqlDao = require('./lib/projeto/LanchesMysqlDao');
const UsuariosMysqlDao = require('./lib/projeto/UsuariosMysqlDao');
const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'bd',
    user            : process.env.MARIADB_USER,
    password        : process.env.MARIADB_PASSWORD,
    database        : process.env.MARIADB_DATABASE
});

let lanchesDao = new LanchesMysqlDao(pool);
let usuariosDao = new UsuariosMysqlDao(pool);
let lanchesController = new LanchesController(lanchesDao);
let estaticoController = new EstaticoController();
let autorController = new AutorController();
let authController = new AuthController(usuariosDao);
let usuariosController = new UsuariosController(usuariosDao);

const PORT = 3000;
const server = http.createServer((req, res) => {
    let [url, querystring] = req.url.split('?');
    let urlList = url.split('/');
    url = urlList[1];
    let metodo = req.method;

    if (url=='index') {
        lanchesController.index(req, res);
    }
    else if (url=='detalhes') {
        lanchesController.detalhes(req, res);
    }
    else if (url=='autor') {
        autorController.autor(req, res);
    }
    
    else if (url == 'lanches' && metodo == 'GET') {
        lanchesController.listar(req, res);
    }

    else if (url == 'lanches' && metodo == 'POST') {
        lanchesController.inserir(req, res);
    }
    
    else if (url == 'lanches' && metodo == 'PUT') {
        lanchesController.alterar(req, res);
    }
    
    else if (url == 'lanches' && metodo == 'DELETE') {
        lanchesController.apagar(req, res);
        }

    else if (url == 'lanche' && metodo == 'GET') {
        lanchesController.visualizar(req, res);
        }    

    else if (url == 'usuarios' && metodo == 'GET') {
        usuariosController.listar(req, res);
    }
    else if (url == 'usuarios' && metodo == 'POST') {
        usuariosController.inserir(req, res);
    }
    else if (url == 'usuarios' && metodo == 'PUT') {
        authController.autorizar(req, res, function() {
            usuariosController.alterar(req, res);
        }, ['admin', 'geral']);
    }
    else if (url == 'usuarios' && metodo == 'DELETE') {
        authController.autorizar(req, res, function() {
            usuariosController.apagar(req, res);
        }, ['admin']);
    }
    else if (url=='cadastro') {
        authController.cadastro(req, res);    
    }

    else if (url=='admin') {
        authController.admin(req, res);    
    }

    else if (url == 'login') {
        authController.login(req, res);
    }
    else if (url == 'logar') {
        authController.logar(req, res);
    }    
    else {
        estaticoController.procurar(req, res);   
    }
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});