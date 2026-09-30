import { get } from "node:http"

export class Emprestimo {
    private _id: number | undefined
    private _cliente_id: number
    private _livro_id: number
    private _data_emprestimo: Date
    private _data_devolucao: Date | null

    constructor(cliente_id: number, livro_id: number, data_emprestimo: Date, data_devolucao: Date | null, id?: number) {
        this._id = id
        this._cliente_id = cliente_id
        this._livro_id = livro_id
        this._data_emprestimo = data_emprestimo
        this._data_devolucao = data_devolucao
    }

    get id(): number | undefined {
        return this._id
    }

    get cliente_id(): number {
        return this._cliente_id
    }

    get livro_id(): number {
        return this._livro_id
    }

    get data_emprestimo(): Date {
        return this._data_emprestimo
    }

    get data_devolucao(): Date | null{
        return this._data_devolucao
    }

}