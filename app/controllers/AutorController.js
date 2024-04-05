const utils = require("../lib/utils")

class AutorController {
    autor(req, res) {
        let autor = {
            nome: 'Jeovah',
            formacoes: [
                '- Técnico em Eletromecânica : EEEPEQ',
                '- Graduado em Tecnólogo de Logística: ESTÁCIO',
                '- Cursando Técnico em Informática para Internet: IFCE'
            ],
            experiencias: [
                '- EMPRESA: Haco Nordeste, CARGO: Auxiliar de eletricista, PÉRIODO: 11 meses de contrato',
                '- EMPRESA: Schneider Elétrica, CARGO: Auxiliar de eletrônica, PÉRIODO: 6 meses de contrato',
                '- EMPRESA: Parque Regional de Manutenção, CARGO: 3ºSgt - Aux Mnt, PÉRIODO: 5 anos e 9 meses de contrato'
            ]
        }

        utils.renderizarEjs(res, './views/autor.ejs', autor);
    }
}
module.exports = AutorController;