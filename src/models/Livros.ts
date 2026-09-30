export class Livro {
    private _id: number | undefined
    private _titulo: string
    private _editora: string | null
    private _preco: number
    private _estoque: number
    private _autorId: number

    constructor(titulo: string, editora: string | null, preco: number, estoque: number, autorId: number, id?: number) {
        this._id = id
        this._titulo = titulo
        this._editora = editora
        this._preco = preco
        this._estoque = estoque
        this._autorId = autorId
    }

    get id(): number | undefined {
        return this._id
    }

    get titulo(): string {
        return this._titulo
    }

    get editora(): string | null {
        return this._editora
    }

    get preco(): number {
        return this._preco
    }

    get estoque(): number {
        return this._estoque
    }

    get autorId(): number {
        return this._autorId
    }

    set estoque(valor: number) {
    if (valor < 0) {
        throw new Error("O estoque não pode ser negativo.");
    }

    this._estoque = valor;
    }
}