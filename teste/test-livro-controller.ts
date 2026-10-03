import { LivroController } from '../src/controllers/livro-controller';
import { LivroService } from '../src/services/livro-service';
import { LivroRepository } from '../src/repositories/livro-repository';
import { AutorRepository } from '../src/repositories/autor-repository';

const livroRepository = new LivroRepository();
const autorRepository = new AutorRepository();
const livroService = new LivroService(livroRepository, autorRepository);
const livroController = new LivroController(livroService);

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