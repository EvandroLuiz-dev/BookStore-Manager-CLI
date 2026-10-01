import {
  LivroDisponivel,
  LivroEmprestado,
  LivroPorAutor,
  QuantidadeEmprestimosPorLivro,
  ClienteComEmprestimoAtivo,
} from "../interfaces/relatorio-interface";
import { RelatorioRepository } from "../repositories/relatorios-repository";

export class RelatorioService {
  private relatorioRepository: RelatorioRepository;

  constructor() {
    this.relatorioRepository = new RelatorioRepository();
  }

  async listarLivrosDisponiveis(): Promise<LivroDisponivel[]> {
    return await this.relatorioRepository.livrosDisponiveis();
  }

  async listarLivrosEmprestados(): Promise<LivroEmprestado[]> {
    return await this.relatorioRepository.livrosEmprestados();
  }

  async listarLivrosPorAutor(): Promise<LivroPorAutor[]> {
    return await this.relatorioRepository.livrosPorAutor();
  }

  async listarQuantidadeEmprestimosPorLivro(): Promise<
    QuantidadeEmprestimosPorLivro[]
  > {
    return await this.relatorioRepository.quantidadeEmprestimosPorLivro();
  }

  async listarClientesComEmprestimosAtivos(): Promise<
    ClienteComEmprestimoAtivo[]
  > {
    return await this.relatorioRepository.clientesComEmprestimosAtivos();
  }
}
