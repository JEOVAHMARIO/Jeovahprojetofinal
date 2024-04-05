function lanches() {
    
    let inputNome = document.querySelector('[name=nome]');
    let nome = inputNome.value;
    let inputValor = document.querySelector('[name=valor]');
    let valor = inputValor.value;
    let inputQuantidade = document.querySelector('[name=quantidade]');
    let quantidade = inputQuantidade.value;
    let inputId = document.querySelector('[name=id]');
    let id = parseInt(inputId.value);
    
    let lanche = {
        valor, nome, quantidade
    }

    if (id == 0) {
        inserir_(lanche);
    }
    else {
        editar(lanche, id);
    }
}
let traducoes = {
    'pt-BR': {
        'mensagem_senha_em_branco': 'A senha não pode ser em branco!',
        'mensagem_lanche_cadastrado': 'Lanche cadastrado com sucesso!',
        'mensagem_lanche_apagado': 'Lanche apagado com sucesso!'
    },
    'en': {
        'mensagem_senha_em_branco': 'Password cannot be empty!'
    }
}

async function inserir_() {
    let nome = document.querySelector('[name=nome]').value;
    let valor = document.querySelector('[name=valor]').value;
    let quantidade = document.querySelector('[name=quantidade]').value;
    let divResposta = document.querySelector('#resposta');
    let dados = new URLSearchParams({nome, valor, quantidade});
    console.log(dados);
    let resposta = await fetch('lanches', {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },   
        body: dados
    });
    if (resposta.status == 200) {
        divResposta.classList.add('correto');
        divResposta.classList.remove('incorreto');
    }
    else {
        divResposta.classList.add('incorreto');
        divResposta.classList.remove('correto');
    }
    let respostaJson = await resposta.json();
    let mensagem = respostaJson.mensagem;
    divResposta.innerText = traducoes['pt-BR'][mensagem];
}

async function listar() {

    let divLanches = document.querySelector('#lanches');
    divLanches.innerText = 'Carregando...'
    let resposta = await fetch('lanches');
    let lanches = await resposta.json();
    divLanches.innerHTML = '';
    for (let lanche of lanches) {
        let linha = document.createElement('tr');
        let colunaId = document.createElement('td');
        let colunaNome = document.createElement('td');
        let colunaValor = document.createElement('td');
        let colunaQuantidade = document.createElement('td');
        let colunaAcoes = document.createElement('td');
        let botaoEditar = document.createElement('button');
        let botaoApagar = document.createElement('button');
        colunaId.innerText = lanche.id;
        colunaNome.innerText = lanche.nome;
        colunaValor.innerText = lanche.valor;
        colunaQuantidade.innerText = lanche.quantidade;
           
        botaoEditar.innerText = 'Editar';
        botaoEditar.onclick = function () {
            formEditar(lanche.id);
        }
        botaoApagar.onclick = function () {
            apagar(lanche.id);
        }
        botaoApagar.innerText = 'Apagar';
        linha.appendChild(colunaId);
        linha.appendChild(colunaNome);
        linha.appendChild(colunaValor);
        linha.appendChild(colunaQuantidade);
        colunaAcoes.appendChild(botaoEditar);
        colunaAcoes.appendChild(botaoApagar);
        linha.appendChild(colunaAcoes);
        divLanches.appendChild(linha);
    }
}

async function formEditar(id) {
    let resposta = await fetch('lanche/' + id, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        }
    });
    let lanche = await resposta.json();
    console.log(lanche);
    let inputNome = document.querySelector('[name=nome]');
    inputNome.value = lanche.nome;
    let inputValor = document.querySelector('[name=valor]');
    inputValor.value = lanche.valor;
    let inputQuantidade = document.querySelector('[name=quantidade]');
    inputQuantidade.value = lanche.quantidade;
    let inputId = document.querySelector('[name=id]');
    inputId.value = lanche.id;
}

async function editar(lanche, id) {
    let divResposta = document.querySelector('#resposta');
    let dados = new URLSearchParams(lanche);
    let resposta = await fetch('lanches/' + id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },   
        body: dados
    });
    if (resposta.status == 200) {
        divResposta.classList.add('correto');
        divResposta.classList.remove('incorreto');
    }
    else {
        divResposta.classList.add('incorreto');
        divResposta.classList.remove('correto');
    }
    let respostaJson = await resposta.json();
    let mensagem = respostaJson.mensagem;
    divResposta.innerText = traducoes['pt-BR'][mensagem];
}

async function apagar(id) {
    let divResposta = document.querySelector('#resposta');
    if (confirm('Quer apagar o #' + id + '?')) {
        let resposta = await fetch('lanches/' + id, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        });
        let respostaJson = await resposta.json();
        let mensagem = respostaJson.mensagem;
        divResposta.innerText = traducoes['pt-BR'][mensagem];
        listar();
    }
}

