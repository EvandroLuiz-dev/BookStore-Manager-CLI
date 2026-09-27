import pool from '../database/connection';
import { Autor } from '../models/Autor';

export class AutorRepository {
    async findAll(): Promise<Autor[]> {
        const result = await pool.query('SELECT * FROM autores');
        return result.rows.map(row => new Autor( row.nome, row.pais, row.id));
    }

    async create(autor: Autor): Promise<void> {
        await pool.query('INSERT INTO autores (nome, pais) VALUES ($1, $2)', [autor.nome, autor.pais]);
    }

    async findById(id: number): Promise<Autor | null> {
        const result = await pool.query('SELECT * FROM autores WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return new Autor(result.rows[0].nome, result.rows[0].pais, result.rows[0].id);
    }
    
    async update(autor: Autor): Promise<void> {
         if (autor.id === undefined) {
            throw new Error("Autor não possui ID para atualização.");
        }

        await pool.query('UPDATE autores SET nome = $1, pais = $2 WHERE id = $3', [autor.nome, autor.pais, autor.id]);
    }  
    
    async delete(id: number): Promise<void> {
        await pool.query('DELETE FROM autores WHERE id = $1', [id]);
    }
}

