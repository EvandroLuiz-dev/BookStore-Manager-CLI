import { ClienteController } from "../controllers/cliente-controller";
import { perguntar, voltarAoMenu } from "../utils/perguntar";

export async function MenuCliente(
  clienteController: ClienteController,
): Promise<void> {
  while (true) {
    console.log("╔════════════════════════════════════════╗");
    console.log("║            BOOKSTORE MANAGER           ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║               CLIENTES                 ║");
    console.log("╠════════════════════════════════════════╣");
    console.log("║  1  ➜  Cadastrar cliente               ║");
    console.log("║  2  ➜  Listar clientes                 ║");
    console.log("║  3  ➜  Buscar cliente por ID           ║");
    console.log("║  4  ➜  Atualizar cliente               ║");
    console.log("║  5  ➜  Remover cliente                 ║");
    console.log("║  0  ➜  Voltar                          ║");
    console.log("╚════════════════════════════════════════╝");

    const opcao = await perguntar("\n👉 Escolha uma opção: ");

    switch (opcao) {

      case "1":
        try {
          const nome = await perguntar("Digite o nome do cliente: ");
          const email = await perguntar("Digite o email do cliente: ");
          const contato = await perguntar(
            "Digite o contato do cliente (ou deixe em branco): "
          );

          const contatoValue = contato.trim() === "" ? null : contato;

          await clienteController.criarCliente(
            nome,
            email,
            contatoValue
          );

          console.log("Cliente cadastrado com sucesso!");
          await voltarAoMenu();

        } catch (error) {
          console.log(error instanceof Error ? error.message : error);
        }
        break;


      case "2":
        try {
          const clientes = await clienteController.listarClientes();

          console.log("\nLista de clientes:\n");

          for (const cliente of clientes) {
            console.log(
              `ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Contato: ${cliente.contato}`
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
              "Digite o ID do cliente (ou 0 para voltar ao menu): "
            );

            if (id === "0") {
              break;
            }

            const cliente =
              await clienteController.buscarClientePorId(Number(id));

            if (!cliente) {
              console.log("Cliente não encontrado. Tente novamente.");
              continue;
            }

            console.log(
              `ID: ${cliente.id}, Nome: ${cliente.nome}, Email: ${cliente.email}, Contato: ${cliente.contato}`
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
              "Digite o ID do cliente que deseja atualizar (ou 0 para voltar ao menu): "
            );

            if (Number(id) === 0) {
              break;
            }

            const cliente =
              await clienteController.buscarClientePorId(Number(id));

            if (!cliente) {
              console.log("Cliente não encontrado. Tente novamente.");
              continue;
            }

            const nome = await perguntar(
              "Digite o novo nome do cliente: "
            );

            const email = await perguntar(
              "Digite o novo Email: "
            );

            const contato = await perguntar(
              "Digite o novo Contato (ou deixe em branco): "
            );

            if (!nome || !email) {
              console.log("Nome e Email são obrigatórios.");
              continue;
            }

            const contatoValue =
              contato.trim() === "" ? null : contato;

            await clienteController.atualizarCliente(
              Number(id),
              nome,
              email,
              contatoValue
            );

            console.log("Cliente atualizado com sucesso.");

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
              "Digite o ID do cliente que deseja remover (ou 0 para voltar ao menu): "
            );

            if (Number(id) === 0) {
              break;
            }

            const cliente =
              await clienteController.buscarClientePorId(Number(id));

            if (!cliente) {
              console.log("Cliente não encontrado. Tente novamente.");
              continue;
            }

            await clienteController.deletarCliente(Number(id));

            console.log("Cliente removido com sucesso.");

            await voltarAoMenu();
            break;
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