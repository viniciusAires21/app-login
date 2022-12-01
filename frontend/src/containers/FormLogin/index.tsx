import { instancia } from "instancia";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import { IToken } from "interface/IToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import estilo from "./Form.module.scss";
import classNames from "classnames";

export function FormLogin() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const redirect = useNavigate();

  const logar = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const dados = { login: login, senha: senha };
      const logando = await instancia.post(`/login`, dados).then((res) => res);

      if (logando.status !== 200)
        return toast.error("Login e/ou senha inválidos!", {
          position: "bottom-left",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

      if (logando.data.auth) {
        const token: IToken = jwt(logando.data.token);
        localStorage.setItem("tk", logando.data.token);

        if (localStorage.getItem("tk")) {
          redirect({ pathname: `/${token.id}` });
        }
      }
    } catch (erro) {
      toast.error("Login e/ou senha inválidos!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={logar} className={estilo.form}>
        <div className={estilo.form__group}>
          <input
            className={estilo.form__field}
            type="text"
            name="login"
            value={login}
            placeholder="Login"
            required
            onChange={(e) => setLogin(e.target.value)}
          />
          <label className={estilo.form__label}>Login</label>
        </div>
        <div
          className={classNames({
            [estilo.form__group]: true,
            [estilo.field]: true,
          })}
        >
          <input
            className={estilo.form__field}
            type="password"
            value={senha}
            placeholder="Senha"
            required
            onChange={(e) => setSenha(e.target.value)}
          />
          <label className={estilo.form__label}>Senha</label>
        </div>
        <input className={estilo.form__submit} type="submit" value="Entrar" />
      </form>
    </>
  );
}
