import { LivroService } from "../services/livro-service";
import { Livro } from "../models/Livros";

export class LivroController {
    private livroService: LivroService;

    constructor(livroService: LivroService) {
        this.livroService = livroService;
    }

    async criarLivro(titulo: string, editora: string | null, preco: number, quantidade: number, autorId: number): Promise<void> {
        await this.livroService.criarLivro(titulo, editora, preco, quantidade, autorId);
    }

    async buscarTodosLivros(): Promise<Livro[]> {
        return await this.livroService.buscarTodosLivros();
    }

    async buscarLivroPorId(id: number): Promise<Livro | null> {
        return await this.livroService.buscarLivroPorId(id);
    }

    async atualizarLivro(id: number, titulo: string, editora: string | null, preco: number, quantidade: number, autorId: number): Promise<void> {
        await this.livroService.atualizarLivro(id, titulo, editora, preco, quantidade, autorId);
    }

    async deletarLivro(id: number): Promise<void> {
        await this.livroService.deletarLivro(id);
    }
}