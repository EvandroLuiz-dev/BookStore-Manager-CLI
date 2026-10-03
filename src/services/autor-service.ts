import { AutorRepository } from "../repositories/autor-repository";
import { Autor } from "../models/Autor";


 export class AutorService {
    private autorRepository: AutorRepository;

    constructor(autorRepository: AutorRepository) {
        this.autorRepository = autorRepository;
    }

    async criarAutor(nome: string, pais: string): Promise<void> {
    
    if (!nome) {
        throw new Error("Nome do autor é obrigatório.");
    }

    const autorExistente = await this.autorRepository.findByName(nome);

    if (autorExistente) {
        throw new Error("Autor já existe.");
    }

    await this.autorRepository.create(new Autor(nome, pais));

    }

    async buscarAutorPorId(id: number): Promise<Autor | null> {
        return await this.autorRepository.findById(id);
    }

    async atualizarAutor(id: number, nome: string, pais: string): Promise<void> { 
        const autorExistente = await this.autorRepository.findById(id);
        if (!autorExistente) {
            throw new Error("Autor não encontrado.");
        }
        await this.autorRepository.update(new Autor(nome, pais, id)); 
    }
    
    async deletarAutor(id: number): Promise<void> {
        const autorExistente = await this.autorRepository.findById(id);
        if (!autorExistente) {
            throw new Error("Autor não encontrado.");
        }
        await this.autorRepository.delete(id);
    }

    async listarAutores(): Promise<Autor[]> {
        return await this.autorRepository.findAll();
    }
}