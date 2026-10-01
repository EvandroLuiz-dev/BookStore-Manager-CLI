import {
  LivroDisponivel,
  LivroEmprestado,
  LivroPorAutor,
  QuantidadeEmprestimosPorLivro,
  ClienteComEmprestimoAtivo,
} from "../interfaces/relatorio-interface";
import { RelatorioService } from "../services/relatorios-service";

export class RelatorioController {
  private relatorioService: RelatorioService;

  constructor() {
    this.relatorioService = new RelatorioService();
  }

  async listarLivrosDisponiveis(): Promise<LivroDisponivel[]> {
    return await this.relatorioService.listarLivrosDisponiveis();
  }

  async listarLivrosEmprestados(): Promise<LivroEmprestado[]> {
    return await this.relatorioService.listarLivrosEmprestados();
  }

  async listarLivrosPorAutor(): Promise<LivroPorAutor[]> {
    return await this.relatorioService.listarLivrosPorAutor();
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<
    QuantidadeEmprestimosPorLivro[]
  > {
    return await this.relatorioService.listarQuantidadeEmprestimosPorLivro();
  }

  async listarClientesComEmprestimosAtivos(): Promise<
    ClienteComEmprestimoAtivo[]
  > {
    return await this.relatorioService.listarClientesComEmprestimosAtivos();
  }
}
