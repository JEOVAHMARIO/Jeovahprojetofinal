export default {
    props: {
        lanches: Array,
    },
    setup(props, { emit }) {
        const lanches = Vue.ref(props.lanches || []);

        function emitirSelecionado(lanche) {
            //emit('selecionado', lanche);
            this.$router.push('/detalhes/' + lanche.id);
        }

        return {
            lanches,
            emitirSelecionado
        };
    },
    template: `
    <div class="lista-lanches">
        <h2>Lista de Lanches</h2>
        <div v-if="lanches.length > 0">
            <div v-for="lanche of lanches" :key="lanche.id" class="lanche-item">
                <span>{{ lanche.nome }}</span>
                <button @click="emitirSelecionado(lanche);" class="btn-selecionar">Selecionar</button>
            </div>
        </div>
        <div v-else>
            <p>Nenhum lanche disponível.</p>
        </div>
    </div>
    `,
};
