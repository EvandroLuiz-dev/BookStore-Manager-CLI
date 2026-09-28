import readline from "readline";
import { AutorRepository } from "../repositories/AutorRepository";
import { AutorService } from "../services/autor-service";
import { AutorController } from "../controllers/autor-controller";

const autorRepository = new AutorRepository();
const autorService = new AutorService(autorRepository);
const autorController = new AutorController(autorService);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function perguntar(texto: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(texto, (resposta) => {
      resolve(resposta);
    });
  });
}

async function voltarAoMenu(): Promise<void> {
  await perguntar("\nPressione ENTER para voltar ao menu...");
}

async function menuAutores(autorController: AutorController) {
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
          const id = await perguntar("Digite o ID do autor: ");
          const autor = await autorController.buscarAutorPorId(Number(id));
          if (!autor) {
            console.log("Autor não encontrado.");
            break;
          }
          console.log(
            `ID: ${autor.id}, Nome: ${autor.nome}, País: ${autor.pais}`,
          );

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;
      case "4":
        try {
          const id = await perguntar("Digite o ID do autor: ");
          const nome = await perguntar("Digite o novo nome do autor: ");
          const pais = await perguntar("Digite o novo país do autor: ");
          await autorController.atualizarAutor(Number(id), nome, pais);
          console.log("Autor atualizado com sucesso!");

          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;
      case "5":
        try {
          const id = await perguntar("Digite o ID do autor: ");
          await autorController.deletarAutor(Number(id));
          console.log("Autor removido com sucesso!");
          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;
      case "0":
        console.log("Voltando...");
        rl.close();
        return;
      default:
        console.log("Opção inválida");
    }
  }
}

menuAutores(autorController);
