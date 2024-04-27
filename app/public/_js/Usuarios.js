export default {
    props: {
        usuarios: Array,
    },
    template: `
    <div>
        <h2>Lista de Usuários</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.id }}</td>
                    <td>{{ usuario.nome }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>
                        <button @click="editar(usuario.id)">Editar</button>
                        <button @click="apagar(usuario.id)">Apagar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `,
    methods: {
        editar(id) {
            const usuarioParaEditar = this.usuarios.find(usuario => usuario.id === id);
            if (usuarioParaEditar) {
                this.$emit('editarUsuario', usuarioParaEditar);
            } else {
                console.error('Usuário não encontrado para edição.');
            }
        },
        apagar(id) {
            const confirmacao = confirm('Tem certeza que deseja apagar este usuário?');
            if (confirmacao) {
                this.$emit('apagarUsuario', id);
            }
        }
    }
};
