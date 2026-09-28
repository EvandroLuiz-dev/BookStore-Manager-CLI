export class Cliente {
    private _id: number | undefined
    private _nome: string
    private _email: string | null
    private _contato: string | null

    constructor(nome: string, email: string | null, contato: string | null, id?: number) {
        this._id = id
        this._nome = nome
        this._email = email
        this._contato = contato
    }

    get id(): number | undefined {
        return this._id
    }

    get nome(): string {
        return this._nome
    }

    get email(): string | null {
        return this._email
    }

    get contato(): string | null {
        return this._contato
    }
}