import { EmprestimoController } from "../controllers/emprestimo-controller";
import { perguntar, voltarAoMenu } from "../utils/perguntar";
import { Emprestimo } from "../models/Emprestimo";

export async function MenuEmprestimo(
  emprestimoController: EmprestimoController,
): Promise<void> {
  while (true) {
    console.log("╔════════════════════════════════════════╗");
    console.log("║            BOOKSTORE MANAGER           ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║             EMPRÉSTIMOS                ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║  1  ➜  Cadastrar empréstimo            ║");
    console.log("║  2  ➜  Listar empréstimos              ║");
    console.log("║  3  ➜  Buscar empréstimo por ID        ║");
    console.log("║  4  ➜  Atualizar empréstimo            ║");
    console.log("║  5  ➜  Devolver livro                  ║");
    console.log("║  0  ➜  Voltar                          ║");
    console.log("╚════════════════════════════════════════╝");

    const opcao = await perguntar("\n👉 Escolha uma opção: ");

    switch (opcao) {

      case "1":
        try {
          let cliente_id: number;

          // CLIENTE
          while (true) {
            const id = await perguntar(
              "Digite o ID do cliente (ou 0 para voltar ao menu): "
            );

            if (Number(id) === 0) {
              break;
            }

            try {
              await emprestimoController.validarCliente(Number(id));
              cliente_id = Number(id);
              break;
            } catch (error) {
              console.log(
                error instanceof Error ? error.message : error
              );
            }
          }

          if (!cliente_id!) {
            break;
          }

          // LIVRO
          while (true) {
            const livro_id = await perguntar(
              "Digite o ID do livro (ou 0 para voltar ao menu): "
            );

            if (Number(livro_id) === 0) {
              break;
            }

            try {
              await emprestimoController.validarLivro(Number(livro_id));

              await emprestimoController.criarEmprestimo(
                cliente_id,
                Number(livro_id)
              );

              console.log("Empréstimo feito com sucesso!");
              await voltarAoMenu();
              break;

            } catch (error) {
              console.log(
                error instanceof Error ? error.message : error
              );
            }
          }

        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;


      case "2":
        try {
          const emprestimos =
            await emprestimoController.listarEmprestimosDetalhado();

          if (emprestimos.length === 0) {
            console.log("Nenhum empréstimo cadastrado.");
          } else {
            console.log("Lista de empréstimos:");

            emprestimos.forEach((emprestimo) => {
              console.log(`ID: ${emprestimo.id}`);
              console.log(`Cliente: ${emprestimo.cliente}`);
              console.log(`Livro: ${emprestimo.livro}`);
              console.log(
                `Data do empréstimo: ${emprestimo.data_emprestimo}`
              );
              console.log(
                `Data da devolução: ${
                  emprestimo.data_devolucao ?? "Em aberto"
                }`
              );
              console.log("----------------------------------------");
            });
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
              "Digite o ID do empréstimo (ou 0 para voltar ao menu): "
            );

            if (Number(id) === 0) {
              break;
            }

            const emprestimo =
              await emprestimoController.buscarEmprestimoPorId(
                Number(id)
              );

            if (!emprestimo) {
              console.log(
                "Empréstimo não encontrado. Tente novamente."
              );
              continue;
            }

            console.log(`ID: ${emprestimo.id}`);
            console.log(`Cliente ID: ${emprestimo.cliente_id}`);
            console.log(`Livro ID: ${emprestimo.livro_id}`);
            console.log(
              `Data do empréstimo: ${emprestimo.data_emprestimo}`
            );
            console.log(
              `Data da devolução: ${
                emprestimo.data_devolucao ?? "Em aberto"
              }`
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
              "Digite o ID do empréstimo que deseja atualizar (ou 0 para voltar ao menu): "
            );

            if (Number(id) === 0) {
              break;
            }

            const emprestimo =
              await emprestimoController.buscarEmprestimoPorId(
                Number(id)
              );

            if (!emprestimo) {
              console.log(
                "Empréstimo não encontrado. Tente novamente."
              );
              continue;
            }

            let cliente_id: number;

            // CLIENTE
            while (true) {
              const idCliente = await perguntar(
                "Digite o ID do cliente (ou 0 para voltar ao menu): "
              );

              if (Number(idCliente) === 0) {
                break;
              }

              try {
                await emprestimoController.validarCliente(
                  Number(idCliente)
                );

                cliente_id = Number(idCliente);
                break;

              } catch (error) {
                console.log(
                  error instanceof Error ? error.message : error
                );
              }
            }

            if (!cliente_id!) {
              break;
            }

            // LIVRO
            while (true) {
              const livro_id = await perguntar(
                "Digite o ID do livro (ou 0 para voltar ao menu): "
              );

              if (Number(livro_id) === 0) {
                break;
              }

              try {
                await emprestimoController.validarLivro(
                  Number(livro_id)
                );

                const emprestimoAtualizado = new Emprestimo(
                  cliente_id,
                  Number(livro_id),
                  emprestimo.data_emprestimo,
                  emprestimo.data_devolucao,
                  emprestimo.id
                );

                await emprestimoController.atualizarEmprestimo(
                  emprestimoAtualizado
                );

                console.log(
                  "Empréstimo atualizado com sucesso!"
                );

                await voltarAoMenu();
                break;

              } catch (error) {
                console.log(
                  error instanceof Error ? error.message : error
                );
              }
            }

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
              "Digite o ID do empréstimo que deseja devolver (ou 0 para voltar ao menu): "
            );

            if (Number(id) === 0) {
              break;
            }

            try {
              await emprestimoController.devolverLivro(
                Number(id)
              );

              console.log("Livro devolvido com sucesso!");

              await voltarAoMenu();
              break;

            } catch (error) {
              console.log(
                error instanceof Error ? error.message : error
              );
            }
          }

        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;


      case "0":
        console.log("Voltando...");
        return;


      default:
        console.log("Opção inválida.");
        await voltarAoMenu();
        break;
    }
  }
}