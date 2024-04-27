export default {
    props: {
        usuarios: Object,
    },
    template: `
    <div>
        <h2>Detalhes do Usuário</h2>
        <p><strong>ID:</strong> {{ usuario.id }}</p>
        <p><strong>Nome:</strong> {{ usuario.nome }}</p>
        <p><strong>E-mail:</strong> {{ usuario.email }}</p>
    </div>
    `,
};
