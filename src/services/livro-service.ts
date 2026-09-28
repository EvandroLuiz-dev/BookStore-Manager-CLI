import { LivroRepository } from '../repositories/livro-repository';
import { Livro } from '../models/Livros';
import { AutorRepository } from '../repositories/AutorRepository';

export class LivroService {
    private livroRepository: LivroRepository;
    private autorRepository: AutorRepository;

    constructor(livroRepository: LivroRepository, autorRepository: AutorRepository) {
        this.livroRepository = livroRepository;
        this.autorRepository = autorRepository;
    }

    async criarLivro(titulo: string, editora: string | null, preco: number, quantidade: number, autorId: number): Promise<void> {
        if (!titulo || preco <= 0 || quantidade < 0 || autorId <= 0) {
            throw new Error("Todos os campos são obrigatórios e devem ser válidos.");
        }

        const autorExistente = await this.autorRepository.findById(autorId);
        if (!autorExistente) {
            throw new Error("Autor não encontrado.");
        }
        const novoLivro = new Livro(titulo, editora, preco, quantidade, autorId);
        await this.livroRepository.create(novoLivro);
    }

    async buscarTodosLivros(): Promise<Livro[]> {
        return await this.livroRepository.findAll();
    }

    async buscarLivroPorId(id: number): Promise<Livro | null> {
        if (id <= 0) {
            throw new Error("ID inválido.");
        }
        return await this.livroRepository.findById(id);
    }

    async atualizarLivro(id: number, titulo: string, editora: string | null, preco: number, quantidade: number, autorId: number): Promise<void> {
        if (id <= 0 || !titulo || preco <= 0 || quantidade < 0 || autorId <= 0) {
            throw new Error("Todos os campos são obrigatórios e devem ser válidos.");
        }
        const livroExistente = await this.livroRepository.findById(id);
        if (!livroExistente) {
            throw new Error("Livro não encontrado.");
        }
        
        const autorExistente = await this.autorRepository.findById(autorId);
        if (!autorExistente) {
            throw new Error("Autor não encontrado.");
        }
        const livroAtualizado = new Livro(titulo, editora, preco, quantidade, autorId,id);
        await this.livroRepository.update(livroAtualizado);
    }

    async deletarLivro(id: number): Promise<void> {
        if (id <= 0) {
            throw new Error("ID inválido.");
        }

        const livroExistente = await this.livroRepository.findById(id);
        if (!livroExistente) {
            throw new Error("Livro não encontrado.");
        }
        await this.livroRepository.delete(id);
    }
}