import { RelatorioRepository } from "./relatorios-repository";

const repository = new RelatorioRepository();

async function testar() {
    console.log("📚 Livros disponíveis:");
    console.log(await repository.livrosDisponiveis());

    console.log("📖 Livros emprestados:");
    console.log(await repository.livrosEmprestados());

    console.log("✍️ Livros por autor:");
    console.log(await repository.livrosPorAutor());

    console.log("📊 Empréstimos por livro:");
    console.log(await repository.quantidadeEmprestimosPorLivro());

    console.log("👥 Clientes com empréstimos ativos:");
    console.log(await repository.clientesComEmprestimosAtivos());
}

testar();