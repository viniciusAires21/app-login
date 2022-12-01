import { useEffect, useState } from "react";
import { instancia } from "instancia";
import { useParams, useNavigate } from "react-router-dom";
import { IUsuario } from "interface/IUsuario";
import { AtualziarSenha } from "containers/AtualizacaoSenha/AtualizarSenha";
import estilo from "./Home.module.scss";

export function Home() {
  const { id } = useParams();
  const redirect = useNavigate();
  const [dados, setDados] = useState(Array<IUsuario>);
  const [trocarSenha, setTrocarSenha] = useState(false);

  const pegarDados = async () => {
    try {
      const dadosUsuario = await instancia.get(`/usuario/${id}`, {
        headers: { Authorization: localStorage.getItem("tk") },
      });
      if (dadosUsuario.status !== 200) redirect({ pathname: "/" });

      setDados((dados) => [...dados, dadosUsuario.data]);
    } catch (erro) {
      redirect({ pathname: "/" });
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("tk");
      await instancia.post("/logout", { token: token }).then((res) => res);
      localStorage.removeItem("tk");
      redirect({ pathname: "/" });
    } catch (erro) {
      console.log(erro);
    }
  };

  useEffect(() => {
    pegarDados();
  }, []);

  return (
    <>
      {localStorage.getItem("tk") ? (
        <>
          <div className={estilo.botoes}>
            <button
              className={estilo.botoes__botao}
              onClick={() => setTrocarSenha(!trocarSenha)}
            >
              Trocar senha
            </button>
            <button className={estilo.botoes__botao} onClick={logout}>
              Logout
            </button>
          </div>
          {trocarSenha ? <AtualziarSenha /> : null}
          {dados.length !== 0 ? (
            <div className={estilo.conteudo}>
              <h1>Bem-vindo(a), {dados[0].nome}! </h1>
              <h3>O seu username é {dados[0].login}</h3>
            </div>
          ) : null}
        </>
      ) : null}
    </>
  );
}
