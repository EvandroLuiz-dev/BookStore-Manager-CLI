CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    pais VARCHAR(100)
);

CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    editora VARCHAR(100),
    preco DECIMAL(10, 2) NOT NULL,
    estoque INTEGER NOT NULL CHECK (estoque >= 0),
    autor_id INTEGER NOT NULL REFERENCES autores(id)
);

CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NULL,
    contato VARCHAR(20) NULL
);

CREATE TABLE emprestimos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER NOT NULL REFERENCES clientes(id),
    livro_id INTEGER NOT NULL REFERENCES livros(id),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE NULL
);