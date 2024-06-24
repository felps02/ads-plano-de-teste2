const Pessoa = require('../models/pessoa.js');

class RepositorioExercicio {

    async PegarUm(id, transacao){
        return Pessoa.findOne({
            where: {
                id
            },
            transacao
        })
    }

    async PegarTodos(){
        return Pessoa.findAll()
    }

    async Adicionar(pessoa, transacao){
        return Pessoa.create({ ...pessoa}, {transacao})
    }

    async Alterar(id, pessoa, transacao){
        return Pessoa.update(pessoa, {
            where: {
                id
            },
            transacao
        })
    }

    async Deletar(id, transacao){
        return Pessoa.destroy({
            where: {
                id
            },
            transacao
        })
    }
}
module.exports = RepositorioExercicio