const express = require(`express`);
const app = express();
const rotaUsuario = require("./routes/usuario");
const rotaLogin = require("./routes/login");
const rotaLogout = require(`./routes/logout`);
const cors = require(`cors`);
const bodyParser = require("body-parser");

require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

app.use("/usuario", rotaUsuario);
app.use("/login", rotaLogin);
app.use("/logout", rotaLogout);

app.listen(process.env.PORTA_APP, () =>
  console.log(`Api rodando na porta ${process.env.PORTA_APP}`)
);
