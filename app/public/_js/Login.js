export default {
    setup() {
        const email = Vue.ref('');
        const senha = Vue.ref('');

        function login() {
            const credenciais = {
                email: email.value,
                senha: senha.value
            };
            console.log('Credenciais de login:', credenciais);
        }

        return {
            email,
            senha,
            login
        };
    },

    template: `
    <section id="login">
        <form @submit.prevent="login">
            <br><br>
            <h2>Login</h2><br>
            <label for="email">E-mail:</label><br>
            <input type="email" id="email" name="email" v-model="email"><br>
            <label for="senha">Senha:</label><br>
            <input type="password" id="senha" name="senha" v-model="senha"><br><br>
            <button type="submit" class="button button2">Entrar</button>
        </form>
    </section>
    `
}
