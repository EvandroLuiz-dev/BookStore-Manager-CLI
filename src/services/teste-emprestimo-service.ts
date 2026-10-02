import { EmprestimoService } from "./emprestimo-service";
import { Emprestimo } from "../models/Emprestimo";

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

        // Empréstimo 4 precisa estar devolvido
        await service.devolverLivro(4);

        console.log("❌ ERRO: deveria ter rejeitado a devolução");

    } catch (error) {
        console.log("✅", (error as Error).message);
    }


    // 5. Buscar todos os empréstimos
    try {
        console.log("\n📋 Testando busca de todos os empréstimos...");

        const emprestimos = await service.buscarTodosEmprestimos();

        console.log("✅ Empréstimos encontrados:", emprestimos);

    } catch (error) {
        console.log("❌", (error as Error).message);
    }


    // 6. Buscar empréstimo por ID
    try {
        console.log("\n🔎 Testando busca de empréstimo por ID...");

        const emprestimo = await service.buscarEmprestimoPorId(4);

        if (emprestimo) {
            console.log("✅ Empréstimo encontrado:", emprestimo);
        } else {
            console.log("❌ ERRO: empréstimo deveria ter sido encontrado");
        }

    } catch (error) {
        console.log("❌", (error as Error).message);
    }


    // 7. Buscar empréstimo com ID inválido
    try {
        console.log("\n⚠️ Testando ID inválido...");

        await service.buscarEmprestimoPorId(0);

        console.log("❌ ERRO: deveria ter rejeitado o ID inválido");

    } catch (error) {
        console.log("✅", (error as Error).message);
    }


    // 8. Atualizar empréstimo
    try {
        console.log("\n✏️ Testando atualização de empréstimo...");

        const emprestimo = await service.buscarEmprestimoPorId(4);

        if (!emprestimo) {
            console.log("❌ ERRO: empréstimo não encontrado para atualização");
            return;
        }

        const emprestimoAtualizado = new Emprestimo(
            emprestimo.cliente_id,
            emprestimo.livro_id,
            emprestimo.data_emprestimo,
            emprestimo.data_devolucao,
            emprestimo.id
        );

        await service.atualizarEmprestimo(emprestimoAtualizado);

        console.log("✅ Empréstimo atualizado com sucesso");

    } catch (error) {
        console.log("❌", (error as Error).message);
    }


    // 9. Atualizar empréstimo inexistente
    try {
        console.log("\n⚠️ Testando atualização de empréstimo inexistente...");

        const emprestimoInexistente = new Emprestimo(
            5,
            5,
            new Date(),
            null,
            999
        );

        await service.atualizarEmprestimo(emprestimoInexistente);

        console.log("❌ ERRO: deveria ter rejeitado o empréstimo inexistente");

    } catch (error) {
        console.log("✅", (error as Error).message);
    }
}

testar();