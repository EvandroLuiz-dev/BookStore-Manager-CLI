import { RelatorioController } from "../controllers/relatorios-controller";
import { perguntar, voltarAoMenu, fecharPerguntar } from "../utils/perguntar";

const relatorioController = new RelatorioController();

export async function MenuRelatorio(
  relatorioController: RelatorioController,
): Promise<void> {
  while (true) {
    console.log("╔════════════════════════════════════════╗");
    console.log("║            BOOKSTORE MANAGER           ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║              RELATÓRIOS                ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║  1  ➜  Livros disponíveis              ║");
    console.log("║  2  ➜  Livros emprestados              ║");
    console.log("║  3  ➜  Livros por autor                ║");
    console.log("║  4  ➜  Empréstimos por livro           ║");
    console.log("║  5  ➜  Clientes com empréstimos ativos ║");
    console.log("║  0  ➜  Voltar                          ║");
    console.log("╚════════════════════════════════════════╝");

    const opcao = await perguntar("\n👉 Escolha uma opção: ");
    switch (opcao) {
      case "1":
        try {
          const livros = await relatorioController.listarLivrosDisponiveis();

          if (livros.length === 0) {
            console.log("\n📚 Não há livros disponíveis no momento.");
          } else {
            console.log("\n📚 LIVROS DISPONÍVEIS\n");

            console.log(
              "ID".padEnd(4) +
                "TÍTULO".padEnd(27) +
                "AUTOR".padEnd(26) +
                "ESTOQUE",
            );

            console.log("-".repeat(64));

            livros.forEach((livro) => {
              console.log(
                String(livro.id).padEnd(4) +
                  livro.titulo.padEnd(27) +
                  livro.autor.padEnd(26) +
                  String(livro.estoque),
              );
            });
          }

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;
      case "2":
        try {
          const livros = await relatorioController.listarLivrosEmprestados();

          if (livros.length === 0) {
            console.log("\n📖 Não há livros emprestados no momento.");
          } else {
            console.log("\n📖 LIVROS EMPRESTADOS\n");

            console.log(
              "ID".padEnd(4) +
                "TÍTULO".padEnd(27) +
                "AUTOR".padEnd(26) +
                "CLIENTE".padEnd(25) +
                "DATA",
            );

            console.log("-".repeat(90));

            livros.forEach((livro) => {
              console.log(
                String(livro.id).padEnd(4) +
                  livro.titulo.padEnd(27) +
                  livro.autor.padEnd(26) +
                  livro.cliente.padEnd(25) +
                  livro.data_emprestimo.toLocaleDateString("pt-BR"),
              );
            });
          }

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;

      case "3":
    try {
        const livros = await relatorioController.listarLivrosPorAutor();

        console.log("\n✍️ LIVROS POR AUTOR\n");

        console.log(
            "AUTOR".padEnd(30) +
            "TÍTULO"
        );

        console.log("-".repeat(60));

        livros.forEach((livro) => {
            console.log(
                livro.autor.padEnd(30) +
                (livro.titulo ?? "Nenhum livro cadastrado")
            );
        });

        await voltarAoMenu();
    } catch (error) {
        console.log(error instanceof Error ? error.message : error);
    }
    break;
      case "4":
        try {
          const livros =
            await relatorioController.listarQuantidadeEmprestimosPorLivro();

          console.log("\n📊 EMPRÉSTIMOS POR LIVRO\n");

          console.log("ID".padEnd(4) + "TÍTULO".padEnd(35) + "EMPRÉSTIMOS");

          console.log("-".repeat(55));

          livros.forEach((livro) => {
            console.log(
              String(livro.id).padEnd(4) +
                livro.titulo.padEnd(35) +
                String(livro.total_emprestimos),
            );
          });

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;

      case "5":
        try {
          const clientes =
            await relatorioController.listarClientesComEmprestimosAtivos();

          if (clientes.length === 0) {
            console.log("\n👥 Não há clientes com empréstimos ativos.");
          } else {
            console.log("\n👥 CLIENTES COM EMPRÉSTIMOS ATIVOS\n");

            console.log(
              "ID".padEnd(4) + "NOME".padEnd(35) + "EMPRÉSTIMOS ATIVOS",
            );

            console.log("-".repeat(60));

            clientes.forEach((cliente) => {
              console.log(
                String(cliente.id).padEnd(4) +
                  cliente.nome.padEnd(35) +
                  String(cliente.emprestimos_ativos),
              );
            });
          }

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;

      case "0":
        console.log("Voltando...");
        fecharPerguntar();
        return;

      default:
        console.log("Opção inválida");
    }
  }
}

MenuRelatorio(relatorioController);
