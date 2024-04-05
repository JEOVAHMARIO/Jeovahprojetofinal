const Lanche = require("./Lanche")
const bcrypt = require('bcrypt')

class LanchesDao {
    constructor() {
        this.lanches = [];
    }
    listar() {
        return this.lanches;
    }

    inserir(lanche) {
        this.validar(lanche);
        this.lanches.push(lanche);
    }

    alterar(id, lanche) {
        this.validar(lanche);
        this.lanches[id] = lanche;
    }

    apagar(id) {
        this.lanches.splice(id, 1);
    }

    validar(lanche) {
        if (lanche.nome == '') {
            throw new Error('mensagem_nome_em_branco');
        }
        if (lanche.lado < 0) {
            throw new Error('mensagem_valor_invalido');
        }
    }
    autenticar(nome, senha) {
        for (let lanche of this.listar()) {
            if (lanche.nome == nome && bcrypt.compareSync(senha, lanche.senha)) {
                return lanche;
            }
        }
        return null;
    }

}

module.exports = LanchesDao;