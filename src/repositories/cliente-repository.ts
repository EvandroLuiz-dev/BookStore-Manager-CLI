import pool from "../database/connection";
import { Cliente } from "../models/Cliente";

export class ClienteRepository {
    async findAll(): Promise<Cliente[]> {
        const result = await pool.query('SELECT * FROM clientes');
        return result.rows.map(row => new Cliente(row.nome, row.email, row.contato, row.id))
    }

    async create(cliente: Cliente): Promise<void> {
        await pool.query('INSERT INTO clientes (nome, email, contato) VALUES($1, $2, $3)',

            [
                cliente.nome,
                cliente.email,
                cliente.contato
            ]);
    }

    async findById(id: number): Promise<Cliente | null> {
    const result = await pool.query(
        'SELECT * FROM clientes WHERE id = $1',
        [id]
    );

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows[0];

    return new Cliente(
        row.nome,
        row.email,
        row.contato,
        row.id
    );
}

async update(cliente: Cliente): Promise<void> {
        if (cliente.id === undefined) {
            throw new Error("Cliente não possui ID para atualização.");
        }

        await pool.query(
            'UPDATE clientes SET nome = $1, email = $2, contato = $3 WHERE id = $4',
            [
                cliente.nome,
                cliente.email,
                cliente.contato,
                cliente.id
            ]
        );
    }

    async delete(id: number): Promise<void> {
        await pool.query(
            'DELETE FROM clientes WHERE id = $1',
            [id]
        );
    }
}

