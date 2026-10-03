"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const livro_controller_1 = require("../src/controllers/livro-controller");
const livro_service_1 = require("../src/services/livro-service");
const livro_repository_1 = require("../src/repositories/livro-repository");
const autor_repository_1 = require("../src/repositories/autor-repository");
const livroRepository = new livro_repository_1.LivroRepository();
const autorRepository = new autor_repository_1.AutorRepository();
const livroService = new livro_service_1.LivroService(livroRepository, autorRepository);
const livroController = new livro_controller_1.LivroController(livroService);
async function testCriarLivro() {
    await livroController.criarLivro("Harry Potter e a Pedra Filosofal", "Rocco", 39.90, 10, 7);
    console.log("Livro criado com sucesso!");
}
async function testBuscarTodosLivros() {
    const livros = await livroController.buscarTodosLivros();
    console.log("Livros encontrados:", livros);
}
async function testBuscarLivroPorId() {
    const livro = await livroController.buscarLivroPorId(0);
    console.log("Livro encontrado:", livro);
}
async function testAtualizarLivro() {
    await livroController.atualizarLivro(4, "Harry Potter e a Câmara Secreta", "Rocco", 49.90, 15, 7);
    const livroAtualizado = await livroController.buscarLivroPorId(4);
    console.log("Livro atualizado:", livroAtualizado);
}
async function testDeletarLivro() {
    await livroController.deletarLivro(4);
    const livroDeletado = await livroController.buscarLivroPorId(4);
    console.log("Livro deletado:", livroDeletado);
}
testDeletarLivro();
// testAtualizarLivro();
// testBuscarLivroPorId();
// testBuscarTodosLivros();
// testCriarLivro();
//# sourceMappingURL=test-livro-controller.js.map