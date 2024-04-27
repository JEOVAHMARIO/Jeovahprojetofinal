export default {
    props: {
        usuarios: Object
    },
    template: `
    <div class="row justify-content-center my-5">
        <article class="card text-center">
            <p>{{ usuario.nome }}</p>
            <p>{{ usuario.email }}</p>
            <p>{{ usuario.tipo }}</p>
        </article>
    </div>
    `
}
