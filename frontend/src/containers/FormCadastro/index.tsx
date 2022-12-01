import { instancia } from "instancia";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import estilo from "../FormLogin/Form.module.scss";
import "react-toastify/dist/ReactToastify.css";

export function FormCadastro() {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");

  const cadastrarUsuario = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (senha === confirmSenha) {
        const dados = {
          nome: nome,
          login: login,
          senha: senha,
        };

        const enviarDados = await instancia
          .post(`/usuario`, dados)
          .then((res) => res);

        if (enviarDados.status === 201) {
          setNome("");
          setLogin("");
          setSenha("");
          setConfirmSenha("");
          toast.success(enviarDados.data.mensagem, {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return;
        }

        toast.error("Erro ao cadastrar usuário", {
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

      toast.error("Senha diferente da confirmação de senha", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (erro) {
      toast.error("Erro ao cadastrar usuário", {
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
      <form className={estilo.form} onSubmit={cadastrarUsuario}>
        <div className={estilo.form__group}>
          <input
            className={estilo.form__field}
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <label className={estilo.form__label}>Nome</label>
        </div>
        <div className={estilo.form__group}>
          <input
            className={estilo.form__field}
            type="text"
            placeholder="Nome do Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <label className={estilo.form__label}>Nome do Login</label>
        </div>
        <div className={estilo.form__group}>
          <input
            className={estilo.form__field}
            type="text"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <label className={estilo.form__label}>Senha</label>
        </div>
        <div className={estilo.form__group}>
          <input
            className={estilo.form__field}
            type="text"
            placeholder="Confirmação de senha"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)}
            required
          />
          <label className={estilo.form__label}>Confir. de Senha</label>
        </div>
        <input
          className={estilo.form__submit}
          type="submit"
          value="Cadastrar-se"
        />
      </form>
    </>
  );
}
