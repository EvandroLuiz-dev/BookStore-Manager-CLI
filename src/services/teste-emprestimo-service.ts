import { EmprestimoService } from "./emprestimo-service";

const service = new EmprestimoService();

async function testar() {

    console.log("=== TESTE EMPRESTIMO SERVICE ===");

    // 1. Cliente inexistente
    try {
        console.log("\n👤 Testando cliente inexistente...");

        await service.criarEmprestimo(999, 5);

        console.log("❌ ERRO: deveria ter rejeitado o cliente inexistente");

    } catch (error) {
        console.log("✅", (error as Error).message);
    }


    // 2. Livro inexistente
    try {
        console.log("\n📚 Testando livro inexistente...");

        await service.criarEmprestimo(5, 999);

        console.log("❌ ERRO: deveria ter rejeitado o livro inexistente");

    } catch (error) {
        console.log("✅", (error as Error).message);
    }


    // 3. Livro sem estoque
    try {
        console.log("\n📦 Testando livro sem estoque...");

        // Livro 5 precisa estar com estoque 0 para este teste
        await service.criarEmprestimo(5, 5);

        console.log("❌ ERRO: deveria ter rejeitado o livro sem estoque");

    } catch (error) {
        console.log("✅", (error as Error).message);
    }


    // 4. Devolver empréstimo já devolvido
    try {
        console.log("\n🔄 Testando devolução duplicada...");

        // Troque 4 pelo ID de um empréstimo que já foi devolvido
        await service.devolverLivro(4);

        console.log("❌ ERRO: deveria ter rejeitado a devolução");

    } catch (error) {
        console.log("✅", (error as Error).message);
    }
}

testar();