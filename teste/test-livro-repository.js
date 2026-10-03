"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const livro_repository_1 = require("./livro-repository");
const Livros_1 = require("../src/models/Livros");
const livroRepositoryInstance = new livro_repository_1.LivroRepository();
async function testFindAll() {
    // Teste do método findAll
    const livros = await livroRepositoryInstance.findAll();
    console.log("Todos os livros:", livros);
}
async function testCreate() {
    // Teste do método create
    const newLivro = new Livros_1.Livro("Desaparecido para sempre", "Arqueiro", 29.99, 10, 7);
    await livroRepositoryInstance.create(newLivro);
    console.log("Livro criado com sucesso!");
}
async function testFindById() {
    // Teste do método findById
    const livro = await livroRepositoryInstance.findById(2);
    console.log("Livro encontrado:", livro);
}
async function testUpdate() {
    // Teste do método update
    const livroToUpdate = new Livros_1.Livro("Desaparecido para sempre - Edição Especial", "Arqueiro", 39.99, 15, 7, 2);
    await livroRepositoryInstance.update(livroToUpdate);
    const updatedLivro = await livroRepositoryInstance.findById(2);
    console.log("Livro atualizado:", updatedLivro);
}
async function testDelete() {
    // Teste do método delete
    await livroRepositoryInstance.delete(2);
    const deletedLivro = await livroRepositoryInstance.findById(2);
    console.log("Livro deletado, resultado da busca:", deletedLivro);
}
async function testLivro() {
    // await testFindAll();
    // await testCreate();
    // await testFindById();
    // await testUpdate();
    await testDelete();
}
testLivro();
//# sourceMappingURL=test-livro-repository.js.map