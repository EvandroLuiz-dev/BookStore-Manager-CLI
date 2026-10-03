"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relatorios_repository_1 = require("./relatorios-repository");
const repository = new relatorios_repository_1.RelatorioRepository();
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
//# sourceMappingURL=test-relatorios-repository.js.map