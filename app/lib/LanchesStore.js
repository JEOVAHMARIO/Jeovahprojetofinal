class LanchesStore {
    constructor() {
        this.lanches = [];
    }

    inserir(lanche) {
        this.validar(lanche);
        lanche.id = this.lanches.length > 0 ? this.lanches[this.lanches.length - 1].id + 1 : 1;
        this.lanches.push(lanche);
        return lanche.id;
    }

    listar() {
        return this.lanches;
    }

    procurarPorId(id) {
        return this.lanches.find(lanche => lanche.id === id);
    }

    deletar(id) {
        this.lanches = this.lanches.filter(lanche => lanche.id !== id);
        return 'Lanche apagado com sucesso!';
    }

    validar(lanche) {
        if (!lanche.nome.trim()) {
            throw new Error('O nome do lanche não pode estar em branco.');
        }
    }
}

module.exports = LanchesStore;
