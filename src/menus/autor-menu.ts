import { AutorController } from "../controllers/autor-controller";
import { perguntar, voltarAoMenu } from "../utils/perguntar";

export async function menuAutores(
  autorController: AutorController,
): Promise<void> {
  while (true) {
    console.log("╔════════════════════════════════════════╗");
    console.log("║            BOOKSTORE MANAGER           ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║                AUTORES                 ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║  1  ➜  Cadastrar autor                 ║");
    console.log("║  2  ➜  Listar autores                  ║");
    console.log("║  3  ➜  Buscar autor por ID             ║");
    console.log("║  4  ➜  Atualizar autor                 ║");
    console.log("║  5  ➜  Remover autor                   ║");
    console.log("║  0  ➜  Voltar                          ║");
    console.log("╚════════════════════════════════════════╝");

    const opcao = await perguntar("\n👉 Escolha uma opção: ");

    switch (opcao) {
      case "1":
        try {
          const nome = await perguntar("Digite o nome do autor: ");
          const pais = await perguntar("Digite o país do autor: ");

          await autorController.criarAutor(nome, pais);

          console.log("Autor cadastrado com sucesso!");

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
          await voltarAoMenu();
        }
        break;

      case "2":
        try {
          const autores = await autorController.listarAutores();

          console.log("\n📚 LISTA DE AUTORES\n");

          for (const autor of autores) {
            console.log(
              `ID: ${autor.id}, Nome: ${autor.nome}, País: ${autor.pais}`,
            );
          }

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;

      case "3":
        try {
          while (true) {
            const id = await perguntar(
              "Digite o ID do autor (ou 0 para voltar ao menu): ",
            );

            if (id === "0") {
              break;
            }

            const autor = await autorController.buscarAutorPorId(Number(id));

            if (!autor) {
              console.log("Autor não encontrado. Tente novamente.\n");
              continue;
            }

            console.log(
              `ID: ${autor.id}, Nome: ${autor.nome}, País: ${autor.pais}`,
            );

            await voltarAoMenu();
            break;
          }
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;

      case "4":
        try {
          const id = await perguntar(
            "Digite o ID do autor (ou 0 para voltar ao menu): ",
          );

          if (id === "0") {
            break;
          }

          const autor = await autorController.buscarAutorPorId(Number(id));

          if (!autor) {
            console.log("Autor não encontrado.");
            await voltarAoMenu();
            break;
          }

          const nome = await perguntar("Digite o novo nome do autor: ");
          const pais = await perguntar("Digite o novo país do autor: ");

          await autorController.atualizarAutor(Number(id), nome, pais);

          console.log("Autor atualizado com sucesso!");

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
          await voltarAoMenu();
        }
        break;

      case "5":
        try {
          const id = await perguntar(
            "Digite o ID do autor (ou 0 para voltar ao menu): ",
          );

          if (id === "0") {
            break;
          }

          await autorController.deletarAutor(Number(id));

          console.log("Autor removido com sucesso!");

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
          await voltarAoMenu();
        }
        break;

      case "0":
        console.log("Voltando...");
        return;

      default:
        console.log("Opção inválida");
        await voltarAoMenu();
        break;
    }
  }
}
