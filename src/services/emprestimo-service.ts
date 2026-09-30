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
    await this.validarCliente(cliente_id);
    await this.validarLivro(livro_id);

    const livro = await this.livroRepository.findById(livro_id);

    const emprestimo = new Emprestimo(
        cliente_id,
        livro_id,
        new Date(),
        null
    );

    await this.emprestimoRepository.create(emprestimo);

    livro!.estoque -= 1;
    await this.livroRepository.update(livro!);
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

async buscarTodosEmprestimos(): Promise<Emprestimo[]> {
    return this.emprestimoRepository.findAll();
}

async buscarTodosEmprestimosDetalhado() {
    return await this.emprestimoRepository.findAllDetalhado();
}

async buscarEmprestimoPorId(id: number): Promise<Emprestimo | null> {
    if (id <= 0) {
            throw new Error("ID inválido.");
        }

        return await this.emprestimoRepository.findById(id);
}

async validarCliente(cliente_id: number): Promise<void> {
    const cliente = await this.clienteRepository.findById(cliente_id);

    if (!cliente) {
        throw new Error("Cliente não encontrado");
    }
}

async validarLivro(livro_id: number): Promise<void> {
    const livro = await this.livroRepository.findById(livro_id);

    if (!livro) {
        throw new Error("Livro não encontrado");
    }

    if (livro.estoque <= 0) {
        throw new Error("Livro indisponível para empréstimo");
    }
}

async atualizarEmprestimo(emprestimo: Emprestimo): Promise<void> {
    if (emprestimo.id === undefined) {
        throw new Error("Emprestimo não possui um ID válido.");
    }

    const emprestimoExistente =
        await this.emprestimoRepository.findById(emprestimo.id);

    if (!emprestimoExistente) {
        throw new Error("Empréstimo não encontrado");
    }

    await this.validarCliente(emprestimo.cliente_id);
    await this.validarLivro(emprestimo.livro_id);

    if (emprestimoExistente.livro_id !== emprestimo.livro_id) {
        const livroAntigo =
            await this.livroRepository.findById(emprestimoExistente.livro_id);

        if (!livroAntigo) {
            throw new Error("Livro antigo não encontrado");
        }

        livroAntigo.estoque += 1;
        await this.livroRepository.update(livroAntigo);

        const livroNovo =
            await this.livroRepository.findById(emprestimo.livro_id);

        if (!livroNovo) {
            throw new Error("Livro novo não encontrado");
        }

        livroNovo.estoque -= 1;
        await this.livroRepository.update(livroNovo);
    }

    const emprestimoAtualizado = new Emprestimo(
        emprestimo.cliente_id,
        emprestimo.livro_id,
        emprestimo.data_emprestimo,
        emprestimo.data_devolucao,
        emprestimo.id
    );

    await this.emprestimoRepository.update(emprestimoAtualizado);
}

}