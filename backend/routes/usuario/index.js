const { Router } = require("express");
const dados = require("../../database/db");
const { pegarUsuarioPorId, pegarUsuario } = require("../../util/pegarUsuario");
const Usuario = require("./Usuario");
const route = Router();
const validarToken = require("../../util/validarToken");

route.post("/", (req, res, next) => {
  try {
    const login = req.body.login;
    const usuarioNaoValido = pegarUsuario(dados, login);

    if (usuarioNaoValido) {
      res.status(400);
      res.send({ mensagem: "Usuário já é cadastrado no sistema" });
      return;
    }

    const usuario = new Usuario(req.body);
    const usuarioCriado = usuario.criar();

    res.status(201);
    res.send({ mensagem: `Usuário ${usuarioCriado.nome} criado com sucesso!` });
  } catch (erro) {
    console.log(erro);
  }
});

route.get("/:id", (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;

    const tokenValido = validarToken(token);

    if (!tokenValido.auth) {
      res.status(tokenValido.status);
      res.send({ mensagem: tokenValido.mensagem });
    }

    const usuarioEscolhido = pegarUsuarioPorId(dados, id);

    if (!usuarioEscolhido)
      return res.status(404).send({ mensagem: "Usuário não existe!" });

    res.status(200);
    res.send({
      nome: usuarioEscolhido.nome,
      login: usuarioEscolhido.login,
    });
  } catch (erro) {
    console.log(erro);
  }
});

route.put("/:id", (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { id } = req.params;
    const tokenValido = validarToken(token);

    if (!tokenValido.auth) {
      res.status(tokenValido.status);
      res.send({ mensagem: tokenValido.mensagem });
    }

    const usuarioEscolhido = pegarUsuarioPorId(dados, id);

    if (!usuarioEscolhido) {
      res.status(404);
      res.send({ mensagem: "Usuário não existe!" });
      return;
    }

    const usuario = new Usuario(usuarioEscolhido);
    usuario.atualizarSenha(req.body);

    res.status(200);
    res.send({ mensagem: `Senha do ${usuario.login} atualizada com sucesso!` });
  } catch (erro) {
    console.log(erro);
  }
});

module.exports = route;
