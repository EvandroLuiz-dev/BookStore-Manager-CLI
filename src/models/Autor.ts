export class Autor {
    private _id: number | undefined
    private _nome: string
    private _pais: string | null

    constructor( nome: string, pais: string | null,id?: number) {
        this._id = id
        this._nome = nome
        this._pais = pais
    }


get id(): number | undefined {
        return this._id
    }

get nome(): string {
        return this._nome
    }

get pais(): string | null {
        return this._pais
    }

}