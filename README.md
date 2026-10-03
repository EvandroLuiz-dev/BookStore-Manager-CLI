# BookStore Manager CLI

## Sobre o projeto

O **BookStore Manager CLI** é um sistema de gerenciamento de uma livraria desenvolvido como projeto do curso **Desenvolvedor Back-End Node da SCTEC**.

A aplicação é executada através do terminal (CLI) e foi desenvolvida utilizando **Node.js, TypeScript e PostgreSQL**.

O sistema permite realizar o gerenciamento de autores, livros e clientes, além de controlar empréstimos e devoluções de livros e disponibilizar relatórios obtidos através de consultas ao banco de dados.

O projeto foi desenvolvido com uma arquitetura em camadas, buscando aplicar os conhecimentos estudados durante o curso, como Programação Orientada a Objetos, TypeScript, programação assíncrona, PostgreSQL, SQL, Git e GitHub.

## Objetivo

O objetivo do projeto é desenvolver uma aplicação Back-End capaz de realizar o gerenciamento das principais informações de uma pequena livraria.

A aplicação permite:

- Cadastrar, consultar, atualizar e remover autores;
- Cadastrar, consultar, atualizar e remover livros;
- Cadastrar, consultar, atualizar e remover clientes;
- Registrar empréstimos de livros;
- Registrar devoluções;
- Controlar a disponibilidade dos livros;
- Consultar empréstimos;
- Gerar relatórios utilizando consultas SQL relacionais;
- Aplicar validações para evitar operações inválidas.

O projeto também tem como objetivo colocar em prática os conceitos de desenvolvimento Back-End estudados durante a formação.

## Tecnologias utilizadas

- Node.js
- TypeScript
- PostgreSQL
- pg
- dotenv
- Git
- GitHub

## Requisitos para execução

Para executar o projeto, é necessário possuir os seguintes programas instalados:

- Node.js;
- PostgreSQL;
- Git.

Também é necessário possuir acesso a um banco de dados PostgreSQL.

## Configuração do banco de dados

O projeto utiliza o PostgreSQL para armazenar os dados da aplicação.

O script responsável pela criação das tabelas está localizado em:

```text
src/database/bookstore.sql
```

O banco possui as seguintes entidades:

- Autores;
- Livros;
- Clientes;
- Empréstimos.

As entidades possuem relacionamentos utilizando chaves primárias e estrangeiras.

### Configuração das variáveis de ambiente

Na raiz do projeto deve existir um arquivo `.env` contendo os dados de conexão com o PostgreSQL.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

Os valores devem ser substituídos pelas informações do PostgreSQL utilizado no ambiente.

O arquivo `.env` está incluído no `.gitignore` para evitar que informações de acesso ao banco sejam enviadas para o GitHub.

## Instalação

Primeiro, clone o repositório:

```bash
git clone https://github.com/EvandroLuiz-dev/BookStore-Manager-CLI.git
```

Entre na pasta do projeto:

```bash
cd BookStore-Manager-CLI
```

Instale as dependências:

```bash
npm install
```

Depois, crie o banco de dados PostgreSQL e execute o script localizado em:

```text
src/database/bookstore.sql
```

Configure também o arquivo `.env` com os dados da conexão com o banco.

## Execução

Para executar a aplicação em ambiente de desenvolvimento:

```bash
npm run dev
```

Para compilar o projeto TypeScript:

```bash
npm run build
```

Depois da compilação, a aplicação pode ser executada utilizando:

```bash
npm start
```

# Arquitetura do projeto

O projeto utiliza uma arquitetura em camadas para separar as responsabilidades da aplicação.

O fluxo principal das funcionalidades segue a estrutura:

