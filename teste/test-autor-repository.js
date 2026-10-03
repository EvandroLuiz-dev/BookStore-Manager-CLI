"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autor_repository_1 = require("./autor-repository");
const Autor_1 = require("../src/models/Autor");
const autorRepository = new autor_repository_1.AutorRepository();
async function testFindAll() {
    const result = await autorRepository.findAll();
    console.log(result);
}
const newAutor = new Autor_1.Autor("J.K. Rowling", "Reino Unido");
async function testCreate() {
    await autorRepository.create(newAutor);
    console.log("Autor criado com sucesso!");
}
async function testFindById() {
    const autor = await autorRepository.findById(1);
    console.log(autor);
}
async function testUpdate() {
    const autorToUpdate = new Autor_1.Autor("J.K. Rowling", "Inglaterra", 1);
    await autorRepository.update(autorToUpdate);
    const autorAtualizado = await autorRepository.findById(1);
    console.log("Autor atualizado com sucesso!");
    console.log(autorAtualizado);
}
async function testDelete() {
    await autorRepository.delete(3);
    const autorDeletado = await autorRepository.findById(3);
    console.log(autorDeletado);
    console.log("Autor deletado com sucesso!");
}
async function testAutores() {
    await testCreate();
    await testFindAll();
    await testFindById();
    await testUpdate();
    await testDelete();
}
testAutores();
//# sourceMappingURL=test-autor-repository.js.map