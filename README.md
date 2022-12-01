# Login

Cadastro e autenticação de usuário. Front-end valida o token e redireciona se o token não estiver certo, Back-end gera o token, valida o login, senha do usuário e o token. Além de guardar os usuários cadastrados.

Como o foco é mostrar a validação do usuário, os cadastros são salvos em um array. Não é usado uma conexão com banco de dados. A validação usada foi o json-web-token (jwt). O usuário tem um token válido por 1h, depois é obrigado a logar novamente. Se o usuário faz logout, mesmo que o tempo do token esteja valido, o token se torna inválido. Para o logout foi usada uma estratégia de blocklist.

## Stack utilizada

**Front-end:** ![React](https://img.shields.io/badge/React-white?style=for-the-badge&logo=react&logoColor=ligthblue) ![SASS](https://img.shields.io/badge/SASS-white?style=for-the-badge&logo=sass&logoColor=darkpink) ![TypeScript](https://img.shields.io/badge/Typescript-white?style=for-the-badge&logo=typescript&logoColor=blue)

**Back-end:** ![Node](https://img.shields.io/badge/Node-white?style=for-the-badge&logo=nodedotjs&logoColor=green) ![Express](https://img.shields.io/badge/Express-white?style=for-the-badge&logo=express&logoColor=gray)

## Instalação

Baixe e instale [Node](https://nodejs.org/en/download/)

Baixe ou clone o repositório do projeto.
No diretório do projeto, vá para ./backend e execute:

```bash
    npm install
```

Depois de baixar as dependencias do back-end, execute

```bash
    npm start
```

Voltando para o diretório do projeto, vá para ./frontend e execute:

```bash
    npm install
```

Depois de baixar as dependencias do front-end, execute

```bash
    npm start
```

## Aplicação rodando

A aplicação estará rodando no seguinte endereço:

```bash
    localhost:3000/
```

## Autores

- [Vinicius Aires Sammarco](https://www.linkedin.com/in/vinicius-aires/)
