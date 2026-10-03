import { EmprestimoController } from "./emprestimo-controller";
import { EmprestimoService } from "../src/services/emprestimo-service";
import { Emprestimo } from "../src/models/Emprestimo";

const service = new EmprestimoService();
const controller = new EmprestimoController(service);

async function testar() {

    console.log("=== TESTE EMPRESTIMO CONTROLLER ===");


    // 1. Criar empréstimo
    try {
        console.log("\n📚 Testando criação de empréstimo...");

        await controller.criarEmprestimo(5, 5);

        console.log("✅ Empréstimo criado com sucesso");

    } catch (error) {
        console.log("❌", (error as Error).message);
    }


    // 2. Listar empréstimos
    try {
        console.log("\n📋 Testando listagem de empréstimos...");

        const emprestimos = await controller.listarEmprestimos();

        console.log("✅ Empréstimos encontrados:", emprestimos);

    } catch (error) {
        console.log("❌", (error as Error).message);
    }


    // 3. Buscar empréstimo por ID
    try {
        console.log("\n🔎 Testando busca por ID...");

        const emprestimo = await controller.buscarEmprestimoPorId(4);

        if (emprestimo) {
            console.log("✅ Empréstimo encontrado:", emprestimo);
        } else {
            console.log("❌ Empréstimo não encontrado");
        }

    } catch (error) {
        console.log("❌", (error as Error).message);
    }


    // 4. Atualizar empréstimo
    try {
        console.log("\n✏️ Testando atualização de empréstimo...");

        const emprestimo = await controller.buscarEmprestimoPorId(4);

        if (!emprestimo) {
            console.log("❌ Empréstimo não encontrado para atualização");
        } else {

            const emprestimoAtualizado = new Emprestimo(
                emprestimo.cliente_id,
                emprestimo.livro_id,
                emprestimo.data_emprestimo,
                emprestimo.data_devolucao,
                emprestimo.id
            );

            await controller.atualizarEmprestimo(emprestimoAtualizado);

            console.log("✅ Empréstimo atualizado com sucesso");
        }

    } catch (error) {
        console.log("❌", (error as Error).message);
    }


    // 5. Devolver livro
    try {
        console.log("\n🔄 Testando devolução de livro...");

        const emprestimos = await controller.listarEmprestimos();

        const emprestimoAtivo = emprestimos.find(
            emprestimo => emprestimo.data_devolucao === null
        );

        if (!emprestimoAtivo || emprestimoAtivo.id === undefined) {
            console.log("❌ Nenhum empréstimo ativo encontrado");
        } else {

            await controller.devolverLivro(emprestimoAtivo.id);

            console.log("✅ Livro devolvido com sucesso");
        }

    } catch (error) {
        console.log("❌", (error as Error).message);
    }
}

testar();