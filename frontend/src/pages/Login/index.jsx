import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import jg from "../../assets/jg.png";
import { LayoutComponents } from "../../components/LayoutComponents";
import { Field } from "../../components/Field";
import { AuthContext } from "../../context/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { SignIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const success = await SignIn(email, password);

    if (success) {
      navigate("/home");
    } else {
      alert("Email ou senha inválidos");
    }
  };

  return (
    <LayoutComponents>
      <form onSubmit={handleSignIn} className="w-full pb-8">
        <span className="block overflow-hidden text-center text-[30px] leading-tight text-cyan-50 shadow-[0_5px_10px_rgba(0,0,0,0.2)] pt-4">Bem vindo!!!</span>

        <span className="block overflow-hidden text-center text-[30px] leading-tight text-cyan-50 shadow-[0_5px_10px_rgba(0,0,0,0.2)]">
          <img src={jg} alt="Jogo do bicho" className="mx-auto w-[170px]" />
        </span>

        <div className="mt-8 px-8">
          <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Field label="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type="submit" className="flex h-12 w-full cursor-pointer items-center justify-center rounded-[10px] bg-gradient-to-l from-cyan-400 to-fuchsia-600 text-[15px] uppercase text-white">
            Login
          </button>

          <div className="mt-10 flex items-center justify-center gap-1.5 text-sm">
            <span className="text-neutral-400">Não possui conta?</span>
            <Link className="text-sky-300" to="/register">
              Criar conta
            </Link>
          </div>
        </div>
      </form>
    </LayoutComponents>
  );
};
