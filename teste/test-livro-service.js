"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const livro_service_1 = require("./livro-service");
const livro_repository_1 = require("../src/repositories/livro-repository");
const autor_repository_1 = require("../src/repositories/autor-repository");
const livroRepository = new livro_repository_1.LivroRepository();
const autorRepository = new autor_repository_1.AutorRepository();
const livroService = new livro_service_1.LivroService(livroRepository, autorRepository);
async function testCriarLivro() {
    await livroService.criarLivro("Harry Potter e a Pedra Filosofal", "Rocco", 39.90, 10, 99);
    console.log("Livro criado com sucesso!");
}
async function testBuscarTodosLivros() {
    const livros = await livroService.buscarTodosLivros();
    console.log("Livros encontrados:", livros);
}
async function testBuscarLivroPorId() {
    const livro = await livroService.buscarLivroPorId(0);
    console.log("Livro encontrado:", livro);
}
async function testAtualizarLivro() {
    await livroService.atualizarLivro(999, "Harry Potter e a Câmara Secreta", "Rocco", 49.90, 15, 7);
    const livroAtualizado = await livroService.buscarLivroPorId(3);
    console.log("Livro atualizado:", livroAtualizado);
}
async function testDeletarLivro() {
    await livroService.deletarLivro(99);
    const livroDeletado = await livroService.buscarLivroPorId(3);
    console.log("Livro deletado:", livroDeletado);
}
testDeletarLivro();
// testAtualizarLivro();
// testCriarLivro();
// testBuscarTodosLivros();
// testBuscarLivroPorId();
//# sourceMappingURL=test-livro-service.js.map