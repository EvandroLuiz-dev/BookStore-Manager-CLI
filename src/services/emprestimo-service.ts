import { Emprestimo } from "../models/Emprestimo";
import { EmprestimoRepository } from "../repositories/emprestimo-repository";
import { LivroRepository } from "../repositories/livro-repository";
import { ClienteRepository } from "../repositories/cliente-repository";

export class EmprestimoService {
  private emprestimoRepository: EmprestimoRepository;
  private livroRepository: LivroRepository;
  private clienteRepository: ClienteRepository;

  constructor() {
    this.emprestimoRepository = new EmprestimoRepository();
    this.livroRepository = new LivroRepository();
    this.clienteRepository = new ClienteRepository();
  }

  async criarEmprestimo(cliente_id: number, livro_id: number): Promise<void> {
    const cliente = await this.clienteRepository.findById(cliente_id);
    if (!cliente) {
      throw new Error("Cliente não encontrado");
    }
    const livro = await this.livroRepository.findById(livro_id);
    if (!livro) {
      throw new Error("Livro não encontrado");
    }

    if (livro.estoque <= 0) {
      throw new Error("Livro indisponível para empréstimo");
    }

    const emprestimo = new Emprestimo(cliente_id, livro_id, new Date(), null);

    await this.emprestimoRepository.create(emprestimo);
    livro.estoque -= 1;
    await this.livroRepository.update(livro);
  }

  async devolverLivro(emprestimo_id:number): Promise<void> {
    const emprestimo = await this.emprestimoRepository.findById(emprestimo_id);
    if (!emprestimo) {
        throw new Error("Emprestimo não encontrado");
    }

    if(emprestimo.data_devolucao !== null){
        throw new Error('Este livro já foi devolvido');
    }

    const emprestimoAtualizado = new Emprestimo(
        emprestimo.cliente_id,
        emprestimo.livro_id,
        emprestimo.data_emprestimo, 
        new Date(), 
        emprestimo.id
    );

    await this.emprestimoRepository.update(emprestimoAtualizado);

    const livro = await this.livroRepository.findById(emprestimo.livro_id);
    if (!livro) {
      throw new Error("Livro não encontrado");
    }
    livro.estoque += 1;
    await this.livroRepository.update(livro)
}

}