"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_service_1 = require("./cliente-service");
const cliente_repository_1 = require("../src/repositories/cliente-repository");
const repository = new cliente_repository_1.ClienteRepository();
const service = new cliente_service_1.ClienteService(repository);
async function testar() {
    try {
        // Criar
        await service.criarCliente("Cliente Service", "service@email.com", "48988888888");
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
        const encontrado = await service.buscarPorId(cliente.id);
        console.log(" FIND BY ID funcionando");
        console.log(encontrado);
        // Atualizar
        await service.atualizarCliente(cliente.id, "Cliente Atualizado", "atualizado@email.com", "48999999999");
        console.log("UPDATE funcionando");
        // Deletar
        await service.deletarCliente(cliente.id);
        console.log(" DELETE funcionando");
    }
    catch (error) {
        console.error("Erro:", error);
    }
}
testar();
//# sourceMappingURL=teste-cliente-service.js.map