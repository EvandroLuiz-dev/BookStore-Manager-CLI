import { ClienteService } from "./cliente-service";
import { ClienteRepository } from "../src/repositories/cliente-repository";

const repository = new ClienteRepository();
const service = new ClienteService(repository);

async function testar() {
    try {
        // Criar
        await service.criarCliente(
            "Cliente Service",
            "service@email.com",
            "48988888888"
        )
        console.log(" CREATE funcionando");

        // Buscar todos
        const clientes = await service.buscarTodos();
        console.log(" FIND ALL funcionando");
        console.log(clientes);

        // Pegar o último cliente criado
        const cliente = clientes[clientes.length - 1];

        if (!cliente) {
            throw new Error("Nenhum cliente encontrado para o teste.");
        }

        // Buscar por ID
        const encontrado = await service.buscarPorId(cliente.id!);
        console.log(" FIND BY ID funcionando");
        console.log(encontrado);

        // Atualizar
        await service.atualizarCliente(
            cliente.id!,
            "Cliente Atualizado",
            "atualizado@email.com",
            "48999999999"
        );
        console.log("UPDATE funcionando");

        // Deletar
        await service.deletarCliente(cliente.id!);
        console.log(" DELETE funcionando");

    } catch (error) {
        console.error("Erro:", error);
    }
}

testar();