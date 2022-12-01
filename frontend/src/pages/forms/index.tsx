import { FormCadastro } from "containers/FormCadastro";
import { FormLogin } from "containers/FormLogin";
import { useState } from "react";
import classNames from "classnames";
import estilo from "./Form.module.scss";

export function Forms() {
  const [formLogin, setFormLogin] = useState(true);

  return (
    <div className={estilo.container}>
      <div className={estilo.container__botoes}>
        <button
          className={classNames({
            [estilo.container__botao]: true,
            [estilo["container__botao-selecionado"]]: formLogin,
          })}
          onClick={() => setFormLogin(true)}
        >
          Logar
        </button>
        <button
          className={classNames({
            [estilo.container__botao]: true,
            [estilo["container__botao-selecionado"]]: !formLogin,
          })}
          onClick={() => setFormLogin(false)}
        >
          Cadastrar-se
        </button>
      </div>
      {formLogin ? <FormLogin /> : <FormCadastro />}
    </div>
  );
}
