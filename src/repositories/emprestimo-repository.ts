import pool from "../database/connection";
import { Emprestimo } from "../models/Emprestimo";

export class EmprestimoRepository {
    async create (emprestimo: Emprestimo): Promise<void>{
        await pool.query('INSERT INTO emprestimos (cliente_id, livro_id, data_emprestimo, data_devolucao) VALUES ($1, $2, $3, $4)',
            [
                emprestimo.cliente_id,
                emprestimo.livro_id,
                emprestimo.data_emprestimo,
                emprestimo.data_devolucao
            ]);
    }

    async findAll(): Promise<Emprestimo[]> {
        const result = await pool.query('SELECT * FROM emprestimos');
        return result.rows.map(row =>new Emprestimo(row.cliente_id, row.livro_id, row.data_emprestimo, row.data_devolucao, row.id));
    }

    async findById(id: number): Promise<Emprestimo | null> {
        const result = await pool.query('SELECT * FROM emprestimos WHERE id = $1', [id]);
        if (result.rows.length === 0){
            return null;
        }

        const row = result.rows[0];
        return new Emprestimo(row.cliente_id, row.livro_id, row.data_emprestimo, row.data_devolucao, row.id);
    }

    async update(emprestimo: Emprestimo): Promise<void>{
        if(emprestimo.id === undefined){
            throw new Error('Emprestimo não pode ser atualizado sem um ID válido');
        }

    
    await pool.query('UPDATE emprestimos SET cliente_id = $1, livro_id = $2, data_emprestimo = $3, data_devolucao = $4 WHERE id = $5',
    [
        emprestimo.cliente_id,
        emprestimo.livro_id,
        emprestimo.data_emprestimo,
        emprestimo.data_devolucao,
        emprestimo.id
    ]);
}

}