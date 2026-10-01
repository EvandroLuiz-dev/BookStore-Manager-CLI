import pool from "../database/connection";
import {LivroDisponivel, LivroEmprestado, LivroPorAutor, QuantidadeEmprestimosPorLivro, ClienteComEmprestimoAtivo } from "../interfaces/relatorio-interface"

export class RelatorioRepository {
  async livrosDisponiveis(): Promise<LivroDisponivel[]>  {
    const result = await pool.query(`
        SELECT 
            livros.id,
            livros.titulo,
            livros.estoque,
            autores.nome AS autor
        FROM livros
        INNER JOIN autores ON livros.autor_id = autores.id
        WHERE livros.estoque > 0
        ORDER BY livros.titulo
    `);

    return result.rows;
  }

  async livrosEmprestados(): Promise<LivroEmprestado[]> {
        const result = await pool.query(`
            SELECT
                livros.id,
                livros.titulo,
                autores.nome AS autor,
                clientes.nome AS cliente,
                emprestimos.data_emprestimo
            FROM emprestimos
            INNER JOIN livros ON emprestimos.livro_id = livros.id
            INNER JOIN autores ON livros.autor_id = autores.id
            INNER JOIN clientes ON emprestimos.cliente_id = clientes.id
            WHERE emprestimos.data_devolucao IS NULL
            ORDER BY emprestimos.data_emprestimo
        `);

        return result.rows;
    }

    async livrosPorAutor(): Promise<LivroPorAutor[]> {
    const result = await pool.query(`
        SELECT
            autores.nome AS autor,
            livros.titulo
        FROM autores
        LEFT JOIN livros
            ON livros.autor_id = autores.id
        ORDER BY autores.nome, livros.titulo
    `);

    return result.rows;
}

async quantidadeEmprestimosPorLivro(): Promise<QuantidadeEmprestimosPorLivro[]> {
    const result = await pool.query(`
        SELECT
            livros.id,
            livros.titulo,
            COUNT(emprestimos.id)::int AS total_emprestimos
        FROM livros
        LEFT JOIN emprestimos
            ON emprestimos.livro_id = livros.id
        GROUP BY livros.id, livros.titulo
        ORDER BY total_emprestimos DESC
    `);

    return result.rows;
    }

    async clientesComEmprestimosAtivos(): Promise<ClienteComEmprestimoAtivo[]> {
    const result = await pool.query(`
        SELECT
            clientes.id,
            clientes.nome,
            COUNT(emprestimos.id)::int AS emprestimos_ativos
        FROM clientes
        INNER JOIN emprestimos
            ON emprestimos.cliente_id = clientes.id
        WHERE emprestimos.data_devolucao IS NULL
        GROUP BY clientes.id, clientes.nome
        ORDER BY emprestimos_ativos DESC
    `);

    return result.rows;
}
}
