export default {
    props: {
        lanches: Array,
    },
    setup(props, { emit }) {
        const nome = Vue.ref('');
        const valor = Vue.ref('');
        const quantidade = Vue.ref('');
        const lanches = Vue.ref(props.lanches || []);

        function inserir() {
            lanches.value.push({ id: lanches.value.length + 1, nome: nome.value, valor: valor.value, quantidade: quantidade.value });
            nome.value = '';
            valor.value = '';
            quantidade.value = '';
        }

        function editar(id) {
            const lancheIndex = lanches.value.findIndex(lanche => lanche.id === id);
            if (lancheIndex !== -1) {
                const editedLanche = { ...lanches.value[lancheIndex], nome: nome.value, valor: valor.value, quantidade: quantidade.value };
                Vue.set(lanches.value, lancheIndex, editedLanche);
                console.log('Lanche editado com sucesso:', editedLanche);
            } else {
                console.error('Lanche não encontrado para edição.');
            }
        }
        
        function apagar(id) {
            const confirmacao = confirm('Tem certeza que deseja apagar este lanche?');
            if (confirmacao) {
                const lancheIndex = lanches.value.findIndex(lanche => lanche.id === id);
                if (lancheIndex !== -1) {
                    lanches.value.splice(lancheIndex, 1);
                    console.log('Lanche apagado com sucesso.');
                } else {
                    console.error('Lanche não encontrado para apagar.');
                }
            }
        }

        function selecionar(lanche) {
            emit('selecionado', lanche);
        }

        return {
            nome,
            valor,
            quantidade,
            lanches,
            inserir,
            editar,
            apagar,
            selecionar
        };
    },

    template: `
    <section id="resposta">
        <form method="post" @submit.prevent="inserir">
            <br><br>
            <h2>Cardápio</h2><br>
            <input name="id" type="hidden" value="0">
            <label for="nome">Nome:</label><br>
            <input type="text" id="nome" name="nome" v-model="nome"><br>
            <label for="valor">Valor:</label><br>
            <input type="number" id="valor" name="valor" v-model="valor"><br>
            <label for="quantidade">Quantidade:</label><br>
            <input type="number" id="quantidade" name="quantidade" v-model="quantidade"><br><br>
            <button type="submit" class="button button2">Registrar</button>
        </form>
    </section>

    <table>
        <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Ações</th>
        </tr>
        <tbody id="lanches">
            <tr v-for="(lanche, index) in lanches" :key="index">
                <td>{{ lanche.id }}</td>
                <td>{{ lanche.nome }}</td>
                <td>{{ lanche.valor }}</td>
                <td>{{ lanche.quantidade }}</td>
                <td>
                    <button @click="editar(lanche.id);">Editar</button>
                    <button @click="apagar(lanche.id);">Apagar</button>
                    <button @click="selecionar(lanche);">Selecionar</button>
                </td>
            </tr>
        </tbody>
    </table>
    `
}
