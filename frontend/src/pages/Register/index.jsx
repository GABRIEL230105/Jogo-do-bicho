import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
import { Field } from "../../components/Field";
import jg from "../../assets/jg.png";
import { api } from "../../services/api";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleSaveUser = async (e) => {
    e.preventDefault();

    setMensagem("");
    setErro("");

    const data = { email, password, name };

    try {
      await api.post("/api/users", data);

      setMensagem("✅ Cadastro realizado com sucesso!");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error(error);
      setErro(error.response?.data?.message || "Erro ao cadastrar usuário");
    }
  };

  return (
    <LayoutComponents>
      <form onSubmit={handleSaveUser} className="w-full pb-8">
        <span className="block overflow-hidden text-center text-[30px] leading-tight text-cyan-50 shadow-[0_5px_10px_rgba(0,0,0,0.2)] pt-4">Criar Conta</span>

        <span className="block overflow-hidden text-center text-[30px] leading-tight text-cyan-50 shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
          <img src={jg} alt="Jogo do bicho" className="mx-auto w-[170px]" />
        </span>

        <div className="mt-8 px-8">
          {mensagem && (
            <div className="mb-4 rounded-lg bg-green-600 p-2.5 text-center font-bold text-white">{mensagem}</div>
          )}

          {erro && (
            <div className="mb-4 rounded-lg bg-red-600 p-2.5 text-center font-bold text-white">{erro}</div>
          )}

          <Field label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Field label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[10px] bg-gradient-to-l from-cyan-400 to-fuchsia-600 text-[15px] uppercase text-white">
            Cadastrar
          </button>

          <div className="mt-10 flex items-center justify-center gap-1.5 text-sm">
            <span className="text-neutral-400">Já possui conta?</span>
            <Link className="text-sky-300" to="/">
              Acessar com Email e Senha.
            </Link>
          </div>
        </div>
      </form>
    </LayoutComponents>
  );
};
