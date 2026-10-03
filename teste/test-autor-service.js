"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const autor_repository_1 = require("../src/repositories/autor-repository");
const autor_service_1 = require("./autor-service");
const autorRepository = new autor_repository_1.AutorRepository();
const autorService = new autor_service_1.AutorService(autorRepository);
async function testCriarAutor() {
    await autorService.criarAutor("J.K. Rowling", "Reino Unido");
    console.log("Autor criado com sucesso!");
}
async function testBuscarAutorPorId() {
    const autor = await autorService.buscarAutorPorId(1);
    console.log(autor);
}
async function testAtualizarAutor() {
    await autorService.atualizarAutor(1, "Harlan Coben", "Estados Unidos");
    const autorAtualizado = await autorService.buscarAutorPorId(1);
    console.log(autorAtualizado);
}
async function testDeletarAutor() {
    await autorService.deletarAutor(3);
    const autorDeletado = await autorService.buscarAutorPorId(3);
    console.log(autorDeletado);
}
async function testCriarAutorSemNome() {
    try {
        await autorService.criarAutor("", "Brasil");
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
async function testCriarAutorDuplicado() {
    try {
        await autorService.criarAutor("J.K. Rowling", "Reino Unido");
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
async function testAtualizarAutorInexistente() {
    try {
        await autorService.atualizarAutor(9999, "Autor Teste", "Brasil");
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
async function testDeletarAutorInexistente() {
    try {
        await autorService.deletarAutor(9999);
    }
    catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
}
async function testServiceAutores() {
    // await testCriarAutor();
    // await testBuscarAutorPorId();
    // await testAtualizarAutor();
    // await testDeletarAutor();
    // await testCriarAutorSemNome();
    // await testCriarAutorDuplicado();
    // await testAtualizarAutorInexistente();
    await testDeletarAutorInexistente();
}
testServiceAutores();
//# sourceMappingURL=test-autor-service.js.map