import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export function perguntar(pergunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

export async function voltarAoMenu(): Promise<void> {
    await perguntar("\nPressione ENTER para voltar ao menu...");
}

export function fecharPerguntar(): void {
    rl.close();
}