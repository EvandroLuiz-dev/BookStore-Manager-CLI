import { LivroRepository } from "../repositories/livro-repository";
import { AutorRepository } from "../repositories/AutorRepository";
import { LivroService } from "../services/livro-service";
import { AutorService } from "../services/autor-service";

import { AutorController } from "../controllers/autor-controller";
import { LivroController } from "../controllers/livro-controller";
import { perguntar, voltarAoMenu, fecharPerguntar } from "../utils/perguntar";

const livroRepository = new LivroRepository();
const autorRepository = new AutorRepository();
const livroService = new LivroService(livroRepository, autorRepository);
const autorService = new AutorService(autorRepository);
const livroController = new LivroController(livroService);
const autorController = new AutorController(autorService);

export async function MenuLivro(
  livroController: LivroController,
  autorController: AutorController,
): Promise<void> {
  while (true) {
    console.log("╔════════════════════════════════════════╗");
    console.log("║            BOOKSTORE MANAGER           ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║                LIVROS                  ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║  1  ➜  Cadastrar livro                 ║");
    console.log("║  2  ➜  Listar livros                   ║");
    console.log("║  3  ➜  Buscar livro por ID             ║");
    console.log("║  4  ➜  Atualizar livro                 ║");
    console.log("║  5  ➜  Remover livro                   ║");
    console.log("║  0  ➜  Voltar                          ║");
    console.log("╚════════════════════════════════════════╝");

    const opcao = await perguntar("\n👉 Escolha uma opção: ");

    switch (opcao) {
      case "1":
        try {
          const titulo = await perguntar("Digite o título do livro: ");
          const editora = await perguntar(
            "Digite a editora do livro (ou deixe em branco): ",
          );
          const editoraValue = editora.trim() === "" ? null : editora;
          const preco = await perguntar("Digite o preço do livro: ");
          const quantidade = await perguntar("Digite a quantidade do livro: ");
          const autores = await autorController.listarAutores();
          console.log("\n📚 LISTA DE AUTORES\n");
          autores.forEach((autor, index) => {
            console.log(`${index + 1} ➜ ${autor.nome}`);
          });
          let indiceAutor: number;
          while (true) {
            const opcaoAutor = await perguntar(
              "\nDigite o número do autor do livro: ",
            );
            indiceAutor = Number(opcaoAutor) - 1;
            if (indiceAutor >= 0 && indiceAutor < autores.length) {
              break;
            }
            console.log("Opção inválida. Tente novamente.");
          }
          const autorSelecionado = autores[indiceAutor]!;
          await livroController.criarLivro(
            titulo,
            editoraValue,
            parseFloat(preco),
            parseInt(quantidade),
            autorSelecionado.id!,
          );
          console.log("\n✅ Livro cadastrado com sucesso!");
          await voltarAoMenu();
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;
      case "2":
        try {
          const livros = await livroController.buscarTodosLivros();
          console.log("\n📚 LISTA DE LIVROS\n");

          for (const livro of livros) {
            console.log(
              `ID: ${livro.id}, Título: ${livro.titulo}, Editora: ${livro.editora}, Preço: ${livro.preco}, Quantidade: ${livro.estoque}, Autor ID: ${livro.autorId}`,
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
              "Digite o ID do livro (ou 0 para voltar ao menu): ",
            );

            if (Number(id) === 0) {
              break;
            }

            const livro = await livroController.buscarLivroPorId(Number(id));

            if (!livro) {
              console.log("Livro não encontrado. Tente novamente.");
              continue;
            }

            console.log(
              `ID: ${livro.id}, Título: ${livro.titulo}, Editora: ${livro.editora}, Preço: ${livro.preco}, Quantidade: ${livro.estoque}, Autor ID: ${livro.autorId}`,
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
          while (true) {
            const id = await perguntar(
              "Digite o ID do livro que deseja atualizar (ou 0 para voltar ao menu): ",
            );
            if (Number(id) === 0) {
              break;
            }
            const livro = await livroController.buscarLivroPorId(Number(id));
            if (!livro) {
              console.log("Livro não encontrado. Tente novamente.");
              continue;
            }
            const titulo = await perguntar("Digite o novo título do livro: ");
            const editora = await perguntar(
              "Digite a nova editora do livro (ou deixe em branco): ",
            );
            const editoraValue = editora.trim() === "" ? null : editora;
            const preco = await perguntar("Digite o novo preço do livro: ");
            const quantidade = await perguntar(
              "Digite a nova quantidade do livro: ",
            );
            const autores = await autorController.listarAutores();
            console.log("\n📚 LISTA DE AUTORES\n");
            autores.forEach((autor, index) => {
              console.log(`${index + 1} ➜ ${autor.nome}`);
            });

            let indiceAutor: number;
            while (true) {
              const opcaoAutor = await perguntar(
                "\nDigite o número do autor do livro: ",
              );
              indiceAutor = Number(opcaoAutor) - 1;
              if (indiceAutor >= 0 && indiceAutor < autores.length) {
                break;
              }
              console.log("Opção inválida. Tente novamente.");
            }
            const autorSelecionado = autores[indiceAutor]!;
            await livroController.atualizarLivro(
              Number(id),
              titulo,
              editoraValue,
              Number(preco),
              Number(quantidade),
              autorSelecionado.id!,
            );

            console.log("\n✅ Livro atualizado com sucesso!");
            await voltarAoMenu();

            break;
          }
        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;
      case "5":
        try {
          while (true) {
            const id = await perguntar(
              "Digite o ID do livro que deseja remover (ou 0 para voltar ao menu): ",
            );
            if (Number(id) === 0) {
              console.log("ID inválido. Tente novamente.");
              continue;
            }
            const livro = await livroController.buscarLivroPorId(Number(id));
            if (!livro) {
              console.log("Livro não encontrado. Tente novamente.");
              continue;
            }
            await livroController.deletarLivro(Number(id));
            console.log("\n✅ Livro removido com sucesso!");
            await voltarAoMenu();
            break;
          }
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

MenuLivro(livroController, autorController);