```text
Menu
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

Essa organização facilita a manutenção do código e evita concentrar todas as responsabilidades em um único arquivo.

## Controllers

Os Controllers são responsáveis pela interação com o usuário através do terminal.

Eles recebem as informações fornecidas pelo usuário, chamam os Services correspondentes e apresentam os resultados ou mensagens de erro.

## Services

Os Services concentram as regras de negócio da aplicação.

Eles realizam validações e coordenam as operações antes que os dados sejam enviados aos Repositories.

Exemplos:

- verificar se um autor existe antes de cadastrar um livro;
- verificar se um cliente existe antes de realizar um empréstimo;
- verificar se um livro está disponível;
- impedir devoluções duplicadas.

## Repositories

Os Repositories são responsáveis pela comunicação com o PostgreSQL.

Nessa camada são realizadas as operações SQL de:

- INSERT;
- SELECT;
- UPDATE;
- DELETE.

As consultas utilizam parâmetros para evitar a inserção direta dos valores recebidos pelo usuário nas consultas SQL.

## Models

Os Models representam as entidades da aplicação através de classes TypeScript.

O projeto possui Models para:

- Autor;
- Livro;
- Cliente;
- Empréstimo.

Os Models possuem atributos tipados, construtores, métodos e modificadores de acesso.

## Database

A camada Database concentra os recursos relacionados ao banco de dados.

Nela estão:

- a configuração da conexão com o PostgreSQL;
- o script SQL de criação das tabelas.

## Interfaces

A pasta `interfaces` contém as interfaces utilizadas pelo projeto.

Atualmente é utilizada uma interface para estruturar os dados dos relatórios.

## Menus

A pasta `menus` contém os menus responsáveis pela navegação da aplicação.

Cada módulo possui seu próprio menu, facilitando a organização e a manutenção da aplicação.

## Utils

A pasta `utils` contém funções auxiliares reutilizáveis pela aplicação.

Entre elas está a função utilizada para receber informações do usuário através do terminal.

# Funcionalidades

## Autores

O sistema permite:

- Cadastrar autores;
- Listar autores;
- Consultar autor por ID;
- Atualizar autores;
- Remover autores.

Durante o cadastro, o sistema também verifica se já existe um autor com o mesmo nome.

## Livros

O sistema permite:

- Cadastrar livros;
- Listar livros;
- Consultar livros;
- Atualizar livros;
- Remover livros;
- Vincular livros a autores existentes.

Ao cadastrar um livro, o sistema verifica se o autor informado existe.

Também são realizadas validações relacionadas ao preço e ao estoque.

## Clientes

O sistema permite:

- Cadastrar clientes;
- Listar clientes;
- Consultar clientes;
- Atualizar clientes;
- Remover clientes.

As operações possuem validações para evitar operações com clientes inexistentes.

## Empréstimos

O sistema permite:

- Registrar empréstimos;
- Consultar empréstimos;
- Registrar devoluções;
- Atualizar a disponibilidade dos livros.

Antes de registrar um empréstimo, o sistema verifica:

1. Se o cliente existe;
2. Se o livro existe;
3. Se o livro possui estoque disponível.

Quando um empréstimo é realizado, a quantidade disponível do livro é reduzida.

Quando uma devolução é registrada, a quantidade disponível é aumentada novamente.

O sistema também impede que um empréstimo já devolvido seja devolvido novamente.

# Relatórios

O sistema possui uma área específica para relatórios.

Os relatórios implementados são:

### Livros disponíveis

Apresenta os livros que possuem quantidade disponível em estoque.

### Livros emprestados

Apresenta os livros que estão atualmente emprestados.

### Livros por autor

Apresenta os livros relacionados aos seus respectivos autores.

### Quantidade de empréstimos por livro

Apresenta a quantidade de empréstimos realizados para cada livro.

O relatório utiliza ordenação e limite de resultados.

### Clientes com empréstimos ativos

Apresenta os clientes que possuem empréstimos ainda não devolvidos.

# Consultas SQL utilizadas

O projeto utiliza diferentes comandos e recursos do PostgreSQL.

Entre eles:

```sql
SELECT
INSERT
UPDATE
DELETE
```

Também são utilizadas consultas relacionais com:

```sql
INNER JOIN
LEFT JOIN
GROUP BY
ORDER BY
LIMIT
COUNT()
```

Essas consultas são utilizadas principalmente para as operações de gerenciamento e para a geração dos relatórios.

# Estrutura de pastas

A estrutura principal do projeto é:

```text
BookStore-Manager-CLI/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── autor-controller.ts
│   │   ├── cliente-controller.ts
│   │   ├── emprestimo-controller.ts
│   │   ├── livro-controller.ts
│   │   └── relatorios-controller.ts
│   │
│   ├── database/
│   │   ├── bookstore.sql
│   │   └── connection.ts
│   │
│   ├── interfaces/
│   │   └── relatorio-interface.ts
│   │
│   ├── menus/
│   │   ├── autor-menu.ts
│   │   ├── cliente-menu.ts
│   │   ├── emprestimo-menu.ts
│   │   ├── livro-menu.ts
│   │   └── relatorios-menu.ts
│   │
│   ├── models/
│   │   ├── Autor.ts
│   │   ├── Cliente.ts
│   │   ├── Emprestimo.ts
│   │   └── Livros.ts
│   │
│   ├── repositories/
│   │   ├── autor-repository.ts
│   │   ├── cliente-repository.ts
│   │   ├── emprestimo-repository.ts
│   │   ├── livro-repository.ts
│   │   └── relatorios-repository.ts
│   │
│   ├── services/
│   │   ├── autor-service.ts
│   │   ├── cliente-service.ts
│   │   ├── emprestimo-service.ts
│   │   ├── livro-service.ts
│   │   └── relatorios-service.ts
│   │
│   ├── utils/
│   │   └── perguntar.ts
│   │
│   └── main.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

