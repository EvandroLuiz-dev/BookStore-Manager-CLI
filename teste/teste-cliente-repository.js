"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_repository_1 = require("./cliente-repository");
const Cliente_1 = require("../src/models/Cliente");
const repository = new cliente_repository_1.ClienteRepository();
async function testar() {
    try {
        // CREATE
        const cliente = new Cliente_1.Cliente("Cliente Teste", "teste@email.com", "48999999999");
        await repository.create(cliente);
        console.log(" CREATE funcionando");
        // FIND ALL
        const clientes = await repository.findAll();
        console.log(" FIND ALL funcionando");
        console.log(clientes);
        // FIND BY ID
        const ultimoCliente = clientes[clientes.length - 1];
        if (ultimoCliente?.id) {
            const clienteEncontrado = await repository.findById(ultimoCliente.id);
            console.log(" FIND BY ID funcionando");
            console.log(clienteEncontrado);
            // UPDATE
            const clienteAtualizado = new Cliente_1.Cliente("Cliente Atualizado", "atualizado@email.com", "48988888888", ultimoCliente.id);
            await repository.update(clienteAtualizado);
            console.log(" UPDATE funcionando");
            // DELETE
            await repository.delete(ultimoCliente.id);
            console.log(" DELETE funcionando");
        }
    }
    catch (error) {
        console.error(" Erro no teste:", error);
    }
    finally {
        process.exit();
    }
}
testar();
//# sourceMappingURL=teste-cliente-repository.js.map