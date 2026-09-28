import { ClienteService } from "../services/cliente-service";
import { Cliente } from "../models/Cliente";

export class ClienteController {
    private clienteService: ClienteService;

    constructor(clienteService: ClienteService) {
        this.clienteService = clienteService;
    }

    async criarCliente (nome: string, email: string, contato: string): Promise<void>{
        await this.clienteService.criarCliente(nome, email, contato);
    }

    async buscarClientePorId(id: number): Promise<Cliente | null> {
        return await this.clienteService.buscarPorId(id);
    }

    async atualizarCliente (id: number, nome: string, email:string, contato:string): Promise<void> {
        await this.clienteService.atualizarCliente(id, nome, email, contato);
    }

    async deletarCliente (id:number): Promise<void> {
        await this.clienteService.deletarCliente(id);
    }

    async listarClientes(): Promise<Cliente[]> {
        return await this.clienteService.buscarTodos();
    }
}