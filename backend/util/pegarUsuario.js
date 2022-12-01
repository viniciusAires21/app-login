const pegarUsuarioPorId = (dados, id) => {
  var usuarioEscolhido;

  for (var i = 0; i < dados.length; i++) {
    if (dados[i].id == id) {
      usuarioEscolhido = dados[i];
    }
  }

  return usuarioEscolhido;
};

const pegarUsuario = (dados, login) => {
  var usuarioEscolhido;

  for (var i = 0; i < dados.length; i++) {
    if (dados[i].login === login) {
      usuarioEscolhido = dados[i];
    }
  }

  return usuarioEscolhido;
};

module.exports = {
  pegarUsuario,
  pegarUsuarioPorId,
};
