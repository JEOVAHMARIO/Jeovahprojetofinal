export default {
    props: {
        lanches: Array,
    },
    setup(props, { emit }) {
        const route = VueRouter.useRoute();
        let id = route.params.id;
        const lanche = props.lanches.value.filter(e => { return e.id == id; })[0];
        return {
            lanche
        }
    },
    template: `
    <h2>Detalhes do Lanche</h2>
    <h3><p> id: {{ lanche.id }} </p></h3>
        <p>Nome: {{ lanche.nome }}</p>
        <p>Valor: {{ lanche.valor }}</p>
        <p>Quantidade: {{ lanche.quantidade }}</p>
    `
}