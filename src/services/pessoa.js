const RepositorioExercicio= require("../repositories/pessoa.js")

const repositorio = new RepositorioExercicio()
class ServicoExercicio {

    async PegarUm(id, transacao){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }
      return repositorio.PegarUm(id, transacao)
    }

    async PegarTodos(){
      return repositorio.PegarTodos()
    }

    async Adicionar(pessoa, transacao){
      if(!pessoa) {
        throw new Error("Favor preencher o pessoa.")
      } else if(!pessoa.nome) {
        throw new Error("Favor preencher o nome.")
      } else if(!pessoa.email) {
        throw new Error("Favor preencher o email.")
      } else if(!pessoa.senha) {
        throw new Error("Favor preencher o senha.")
      }

      return repositorio.Adicionar(pessoa, transacao)
    }

    async Alterar(id, pessoa, transacao){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }

      await repositorio.Alterar(id, pessoa, transacao)

      return this.PegarUm(id, transacao)
    }

    async Deletar(id, transacao){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }

      return repositorio.Deletar(id, transacao)
    }

}
module.exports = ServicoExercicio