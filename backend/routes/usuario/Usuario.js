const dados = require("../../database/db");
const obterId = require("../../util/obterId");
require("dotenv").config();

class Usuario {
  constructor({ id, nome, login, senha }) {
    this.id = id;
    this.nome = nome;
    this.login = login;
    this.senha = senha;
  }

  criar() {
    const id = obterId();
    this.id = id;

    dados.push(this);
    return this;
  }

  atualizarSenha(dadosNovos) {
    const user = {};
    user.id = this.id;
    user.nome = this.nome;
    user.login = this.login;
    user.senha = dadosNovos.senha;

    console.log(user);

    dados[this.id] = user;
    return this;
  }
}

module.exports = Usuario;
