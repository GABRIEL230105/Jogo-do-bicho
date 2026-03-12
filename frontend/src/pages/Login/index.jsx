import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import jg from "../../assets/jg.png";
import { LayoutComponents } from "../../components/LayoutComponents";
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
      <form onSubmit={handleSignIn} className="login-form">
        <span className="login-form-title">Bem vindo!!!</span>

        <span className="login-form-title">
          <img src={jg} alt="Jogo do bicho" />
        </span>

        <div className="wrap-input">
          <input
            className={email !== "" ? "has-val input" : "input"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== "" ? "has-val input" : "input"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="container-login-form-btn">
          <button type="submit" className="login-form-btn">
            Login
          </button>
        </div>

        <div className="text-center">
          <span className="tx1">Não possui conta?</span>
          <Link className="txt2" to="/register">
            Criar conta
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};