import { EmprestimoService } from "../services/emprestimo-service";
import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoController {
  private emprestimoService: EmprestimoService;

  constructor(emprestimoService: EmprestimoService) {
    this.emprestimoService = emprestimoService;
  }

  async criarEmprestimo(cliente_id: number, livro_id: number): Promise<void> {
    await this.emprestimoService.criarEmprestimo(cliente_id, livro_id);
  }

  async listarEmprestimos(): Promise<Emprestimo[]> {
    return await this.emprestimoService.buscarTodosEmprestimos();
  }

  async listarEmprestimosDetalhado() {
    return await this.emprestimoService.buscarTodosEmprestimosDetalhado();
  }

  async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
    return await this.emprestimoService.buscarEmprestimoPorId(id);
  }

  async atualizarEmprestimo(emprestimo: Emprestimo): Promise<void> {
    await this.emprestimoService.atualizarEmprestimo(emprestimo);
  }

  async devolverLivro(emprestimo_id: number): Promise<void> {
    await this.emprestimoService.devolverLivro(emprestimo_id);
  }

  async validarCliente(cliente_id: number): Promise<void> {
    await this.emprestimoService.validarCliente(cliente_id);
  }

  async validarLivro(livro_id: number): Promise<void> {
    await this.emprestimoService.validarLivro(livro_id);
  }
}