# Exemplos de utilização

Ao executar a aplicação, o usuário encontra o menu principal:

```text
BOOKSTORE MANAGER

1 - Autores
2 - Livros
3 - Clientes
4 - Empréstimos
5 - Relatórios
0 - Encerrar
```

Ao selecionar uma opção, o usuário é direcionado para o menu correspondente.

### Exemplo de cadastro de autor

```text
Digite o nome do autor:
Machado de Assis

Digite o país do autor:
Brasil
```

Após o cadastro, o sistema informa o resultado da operação.

### Exemplo de validação

Caso seja informado um autor inexistente ao cadastrar um livro:

```text
Autor não encontrado.
```

### Exemplo de empréstimo

Ao realizar um empréstimo, o sistema verifica a existência do cliente e do livro e também verifica a disponibilidade do estoque.

Caso o livro não esteja disponível:

```text
Livro indisponível para empréstimo
```

### Exemplo de devolução

Ao realizar uma devolução, o sistema registra a data de devolução e atualiza novamente a quantidade disponível do livro.

# Tratamento de erros

O sistema possui tratamento de erros utilizando `try/catch` nas operações realizadas pelos menus.

Dessa forma, quando ocorre uma operação inválida, o usuário recebe uma mensagem informando o problema e pode continuar utilizando a aplicação.

Entre os casos tratados estão:

- Autor não encontrado;
- Livro não encontrado;
- Cliente não encontrado;
- Empréstimo não encontrado;
- Livro indisponível;
- Empréstimo já devolvido;
- Dados obrigatórios inválidos;
- Operações inválidas no menu.

# Programação assíncrona

As operações que envolvem o banco de dados são realizadas utilizando programação assíncrona com:

- Promises;
- `async`;
- `await`.

Isso permite que as operações de comunicação com o PostgreSQL sejam realizadas de forma adequada dentro da aplicação Node.js.

# Programação Orientada a Objetos

O projeto utiliza conceitos de Programação Orientada a Objetos através das classes utilizadas nos Models.

Foram utilizados:

- Classes;
- Construtores;
- Atributos tipados;
- Métodos;
- Getters;
- Setters;
- Modificadores de acesso;
- Interfaces.

# Git e GitHub

O desenvolvimento do projeto foi realizado utilizando Git para controle de versão e GitHub para hospedagem do código.

Foram utilizadas branches para separar o desenvolvimento das funcionalidades.

Branches utilizadas:

```text
main
develop
feat/autores
feat/livros
feat/clientes
feat/emprestimos
docs/readme
```

A branch `develop` foi utilizada para integração das funcionalidades desenvolvidas nas branches de feature.

A branch `main` representa a versão final do projeto.

# Kanban

O desenvolvimento do projeto foi organizado através de um quadro Kanban, utilizado para acompanhar as tarefas e o andamento das funcionalidades.

**Link do Kanban:**
https://github.com/users/EvandroLuiz-dev/projects/3

# Equipe

### Evandro Luiz Pereira

Projeto desenvolvido individualmente como parte do curso:

**Desenvolvedor Back-End Node — SCTEC**

# Repositório

Repositório do projeto no GitHub:

**BookStore Manager CLI**

https://github.com/EvandroLuiz-dev/BookStore-Manager-CLI

# Considerações finais

O desenvolvimento do BookStore Manager CLI teve como objetivo colocar em prática os conhecimentos adquiridos durante o curso de Desenvolvimento Back-End Node da SCTEC.

Durante o projeto foram praticados conceitos de Node.js, TypeScript, PostgreSQL, SQL, Programação Orientada a Objetos, arquitetura em camadas, programação assíncrona e controle de versão com Git e GitHub.

O projeto também permitiu praticar a organização de uma aplicação Back-End separando responsabilidades entre Controllers, Services, Repositories, Models, Menus e Database.
