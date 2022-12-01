const { Router } = require("express");
const route = Router();
const blockList = require("../../database/db");

route.post("/", (req, res, next) => {
  try {
    const token = req.body.token;
    blockList.push(token);
    res.end();
  } catch (erro) {
    console.log(erro);
  }
});

module.exports = route;
