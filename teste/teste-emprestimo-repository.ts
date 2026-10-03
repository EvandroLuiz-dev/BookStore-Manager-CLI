import { Emprestimo } from "../src/models/Emprestimo";
import { EmprestimoRepository } from "./emprestimo-repository";

const repository = new EmprestimoRepository();

async function testar() {
    try {
        console.log("=== TESTE EMPRESTIMO REPOSITORY ===");

        // 1. Criar empréstimo
        const novoEmprestimo = new Emprestimo(
            5,          // cliente_id
            5,          // livro_id
            new Date(), // data_emprestimo
            null        // data_devolucao
        );

        await repository.create(novoEmprestimo);

        console.log("✅ Empréstimo criado com sucesso!");

        // 2. Listar empréstimos
        const emprestimos = await repository.findAll();

        console.log("\n📚 Empréstimos cadastrados:");
        console.log(emprestimos);

        // 3. Buscar empréstimo por ID
        const primeiroEmprestimo = emprestimos[0];

        if (primeiroEmprestimo && primeiroEmprestimo.id !== undefined) {
            const id = primeiroEmprestimo.id;

            const emprestimoEncontrado = await repository.findById(id);

            console.log("\n🔎 Empréstimo encontrado:");
            console.log(emprestimoEncontrado);

            // 4. Atualizar empréstimo
            if (emprestimoEncontrado) {
                const emprestimoAtualizado = new Emprestimo(
                    emprestimoEncontrado.cliente_id,
                    emprestimoEncontrado.livro_id,
                    emprestimoEncontrado.data_emprestimo,
                    new Date(),
                    emprestimoEncontrado.id
                );

                await repository.update(emprestimoAtualizado);

                console.log("\n✅ Empréstimo atualizado com sucesso!");

                // 5. Buscar novamente para confirmar atualização
                const atualizado = await repository.findById(id);

                console.log("\n📋 Empréstimo após atualização:");
                console.log(atualizado);
            }
        } else {
            console.log("⚠️ Nenhum empréstimo encontrado para testar.");
        }

    } catch (error) {
        console.error("❌ Erro no teste:", error);
    }
}

testar();