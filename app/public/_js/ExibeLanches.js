export default {
    props: {
        lanches: Object
    },
    template: `
    <div class="row justify-content-center my-5">
        <article class="card text-center">
            <p>{{ lanche.nome }}</p>
            <p>{{ lanche.valor }}</p>
            <p>{{ lanche.quantidade }}</p>
        </article>
    </div>
    `
}
