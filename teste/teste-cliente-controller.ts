import { ClienteController } from "./cliente-controller";
import { ClienteService } from "../src/services/cliente-service";
import { ClienteRepository } from "../src/repositories/cliente-repository";

const repository = new ClienteRepository();
const service = new ClienteService(repository);
const controller = new ClienteController(service);

async function testar() {
    try {
        const clientes = await controller.listarClientes();

        console.log(" Controller funcionando");
        console.log(clientes);

    } catch (error) {
        console.error(" Erro:", error);
    }
}

testar();