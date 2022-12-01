const blockList = require("../database/db");
const jwt = require("jsonwebtoken");

const validarToken = (token) => {
  if (blockList.indexOf(token) !== -1)
    return { auth: false, status: 400, mensagem: "Token invalido!" };

  if (!token)
    return { auth: false, status: 401, mensagem: "No token provider" };

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return { auth: false, status: 500, mensagem: "Token invalido" };
  });

  return { auth: true };
};

module.exports = validarToken;
