import { Link } from 'react-router-dom'
import { useState } from "react"
import { LayoutComponents } from "../../components/LayoutComponents"
import jg from "../../assets/jg.png";
import { api } from '../../services/api';

export const Register =()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState("")

    const handleSaveUser = async (e) => {
      e.preventDefault();
      const data ={
        email, password, name
      }

      const response = await api.post("/api/users", data);
      console.log(response.data);
    }

    return(
        <LayoutComponents>
            <form onSubmit={handleSaveUser} className="login-form">

        <span className="login-form-title">Criar Conta</span>
        <span className="login-form-title">
          <img src={jg} alt="Jogo do bicho" />
        </span>

        <div className="wrap-input">
          <input
            className={name !== '' ? 'has-val input' : 'input'}
            type="txt"
            value={name}
            onChange={e => setName(e.target.value)}

          />
          <span className="focus-input" data-placeholder="Nome"></span>
        </div>
        
        <div className="wrap-input">
          <input
            className={email !== '' ? 'has-val input' : 'input'}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}

          />
          <span className="focus-input" data-placeholder="Email"></span>
        </div>

        <div className="wrap-input">
          <input
            className={password !== '' ? 'has-val input' : 'input'}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}

          />
          <span className="focus-input" data-placeholder="Senha"></span>
        </div>

        <div className="container-login-form-btn">
          <button type="submit" className="login-form-btn">Cadastrar</button>
        </div>
        <div className="text-center">
          <span className="tx1">Já possui conta?</span>

          <Link className="txt2" to="/">
            Acessar com Email e Senha.
          </Link>
        </div>
      </form>
        </LayoutComponents>
    )

}