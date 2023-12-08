const Lanche = require("./Lanche")
const bcrypt = require('bcrypt')

class LanchesMysqlDao {
    constructor(pool) {
        this.pool = pool;
    }
    listar() {
        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM lanches`, function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                let lanches = linhas /*.map(linha => {
                    let { id, nome, lado } = linha;
                    return new Lanche(nome, lado, id);
                })*/
                resolve(lanches);
            });
        });
    }

    inserir(lanche) {
        this.validar(lanche);

        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO lanches (nome, valor, quantidade) VALUES (?, ?, ?);';
            console.log({sql}, lanche);
            this.pool.query(sql, [lanche.nome, lanche.valor, lanche.quantidade], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.insertId);
            });
        });
    }

    alterar(id, lanche) {
        this.validar(lanche);
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE lanches SET nome=?, valor=?, quantidade=? WHERE id=?;';
            this.pool.query(sql, [lanche.nome, lanche.valor, lanche.quantidade, id], function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.alterId);
            });
        });
    }

    visualizar (id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM lanches WHERE id=?;';
            this.pool.query(sql, id, function (error, linhas, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                let lanches = linhas.map(linha => {
                    let { id, nome, valor, quantidade } = linha;
                    return new Lanche(nome, valor, quantidade, id);
                })
                resolve(lanches[0]);
            });
        });
    }

    apagar(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM lanches WHERE id=?;';
            this.pool.query(sql, id, function (error, resultado, fields) {
                if (error) {
                    return reject('Erro: ' + error.message);
                }
                return resolve(resultado.deleteId);
            });
        });
    }

    validar(lanche) {
        if (lanche.nome == '') {
            throw new Error('mensagem_nome_em_branco');
        }
        if (lanche.valor == '') {
            throw new Error('mensagem_valor_em_branco');
        }
        if (lanche.quantidade == '') {
            throw new Error('mensagem_quantidade_em_branco');
        }
    }
    
}

module.exports = LanchesMysqlDao;