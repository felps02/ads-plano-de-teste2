const { describe, expect, it, beforeAll, afterAll, beforeEach } = require('@jest/globals');
const conexao = require("../src/database")
const ServicoExercicio = require("../src/services/pessoa");

describe('Testes da Entidade Pessoa', () => {
   let servico;
   let transacao;
   const mockPessoa = { nome: "PessoaTeste", email: "teste@gmail.com", senha: "2558" };

   beforeAll(async () => {
      servico = new ServicoExercicio();
      console.info('Iniciando TDD com jest!');
   });

   beforeEach(async () => {
      transacao = await conexao.transacao();
   });

   afterAll(async () => {
      console.info('Encerrados os testes');
   });

   afterEach(async () => {
      await transacao.rollback();
   });

   it('Irá pegar uma pessoa por id', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transacao);
      const id = pessoa[pessoa.dataValues.id]
      const dataValues = await servico.PegarUm(id, transacao)
      expect(mockPessoa.nome).toBe(pessoa.dataValues.nome);
      expect(mockPessoa.email).toBe(pessoa.dataValues.email);
      expect(mockPessoa.senha).toBe(pessoa.dataValues.senha);

   });

   it('Irá adicionar uma pessoa', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transacao);
      console.log(pessoa[pessoa.dataValues.id]) // ou (pessoa.null)
      expect(mockPessoa.nome).toBe(pessoa.dataValues.nome);
      expect(mockPessoa.email).toBe(pessoa.dataValues.email);
      expect(mockPessoa.senha).toBe(pessoa.dataValues.senha);

   });

   it('Irá atualizar informações de uma pessoa', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transacao)
      const id = pessoa.null; // ou pessoa[pessoa.dataValues.id]
      const mockPessoaUpdate = {nome: "PessoaTesteAtualizada", email: "atualizado@gmail.com", senha: "2558Atualizada" };

      const dataValue = await servico.Alterar(id, mockPessoaUpdate, transacao);

      expect(id).toBe(dataValue.dataValues.id);
      expect(mockPessoaUpdate.nome).toBe(dataValue.dataValues.nome);
      expect(mockPessoaUpdate.email).toBe(dataValue.dataValues.email);
      expect(mockPessoaUpdate.senha).toBe(dataValue.dataValues.senha);
   });

   it('Irá deletar uma pessoa', async () => {
      const pessoa = await servico.Adicionar(mockPessoa, transacao)
      const id = pessoa.null; // ou pessoa[pessoa.dataValues.id]

      const qtdeBefore = await Number(servico.PegarTodos().length); // 2
      const dataValue = await servico.Deletar(id, transacao);

      const qtdeAfter = await Number(servico.PegarTodos().length); // 1

      expect(dataValue).toBe(1);
      expect(qtdeAfter + 1).toBe(qtdeBefore);
   });
});