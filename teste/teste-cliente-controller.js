"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cliente_controller_1 = require("./cliente-controller");
const cliente_service_1 = require("../src/services/cliente-service");
const cliente_repository_1 = require("../src/repositories/cliente-repository");
const repository = new cliente_repository_1.ClienteRepository();
const service = new cliente_service_1.ClienteService(repository);
const controller = new cliente_controller_1.ClienteController(service);
async function testar() {
    try {
        const clientes = await controller.listarClientes();
        console.log(" Controller funcionando");
        console.log(clientes);
    }
    catch (error) {
        console.error(" Erro:", error);
    }
}
testar();
//# sourceMappingURL=teste-cliente-controller.js.map