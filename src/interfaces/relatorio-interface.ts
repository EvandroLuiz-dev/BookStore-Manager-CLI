export interface LivroDisponivel {
    id: number;
    titulo: string;
    estoque: number;
    autor: string;
}

export interface LivroEmprestado {
    id: number;
    titulo: string;
    autor: string;
    cliente: string;
    data_emprestimo: Date;
}

export interface LivroPorAutor {
    autor: string;
    titulo: string | null;
}

export interface QuantidadeEmprestimosPorLivro {
    id: number;
    titulo: string;
    total_emprestimos: number;
}

export interface ClienteComEmprestimoAtivo {
    id: number;
    nome: string;
    emprestimos_ativos: number;
}