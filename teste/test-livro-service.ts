import { LivroService } from './livro-service';
import { LivroRepository } from '../src/repositories/livro-repository';
import { AutorRepository } from '../src/repositories/autor-repository';

const livroRepository = new LivroRepository();
const autorRepository = new AutorRepository();
const livroService = new LivroService(livroRepository, autorRepository);

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