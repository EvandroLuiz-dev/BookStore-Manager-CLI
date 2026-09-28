import { AutorService } from "../services/autor-service";
import { Autor } from "../models/Autor";

export class AutorController {
    private autorService: AutorService;

    constructor(autorService: AutorService) {
        this.autorService = autorService;
    }

    async criarAutor(nome: string, pais: string): Promise<void> {
        await this.autorService.criarAutor(nome, pais);
    }

    async buscarAutorPorId(id: number): Promise<Autor | null> {
        return await this.autorService.buscarAutorPorId(id);
    }

    async atualizarAutor(id: number, nome: string, pais: string): Promise<void> {
        await this.autorService.atualizarAutor(id, nome, pais);
    }

    async deletarAutor(id: number): Promise<void> {
        await this.autorService.deletarAutor(id);
    }

    async listarAutores(): Promise<Autor[]> {
        return await this.autorService.listarAutores();
    }
}
