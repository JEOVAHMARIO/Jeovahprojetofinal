export default {
    props: {
        lanches: Array,
    },
    setup(props) {
        const lanches = Vue.ref(props.lanches || []);

        return {
            lanches
        };
    },
    template: `
    <div class="cartas-container">
        <div v-for="(lanche, index) in lanches" :key="index" class="carta">
            <h3>{{ lanche.nome }}</h3>
            <p>Valor: {{ lanche.valor }}</p>
            <p>Quantidade: {{ lanche.quantidade }}</p>
            <button @click="emitirSelecionado(lanche);" class="btn-selecionar">Selecionar</button>
        </div>
    </div>
    `,
};
