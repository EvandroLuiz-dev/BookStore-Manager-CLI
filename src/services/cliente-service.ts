import { Cliente } from "../models/Cliente";
import { ClienteRepository } from "../repositories/cliente-repository";

export class ClienteService {
    private clienteRepository: ClienteRepository;

    constructor(clienteRepository: ClienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async buscarTodos(): Promise<Cliente[]> {
        return await this.clienteRepository.findAll();
    }

    async buscarPorId(id: number): Promise<Cliente | null>{
       if (id <= 0) {
            throw new Error("ID inválido.");
        }
        return await this.clienteRepository.findById(id);
    }

    async criarCliente(nome: string, email: string, contato: string | null): Promise<void> {
        if (!nome || !email ) {
            throw new Error("Nome e Email são obrigatórios.");
        }

        const cliente = new Cliente(nome, email, contato);
        await this.clienteRepository.create(cliente);
    }

    async atualizarCliente(id:number, nome: string, email: string, contato: string | null): Promise<void> {
        if (id <= 0) {
            throw new Error("ID inválido.");
        }

        if (!nome || !email) {
            throw new Error("Nome e Email são obrigatórios.");
        }

        const clienteExiste = await this.clienteRepository.findById(id);
        if (!clienteExiste) {
            throw new Error ("Cliente não encontrado.");
        }
        const cliente = new Cliente(nome, email, contato, id);
        await this.clienteRepository.update( cliente);
    }
          
    async deletarCliente(id: number): Promise<void> {

    if (id <= 0) {
        throw new Error("ID inválido.");
    }

    const clienteExiste = await this.clienteRepository.findById(id);

    if (!clienteExiste) {
        throw new Error("Cliente não encontrado.");
    }

    await this.clienteRepository.delete(id);
}
}


