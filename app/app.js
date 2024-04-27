const express = require('express');
const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const mysql = require('mysql');
const bodyParser = require('body-parser');
const LanchesController = require('./controllers/LanchesControllers');
const AuthController = require('./controllers/AuthController');
const UsuariosController = require('./controllers/UsuariosControllers');
const LanchesMysqlDao = require('./lib/projeto/LanchesMysqlDao');
const UsuariosMysqlDao = require('./lib/projeto/UsuariosMysqlDao');
const LanchesStore = require('./lib/LanchesStore');
const InicialController = require('./controllers/InicialController');
const AutorController = require('./controllers/AutorController');
const AuthMiddleware = require('./lib/projeto/AuthMiddleware');
const AuthRoutes = require('./lib/projeto/AuthRoutes');

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/logar', AuthMiddleware);
app.use('/login', AuthRoutes);

let options = {
    secretOrKey: 'segredo',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};
passport.use(new Strategy(options, (payload, done) => {
    console.log('extract token info', payload);
    return done(null, payload, 'informações extras');
}));

app.use(passport.initialize());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'bd',
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE
});

let lanchesDao = new LanchesMysqlDao(pool);
let usuariosDao = new UsuariosMysqlDao(pool);

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.MARIADB_DATABASE,
    'root',
    process.env.MARIADB_PASSWORD,
    {
        host: 'bd',
        dialect: 'mysql'
    }
);

let lanchesStore = new LanchesStore();
let lanchesController = new LanchesController(lanchesStore);
let inicialController = new InicialController(lanchesStore);
let authController = new AuthController(usuariosDao);
let usuariosController = new UsuariosController(usuariosDao);
let autorController = new AutorController();

app.use('/', inicialController.getRouter());
app.use('/lanches', lanchesController.getRouter());
app.use('/login', authController.getRouter());
app.use('/usuarios', usuariosController.getRouter());

app.get('/admin', async (req, res) => {
    let lanches = await lanchesStore.listar();
    res.render('admin', { lanches });
});

app.get('/admin/deletar/:id', async (req, res) => {
    let id = parseInt(req.params.id);
    let mensagem = await lanchesStore.deletar(id);
    let lanches = await lanchesStore.listar();
    res.render('admin', { lanches, mensagem });
});

app.get('/index', async (req, res) => {
    let lanches = await lanchesStore.listar();
    res.render('index', { lanches });
});

app.get('/autor', async (req, res) => {
    autorController.autor(req, res);
});

app.get('/perfil', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ 'usuario': req.user });
});

app.use((req, res) => {
    res.status(404).send('Página não encontrada');
});

app.use((req, res) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado');
});

app.get('*', (req, res, next) => {
    res.status(404).send('Nao encontrado')
});

app.use(function (err, req, res, next) {
    console.error('registrando erro: ', err.stack)
    res.status(500).send('Erro no servidor: ' + err.message);
});

app.get('/cadastro', async (req, res) => {
    res.render('cadastro');
});

app.use((req, res, next) => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const requestInfo = `${currentDate} ${currentTime} - Rota: ${req.path}`;

    console.log(requestInfo);

    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
