import pool from '../database/connection';
import { Livro } from '../models/Livros';

export class LivroRepository {
    async findAll(): Promise<Livro[]> {
        const result = await pool.query('SELECT * FROM livros');
        return result.rows.map(row => new Livro(row.titulo, row.editora, Number(row.preco), row.estoque, row.autor_id, row.id));
    }

    async create(livro: Livro): Promise<void> {
        await pool.query('INSERT INTO livros (titulo, editora, preco, estoque, autor_id) VALUES ($1, $2, $3, $4, $5)',
    [
        livro.titulo, 
        livro.editora, 
        livro.preco, 
        livro.estoque, 
        livro.autorId
    ]);
    }

    async findById(id: number): Promise<Livro | null> {
        const result = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        const row = result.rows[0];
        return new Livro(row.titulo, row.editora, Number(row.preco), row.estoque, row.autor_id, row.id);
    }

    async update(livro: Livro): Promise<void> {
        if (livro.id === undefined) {
            throw new Error("Livro não possui ID para atualização.");
        }
        await pool.query('UPDATE livros SET titulo = $1, editora = $2, preco = $3, estoque = $4, autor_id = $5 WHERE id = $6',
            [
                livro.titulo,
                livro.editora,
                livro.preco,
                livro.estoque,
                livro.autorId,
                livro.id
            ]);
    }

    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM livros WHERE id = $1', [id]);
    }
}