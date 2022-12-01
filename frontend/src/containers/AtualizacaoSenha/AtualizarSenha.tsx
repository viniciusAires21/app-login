import { instancia } from "instancia";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import estilo from "./Senha.module.scss";

export function AtualziarSenha() {
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const { id } = useParams();

  const atualizarSenha = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (senha === confirmSenha) {
        const senhaAtualizada = await instancia
          .put(
            `/usuario/${id}`,
            { senha: senha },
            { headers: { Authorization: localStorage.getItem("tk") } }
          )
          .then((res) => res);

        if (senhaAtualizada.status !== 200)
          return toast.error("Erro ao atualizar senha", {
            position: "bottom-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });

        toast.success("Senha atualizada com sucesso", {
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
      toast.error("Erro ao atualizar senha", {
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
      <form className={estilo.form} onSubmit={atualizarSenha}>
        <div className={estilo.form__group}>
          <input
            type="text"
            placeholder="Nova senha"
            value={senha}
            className={estilo.form__field}
            required
            onChange={(e) => setSenha(e.target.value)}
          />
          <label className={estilo.form__label}>Nova Senha</label>
        </div>
        <div className={estilo.form__group}>
          <input
            type="text"
            placeholder="Confirmação nova senha"
            value={confirmSenha}
            required
            className={estilo.form__field}
            onChange={(e) => setConfirmSenha(e.target.value)}
          />
          <label className={estilo.form__label}>Confirm. de Senha</label>
        </div>
        <input
          className={estilo.form__submit}
          type="submit"
          value="Atualizar"
        />
      </form>
    </>
  );
}
