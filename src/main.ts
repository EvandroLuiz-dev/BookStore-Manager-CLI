// REPOSITORIES
import { AutorRepository } from "./repositories/autor-repository";
import { LivroRepository } from "./repositories/livro-repository";
import { ClienteRepository } from "./repositories/cliente-repository";

// SERVICES
import { AutorService } from "./services/autor-service";
import { LivroService } from "./services/livro-service";
import { ClienteService } from "./services/cliente-service";
import { EmprestimoService } from "./services/emprestimo-service";

// CONTROLLERS
import { AutorController } from "./controllers/autor-controller";
import { LivroController } from "./controllers/livro-controller";
import { ClienteController } from "./controllers/cliente-controller";
import { EmprestimoController } from "./controllers/emprestimo-controller";
import { RelatorioController } from "./controllers/relatorios-controller";

// MENUS
import { menuAutores } from "./menus/autor-menu";
import { MenuLivro } from "./menus/livro-menu";
import { MenuCliente } from "./menus/cliente-menu";
import { MenuEmprestimo } from "./menus/emprestimo-menu";
import { MenuRelatorio } from "./menus/relatorios-menu";

// UTILS
import {
    perguntar,
    voltarAoMenu,
    fecharPerguntar
} from "./utils/perguntar";


// REPOSITORIES
const autorRepository = new AutorRepository();
const livroRepository = new LivroRepository();
const clienteRepository = new ClienteRepository();


// SERVICES
const autorService = new AutorService(autorRepository);
const livroService = new LivroService(livroRepository, autorRepository);
const clienteService = new ClienteService(clienteRepository);
const emprestimoService = new EmprestimoService();

// CONTROLLERS
const autorController = new AutorController(autorService);
const livroController = new LivroController(livroService);
const clienteController = new ClienteController(clienteService);
const emprestimoController = new EmprestimoController(emprestimoService);
const relatorioController = new RelatorioController();


async function main(): Promise<void> {
    let opcao: string;

    do {
        

        console.log("╔════════════════════════════════════════╗");
        console.log("║            BOOKSTORE MANAGER           ║");
        console.log("╠════════════════════════════════════════╣");
        console.log("║  1  ➜  Autores                         ║");
        console.log("║  2  ➜  Livros                          ║");
        console.log("║  3  ➜  Clientes                        ║");
        console.log("║  4  ➜  Empréstimos                     ║");
        console.log("║  5  ➜  Relatórios                      ║");
        console.log("║  0  ➜  Sair                            ║");
        console.log("╚════════════════════════════════════════╝");

        opcao = await perguntar("\n👉 Escolha uma opção: ");

        switch (opcao) {
            case "1":
                await menuAutores(autorController);
                break;

            case "2":
                await MenuLivro(livroController, autorController);
                break;

            case "3":
                await MenuCliente(clienteController);
                break;

            case "4":
                await MenuEmprestimo(emprestimoController);
                break;

            case "5":
                await MenuRelatorio(relatorioController);
                break;

            case "0":
                console.log("\nSaindo do sistema...");
                break;

            default:
                console.log("\n❌ Opção inválida!");
                await voltarAoMenu();
                break;
        }

    } while (opcao !== "0");

    fecharPerguntar();
}

main();