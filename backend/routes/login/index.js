const { Router } = require("express");
const dados = require("../../database/db");
const { pegarUsuario } = require("../../util/pegarUsuario");
const route = Router();
require("dotenv").config();
const jwt = require(`jsonwebtoken`);

route.post("/", (req, res, next) => {
  try {
    const login = req.body.login;
    const senha = req.body.senha;
    const usuario = pegarUsuario(dados, login);

    if (usuario && usuario.login === login && usuario.senha === senha) {
      const id = usuario.id;
      const token = jwt.sign({ id: id }, process.env.SECRET, {
        expiresIn: 3600,
      });

      res.status(200);
      res.send({ auth: true, token: token });
      return;
    }

    res.status(500);
    res.send({ mensagem: "Login e/ou senha inválidos!" });
  } catch (erro) {
    console.log(erro);
  }
});

module.exports = route;
