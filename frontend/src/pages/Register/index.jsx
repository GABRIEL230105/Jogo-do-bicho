import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LayoutComponents } from "../../components/LayoutComponents";
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

    const data = {
      email,
      password,
      name,
    };

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
      <form onSubmit={handleSaveUser} className="login-form">
        <span className="login-form-title">Criar Conta</span>

        <span className="login-form-title">
          <img src={jg} alt="Jogo do bicho" />
        </span>

        {mensagem && (
          <div
            style={{
              backgroundColor: "#16a34a",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {mensagem}
          </div>
        )}

        {erro && (
          <div
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {erro}
          </div>
        )}

        <div className="wrap-input">
          <input
            className={name !== "" ? "has-val input" : "input"}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>

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
            Cadastrar
          </button>
        </div>

        <div className="text-center">
          <span className="tx1">Já possui conta?</span>

          <Link className="txt2" to="/">
            Acessar com Email e Senha.
          </Link>
        </div>
      </form>
    </LayoutComponents>
  );
};